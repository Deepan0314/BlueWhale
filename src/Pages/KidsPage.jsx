import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useCart } from "../CartContext";
import { useWishlist } from "../Context/WhislistContext";
import { Heart } from "lucide-react";
import ProductCard from "../Components/ProductCard";

const kidsProducts = [
  { id: 16, name: "Colorful T-shirt Set", price: 45, image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=500", category: "Tops" },
  { id: 17, name: "Fun Graphic Hoodie", price: 65, image: "https://images.unsplash.com/photo-1516134305309-843c82a98d5d?w=500", category: "Hoodies" },
  { id: 18, name: "Play Denim Shorts", price: 50, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500", category: "Bottoms" },
  { id: 19, name: "Cozy Sweater", price: 75, image: "https://images.unsplash.com/photo-1522058567840-d81e77b9c1f6?w=500", category: "Sweaters" },
  { id: 20, name: "Trendy Sneakers", price: 85, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", category: "Shoes" },
  { id: 21, name: "Kids Baseball Cap", price: 35, image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=500", category: "Accessories" },
];

export default function KidsPage() {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();


  //   useEffect(() => {
  //     gsap.from(".kids-header", { opacity: 0, y: -30, duration: 0.8 });
  //     gsap.from(".product-card", { 
  //       opacity: 0, 
  //       y: 30, 
  //       stagger: 0.1, 
  //       duration: 0.6,
  //       delay: 0.2
  //     });
  //   }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-b from-sky-100 to-white">
      {/* Hero Banner */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center kids-header">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold">Kids' Collection</h1>
            <p className="text-xl mt-4">Fun and comfortable styles for kids</p>
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
          {/* {kidsProducts.map((product) => (
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
                <div className="absolute top-4 right-4 bg-sky-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {product.category}
                </div>
              </Link>

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <button onClick={() => toggleWishlist(product)}>
                    <Heart
                      size={22}
                      className={
                        isWishlisted(product.id)
                          ? "fill-sky-600 text-sky-600"
                          : "text-gray-500"
                      }
                    />
                  </button>
                </div>
                <p className="text-slate-600 text-sm mt-2">{product.category}</p>
                <p className="text-2xl font-bold mt-3 text-sky-600">₹{product.price}</p>

                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/product/${product.id}`}
                    className="flex-1 bg-sky-600 text-white px-4 py-2 rounded-full text-sm font-medium text-center hover:bg-sky-700 transition"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 border border-sky-600 text-sky-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-sky-600 hover:text-white transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))} */}
          {kidsProducts.map((product)=>(
            <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onWishlist={toggleWishlist}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
