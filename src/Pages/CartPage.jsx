import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="text-slate-600 mb-8">Your cart is empty</p>
        <Link to="/products" className="inline-block bg-[#0d2746] text-white px-6 py-3 rounded-full">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="bg-white rounded-2xl shadow p-6">
        <div className="space-y-4 mb-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-4">
                {item.image && (
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                )}
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-slate-500">${item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 border rounded-lg">
                  <button 
                    onClick={() => updateQuantity(item.id, item.qty - 1)}
                    className="px-3 py-1 text-slate-600 hover:bg-slate-100"
                  >
                    -
                  </button>
                  <span className="px-3 py-1">{item.qty}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.qty + 1)}
                    className="px-3 py-1 text-slate-600 hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>

                <p className="font-semibold w-20 text-right">${(item.price * item.qty).toFixed(2)}</p>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t pt-6">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-semibold">Total</div>
            <div className="text-3xl font-bold text-[#0d2746]">${getTotalPrice().toFixed(2)}</div>
          </div>

          <div className="flex gap-4">
            <Link to="/products" className="border px-5 py-3 rounded-full font-medium hover:bg-slate-100 transition">
              Continue Shopping
            </Link>
            <Link to="/checkout" className="flex-1 bg-[#0d2746] text-white px-5 py-3 rounded-full font-medium text-center hover:bg-[#0a1f34] transition">
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
