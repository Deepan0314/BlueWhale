import React from "react";
import { Link } from "react-router-dom";

export default function CheckoutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="bg-white rounded-2xl shadow p-6">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full name</label>
            <input className="border rounded-md w-full px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">Shipping address</label>
            <input className="border rounded-md w-full px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">Card details</label>
            <input className="border rounded-md w-full px-3 py-2" placeholder="**** **** **** 4242" />
          </div>

          <div className="flex gap-4">
            <button className="bg-[#0d2746] text-white px-6 py-2 rounded-full">Pay now</button>
            <Link to="/cart" className="border px-6 py-2 rounded-full">Back to cart</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
