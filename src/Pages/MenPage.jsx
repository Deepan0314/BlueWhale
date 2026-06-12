import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useCart } from "../CartContext";

const menProducts = [
  { id: 1, name: "Ocean Blue Polo", price: 89, image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500", category: "Shirts" },
  { id: 5, name: "Charcoal Crew Neck", price: 95, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500", category: "Shirts" },
  { id: 6, name: "Classic Denim", price: 120, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=80", category: "Pants" },
  { id: 7, name: "Oxford Button Down", price: 110, image: "https://images.unsplash.com/photo-1563630423918-b58f07336ac9?auto=format&fit=crop&w=1200&q=80", category: "Shirts" },
  { id: 8, name: "Camel Wool Coat", price: 350, image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80", category: "Outerwear" },
  { id: 9, name: "Minimal Leather Court", price: 210, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", category: "Shoes" },
];

export default function MenPage() {
  const { addToCart } = useCart();

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f7f5] to-white">
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
          {menProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -8 }}
              className="product-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
            >
              <Link to={`/product/${product.id}`} className="relative block overflow-hidden h-64">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
                <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                  {product.category}
                </div>
              </Link>

              <div className="p-4">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-slate-600 text-sm mt-2">{product.category}</p>
                <p className="text-2xl font-bold mt-3 text-[#0d2746]">${product.price}</p>

                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/product/${product.id}`}
                    className="flex-1 bg-[#0d2746] text-white px-4 py-2 rounded-full text-sm font-medium text-center hover:bg-[#0a1f34] transition"
                  >
                    View Details
                  </Link>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 border border-[#0d2746] text-[#0d2746] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#0d2746] hover:text-white transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
