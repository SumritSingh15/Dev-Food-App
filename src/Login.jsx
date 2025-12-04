import React, { useRef, useState } from "react";
import validate from "./Validate";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { addUser } from "./UserSlice";
import { useDispatch } from "react-redux";


const Login = () => {
  const [signin, setsignin] = useState(false);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const [error, seterror] = useState();

  const dispatch = useDispatch();
  function toggleSignIn() {
    setsignin(!signin);
  }
  function handlesubmit() {

    const message = validate(email.current.value, password.current.value);
    seterror(message);
    console.log(email)
    if (message) return;
    if (!signin) {
      // sign up logic

      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {

          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value
          }).then(() => {
            // Profile updated!
            const { uid, email, displayname } = auth.currentUser;
            dispatch(addUser({ uid: uid, email: email, displayname: displayname }))
            // ...


          }).catch((error) => {
            // An error occurred
            // ...
          });
          // ...

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..

          seterror(errorCode + " " + errorMessage)
        });

    } else {
      //sign in logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;


        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
         
    }
  }

  return (
   
    <div className="flex flex-row justify-center">

      <div className="w-[400px]  min-h-[500px] m-30 p-10 bg-blue-900 text-white flex flex-col gap-5">
        <h1 className="text-5xl text-center font-bold">{signin ? "Sign In" : "Sign Up"}</h1>
        {!signin && (<input type="text" ref={name} placeholder="enter you name" className="p-3 m-2 w-full border-2" />)}
        <input type="text" placeholder="Enter your Email" ref={email} className="p-3 m-2 w-full border-2" />
        <input type="password" placeholder="Enter your Password" ref={password} className="p-3 m-2 w-full border-2" />
        <p>{error}</p>
        <button className="p-5 m-1 w-[330px] bg-black font-bold cursor-pointer" onClick={handlesubmit}>{signin ? "Sign In" : "Sign Up"}</button>
        <p onClick={toggleSignIn} className="cursor-pointer">{signin ? "new to dev-foods" : "already a customer"}</p>
      </div>
    </div>
  );
};

export default Login;
