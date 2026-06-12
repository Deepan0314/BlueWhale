import { ArrowRight } from "lucide-react";

const products = [
  {
    name: "Ocean Blue Polo",
    price: "$89.00",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Summer Linen Blouse",
    price: "$125.00",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Minimal Leather Court",
    price: "$210.00",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Nomad Silver Watch",
    price: "$345.00",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
  },
];

export default function NewArrivals() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex justify-between mb-10">
        <div>
          <span className="text-xs bg-yellow-100 px-3 py-1 rounded-full">
            New Season
          </span>

          <h2 className="text-4xl font-bold mt-4">
            New Arrivals
          </h2>
        </div>

        <button className="flex items-center gap-2">
          View All <ArrowRight size={18} />
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {products.map((item) => (
          <div key={item.name}>
            <img
              src={item.image}
              alt=""
              className="h-80 w-full object-cover rounded-3xl"
            />

            <h3 className="mt-4 font-semibold">
              {item.name}
            </h3>

            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}