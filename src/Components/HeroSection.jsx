import { motion } from "framer-motion";
import heroFashion from "../assets/herofashion.jpg";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate=useNavigate();
  return (
    <section className="h-screen overflow-hidden border-b border-black">
  <div className="grid lg:grid-cols-2 h-[700px]">

    <div className="relative h-full overflow-hidden">
      <img
        src={heroFashion}
        alt="Fashion Model"
        className="hero-image w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/5" />
    </div>

    <div className="hero-content flex items-center justify-center bg-[#f8f8f6] px-8 lg:px-1 h-[500px]">
      <div className="max-w-xl text-center">

        <span className="hero-title uppercase tracking-[0.3em] text-sm text-gray-500">
          New Season
        </span>

        <h1 className="hero-title mt-6 text-5xl md:text-6xl lg:text-7xl font-serif leading-tight text-[#1f1f1f]">
          The New
          <br />
          Atelier Collection
        </h1>

        <p className="hero-subtitle mt-8 text-lg text-gray-600 leading-relaxed">
          Discover modern silhouettes and timeless luxury,
          exclusively crafted for the discerning individual.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5">
          <button
            onClick={() => navigate("/products")}
            className="hero-button border border-black px-10 py-4 text-black hover:bg-black hover:text-white transition-all duration-300"
          >
            Explore Now
          </button>

          <button className="hero-button bg-black text-white px-10 py-4 hover:bg-neutral-800 transition-all duration-300 shadow-lg">
            View Campaign
          </button>
        </div>

      </div>
    </div>

  </div>
</section>
  );
}