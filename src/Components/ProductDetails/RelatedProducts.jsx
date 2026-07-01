import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  Eye,
} from "lucide-react";

import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WhislistContext";

const relatedProducts = [
  {
    id: 31,
    name: "Premium Oxford Shirt",
    price: 1599,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=700",
    category: "Men",
  },
  {
    id: 32,
    name: "Relaxed Fit Hoodie",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700",
    category: "Men",
  },
  {
    id: 33,
    name: "Classic Denim Jacket",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=700",
    category: "Outerwear",
  },
  {
    id: 34,
    name: "Slim Fit Chinos",
    price: 1799,
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=700",
    category: "Bottom Wear",
  },
];

export default function RelatedProducts() {
  const { addToCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <div className="flex justify-between items-center mb-12">

        <div>

          <h2 className="text-5xl font-serif">
            You May Also Like
          </h2>

          <p className="text-gray-500 mt-2">
            Discover similar styles picked for you.
          </p>

        </div>

        <Link
          to="/products"
          className="text-lg font-medium hover:underline"
        >
          View All →
        </Link>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {relatedProducts.map((product) => (

          <motion.div
            key={product.id}
            whileHover={{ y: -8 }}
            transition={{ duration: .3 }}
            className="group"
          >

            <div className="relative rounded-3xl overflow-hidden bg-gray-100">

              <img
                src={product.image}
                alt={product.name}
                className="h-[420px] w-full object-cover group-hover:scale-105 duration-500"
              />

              {/* Wishlist */}

              <button
                onClick={() =>
                  isInWishlist(product.id)
                    ? removeFromWishlist(product.id)
                    : addToWishlist(product)
                }
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
              >
                <Heart
                  size={18}
                  className={
                    isInWishlist(product.id)
                      ? "fill-red-500 text-red-500"
                      : ""
                  }
                />
              </button>

              {/* Hover Buttons */}

              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 duration-300 space-y-3">

                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-black text-white py-3 rounded-xl flex justify-center gap-2"
                >
                  <ShoppingBag size={18} />
                  Add to Bag
                </button>

                <Link
                  to={`/product/${product.id}`}
                  className="w-full bg-white py-3 rounded-xl flex justify-center gap-2"
                >
                  <Eye size={18} />
                  Quick View
                </Link>

              </div>

            </div>

            <div className="mt-5">

              <p className="text-sm uppercase tracking-wider text-gray-500">
                {product.category}
              </p>

              <h3 className="text-2xl font-serif mt-1">
                {product.name}
              </h3>

              <p className="text-xl font-semibold mt-2">
                ₹{product.price}
              </p>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}