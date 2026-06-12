import { motion } from "framer-motion";
import heroFashion from "../assets/herofashion.jpg";

export default function HeroSection() {
  return (
    <section className="h-screen overflow-hidden border-b border-black">
      <div className="grid lg:grid-cols-2 h-[700px]">
        {/* Left Image */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative h-full"
        >
          <img
            src={heroFashion}
            alt="Fashion Model"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/5" />
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex items-center justify-center bg-[#f8f8f6] px-8 lg:px-1 h-[500px] "
        >
          <div className="max-w-xl text-center">
            <span className="uppercase tracking-[0.3em] text-sm text-gray-500">
              New Season
            </span>

            <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-serif leading-tight text-[#1f1f1f]">
              The New
              <br />
              Atelier Collection
            </h1>

            <p className="mt-8 text-lg text-gray-600 leading-relaxed">
              Discover modern silhouettes and timeless luxury,
              exclusively crafted for the discerning individual.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5">
              <button className="border border-black px-10 py-4 text-black hover:bg-black hover:text-white transition-all duration-300">
                Explore Now
              </button>

              <button className="bg-black text-white px-10 py-4 hover:bg-neutral-800 transition-all duration-300 shadow-lg">
                View Campaign
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}