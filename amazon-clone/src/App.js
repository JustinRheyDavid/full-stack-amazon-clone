import React,{ useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import Order from './Orders';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


const promise = loadStripe('pk_test_51TyGHOJkQsorqh42Bh7Wl512ZoAJJZeBzptO4pwA2qLsQYpGvabcPujII3uQAdFPfv63DBW9UAZM7Tgcu2R5wIX300VgbHJ8As');


function App() {
  const [, dispatch] = useStateValue();

useEffect(() => {

  const unsubscribe = auth.onAuthStateChanged(authUser => {
    console.log('user is >>> ', authUser);

    dispatch({
      type: 'SET_USER',
      user: authUser,
    })
  })

  return () => unsubscribe();
},  [dispatch])

  return (
    <Router>
      <div className="app">

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<><Header /><Checkout /></>} />
          <Route path="/payment" element={<Elements stripe={promise}><><Header /><Payment /></></Elements>} />
          <Route path="/orders" element={<><Header /><Order /></>} />
          <Route path="/" element={<><Header /><Home /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
