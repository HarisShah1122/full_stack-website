import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/HomePage';
import Unstitched from './components/Unstitched';
import MensWear from './components/MensWear';
import ProductDetails from './components/ProductDetails';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<MensWear />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/women" element={<div>Women's Clothing</div>} />
        <Route path="/shawls" element={<div>Shawls</div>} />
        <Route path="/bags" element={<div>Bags</div>} />
        <Route path="/unstitched" element={<Unstitched />} />
        <Route path="/mens-wear" element={<MensWear />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;