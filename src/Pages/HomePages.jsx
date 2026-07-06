// src/pages/HomePage.jsx

import React, { useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useCart } from "../CartContext";
import menCollection from "../assets/mencollection.jpg";
import womenCollection from "../assets/womencollection.jpg";
import kidsCollection from "../assets/kidscollection.jpg";
import mensfit from "../assets/mensfit.jpg";
import womensfit from "../assets/womensfit.jpg";
import kidsfit from "../assets/kidsfit.jpg";
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
import Footer from "../Components/Footer";
import BrandStatement from "../Components/BrandStatement";
export default function HomePage({ isLoaded }) {
    const { addToCart } = useCart();



    useLayoutEffect(() => {
        if (!isLoaded) return;

        const ctx = gsap.context(() => {

            gsap.set(".navbar", {
                opacity: 0,
                y: -60,
            });

            gsap.set(".hero-image", {
                opacity: 0,
                x: -250,
                // scale: 1.2,
                rotate: -2,
            });

            gsap.set(".hero-title", {
                opacity: 0,
                y: 70,
            });

            gsap.set(".hero-subtitle", {
                opacity: 0,
                y: 40,
            });

            gsap.set(".hero-button", {
                opacity: 0,
                y: 25,
            });

            // ✅ ONE timeline only
            const tl = gsap.timeline();

            tl.to(".navbar", {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power4.out",
            })

                .to(".hero-image", {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    rotate: 0,
                    duration: 1.8,
                    ease: "expo.out",
                }, "-=0.2")

                .to(".hero-title", {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                }, "-=1")

                .to(".hero-subtitle", {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                }, "-=0.7")

                .to(".hero-button", {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    duration: 0.6,
                    ease: "power3.out",
                }, "-=0.5");

        });

        return () => ctx.revert();

    }, [isLoaded]);

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
            {/* BRAND STATEMENT */}
             <BrandStatement />
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
               <div className="text-center mb-14">
                 <p className="uppercase tracking-[6px] text-sm text-gray-500">
                     DISCOVER
                  </p>

                 <h2 className="text-5xl font-serif mt-3">
                     Shop By Category
                 </h2>

                 <p className="text-gray-500 mt-4">
                        Curated collections crafted for every style.
                 </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

  {/* MEN */}
  <Link
    to="/men"
    className="relative lg:col-span-2 h-[520px] overflow-hidden rounded-3xl group cursor-pointer"
  >
    <img
      src={menCollection}
      alt="Men"
      className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500" />

    <div className="absolute bottom-8 left-8 z-10 text-white">
      <p className="uppercase tracking-[4px] text-xs mb-2">
        Collection
      </p>

      <h3 className="text-4xl font-serif">
        Men
      </h3>

      <p className="mt-3 tracking-[3px] text-sm">
        SHOP NOW →
      </p>
    </div>
  </Link>

  {/* WOMEN + KIDS */}
  <div className="flex flex-col gap-5">

    <Link
      to="/women"
      className="relative h-[248px] overflow-hidden rounded-3xl group cursor-pointer"
    >
      <img
        src={womenCollection}
        alt="Women"
        className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500" />

      <div className="absolute bottom-8 left-8 z-10 text-white">
        <p className="uppercase tracking-[4px] text-xs mb-2">
          Collection
        </p>

        <h3 className="text-3xl font-serif">
          Women
        </h3>

        <p className="mt-3 tracking-[3px] text-sm">
          SHOP NOW →
        </p>
      </div>
    </Link>

    <Link
      to="/kids"
      className="relative h-[248px] overflow-hidden rounded-3xl group cursor-pointer"
    >
      <img
        src={kidsCollection}
        alt="Kids"
        className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500" />

      <div className="absolute bottom-8 left-8 z-10 text-white">
        <p className="uppercase tracking-[4px] text-xs mb-2">
          Collection
        </p>

        <h3 className="text-3xl font-serif">
          Kids
        </h3>

        <p className="mt-3 tracking-[3px] text-sm">
          SHOP NOW →
        </p>
      </div>
    </Link>

  </div>

  {/* ACCESSORIES */}
  <Link
    to="/new-arrivals"
    className="relative lg:col-span-3 h-[260px] overflow-hidden rounded-3xl group cursor-pointer"
  >
    <img
      src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800\\"
      alt="Accessories"
      className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500" />

    <div className="absolute bottom-8 left-8 z-10 text-white">
      <p className="uppercase tracking-[4px] text-xs mb-2">
        Collection
      </p>

      <h3 className="text-4xl font-serif">
        Accessories
      </h3>

      <p className="mt-3 tracking-[3px] text-sm">
        SHOP NOW →
      </p>
    </div>
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

                            <p className="text-slate-700 mt-2 font-semibold">₹{item.price}</p>

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
                        x: -80, opacity: 0,
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
            {/* FEATURED COLLECTIONS */}
<section className="max-w-7xl mx-auto px-6 py-28">

  {/* Heading */}
  <div className="text-center mb-20">
    <p className="uppercase tracking-[6px] text-sm text-gray-500">
      FEATURED COLLECTIONS
    </p>

    <h2 className="text-5xl md:text-6xl font-serif mt-4">
      Curated For Every Style
    </h2>

    <p className="text-gray-500 mt-5 max-w-2xl mx-auto leading-7">
      Discover timeless collections inspired by effortless luxury and
      contemporary elegance.
    </p>
  </div>

  {/* Collection 1 */}
  <Link
    to="/men"
    className="group grid lg:grid-cols-2 gap-12 items-center mb-28"
  >
    <div className="overflow-hidden rounded-3xl">
      <img
        src={mensfit}
        alt="Menswear"
        className="w-full h-[650px] object-cover transition duration-700 group-hover:scale-105"
      />
    </div>

    <div className="lg:px-10">

      <span className="uppercase tracking-[5px] text-xs border border-black px-4 py-2 rounded-full">
        Summer Edit
      </span>

      <h2 className="font-serif text-6xl mt-8">
        Menswear
      </h2>

      <p className="text-gray-600 mt-6 leading-8 max-w-lg">
        Discover refined tailoring, premium fabrics and versatile pieces
        designed for modern everyday luxury.
      </p>

      <button className="mt-10 border border-black px-8 py-4 uppercase tracking-[4px] hover:bg-black hover:text-white transition">
        Discover →
      </button>

    </div>
  </Link>

  {/* Collection 2 */}
  <Link
    to="/women"
    className="group grid lg:grid-cols-2 gap-12 items-center mb-28"
  >

    <div className="order-2 lg:order-1 lg:px-10">

      <span className="uppercase tracking-[5px] text-xs border border-black px-4 py-2 rounded-full">
        Timeless Elegance
      </span>

      <h2 className="font-serif text-6xl mt-8">
        Womenswear
      </h2>

      <p className="text-gray-600 mt-6 leading-8 max-w-lg">
        Elegant silhouettes crafted for confidence, sophistication and
        effortless style from day to evening.
      </p>

      <button className="mt-10 border border-black px-8 py-4 uppercase tracking-[4px] hover:bg-black hover:text-white transition">
        Discover →
      </button>

    </div>

    <div className="order-1 lg:order-2 overflow-hidden rounded-3xl">
      <img
        src={womensfit}
        alt="Womenswear"
        className="w-full h-[650px] object-cover transition duration-700 group-hover:scale-105"
      />
    </div>

  </Link>

  {/* Collection 3 */}
  <Link
    to="/kids"
    className="group grid lg:grid-cols-2 gap-12 items-center"
  >

    <div className="overflow-hidden rounded-3xl">
      <img
        src={kidsfit}
        alt="Kids Wear"
        className="w-full h-[650px] object-cover transition duration-700 group-hover:scale-105"
      />
    </div>

    <div className="lg:px-10">

      <span className="uppercase tracking-[5px] text-xs border border-black px-4 py-2 rounded-full">
        Little Icons
      </span>

      <h2 className="font-serif text-6xl mt-8">
        Kids Wear
      </h2>

      <p className="text-gray-600 mt-6 leading-8 max-w-lg">
        Comfortable everyday essentials made for movement, adventure and
        joyful moments.
      </p>

      <button className="mt-10 border border-black px-8 py-4 uppercase tracking-[4px] hover:bg-black hover:text-white transition">
        Discover →
      </button>

    </div>

  </Link>

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
            <Footer />
        </div >
    );
}