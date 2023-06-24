import React, { useEffect, useState } from "react";
import "./Collection.scss";
import Product from "../../component/product/Product";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { axiosClient } from "../../utils/axiosClient";
function Collection() {
  const navigate = useNavigate();
  const params = useParams();
  const [categoryId, setCategoryId] = useState("");
  const [products, setProducts] = useState([]);

  const sortOptions = [
    {
      value: "Price-Low-High",
      sort: "price",
    },
    {
      value: "Newest-First",
      sort: "createdAt",
    },
  ];
  const [sortBy, setSortBy] = useState(sortOptions[0].sort);
  const categories = useSelector((state) => state.categoryReducer.categories);
  async function fetchProducts() {
    const url = params.categoryId
      ? `/products?populate=image&filters[category][key][$eq]=${params.categoryId}&sort=${sortBy}`
      : `/products?populate=image&&sort=${sortBy}`;
    const response = await axiosClient.get(url);
    setProducts(response.data.data);
  }

  useEffect(() => {
    setCategoryId(params.categoryId);
    //apicall
    fetchProducts();
  }, [params, sortBy]);

  function updateCategory(e) {
    navigate(`/category/${e.target.value}`);
  }
  return (
    <div className="Categories">
      <div className="container">
        <div className="header">
          <div className="info">
            <h2>Explore All Print and Artwork</h2>
            <p>
              India's largest collection of wall posters for your bedroom,
              living room kids room, kitchen and posters & art prints at highest
              quality lowest price guaranteed.
            </p>
          </div>
          <div className="sort-by">
            <div className="sort-by-container">
              <p className="sort-by-text">Sort-by</p>
              <select
                className="select-sort-by"
                name="sort-by"
                id="sort-by"
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map((item) => (
                  <option key={item.sort} value={item.sort}>
                    {item.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="filter-box">
            <div className="category-filter">
              <h3>Category</h3>
              {categories.map((item) => (
                <div key={item.id} className="filter-radio">
                  <input
                    name="category"
                    type="radio"
                    value={item.attributes.key}
                    id={item.id}
                    checked={item.attributes.key === categoryId}
                    onChange={updateCategory}
                  />
                  <label htmlFor={item.id}>{item.attributes.title}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="products-box">
            {products?.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router";
// import "./Categories.scss";
// import Product from "../../component/product/Product";

// function Categories() {
//   const navigate = useNavigate();
//   const params = useParams();

//   const [categoryId, setCategoryId] = useState("");

//   const categoryList = [
//     {
//       id: "comics",
//       value: "Comics",
//     },
//     {
//       id: "tvshows",
//       value: "TV Shows",
//     },
//     {
//       id: "sports",
//       value: "Sports",
//     },
//   ];

//   useEffect(() => {
//     setCategoryId(params.categoryId);
//     // Api CAll
//   }, [params]);

//   function updateCategory(e) {
//     navigate(`/category/${e.target.value}`);
//   }
//   return (
//     <div className="Categories">
//       <div className="container">
//         <div className="header">
//           <div className="info">
//             <h2>Explore ALl Print And ArtWork</h2>
//             <p>
//               Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe
//               harum doloremque officia, adipisci obcaecati pariatur?
//             </p>
//           </div>
//           <div className="short-by">
//             <div className="short-by-container">
//               <p className="short-by-text">Short By</p>
//               <select className="select-short-by" name="short-by" id="short-by">
//                 <option value="relavance">Relavance</option>
//                 <option value="newest-first">Newest</option>
//                 <option value="price-low-to-high">Price Low To High</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         <div className="content">
//           <div className="filter-box">
//             <div className="category-filter">
//               <h3>Category</h3>
//               {categoryList.map((item) => (
//                 <div key={item.id} className="filter-radio">
//                   <input
//                     name="category"
//                     type="radio"
//                     id={item.id}
//                     value={item.id}
//                     onChange={updateCategory}
//                     checked={item.id === categoryId}
//                   />
//                   <label htmlFor={item.id}>{item.value}</label>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="products-box">
//             <Product />
//             <Product />
//             <Product />
//             <Product />
//             <Product />
//             <Product />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Categories;
