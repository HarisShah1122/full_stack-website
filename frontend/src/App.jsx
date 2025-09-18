import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/HomePage";
import Unstitched from "./components/Unstitched";
import MensWear from "./components/MensWear";
import ProductDetails from "./components/ProductDetails";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Success from "./components/Success";
import Cancel from "./components/Cancel";
import TraditionalDress from "./components/TraditionalDress";
import Cart from "./components/Cart";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<MensWear />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/women" element={<div>Women's Clothing</div>} />
        <Route path="/shawls" element={<div>Shawls</div>} />
        <Route path="/bags" element={<div>Bags</div>} />
        <Route path="/unstitched" element={<Unstitched />} />
        <Route path="/TraditionalDress" element={<TraditionalDress />} />
        <Route path="/mens-wear" element={<MensWear />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
};

export default App;