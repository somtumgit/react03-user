import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoute from './components/HOC/PrivateRoute';
import Home from './containers/Home';
import ProductList from './containers/ProductList';
import ProductDetail from './containers/ProductDetail'
import Checkout from './containers/Checkout'
import { isUserLoggedIn, updateCart, getAddress } from './actions';
import Cart from './containers/Cart';
import Order from './containers/Order';
import OrderDetail from './containers/OrderDetail';

function App() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('app',window.store.getState());
    // console.log('app',auth);
    // dispatch(isUserLoggedIn());
    if(!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if(auth.authenticate) {
      dispatch(getAddress());
    }
  }, [auth.authenticate])

  useEffect(() => {
    dispatch(updateCart());
    // dispatch(getAddress());
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<PrivateRoute element={Home}></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute element={Cart} ></PrivateRoute>} />
        <Route path="/checkout" element={<PrivateRoute element={Checkout} ></PrivateRoute>} />
        <Route path="/account/orders" element={<PrivateRoute element={Order} ></PrivateRoute>} />
        <Route path="/order_details/:orderId" element={<PrivateRoute element={OrderDetail} ></PrivateRoute>} />
        <Route path="/:slug" element={<PrivateRoute element={ProductList} ></PrivateRoute>} />
        <Route path="/:productSlug/:productId/p" element={<PrivateRoute element={ProductDetail} ></PrivateRoute>} />
        
        {/* <Route path="/products" element={<PrivateRoute element={Products}></PrivateRoute>} /> */}
        {/* <Route path="/orders" element={<PrivateRoute element={Orders}></PrivateRoute>} /> */}

        {/* <Route path="/signin" element={<Signin />}/> */}
        {/* <Route path="/signup" element={<Signup/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
