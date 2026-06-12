import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { motion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";
import { useCart } from "../CartContext";

const newArrivals = [
  { id: 22, name: "Ultra Soft Linen Shirt", price: 99, image: "https://images.unsplash.com/photo-1596362051780-e7f40e5a90a9?w=500", category: "New Arrival", isNew: true },
  { id: 23, name: "Designer Cargo Pants", price: 145, image: "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500", category: "New Arrival", isNew: true },
  { id: 24, name: "Premium Leather Belt", price: 89, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500", category: "Accessories", isNew: true },
  { id: 25, name: "Sustainable Wool Sweater", price: 135, image: "https://images.unsplash.com/photo-1596993516316-3a5a1d53ba85?w=500", category: "New Arrival", isNew: true },
  { id: 26, name: "Modern Minimalist Watch", price: 299, image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500", category: "Accessories", isNew: true },
  { id: 27, name: "Eco-friendly Canvas Bag", price: 78, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500", category: "Accessories", isNew: true },
];

export default function NewArrivalsPage() {
  const { addToCart } = useCart();

  useEffect(() => {
     gsap.from(".new-header", { opacity: 1, y: -30, duration: 0.8 });
    gsap.from(".product-card", { 
      opacity: 1, 
      y: 30, 
      stagger: 0.1, 
      duration: 0.6,
      delay: 0.2
    });

    // Animate new badges
    gsap.to(".new-badge", {
      scale: 1.1,
      yoyo: true,
      repeat: -1,
      duration: 1.5,
      stagger: 0.1
    });
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Banner */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1556821552-5f74030982f0?w=1200')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center new-header">
          <div className="text-center text-white">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles size={32} />
              <h1 className="text-5xl font-bold">New Arrivals</h1>
              <Zap size={32} />
            </div>
            <p className="text-xl mt-4">Discover our latest exclusive collections</p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Fresh Collections</h2>
          <Link to="/products" className="text-amber-600 hover:underline">View all</Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {newArrivals.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -8 }}
              className="product-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 relative"
            >
              {product.isNew && (
                <div className="new-badge absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-10">
                  <Sparkles size={12} /> NEW
                </div>
              )}

              <Link to={`/product/${product.id}`} className="relative block overflow-hidden h-64">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
                <div className="absolute top-4 right-4 bg-amber-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                  {product.category}
                </div>
              </Link>

              <div className="p-4">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-slate-600 text-sm mt-2">{product.category}</p>
                <p className="text-2xl font-bold mt-3 text-amber-600">${product.price}</p>

                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/product/${product.id}`}
                    className="flex-1 bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-medium text-center hover:bg-amber-700 transition"
                  >
                    View Details
                  </Link>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 border border-amber-600 text-amber-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-600 hover:text-white transition"
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
