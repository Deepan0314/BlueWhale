import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useCart } from "../CartContext";
import { Heart, Star } from "lucide-react";
import ProductCard from "../Components/ProductCard";
import { useWishlist } from "../Context/WhislistContext";
import { productData } from "../Components/Data/ProductData"

const sampleProducts = [
    {
        id: 1,
        name: "Ocean Blue Polo T-Shirt",
        price: 899,
        category: "BOYS",
        subCategory: "Trousers",
        image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800",
    },
    {
        id: 2,
        name: "Slim Fit Cotton Shirt",
        price: 1299,
        category: "Men",
        subCategory: "shirts",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800",
    },
    {
        id: 3,
        name: "Casual Denim Jacket",
        price: 2499,
        category: "Men",
        subCategory: "jackets",
        image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800",
    },
    {
        id: 4,
        name: "Summer Linen Blouse",
        price: 1499,
        category: "Women",
        subCategory: "Top",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800",
    },
    {
        id: 5,
        name: "Floral Maxi Dress",
        price: 2299,
        category: "Women",
        subCategory: "Modern Dress",
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800",
    },
    {
        id: 6,
        name: "High-Waist Jeans",
        price: 1799,
        category: "Women",
        subCategory: "Jeans",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800",
    },
    {
        id: 7,
        name: "Kids Printed T-Shirt",
        price: 699,
        category: "Kids",
        subCategory: "TShirts",
        image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800",
    },
    {
        id: 8,
        name: "Kids Cotton Hoodie",
        price: 999,
        category: "Kids",
        subCategory: "Hoodies",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
    },
];

export default function ProductsPage() {
    const location = useLocation();
    const [search, setSearch] = useState("");
    const products = Object.values(productData);
    console.log(productData);
    const queryParams = new URLSearchParams(location.search);
    const categoryFilter = queryParams.get("category") || "";
    const searchFilter = queryParams.get("search") || "";


    const { addToCart } = useCart();

    const [size, setSize] = useState("M");
    const [color, setColor] = useState("#000");

    const colors = ["#000", "#C49A6C", "#6B7280"];
    const sizes = ["S", "M", "L", "XL"];
    console.log(products);

    const filteredProducts = products.filter((product) => {
        const searchTerm = search || searchFilter;

        const matchesSearch =
            !searchTerm ||
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.subCategory.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
            !categoryFilter ||
            product.category.toLowerCase().includes(categoryFilter.toLowerCase());


        return matchesSearch && matchesCategory;
    });

    const handleCart = (product) => {
        addToCart(product);
    };
    const { toggleWishlist } = useWishlist();


    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative h-full max-w-7xl   "
        >

            {/* 🔥 TOP BANNER ADDED (ONLY NEW SECTION) */}
            <div className="relative mb-10 overflow-hidden  bg-white border-b border-black  shadow-xl">
                <div className="grid md:grid-cols-2 min-h-[420px]">

                    {/* Left Content */}
                    <div className="absolute bottom-0 left-0 flex flex-col col-span-2 justify-center p-8 md:p-14">
                        <h2 className="font-black uppercase leading-[0.9] tracking-[-0.05em] text-red-600">
                            <span className="block text-5xl md:text-7xl">
                                UP TO 50% OFF
                            </span>

                            <span className="block mt-4 text-5xl md:text-7xl">
                                NEW STYLES ADDED
                            </span>
                        </h2>

                        
                    </div>

                   
                </div>
            </div>
            {/* 🔥 END BANNER */}

            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Shop All</h1>
                {/* <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded-full px-4 py-2 w-72 outline-none focus:ring-2 focus:ring-[#0d2746]"
                /> */}
            </div>

            <div className="grid md:grid-cols-4 gap-8">
                {filteredProducts.length > 0 ? (

                    filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={handleCart}
                            onWishlist={toggleWishlist}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-16">
                        <h2 className="text-2xl font-semibold text-gray-600">
                            No products found
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Try searching with a different keyword.
                        </p>
                    </div>
                )}
            </div>
        </motion.div >
    );
}