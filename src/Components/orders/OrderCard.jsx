import { useRef } from "react";
import TrackingTimeline from "./TrackingTimeline";

export default function OrderCard({ order }) {
  const timelineRef = useRef(null);

  if (!order || !order.items) return null;

  return (
    <div className="bg-white rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden mb-8">

      {/* HEADER */}
      <div className="bg-gray-50 border-b px-8 py-5 flex justify-between items-center">

        <div className="grid grid-cols-4 gap-14">

          <div>
            <p className="text-xs uppercase text-gray-500">Order Placed</p>
            <p className="font-semibold mt-1">{order.date}</p>
          </div>

          <div>
            <p className="text-xs uppercase text-gray-500">Total</p>
            <p className="font-semibold mt-1">₹{order.total}</p>
          </div>

          <div>
            <p className="text-xs uppercase text-gray-500">Status</p>

            <span
              className={`inline-flex mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : order.status === "Processing"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {order.status}
            </span>

          </div>

          <div>
            <p className="text-xs uppercase text-gray-500">Order ID</p>
            <p className="font-semibold mt-1">{order.id}</p>
          </div>

        </div>
      </div>

      {/* PRODUCTS */}
      {order.items.map((item) => (
        <div
          key={item.id || item.name}
          className="flex justify-between items-center px-8 py-8 border-b"
        >

          {/* LEFT */}
          <div className="flex gap-6">

            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-36 rounded-xl border object-cover"
            />

            <div>

              <h2 className="text-xl font-semibold">{item.name}</h2>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-yellow-500 text-lg">★★★★★</span>
                <span className="text-gray-500 text-sm">4.8 (286 Reviews)</span>
              </div>

              <p className="mt-4 text-gray-600">
                <strong>Color:</strong> {item.color}
              </p>

              <p className="text-gray-600">
                <strong>Size:</strong> {item.size}
              </p>

              <p className="text-gray-600">
                <strong>Quantity:</strong> {item.qty}
              </p>

              <p className="text-2xl font-bold mt-4">
                ₹{item.price}
              </p>

              <p className="text-green-600 font-medium mt-3">
                ✓ Delivered on {order.date}
              </p>

            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-3 w-44">

            <button className="border rounded-lg py-3 hover:bg-black hover:text-white transition">
              Buy Again
            </button>

            {/* 🔥 TRACK PACKAGE BUTTON (SCROLLS TO TIMELINE) */}
            <button
              onClick={() =>
                timelineRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="border rounded-lg py-3 hover:bg-black hover:text-white transition"
            >
              Track Package
            </button>

            <button className="border rounded-lg py-3 hover:bg-black hover:text-white transition">
              Download Invoice
            </button>

            <button className="border rounded-lg py-3 hover:bg-black hover:text-white transition">
              Need Help
            </button>

          </div>

        </div>
      ))}

      {/* SHIPPING + PAYMENT + COURIER + SUMMARY */}
      <div className="bg-[#fafafa] border-t p-8">

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Shipping */}
          <div className="bg-white rounded-xl shadow-sm border p-6">

            <h3 className="text-lg font-semibold mb-5">📍 Shipping Address</h3>

            <p className="font-semibold">{order.customer?.name}</p>
            <p className="text-gray-600 mt-1">{order.customer?.phone}</p>
            <p className="text-gray-500 mt-4 leading-7">
              {order.customer?.address}
            </p>

          </div>

          {/* Payment */}
          <div className="bg-white rounded-xl shadow-sm border p-6">

            <h3 className="text-lg font-semibold mb-5">💳 Payment Information</h3>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span className="text-gray-500">Method</span>
                <span className="font-medium">{order.payment?.method}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className="text-green-600 font-semibold">
                  {order.payment?.status}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Transaction ID</span>
                <span className="font-medium">
                  {order.payment?.transaction}
                </span>
              </div>

            </div>
          </div>

          {/* Courier */}
          <div className="bg-white rounded-xl shadow-sm border p-6">

            <h3 className="text-lg font-semibold mb-5">🚚 Courier Details</h3>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span className="text-gray-500">Partner</span>
                <span className="font-medium">{order.courier?.partner}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Tracking No.</span>
                <span className="font-medium">{order.courier?.tracking}</span>
              </div>

            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-xl shadow-sm border p-6">

            <h3 className="text-lg font-semibold mb-5">💰 Order Summary</h3>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Items</span>
                <span>{order.items.length}</span>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.total}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>

              <div className="flex justify-between font-bold text-lg border-t pt-4">
                <span>Total</span>
                <span>₹{order.total}</span>
              </div>

            </div>
          </div>

        </div>

        {/* 🔥 TRACKING TIMELINE SECTION (SCROLL TARGET) */}
        <div ref={timelineRef} className="mt-10">
          <TrackingTimeline status={order.status} />
        </div>

      </div>

    </div>
  );
}