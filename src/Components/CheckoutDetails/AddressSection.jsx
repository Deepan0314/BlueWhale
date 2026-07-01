import { motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  MapPin,
  Pencil,
  Plus,
} from "lucide-react";
import { useState } from "react";

export default function AddressSection() {
  const [show, setShow] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="border-b p-8"
    >
      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <h2 className="text-3xl font-semibold">
             Shipping Address
          </h2>

          <CheckCircle2
            size={26}
            className="text-green-600 fill-green-600 text-white"
          />

        </div>

        <button onClick={() => setShow(!show)}>
          <ChevronDown
            className={`cursor-pointer transition-transform duration-300 ${
              show ? "rotate-180" : ""
            }`}
          />
        </button>

      </div>

      {show && (
        <>
          {/* Address Card */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 border rounded-2xl p-6 bg-gray-50"
          >
            <div className="flex justify-between">

              <div className="flex gap-5">

                <div className="w-14 h-14 rounded-full bg-[#0d2746] text-white flex items-center justify-center">
                  <MapPin size={24} />
                </div>

                <div>

                  <h3 className="text-2xl font-semibold">
                    Home Address
                  </h3>

                  <p className="text-gray-600 mt-3">
                    John Doe
                  </p>

                  <p className="text-gray-600">
                    15, Anna Salai
                  </p>

                  <p className="text-gray-600">
                    Chennai, Tamil Nadu
                  </p>

                  <p className="text-gray-600">
                    India - 600001
                  </p>

                  <p className="text-gray-600 mt-2">
                    +91 98765 43210
                  </p>

                </div>

              </div>

              <button className="flex items-center gap-2 text-[#0d2746] hover:text-black transition">
                <Pencil size={16} />
                Edit
              </button>

            </div>
          </motion.div>

          {/* Add New Address */}

          <button className="mt-6 w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-xl py-4 hover:border-[#0d2746] hover:text-[#0d2746] transition">
            <Plus size={18} />
            Add New Address
          </button>
        </>
      )}
    </motion.div>
  );
}