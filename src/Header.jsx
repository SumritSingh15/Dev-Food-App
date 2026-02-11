import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { addUser, removerUser } from './UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './Firebase';
import { signOut } from "firebase/auth";
import useOnlineStatus from './useOnlineStatus';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState(false);
  const OnlineStatus = useOnlineStatus();
  const items = useSelector((store) => store.Product.items.length);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }))
        setSignedIn(true);
        navigate("/browse")
      } else {
        setSignedIn(false);
        dispatch(removerUser())
        navigate("/login")
      }
    });
    return () => unsubscribe();
  }, [])
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.

    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div className=' w-full  bg-pink-200 text-black flex flex-row justify-between'>
      <div >
        <img src='https://png.pngtree.com/png-vector/20250217/ourmid/pngtree-unique-food-logo-png-image_15488394.png' alt='logo' className='w-40 h-25 m-1' />

      </div>
      <div className='flex flex-col sm:flex-row p-7'>
        <Link to="/browse">
          <h1 className="text-2xl text-black mr-8 mt-2 cursor-pointer">
            Home
          </h1>
        </Link>
        <Link to="/cart">
          <h1 className="text-2xl text-black mr-8 mt-2 cursor-pointer">
            Cart items:{items}
          </h1>
        </Link>
        <h1 className='mr-8 mt-2 text-2xl'>status:{OnlineStatus ? "🟢" : "🔴"}</h1>
        <button
          onClick={() => {
            if (signedIn) handleSignOut();  // If logged in → sign out
            // If logged out → go to login
          }}
          className="font-bold text-black border-2 px-3  "
        >
          {signedIn ? "Sign Out" : "Sign In"}
        </button>

      </div>
    </div>
  )
}

export default Header
