import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import { useCart } from "../CartContext";

const productData = {
  1: { id: 1, name: "Ocean Blue Polo", price: "$89", image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=1200", desc: "A refined polo crafted from breathable cotton. Perfect for casual and smart-casual occasions." },
  2: { id: 2, name: "Summer Linen Blouse", price: "$125", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200", desc: "Lightweight linen blouse perfect for warm days with breathable comfort." },
  3: { id: 3, name: "Minimal Leather Court", price: "$210", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200", desc: "Sleek leather sneakers with timeless silhouette and premium comfort." },
  4: { id: 4, name: "Nomad Silver Watch", price: "$345", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200", desc: "Hand-finished watch with precision movement and elegant design." },
  5: { id: 5, name: "Charcoal Crew Neck", price: "$95", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200", desc: "Classic crew neck sweater made from premium cotton blend." },
  6: { id: 6, name: "Classic Denim", price: "$120", image: "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=1200", desc: "Timeless denim jeans with perfect fit and durability." },
  7: { id: 7, name: "Oxford Button Down", price: "$110", image: "https://images.unsplash.com/photo-1596362051780-e7f40e5a90a9?w=1200", desc: "Versatile Oxford shirt perfect for any occasion." },
  8: { id: 8, name: "Camel Wool Coat", price: "$350", image: "https://images.unsplash.com/photo-1539533057223-08c33b5823e4?w=1200", desc: "Premium wool coat with elegant drape and timeless style." },
  9: { id: 9, name: "Minimal Leather Court", price: "$210", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200", desc: "Sleek leather sneakers with minimalist design." },
  10: { id: 10, name: "Summer Linen Blouse", price: "$125", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200", desc: "Elegant linen blouse for summer elegance." },
  11: { id: 11, name: "Elegant Maxi Dress", price: "$180", image: "https://images.unsplash.com/photo-1595777712802-eaf8184e3a9e?w=1200", desc: "Sophisticated maxi dress perfect for special occasions." },
  12: { id: 12, name: "Silk Camisole", price: "$95", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200", desc: "Luxurious silk camisole with elegant drape." },
  13: { id: 13, name: "High-waist Jeans", price: "$140", image: "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=1200", desc: "Flattering high-waist jeans with premium denim quality." },
  14: { id: 14, name: "Cashmere Cardigan", price: "$320", image: "https://images.unsplash.com/photo-1596993516316-3a5a1d53ba85?w=1200", desc: "Luxurious cashmere cardigan for ultimate comfort." },
  15: { id: 15, name: "Minimal Strappy Heel", price: "$165", image: "https://images.unsplash.com/photo-1543163521-9efcc06b030b?w=1200", desc: "Elegant strappy heels perfect for any occasion." },
  16: { id: 16, name: "Colorful T-shirt Set", price: "$45", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=1200", desc: "Fun and colorful t-shirt set for kids." },
  17: { id: 17, name: "Fun Graphic Hoodie", price: "$65", image: "https://images.unsplash.com/photo-1516134305309-843c82a98d5d?w=1200", desc: "Comfortable hoodie with fun graphics for kids." },
  18: { id: 18, name: "Play Denim Shorts", price: "$50", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200", desc: "Durable denim shorts for active kids." },
  19: { id: 19, name: "Cozy Sweater", price: "$75", image: "https://images.unsplash.com/photo-1522058567840-d81e77b9c1f6?w=1200", desc: "Cozy sweater perfect for cold weather." },
  20: { id: 20, name: "Trendy Sneakers", price: "$85", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200", desc: "Trendy sneakers for active kids." },
  21: { id: 21, name: "Kids Baseball Cap", price: "$35", image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=1200", desc: "Classic baseball cap for kids." },
  22: { id: 22, name: "Ultra Soft Linen Shirt", price: "$99", image: "https://images.unsplash.com/photo-1596362051780-e7f40e5a90a9?w=1200", desc: "Ultra-soft linen shirt with premium quality." },
  23: { id: 23, name: "Designer Cargo Pants", price: "$145", image: "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=1200", desc: "Stylish cargo pants with modern design." },
  24: { id: 24, name: "Premium Leather Belt", price: "$89", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200", desc: "Premium leather belt with elegant buckle." },
  25: { id: 25, name: "Sustainable Wool Sweater", price: "$135", image: "https://images.unsplash.com/photo-1596993516316-3a5a1d53ba85?w=1200", desc: "Eco-friendly wool sweater with sustainable production." },
  26: { id: 26, name: "Modern Minimalist Watch", price: "$299", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200", desc: "Modern minimalist watch with sleek design." },
  27: { id: 27, name: "Eco-friendly Canvas Bag", price: "$78", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200", desc: "Stylish canvas bag made from sustainable materials." },
};

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = productData[id] || null;

//   useEffect(() => {
//     if (product) {
//       gsap.from(".product-image", { opacity: 0, x: -30, duration: 0.6 });
//       gsap.from(".product-info", { opacity: 0, x: 30, duration: 0.6 });
//       gsap.from(".product-button", { opacity: 0, y: 20, stagger: 0.1, duration: 0.5, delay: 0.3 });
//     }
//   }, [product]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-semibold">Product not found</h2>
        <Link to="/products" className="mt-6 inline-block text-blue-600">Back to products</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    const productWithPrice = {
      id: product.id,
      name: product.name,
      price: parseInt(product.price.replace("$", "")),
      image: product.image
    };
    addToCart(productWithPrice);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
      <div className="product-image rounded-2xl overflow-hidden shadow-lg">
        <img src={product.image} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="product-info">
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <p className="text-slate-600 mt-4 text-lg">{product.desc}</p>
        <p className="text-3xl font-bold mt-6 text-[#0d2746]">{product.price}</p>

        <div className="mt-8 flex gap-4">
          <button 
            onClick={handleAddToCart}
            className="product-button bg-[#0d2746] text-white px-8 py-3 rounded-full font-medium hover:bg-[#0a1f34] transition"
          >
            Add to Cart
          </button>
          <Link to="/checkout" className="product-button border-2 border-[#0d2746] text-[#0d2746] px-8 py-3 rounded-full font-medium hover:bg-[#0d2746] hover:text-white transition">
            Buy Now
          </Link>
        </div>

        <div className="mt-8 p-6 bg-slate-100 rounded-lg">
          <h3 className="font-semibold mb-2">Free Shipping</h3>
          <p className="text-sm text-slate-600">Free delivery on orders over $50</p>
        </div>
      </div>
    </div>
  );
}
