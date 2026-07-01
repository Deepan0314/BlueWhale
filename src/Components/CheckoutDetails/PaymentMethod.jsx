import { useState } from "react";
import { motion } from "framer-motion";
import {
    CheckCircle2,
    ChevronDown,
    CreditCard,
    Wallet,
    Smartphone,
    Landmark,
} from "lucide-react";
import { CardDetails, UpiDetails } from "./CreditCardDetails";

const methods = [
    {
        id: "card",
        title: "Credit / Debit Card",
        desc: "Visa, Mastercard, RuPay",
        icon: CreditCard,
    },
    {
        id: "upi",
        title: "Google Pay / UPI",
        desc: "Pay using any UPI App",
        icon: Smartphone,
    },
    {
        id: "paypal",
        title: "PayPal",
        desc: "Pay using your PayPal account",
        icon: Wallet,
    },
    {
        id: "netbanking",
        title: "Net Banking",
        desc: "All major banks supported",
        icon: Landmark,
    },
];

export default function PaymentMethod() {
    const [selected, setSelected] = useState("card");
    const [show, setShow] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="border-b border-gray-200 p-8"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-semibold"> Payment Method</h2>

                    <CheckCircle2
                        size={26}
                        className="text-green-600 fill-green-600"
                    />
                </div>

                <button onClick={() => setShow(!show)}>
                    <ChevronDown
                        size={24}
                        className={`transition-transform duration-300 cursor-pointer ${
                            show ? "rotate-180" : ""
                        }`}
                    />
                </button>
            </div>

            {/* Payment Options */}
            {show && (
                <>
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.4 }}
                        className="grid md:grid-cols-2 gap-5 mt-8"
                    >
                        {methods.map((item) => {
                            const Icon = item.icon;

                            return (
                                <motion.button
                                    key={item.id}
                                    whileHover={{ y: -4 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelected(item.id)}
                                    className={`p-5 rounded-3xl border-2 transition-all w-fit h-[150px] text-left
                                        ${
                                            selected === item.id
                                                ? "border-[#0d2746] bg-blue-50"
                                                : "border-gray-200 hover:border-[#0d2746]"
                                        }`}
                                >
                                    <div className="flex justify-between">
                                        <div className="flex gap-4">
                                            <div
                                                className={`w-12 h-9 rounded-2xl flex items-center justify-center
                                                    ${
                                                        selected === item.id
                                                            ? "bg-[#0d2746] text-white"
                                                            : "bg-gray-100"
                                                    }`}
                                            >
                                                <Icon size={20} />
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-semibold">
                                                    {item.title}
                                                </h3>
                                                <p className="text-gray-500 mt-1 text-sm">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>

                                        <div
                                            className={`w-6 h-5 rounded-full border-2 flex items-center justify-center
                                                ${
                                                    selected === item.id
                                                        ? "border-[#0d2746]"
                                                        : "border-gray-300"
                                                }`}
                                        >
                                            {selected === item.id && (
                                                <div className="w-3 h-3 rounded-full bg-[#0d2746]" />
                                            )}
                                        </div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </motion.div>

                    {/* Conditional Payment Forms */}
                    {selected === "card" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="mt-8"
                        >
                            <CardDetails />
                        </motion.div>
                    )}

                    {selected === "upi" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="mt-8"
                        >
                            <UpiDetails />
                        </motion.div>
                    )}
                </>
            )}
        </motion.div>
    );
}