import React from 'react'
import { useDispatch } from 'react-redux';
import { addProduct } from './ProductSlice';

const RestaurantCard = (props) => {
    const {resdata} = props;
    const{idMeal,strCategory,strMeal,strMealThumb} = resdata;
    const disptach = useDispatch();
  return (
  
    <div>
     
      <div className="  w-[250px] h-[350px]   bg-linear-to-br from-blue-500/60 to-purple-500/60   backdrop-blur-lg    m-5 rounded-2xl shadow-xl   hover:scale-105 hover:shadow-2xl 
    transition-all duration-500 cursor-pointer ">
  <div className="card " >
    <img 
      src={strMealThumb} 
      alt={strMeal} 
      className="rounded-t-lg w-full h-[200px] object-cover shadow-md"/>
    <h1 className="font-bold text-xl mt-3 text-white drop-shadow-md mx-2">{strMeal}</h1>
    <h3 className="font-semibold text-gray-100 opacity-90 mx-2">{strCategory}</h3>
    <button className='border px-2 py-1 mt-3 mx-2 text-green-600 border-green-600 hover:bg-amber-500 hover:text-white' onClick={()=>{disptach(addProduct({
      id: idMeal,
      category: strCategory,
      image: strMealThumb,
      name: strMeal
    }))}}>Add to Cart</button>
  </div>
</div>
    </div>
  )
}

export default RestaurantCard
