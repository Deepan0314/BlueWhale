import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const sampleProducts = [
    { id: 1, name: "Ocean Blue Polo", price: "$89", image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800" },
    { id: 2, name: "Summer Linen Blouse", price: "$125", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800" },
    { id: 3, name: "Minimal Leather Court", price: "$210", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800" },
    { id: 4, name: "Nomad Silver Watch", price: "$345", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800" },
];

export default function ProductsPage() {
    return (
        < motion.div
            initial={{
                opacity: 0,
                scale: 0.9,
            }
            }
            whileInView={{
                opacity: 1,
                scale: 1,
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
                duration: 0.8,
                ease: "easeOut",
            }}
            className="relative h-full max-w-7xl mx-auto px-6 py-16" >
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Shop All</h1>
                <input placeholder="Search products" className="border rounded-full px-4 py-2" />
            </div>

            <div className="grid md:grid-cols-4 gap-8">
                {sampleProducts.map((p) => (
                    <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow">
                        <Link to={`/product/${p.id}`}>
                            <img src={p.image} alt="" className="h-64 w-full object-cover" />
                        </Link>

                        <div className="p-4">
                            <h3 className="font-semibold">{p.name}</h3>
                            <p className="text-slate-600 mt-2">{p.price}</p>
                            <div className="mt-4 flex gap-2">
                                <Link to={`/product/${p.id}`} className="bg-[#0d2746] text-white px-4 py-2 rounded-full text-sm">View</Link>
                                <button className="border px-4 py-2 rounded-full text-sm">Add to cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div >
    );
}
