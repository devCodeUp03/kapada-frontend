import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Searchbar from "./components/Searchbar";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile";
import { useContext } from "react";
import { ShopContext } from "./context/ShopContext";
import Verify from "./pages/Verify";
export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const { frontendToken, setFrontendToken } = useContext(ShopContext);

  useEffect(() => {
    localStorage.setItem("frontendToken", frontendToken);
  }, [frontendToken]);
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar
        frontendToken={frontendToken}
        setFrontendToken={setFrontendToken}
      />
      <Searchbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/product/:productId"
          element={<Product frontendToken={frontendToken} />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/login"
          element={<Login setFrontendToken={setFrontendToken} />}
        />
        <Route path="/orders" element={<Orders />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/verify" element={<Verify />} />

      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
