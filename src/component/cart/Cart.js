import React from 'react'
import './Cart.scss'
import { AiOutlineClose } from 'react-icons/ai'
import{BsCartX} from 'react-icons/bs'
import CartItem from '../cartItem/CartItem'
import { useSelector } from 'react-redux';
import { axiosClient } from '../../utils/axiosClient'

import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`)

function Cart({ onClose }) {
  const cart = useSelector(state => state.cartReducer.cart);
  let totalAmmount = 0;
  cart.forEach(item=>totalAmmount+=(item.quantity*item.price))
  const isCartEmpty = cart.length === 0;

  async function handleCheckout() {
    try {
      const response = await axiosClient.post('/orders', {
        products: cart
      });
      
      const stripe = await loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`) ;
      await stripe.redirectToCheckout({
        sessionId:response.data.stripeId
      });
    } catch (error) {
      console.log(error);
    }
    
  }
  return (
    <div className='Cart'>
      <div className="overlay" onClick={onClose}></div>
      <div className="cart-content">
        <div className="header">
          <h3>Shoping Cart</h3>
          <div className="close-btn" onClick={onClose}>
            <AiOutlineClose />Close
          </div>
        </div>
        <div className="cart-item">
         {cart.map(item=><CartItem key={item.key} cart={item}/>)}
        </div>
        {isCartEmpty && <div className="empty-cart-info">
          <div className="icon"><BsCartX /></div>
          <h4>Cart is Empty</h4>
        </div>}
       {!isCartEmpty && <div className="checkout-info">
          <div className="total-ammount">
            <h3 className='total-message'>Total:</h3>
            <h3 className='total-value'>₹ {totalAmmount }</h3>
          </div>
          <div className="checkout btn-primary" onClick={handleCheckout}>
            CheckOut now
          </div>
        </div> }
       
      </div>
    </div>
  )
}

export default Cart