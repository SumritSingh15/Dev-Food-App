import React, { useEffect, useRef, useState } from 'react'
import RestaurantCard from './RestaurantCard';
import Shimmer from './Shimmer';

const Browse = () => {
  const [data, setdata] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const [search, setsearch] = useState("");
  const [categories, setcategory] = useState([]);
  const scrollref = useRef(null);

  const scrollleft = () => {
    scrollref.current.scrollBy({ left: -200, behavior: "smooth", });
  }
  const scrollright = () => {
    scrollref.current.scrollBy({ left: 200, behavior: "smooth", });
  }
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
  if (data.length == 0) return <Shimmer />
  else
    return (
      <div className='m-5  w-full overflow-x-hidden '>
        <div className='m-2 flex flex-col sm:flex-row justify-center'>
          <input type='text' placeholder='search Food' className='p-2 m-3 w-[20 0px] sm:w-[600px] border rounded-3xl text-black' onChange={(e) => { setsearch(e.target.value) }} />
          <button className='p-3   w-50 sm:w-30 m-2 font-bold bg-black rounded-3xl text-white' onClick={handleSearch}>Search</button>
        </div>
        <div>
          <h1 className='font-bold text-2xl text-black mb-2'>Categories</h1>
          <div className="relative w-full overflow-hidden ">
            {/* Left button */}
            <button
              className="absolute left-0 top-1/2  transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10 "
              onClick={scrollleft}>
              &lt;
            </button>
            {/* Scrollable categories */}
            <div ref={scrollref} id="categoriesScroll"
              className="flex gap-6 mb-5  overflow-x-auto  
                  scrollbar-none overflow-y-hidden touch-auto scroll-smooth px-10 ">
              {categories.map((category) => (
                <div key={category.idCategory} className="flex flex-col items-center cursor-pointer mr-7 ml-10 min-w-[100px]  snap-center">
                  <img src={category.strCategoryThumb} alt={category.strCategory} className="w-28 h-28 object-cover rounded-full shadow-lg hover:scale-105 transition-all duration-300" />
                  <h2 className="text-black text-lg mt-2 text-center">
                    {category.strCategory}
                  </h2>
                </div>
              ))}
            </div>
            {/* Right button */}
            <button
              className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10 "
              onClick={scrollright} >
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
