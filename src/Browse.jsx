import React, { useEffect, useState } from 'react'
import RestaurantCard from './RestaurantCard';
import Shimmer from './Shimmer';

const Browse = () => {
  const [data, setdata] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const [search, setsearch] = useState("");
  const [categories, setcategory] = useState([]);
  async function GetData() {
    const Api = await fetch('https://themealdb.com/api/json/v1/1/search.php?s=');
    const Api_data = await Api.json();
    console.log(data.meals);
    setdata(Api_data.meals);
    setfilterdata(Api_data.meals);

  }
  async function CategoryData() {
    const getdata = await fetch("https://themealdb.com/api/json/v1/1/categories.php");
    const data = await getdata.json();
    setcategory(data.categories);
  }
  useEffect(() => {
    CategoryData();
  }, [])
  useEffect(() => {
    handleSearch();
  }, [search]);

  const handleSearch = () => {
    if (!search) {
      setfilterdata(data);
      return;
    }
    const filtered = data.filter((meal) => {
      return meal.strMeal.toLowerCase().includes(search.toLowerCase())
    })
    setfilterdata(filtered);
    console.log(filtered)
  }
  useEffect(() => {
    GetData();

  }, [])
  if(data.length == 0)return <Shimmer/>
  else
  return (
    <div className='m-5'>
      <div className='m-2 flex justify-center'>
        <input type='text' placeholder='search Food' className='p-2 m-3 w-[600px] border rounded-3xl text-white' onChange={(e) => { setsearch(e.target.value) }} />
        <button className='p-3 w-30 m-2 font-bold bg-black rounded-3xl text-white' onClick={handleSearch}>Search</button>

      </div>
      <div>
  <h1 className='font-bold text-2xl text-white mb-2'>Categories</h1>
  <div className="relative">
    {/* Left button */}
    <button
      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10 md:hidden"
      onClick={() => document.getElementById('categoriesScroll').scrollBy({ left: -150, behavior: 'smooth' })}
    >
      &lt;
    </button>

    {/* Scrollable categories */}
    <div
      id="categoriesScroll"
      className="flex gap-6 mb-5 overflow-x-auto  overflow-y-hidden touch-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300"
    >
      {categories.map((category) => (
        <div key={category.idCategory} className="flex flex-col items-center cursor-pointer mr-7 min-w-[100px]">
          <img src={category.strCategoryThumb} alt={category.strCategory} className="w-28 h-28 object-cover rounded-full shadow-lg hover:scale-105 transition-all duration-300" />
          <h2 className="text-white text-lg mt-2 text-center">
            {category.strCategory}
          </h2>
        </div>
      ))}
    </div>

    {/* Right button */}
    <button
      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10 md:hidden"
      onClick={() => document.getElementById('categoriesScroll').scrollBy({ left: 150, behavior: 'smooth' })}
    >
      &gt;
    </button>
  </div>
</div>


      <div>
      <h1 className='font-bold text-2xl text-white mb-2'>Popular Food's</h1>
    </div> 
      <div className=" flex flex-wrap "> 
        {filterdata?.map((meal) => (
          <RestaurantCard resdata={meal} key={meal.idMeal} />
        ))}
      </div>
    </div>
  ) 
}

export default Browse
