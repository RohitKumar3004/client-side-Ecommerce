import React, { useEffect, useState } from 'react'
import Hero from '../../component/hero/Hero'
import './Home.scss'
import Category from '../../component/category/Category'
import Product from '../../component/product/Product'
import {axiosClient} from '../../utils/axiosClient'
import { useSelector } from 'react-redux'
function Home() {

  const [topProducts, setTopProducts] = useState(null);
  const categories = useSelector((state) => state.categoryReducer.categories);
 
  async function fetchData() {
   
    const topProductsResponse = await axiosClient.get('/products?filters[isTopPick][$eq]=true&populate=image')

    // console.log(categoryResponse);
    // console.log(topProductsResponse);
  setTopProducts(topProductsResponse.data.data)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className='Home'>
      <Hero />
      <section className="collection container">
        <div className="info">
          <h2 className="heading">Shop by Categories</h2>
        <p className="subheading">Shop from the best,our Film and TV</p>
        </div>
        <div className="content">
          {categories?.map(category => <Category key={category.id} category={category } />)}
        </div>
      </section>
      <section className="collection container">
        <div className="info">
          <h2 className="heading">Our Top Picks</h2>
        <p className="subheading">All New Designs, Some Old Details</p>
        </div>
        <div className="content">
         {topProducts?.map(product => <Product key={product.id} product={product} />)}
        </div>
      </section>
    </div>
  )
}

export default Home

// import React from 'react'
// import Hero from '../../component/hero/Hero'
// import Category from '../../component/category/Category'
// import Product from '../../component/product/Product'
// import './Home.scss'
// function Home() {
//   return (
//     <div className='Home'>
//       <Hero/>
//      <section className='collection container'>
//       <div className="info">
//         <div className="heading">Show By Category</div>
//         <p className="subheading">
//           Shop from the best,our Shore from the Marker collection.

//         </p>
//       </div>
//       <div className="content">
//         <Category/>
//         <Category/>
//         <Category/>
//       </div>
//      </section>

//      <section className='collection container'>
//       <div className="info">
//         <div className="heading">Our Picks</div>
//         <p className="subheading">
//           All new design,Same old Details
//         </p>
//       </div>
//       <div className="content">
//         <Product/>
//         <Product/>
//         <Product/>
//         <Product/>
//         <Product/>
//         <Product/>
//       </div>
//      </section>

//     </div>
//   )
// }

// export default Home
