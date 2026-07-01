import { motion } from "framer-motion";
import {
  Lock,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

const cards = [
  {
    icon: Lock,
    title: "Password",
    description:
      "Keep your account secure by updating your password regularly.",
    button: "Change Password",
  },
  {
    icon: ShieldCheck,
    title: "Two-Factor Authentication",
    description:
      "Add an extra layer of protection with two-factor authentication.",
    button: "Enable 2FA",
  },
];

export default function SecuritySection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className=""
    >
      {/* Heading */}

      <h2 className="font-serif text-[44px]">
        Security & Login
      </h2>

      <div className="border-b border-zinc-300  mb-12"></div>

      {/* Cards */}

      <div className="grid grid-cols-2 gap-8">

        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={index}
              whileHover={{
                y: -8,
                boxShadow:
                  "0 18px 40px rgba(0,0,0,0.08)",
              }}
              transition={{ duration: .3 }}
              className="rounded-3xl border border-zinc-200 bg-white p-10"
            >
              {/* Icon */}

              <div className="w-14 h-14 rounded-full bg-[#F7F4F2] flex items-center justify-center mb-8">
                <Icon
                  size={24}
                  strokeWidth={1.5}
                />
              </div>

              {/* Title */}

              <h3 className="font-serif text-[28px]">
                {card.title}
              </h3>

              {/* Description */}

              <p className="mt-5 text-zinc-500 leading-7">
                {card.description}
              </p>

              {/* Button */}

              <motion.button
                whileHover={{
                  x: 5,
                }}
                className="mt-10 flex items-center gap-2 uppercase tracking-[0.18em] text-[11px] font-medium"
              >
                {card.button}

                <ChevronRight
                  size={16}
                  strokeWidth={1.7}
                />
              </motion.button>

            </motion.div>
          );
        })}

      </div>
    </motion.section>
  );
}