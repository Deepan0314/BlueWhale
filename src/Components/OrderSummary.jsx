import { motion, AnimatePresence } from "framer-motion";
import {
    Tag,
    Truck,
    ShieldCheck,
    ArrowRight,
    CheckCircle2,
} from "lucide-react";
import { useCart } from "../CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const products = [
    {
        id: 1,
        name: "Leather Handbag",
        qty: 1,
        price: 2499,
        image:
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
    },
    {
        id: 2,
        name: "Classic Watch",
        qty: 1,
        price: 5499,
        image:
            "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500",
    },
];

export default function OrderSummary() {
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate=useNavigate();

    const {
        cart,
        removeFromCart,
        updateQuantity,
    } = useCart();
    console.log(cart);
    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    const shipping = 0;
    const tax = subtotal * 0.05;
    const total = subtotal + shipping + tax;
    const handlePlaceOrder = () => {
        if (cart.length === 0) return;

        setShowSuccess(true);

        // Optional
        // clearCart();

        setTimeout(() => {
            setShowSuccess(false);
            navigate("/");

            // navigate("/orders");
        }, 3000);
        
        
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .6 }}
            className="bg-white rounded-3xl shadow-lg p-8 sticky top-24 w-[350px]"
        >
            {/* Heading */}

            <h2 className="text-4xl font-serif font-bold mb-8">
                Order Summary
            </h2>

            {/* Products */}

            <div className="space-y-5">

                {cart.map((item) => (

                    <div
                        key={item.id}
                        className="flex gap-4 items-center"
                    >

                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 rounded-2xl object-cover"
                        />

                        <div className="flex-1">

                            <h3 className="font-semibold">
                                {item.name}
                            </h3>

                            <p className="text-gray-500 text-sm">
                                Qty : {item.qty}
                            </p>

                        </div>

                        <span className="font-semibold">
                            ₹{item.price}
                        </span>

                    </div>

                ))}

            </div>

            {/* Promo */}

            <div className="mt-8">

                <label className="font-medium mb-2 flex items-center gap-2">
                    <Tag size={18} />

                    Promo Code
                </label>

                <div className="flex mt-3">

                    <input
                        placeholder="Enter Code"
                        className="flex-1 border rounded-l-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0d2746]"
                    />

                    <button
                        className="bg-[#0d2746] text-white px-6 rounded-r-2xl hover:bg-black duration-300"
                    >
                        Apply
                    </button>

                </div>

            </div>

            {/* Price */}

            <div className="mt-8 space-y-4">

                <div className="flex justify-between">
                    <span className="text-gray-500">
                        Subtotal
                    </span>

                    <span>
                        ₹{subtotal.toFixed(2)}
                    </span>
                </div>

                <div className="flex justify-between">

                    <span className="flex items-center gap-2 text-gray-500">

                        <Truck size={18} />

                        Shipping

                    </span>

                    <span className="text-green-600">
                        FREE
                    </span>

                </div>

                <div className="flex justify-between">

                    <span>
                        Tax
                    </span>

                    <span>
                        ₹{tax.toFixed(2)}
                    </span>

                </div>

            </div>

            <hr className="my-6" />

            {/* Total */}

            <div className="flex justify-between items-center">

                <span className="text-2xl font-semibold">
                    Total
                </span>

                <span className="text-3xl font-bold">
                    ₹{total.toFixed(2)}
                </span>

            </div>

            {/* Secure */}

            <div className="bg-green-50 rounded-2xl p-4 flex gap-3 mt-8">

                <ShieldCheck
                    className="text-green-600"
                    size={24}
                />

                <div>

                    <h4 className="font-semibold">
                        Secure Checkout
                    </h4>

                    <p className="text-sm text-gray-500">
                        SSL encrypted payment
                    </p>

                </div>

            </div>

            {/* Button */}

            <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePlaceOrder}
                disabled={cart.length === 0}
                className={`mt-8 w-full rounded-full py-4
    flex justify-center items-center gap-3 text-lg font-medium transition-all
    ${cart.length === 0
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-[#0d2746] hover:bg-black text-white"
                    }`}
            >
                Place Order
                <ArrowRight size={20} />
            </motion.button>
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                            }}
                            exit={{
                                scale: 0.8,
                                opacity: 0,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 180,
                                damping: 15,
                            }}
                            className="bg-white rounded-3xl p-10 w-[420px] text-center shadow-2xl"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{
                                    scale: [0, 1.2, 1],
                                    rotate: [0, 15, -15, 0],
                                }}
                                transition={{ duration: 0.7 }}
                                className="mx-auto mb-6"
                            >
                                <CheckCircle2
                                    size={90}
                                    className="text-green-600 fill-green-600 text-white"
                                />
                            </motion.div>

                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl font-bold"
                            >
                                Order Placed!
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-gray-500 mt-3"
                            >
                                Thank you for shopping with us.
                                <br />
                                Your order has been placed successfully.
                            </motion.p>

                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 3, ease: "linear" }}
                                className="h-1 bg-green-500 rounded-full mt-8"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    );
}