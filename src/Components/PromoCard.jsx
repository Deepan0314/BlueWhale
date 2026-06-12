import { motion } from "framer-motion";

const cards = [
  {
    title: "Modern Formal",
    subtitle: "NEW RELEASE",
    image:
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=1200",
  },
  {
    title: "Coastline Collection",
    subtitle: "SUMMER 24",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
  },
];

export default function PromoCards() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <div className="grid md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <motion.div
            key={card.title}
            whileHover={{ y: -8 }}
            className="relative h-[260px] overflow-hidden rounded-3xl group"
          >
            <img
              src={card.image}
              alt=""
              className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />

            <div className="absolute left-8 bottom-8 text-white">
              <p className="text-xs tracking-[3px]">
                {card.subtitle}
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {card.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}