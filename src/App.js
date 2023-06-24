
import { Routes,Route } from 'react-router-dom';

import Home from './pages/home/Home';
import Collection from './pages/collection/Collection';
import ProductDetail from './pages/productDetail/ProductDetail';
import Navbar from './component/navbar/Navbar';
import Footer from './component/footer/Footer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategories } from './redux/categorySlice';
import Payments from './component/payments/Payments';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  })
  return (
    <div className="App">
      <Navbar/>
     
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/category/:categoryId?' element={<Collection />} />
        <Route path='/products/:productId' element={<ProductDetail />} />
        <Route path='/payments/:status' element={<Payments/>} />
      </Routes>
    
      <Footer/>
    </div>
  );
}

export default App;


// import Home from "./pages/home/Home"; 
// import { Route,Routes } from "react-router-dom";
// import Footer from "./component/footer/Footer";
// import Navbar from "./component/navbar/Navbar";
// import Categories from "./pages/categories/Categories";
// import ProductDetails from "./pages/productDetail/ProductDetail";

// function App() {
//   return (
//     <div className="App">
//       <Navbar/>
//      <Routes>
//       <Route path ='/' element={<Home />} />
//       <Route path ='/category/:categoryId?' element={<Categories/>} />
//       <Route path ='/products/:productId' element={<ProductDetails />} />
//      </Routes>
//       <Footer/>
//     </div>
//   );
// }
//  export default App;