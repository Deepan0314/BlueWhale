// src/pages/HomePage.jsx

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useCart } from "../CartContext";
import {
    Search,
    Heart,
    ShoppingBag,
    User,
    ArrowRight,
    Award,
    Truck,
    ShieldCheck,
    RotateCcw,
    Headphones,
    Star,
    Factory,
    Camera,
    Bird,
} from "lucide-react";
import herofashion from '../assets/herofashion.jpg'
import HeroSection from "../Components/HeroSection";

export default function HomePage() {
    const { addToCart } = useCart();

    useEffect(() => {
        // Animate hero content
        gsap.from(".hero-content", { opacity: 0, y: 40, duration: 0.8 });

        // Animate category cards
        // gsap.from(".category-card", {
        //   opacity: 0,
        //   y: 20,
        //   stagger: 0.1,
        //   duration: 0.6,
        //   delay: 0.3
        // });

        // Animate product cards
        // gsap.from(".home-product-card", {
        //   opacity: 0,
        //   y: 30,
        //   stagger: 0.12,
        //   duration: 0.6,
        //   delay: 0.5
        // });

        // Animate feature cards
        // gsap.from(".feature-card", {
        //   opacity: 0,
        //   scale: 0.9,
        //   stagger: 0.08,
        //   duration: 0.5,
        //   delay: 0.4
        // });
    }, []);

    const handleAddToCart = (product) => {
        const cartProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
        };
        addToCart(cartProduct);
    };
    const categories = [
        {
            title: "Men",
            image:
                "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800",
        },
        {
            title: "Women",
            image:
                "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800",
        },
        {
            title: "Kids",
            image:
                "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=800",
        },
        {
            title: "Accessories",
            image:
                "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800",
        },
    ];

    const products = [
        {
            id: 1,
            name: "Ocean Blue Polo",
            category: "Menswear",
            price: 89,
            image:
                "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800",
        },
        {
            id: 10,
            name: "Summer Linen Blouse",
            category: "Womenswear",
            price: 125,
            image:
                "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800",
        },
        {
            id: 3,
            name: "Minimal Leather Court",
            category: "Footwear",
            price: 210,
            image:
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
        },
        {
            id: 4,
            name: "Nomad Silver Watch",
            category: "Accessories",
            price: 345,
            image:
                "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800",
        },
    ];

    const features = [
        {
            icon: Award,
            title: "Quality First",
            desc: "Hand-picked premium fabrics and materials.",
        },
        {
            icon: Truck,
            title: "Fast Delivery",
            desc: "Global express shipping to your doorstep.",
        },
        {
            icon: ShieldCheck,
            title: "Secure Payment",
            desc: "Encrypted checkout and payment security.",
        },
        {
            icon: RotateCcw,
            title: "Easy Returns",
            desc: "Hassle-free returns within 30 days.",
        },
        {
            icon: Headphones,
            title: "24/7 Support",
            desc: "Dedicated support whenever you need.",
        },
    ];

    const testimonials = [
        {
            name: "Alexandra Reed",
            text: "The quality exceeded my expectations. Every detail feels premium.",
        },
        {
            name: "James Morrison",
            text: "Elegant designs and incredibly fast delivery.",
        },
        {
            name: "Elena Petrova",
            text: "A luxury shopping experience from start to finish.",
        },
    ];

    return (
        <div className="bg-[#f8f7f5] min-h-screen">
            {/* Navbar replaced by shared Layout/Navbar */}

            {/* HERO */}
            <div className="w-full h-fit">
                <HeroSection />
            </div>
            {/* CATEGORIES */}
            <motion.section

                initial={{
                    opacity: 0,
                    scale: 0.9,
                }}
                whileInView={{
                    opacity: 1,
                    scale: [0.9, 1.05, 1],
                }}
                viewport={{ once: true }}
                transition={{
                    duration: 1,
                    ease: "easeOut",
                }}
                className="relative h-full max-w-7xl mx-auto px-6 py-20"
            >
                <h3 className="text-3xl font-bold mb-8">Shop by Category</h3>
                <div className="grid md:grid-cols-4 gap-6">
                    <Link to="/men" className="category-card relative block w-full overflow-hidden rounded-3xl h-72 group cursor-pointer bg-gray-300">
                        <img
                            src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800"
                            alt="Men"
                            className="w-full h-full object-cover display-block transition duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition" />
                        <h3 className="absolute bottom-6 left-6 text-white text-xl font-semibold z-10">Men</h3>
                    </Link>

                    <Link to="/women" className="category-card relative block w-full overflow-hidden rounded-3xl h-72 group cursor-pointer bg-gray-300">
                        <img
                            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800"
                            alt="Women"
                            className="w-full h-full object-cover display-block transition duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition" />
                        <h3 className="absolute bottom-6 left-6 text-white text-xl font-semibold z-10">Women</h3>
                    </Link>

                    <Link to="/kids" className="category-card relative block w-full overflow-hidden rounded-3xl h-72 group cursor-pointer bg-gray-300">
                        <img
                            src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=800"
                            alt="Kids"
                            className="w-full h-full object-cover display-block transition duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition" />
                        <h3 className="absolute bottom-6 left-6 text-white text-xl font-semibold z-10">Kids</h3>
                    </Link>

                    <Link to="/new-arrivals" className="category-card relative block w-full overflow-hidden rounded-3xl h-72 group cursor-pointer bg-gray-300">
                        <img
                            src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800"
                            alt="New Arrivals"
                            className="w-full h-full object-cover display-block transition duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition" />
                        <h3 className="absolute bottom-6 left-6 text-white text-xl font-semibold z-10">New Arrivals</h3>
                    </Link>
                </div>
            </motion.section>

            {/* NEW ARRIVALS */}
            <motion.section
                initial={{
                    opacity: 0,
                    scale: 0.9,
                }}
                whileInView={{
                    opacity: 1,
                    scale: 1,
                }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                    duration: 0.8,
                    ease: "easeOut",
                }}
                className="relative h-full max-w-7xl mx-auto px-6 py-10">
                <div className="flex justify-between mb-10">
                    <div>
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs">
                            New Season
                        </span>

                        <h2 className="text-4xl font-bold mt-4">New Arrivals</h2>
                    </div>

                    <Link to="/new-arrivals" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition">
                        View All <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    {products.map((item) => (
                        <motion.div
                            whileHover={{ y: -10 }}
                            key={item.name}
                            className="home-product-card group"
                        >
                            <Link to={`/product/${item.id}`} className="block overflow-hidden rounded-3xl">
                                <img
                                    src={item.image}
                                    alt=""
                                    className="h-80 w-full object-cover group-hover:scale-110 transition duration-500"
                                />
                            </Link>

                            <p className="uppercase text-xs text-slate-500 mt-4">
                                {item.category}
                            </p>

                            <h3 className="font-semibold mt-1">{item.name}</h3>

                            <p className="text-slate-700 mt-2 font-semibold">${item.price}</p>

                            <div className="mt-4 flex gap-2">
                                <Link to={`/product/${item.id}`} className="flex-1 bg-[#0d2746] text-white px-4 py-2 rounded-full text-sm text-center hover:bg-[#0a1f34] transition">
                                    View Details
                                </Link>
                                <button
                                    onClick={() => handleAddToCart(item)}
                                    className="flex-1 border border-[#0d2746] text-[#0d2746] px-4 py-2 rounded-full text-sm hover:bg-[#0d2746] hover:text-white transition"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* DENIM BANNER */}
            <section className="py-24 bg-[#0d2746] text-white">
                <motion.div
                 initial={{
    x: -80,    opacity: 0,
    scale: 0.9,
  }}
  whileInView={{
    x: 0,
    opacity: 1,
  
  }}
  viewport={{ once: true }}
  transition={{
    duration: 1,
    ease: "easeOut",
  }}
  className="relative h-full max-w-6xl mx-auto px-6 text-center">
                    <p className="uppercase tracking-[6px] text-sm text-slate-300">
                        Crafted For Excellence
                    </p>

                    <h2 className="text-5xl md:text-6xl font-light mt-6">
                        Luxury Meets
                        <br />
                        Everyday Wear
                    </h2>

                    <p className="max-w-2xl mx-auto mt-6 text-slate-300">
                        Designed with premium fabrics and timeless silhouettes,
                        our collections redefine modern elegance.
                    </p>
                </motion.div>
            </section>

            {/* FEATURES */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-14">
                    <h2 className="text-4xl font-bold">
                        The BlueWhale Standard
                    </h2>

                    <p className="text-slate-500 mt-4">
                        Committed to delivering an unparalleled luxury shopping experience.
                    </p>
                </div>

                <div className="grid md:grid-cols-5 gap-6">
                    {features.map((item) => {
                        const Icon = item.icon;

                        return (
                            <motion.div
                                whileHover={{ y: -10 }}
                                key={item.title}
                                className="feature-card bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition"
                            >
                                <Icon className="mx-auto text-[#0d2746] w-8 h-8" />

                                <h3 className="font-semibold mt-4">
                                    {item.title}
                                </h3>

                                <p className="text-sm text-slate-500 mt-2">
                                    {item.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </section>
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="text-center mb-14">
                    <span className="uppercase tracking-[5px] text-sm text-slate-500">
                        Featured Collections
                    </span>

                    <h2 className="text-5xl font-light mt-4">
                        Curated For Every Style
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <Link
                        to="/men"
                        className="relative h-[500px] rounded-3xl overflow-hidden group"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                        />
                        <div className="absolute inset-0 bg-black/30" />
                        <h3 className="absolute bottom-8 left-8 text-white text-3xl">
                            Menswear
                        </h3>
                    </Link>

                    <Link
                        to="/women"
                        className="relative h-[500px] rounded-3xl overflow-hidden group"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c"
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                        />
                        <div className="absolute inset-0 bg-black/30" />
                        <h3 className="absolute bottom-8 left-8 text-white text-3xl">
                            Womenswear
                        </h3>
                    </Link>

                    <Link
                        to="/accessories"
                        className="relative h-[500px] rounded-3xl overflow-hidden group"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49"
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                        />
                        <div className="absolute inset-0 bg-black/30" />
                        <h3 className="absolute bottom-8 left-8 text-white text-3xl">
                            Accessories
                        </h3>
                    </Link>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <h2 className="text-center text-4xl font-bold mb-12">
                    Customer Voices
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item) => (
                        <motion.div
                            whileHover={{ y: -10 }}
                            key={item.name}
                            className="bg-white rounded-3xl p-8"
                        >
                            <div className="flex gap-1 text-yellow-500 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star size={16} fill="currentColor" key={i} />
                                ))}
                            </div>

                            <p className="text-slate-600">
                                "{item.text}"
                            </p>

                            <h4 className="font-semibold mt-6">
                                {item.name}
                            </h4>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* NEWSLETTER */}
            <section className="max-w-5xl mx-auto px-6 pb-20">
                <div className="bg-[#0d2746] rounded-3xl p-16 text-center text-white">
                    <h2 className="text-3xl font-bold">
                        Join the Inner Circle
                    </h2>

                    <p className="text-slate-300 mt-3">
                        Subscribe for exclusive access to new collections and offers.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 mt-8 justify-center">
                        <input
                            placeholder="Your email address"
                            className="bg-white text-black rounded-full px-6 py-4 md:w-[400px]"
                        />

                        <button className="bg-amber-500 px-8 py-4 rounded-full font-medium">
                            SUBSCRIBE NOW
                        </button>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t bg-white">
                <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
                    <div>
                        <h3 className="font-bold text-xl mb-4">BlueWhale</h3>

                        <p className="text-slate-500 text-sm">
                            Crafting timeless elegance for the modern lifestyle.
                        </p>

                        <div className="flex gap-3 mt-5">
                            <Factory size={18} />
                            <Camera size={18} />
                            <Bird size={18} />
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Shop</h4>
                        <div className="space-y-2 text-slate-500">
                            <p>New Arrivals</p>
                            <p>Best Sellers</p>
                            <p>Men Collection</p>
                            <p>Women Collection</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Customer Care</h4>
                        <div className="space-y-2 text-slate-500">
                            <p>Shipping</p>
                            <p>Returns</p>
                            <p>Privacy Policy</p>
                            <p>Contact</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Our Brand</h4>
                        <div className="space-y-2 text-slate-500">
                            <p>Story</p>
                            <p>Sustainability</p>
                            <p>Press</p>
                            <p>Store Locator</p>
                        </div>
                    </div>
                </div>

                <div className="text-center border-t py-6 text-slate-500 text-sm">
                    © 2026 BlueWhale Collection. All rights reserved.
                </div>
            </footer>
        </div >
    );
}