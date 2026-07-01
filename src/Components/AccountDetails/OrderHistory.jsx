import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const initialOrders = [
  {
    id: "#HA-9821",
    date: "October 14, 2023",
    total: "$4,250.00",
    status: "DELIVERED",
    image:
      "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?w=200",
    items: "Silk Blouse, Tailored Trousers, and 1 other item",
  },
  {
    id: "#HA-9945",
    date: "November 02, 2023",
    total: "$1,890.00",
    status: "IN TRANSIT",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200",
    items: "Aria Sculptural Handbag - Espresso",
  },
  {
    id: "#HA-1002",
    date: "Today",
    total: "$740.00",
    status: "PROCESSING",
    image:
      "https://images.unsplash.com/photo-1520975928316-7b2a6d1b7c45?w=200",
    items: "Cashmere Turtleneck - Camel",
  },
];

export default function OrderHistory() {
  const [orders, setOrders] = useState(initialOrders);

  // ACTIONS
  const handleView = (id) => {
    alert(`Viewing order ${id}`);
  };

  const handleTrack = (id) => {
    alert(`Tracking order ${id}`);
  };

  const handleCancel = (id) => {
    setOrders((prev) =>
      prev.filter((order) => order.id !== id)
    );
  };

  const handleBuyAgain = (id) => {
    alert(`Added items from ${id} to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-h-screen overflow-y-auto no-scrollbar my-10"
    >
      {/* HEADER */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif">
            Order History
          </h1>
          <p className="text-zinc-500 mt-2 max-w-md">
            Review, track, and manage your past and current acquisitions.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-5 py-3 bg-white rounded-full border">
            <Search size={16} className="text-zinc-400" />
            <input
              placeholder="Search orders..."
              className="outline-none text-sm bg-transparent w-[180px]"
            />
          </div>

          <button className="flex items-center gap-2 px-6 py-3 rounded-full border hover:bg-black hover:text-white transition">
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>
      </div>

      {/* ORDERS */}
      <div className="space-y-6">
        {orders.map((order) => (
          <motion.div
            key={order.id}
            whileHover={{ y: -3 }}
            className="bg-white rounded-2xl p-6 border shadow-sm"
          >
            {/* TOP */}
            <div className="flex flex-col md:flex-row justify-between gap-6">

              <div>
                <p className="text-xs uppercase text-zinc-400">
                  Order Number
                </p>
                <h2 className="text-2xl font-serif">{order.id}</h2>
              </div>

              <div>
                <p className="text-xs uppercase text-zinc-400">
                  Order Date
                </p>
                <p>{order.date}</p>
              </div>

              <div>
                <p className="text-xs uppercase text-zinc-400">
                  Total
                </p>
                <p className="font-semibold">{order.total}</p>
              </div>

              <span className="px-4 py-2 rounded-full text-xs bg-gray-200">
                {order.status}
              </span>
            </div>

            <div className="my-6 border-t" />

            {/* BOTTOM */}
            <div className="flex flex-col md:flex-row justify-between gap-6">

              {/* IMAGE + ITEM */}
              <div className="flex items-center gap-4">
                <img
                  src={order.image}
                  alt=""
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <p className="text-sm text-zinc-600 max-w-md">
                  {order.items}
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-wrap gap-3">

                <button
                  onClick={() => handleView(order.id)}
                  className="px-5 py-2 rounded-full bg-black text-white text-sm"
                >
                  View Details
                </button>

                {order.status === "IN TRANSIT" && (
                  <button
                    onClick={() => handleTrack(order.id)}
                    className="px-5 py-2 rounded-full border text-sm"
                  >
                    Track Order
                  </button>
                )}

                {order.status === "PROCESSING" && (
                  <button
                    onClick={() => handleCancel(order.id)}
                    className="px-5 py-2 rounded-full border text-sm"
                  >
                    Cancel Order
                  </button>
                )}

                {order.status === "DELIVERED" && (
                  <button
                    onClick={() => handleBuyAgain(order.id)}
                    className="px-5 py-2 rounded-full border text-sm"
                  >
                    Buy Again
                  </button>
                )}

              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}