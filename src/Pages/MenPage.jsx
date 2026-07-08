import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useCart } from "../CartContext";
import { Heart, Key } from "lucide-react";
import { useWishlist } from "../Context/WhislistContext";
import ProductCard from "../Components/ProductCard";



const menProducts = [
  { id: 1, name: "Ocean Blue Polo", price: 189, image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500", category: "Shirts", colors: [
            { name: "Yellow", value: "#FACC15" },
            { name: "Blue", value: "#2563EB" },
        ], },
  { id: 11, name: "Charcoal Crew Neck", price: 195, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500", category: "Shirts", colors: [
            { name: "Yellow", value: "#FACC15" },
            { name: "Blue", value: "#2563EB" },
        ], },
  { id: 6, name: "Classic Denim", price: 1200, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=80", category: "jeans", colors: [
            { name: "Yellow", value: "#FACC15" },
            { name: "Blue", value: "#2563EB" },
        ], },
  { id: 7, name: "Oxford Button Down", price: 550, image: "https://images.unsplash.com/photo-1563630423918-b58f07336ac9?auto=format&fit=crop&w=1200&q=80", category: "Shirts" , colors: [
            { name: "Yellow", value: "#FACC15" },
            { name: "Blue", value: "#2563EB" },
        ],},
  { id: 8, name: "Camel Wool Coat", price: 399, image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80", category: "Outerwear", colors: [
            { name: "Yellow", value: "#FACC15" },
            { name: "Blue", value: "#2563EB" },
        ], },
  { id: 9, name: "Minimal Leather Court", price: 500, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", category: "Shoes", colors: [
            { name: "Dark Blue", value: "#1E3A8A" },
            { name: "Black", value: "#111827" },
        ], },
];

export default function MenPage() {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  /*useEffect(() => {
    gsap.from(".men-header", { opacity: 0, y: -30, duration: 0.8 });
    gsap.from(".product-card", { 
      opacity: 0, 
      y: 30, 
      stagger: 0.1, 
      duration: 0.6,
      delay: 0.2
    });
  }, []);*/

  const handleAddToCart = (product) => {
    addToCart(product);
    gsap.from(".add-success", { opacity: 0, scale: 0.8, duration: 0.3 });
  };
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category = query.get("category");
  const filteredProducts = category
    ? menProducts.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    )
    : menProducts;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-b from-[#f8f7f5] to-white">
      
      {/* Hero Banner */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1200')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center men-header">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold">Men's Collection</h1>
            <p className="text-xl mt-4">Premium styles for the modern man</p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Items</h2>
          <Link to="/products" className="text-blue-600 hover:underline">View all</Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              onAddToCart={handleAddToCart}
              product={product}
              onWishlist={toggleWishlist}

            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
