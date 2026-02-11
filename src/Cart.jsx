import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RemoveProduct, IncreaseQty, DecreaseQty } from './ProductSlice';

const Cart = () => {

  const items = useSelector((store) => store.Product.items);
  const dispatch = useDispatch();

  return (
    <div className="p-5 flex flex-col items-center gap-5">
      {items.length === 0 ? (
        <h2 className="text-black font-bold text-2xl">Your cart is empty</h2>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            className="sm:w-[800px] h-50 bg-gray-300 rounded-xl p-4 flex justify-between shadow-lg hover:scale-105 transition">
            <div>
              <h1 className="text-white font-bold text-2xl mt-3">{item.name}</h1>
              <h2 className="text-gray-300">{item.category}</h2>
              {/* Remove Button */}
              <button
                className="bg-red-500 text-white px-3 py-1 mt-5 rounded hover:bg-red-600"
                onClick={() => dispatch(RemoveProduct(item.id))}> Remove
              </button>
            </div>
            <div>
              <img
                src={item.image}
                alt={item.name}
                className="w-40 h-[120px] object-cover rounded-lg" />

              <div className="flex items-center gap-4 ml-6 mt-4">
                <button
                  className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                  onClick={() => dispatch(DecreaseQty(item.id))}> -
                </button>
                <span className="text-white text-xl">{item.quantity}</span>
                <button
                  className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                  onClick={() => dispatch(IncreaseQty(item.id))}>
                  +
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};








export default Cart
