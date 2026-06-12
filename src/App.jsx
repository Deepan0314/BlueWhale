import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./Pages/HomePages";
import ProductsPage from "./Pages/ProductsPage";
import ProductPage from "./Pages/ProductPage";
import MenPage from "./Pages/MenPage";
import WomenPage from "./Pages/WomenPage";
import KidsPage from "./Pages/KidsPage";
import NewArrivalsPage from "./Pages/NewArrivalsPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import NotFound from "./Pages/NotFound";

const App = () => {
  return (
    <div className="bg-[#f8f7f5] min-h-screen">
      <Router>
        <Routes>
          <Route element={<Layout />}> 
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/men" element={<MenPage />} />
            <Route path="/women" element={<WomenPage />} />
            <Route path="/kids" element={<KidsPage />} />
            <Route path="/new-arrivals" element={<NewArrivalsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;