import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./Layout/Layout";
import LoadingScreen from "./Components/LoadingScreen";

import HomePage from "./Pages/HomePages";
import ProductsPage from "./Pages/ProductsPage";
import ProductPage from "./Pages/ProductPage";
import MenPage from "./Pages/MenPage";
import WomenPage from "./Pages/WomenPage";
import KidsPage from "./Pages/KidsPage";
import NewArrivalsPage from "./Pages/NewArrivalsPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import Wishlist from "./Components/Whislist";
import NotFound from "./Pages/NotFound";
import ScrollTop from "./Components/ScrollTop";
import Account from "./Components/AccountDetails/Account";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProtectedRoute from "./Components/ProtectedRoutes";
import OrderHistory from "./pages/OrderHistory";
const App = () => {

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} />
      {!isLoaded && (
        <LoadingScreen
          onComplete={() => setIsLoaded(true)}
        />
      )}

      <div
        style={{
          visibility: isLoaded ? "visible" : "hidden",
        }}
        className="bg-[#f8f7f5] min-h-screen"
      >
        <Router>
          <ScrollTop />



         <Routes>

              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                 element={
                   <ProtectedRoute>
                      <Layout />
                  </ProtectedRoute>
                }
             >
                 <Route
                   path="/"
                   element={<HomePage isLoaded={isLoaded} />}
                 />

                 <Route path="/products" element={<ProductsPage />} />
                 <Route path="/product/:id" element={<ProductPage />} />
                 <Route path="/men" element={<MenPage />} />
                 <Route path="/women" element={<WomenPage />} />
                 <Route path="/kids" element={<KidsPage />} />
                 <Route path="/new-arrivals" element={<NewArrivalsPage />} />
                 <Route path="/cart" element={<CartPage />} />
                 <Route path="/checkout" element={<CheckoutPage />} />
                 <Route path="/wishlist" element={<Wishlist />} />
                 <Route path="/account" element={<Account />} />
                 <Route path="/orders" element={<OrderHistory />} />
                 <Route path="*" element={<NotFound />} />
               </Route>

        </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;