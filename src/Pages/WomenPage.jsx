import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useCart } from "../CartContext";

const womenProducts = [
    {
        id: 10,
        name: "Summer Linen Blouse",
        price: 125,
        image:
            "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
        category: "Tops",
    },
    {
        id: 11,
        name: "Elegant Maxi Dress",
        price: 180,
        image:
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
        category: "Dresses",
    },
    {
        id: 12,
        name: "Silk Camisole",
        price: 95,
        image:
            "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
        category: "Tops",
    },
    {
        id: 13,
        name: "High-waist Jeans",
        price: 140,
        image:
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
        category: "Bottoms",
    },
    {
        id: 14,
        name: "Cashmere Cardigan",
        price: 320,
        image:
            "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80",
        category: "Outerwear",
    },
    {
        id: 15,
        name: "Minimal Strappy Heel",
        price: 165,
        image:
            "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
        category: "Shoes",
    },
];
export default function WomenPage() {
    const { addToCart } = useCart();

    /* useEffect(() => {
         gsap.from(".women-header", { opacity: 0, y: -30, duration: 0.8 });
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
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
            {/* Hero Banner */}
            <div
                className="relative h-96 bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200')",
                }}
            >
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center women-header">
                    <div className="text-center text-white">
                        <h1 className="text-5xl font-bold">Women's Collection</h1>
                        <p className="text-xl mt-4">Elegance and sophistication</p>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">Featured Items</h2>
                    <Link to="/products" className="text-pink-600 hover:underline">View all</Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {womenProducts.map((product) => (
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
                                <div className="absolute top-4 right-4 bg-pink-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                                    {product.category}
                                </div>
                            </Link>

                            <div className="p-4">
                                <h3 className="font-semibold text-lg">{product.name}</h3>
                                <p className="text-slate-600 text-sm mt-2">{product.category}</p>
                                <p className="text-2xl font-bold mt-3 text-pink-600">${product.price}</p>

                                <div className="mt-4 flex gap-2">
                                    <Link
                                        to={`/product/${product.id}`}
                                        className="flex-1 bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium text-center hover:bg-pink-700 transition"
                                    >
                                        View Details
                                    </Link>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="flex-1 border border-pink-600 text-pink-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-pink-600 hover:text-white transition"
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
