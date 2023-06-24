import React, { useEffect, useState } from "react";
import "./ProductDetails.scss";
import {axiosClient} from '../../utils/axiosClient'
import { useParams } from "react-router-dom";
import Loader from "../../component/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cartSlice";

function ProductDetail() {

  const params = useParams();
  const [product, setProduct] = useState(null)
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cartReducer.cart);
  const quantity = cart.find(item => item.key === params.productId)?.quantity || 0;
  async function fetchData() {
    const productResponse = await axiosClient.get(`/products/?filters[key][$eq]=${params.productId}&populate=*`)
      if (productResponse.data.data.length > 0) {
        setProduct(productResponse.data.data[0])
      }
    }
    useEffect(() => {
      setProduct(null);
      fetchData();
  },[params])

    if (!product) {
      return <Loader/>
    }

  return (
    <div className="ProductDetail">
      <div className="container">
        <div className="product-layout">
          <div className="product-img center">
            <img src={product?.attributes.image.data.attributes.url} alt="product-img" />
          </div>
          <div className="product-info">
            <h1 className="heading">{product?.attributes.title }</h1>
            <h3 className="price">₹{product?.attributes.price }</h3>
            <p className="descripition">
              {product?.attributes.decs}
            </p>
            <div className="cart-options">
              <div className="quantity-selector">
                <span className="btn decrement"onClick={()=>dispatch(removeFromCart(product))}>-</span>
                <span className="quantity">{quantity }</span>
                <span className="btn increment"onClick={()=>dispatch(addToCart(product))}>+</span>
              </div>
              <button className="btn-primary add-to-cart"onClick={()=>dispatch(addToCart(product))}>Add to Cart</button>
            </div>
            <div className="return-policy">
              <ul>
                <li>
                  This product is made to order and is typically printed in 3-6
                  working days. Your entire order will ship out together.
                </li>
                <li>
                  Since this product is printed on demand expecially for you. it
                  is not eligble for you .it is nnot eligble to cancellation and
                  returns. Read our Return Policy.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

// import React from "react";
// import "./ProductDetails.scss";
// import dummyImg from "../../assets/neuroto.webp";
// function ProductDetails() {
//   return (
//     <div className="ProductDetails">
//       <div className="container">
//         <div className="product-layout">
//           <div className="product-img center">
//             <img src={dummyImg} alt="product img" />
//           </div>
//           <div className="product-info">
//             <h1 className="heading">This is the product heading</h1>
//             <h3 className="price"> Rs 455</h3>
//             <p className="description">
//               Lorem, ipsum dolor sit amet consectetur adipisicing elit.
//               Doloremque libero maxime mollitia praesentium ullam obcaecati at
//               repellendus, quam nisi similique!
//             </p>
//             <div className="cart-options">
//               <div className="quantity">
//                 <span className="btn decrement">-</span>
//                 <span className="quantity-number">2</span>
//                 <span className="btn increment">+</span>
//               </div>
//               <button className="btn-primary add-to-cart">ADD TO CART</button>
//             </div>
//             <div className="return-policy">
//               <ul>
//                 <li>libero maxime mollitia praesentium</li>
//                 <li> ipsum dolor sit amet consectetur adipisicing elit.</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetails;
