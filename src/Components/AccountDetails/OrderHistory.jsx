import { useState } from "react";
import orders from "../Data/orders";
import OrderCard from "../orders/OrderCard";

export default function OrderHistory() {

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredOrders = orders
    .filter((order) => {

      const matchSearch =
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(search.toLowerCase());

      const matchFilter =
        filter === "All" || order.status === filter;

      return matchSearch && matchFilter;
    });

  return (

    <div className="min-h-screen bg-[#fafafa] pt-28 pb-20">

      <div className="max-w-7xl mx-auto px-8">

        <h1 className="text-5xl font-light mb-10">
          My Orders
        </h1>

        {/* SEARCH + FILTER */}
        <div className="flex justify-between items-center mb-8">

          <input
            type="text"
            placeholder="Search all orders"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[420px] border rounded-lg px-5 py-3 outline-none"
          />

          <div className="flex gap-3">

            <button
              onClick={() => setFilter("All")}
              className={`px-5 py-2 rounded-full ${
                filter === "All"
                  ? "bg-black text-white"
                  : "border"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("Delivered")}
              className={`px-5 py-2 rounded-full ${
                filter === "Delivered"
                  ? "bg-black text-white"
                  : "border"
              }`}
            >
              Delivered
            </button>

            <button
              onClick={() => setFilter("Processing")}
              className={`px-5 py-2 rounded-full ${
                filter === "Processing"
                  ? "bg-black text-white"
                  : "border"
              }`}
            >
              Processing
            </button>

            <button
              onClick={() => setFilter("Cancelled")}
              className={`px-5 py-2 rounded-full ${
                filter === "Cancelled"
                  ? "bg-black text-white"
                  : "border"
              }`}
            >
              Cancelled
            </button>

          </div>

        </div>

        {/* ORDERS */}
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <p className="text-gray-500 text-center mt-10">
            No orders found
          </p>
        )}

      </div>

    </div>

  );
}