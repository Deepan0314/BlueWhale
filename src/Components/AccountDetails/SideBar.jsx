import { motion } from "framer-motion";
import {
    User,
    Lock,
    Settings,
    ClipboardList,
    LogOut,
} from "lucide-react";

const menu = [
    { icon: User, title: "Personal Details" },
    { icon: Lock, title: "Security" },
    { icon: Settings, title: "Preferences" },
    { icon: ClipboardList, title: "Order History" },
];

export default function Sidebar({ activepage, setActivePage }) {
    return (
        <aside className="w-[270px] h-screen overflow-hidden bg-[#F7F4F2] border-r border-zinc-200 flex flex-col gap-20">

            {/* TOP SECTION */}
            <div className="pt-10">

                {/* BRAND */}
                <div className="px-8 mb-10">
                    <h1 className="font-serif text-2xl tracking-wide">
                        ELITE
                    </h1>
                    <p className="text-[11px] text-zinc-500 mt-1 tracking-[0.2em] uppercase">
                        Account Panel
                    </p>
                </div>

                {/* NAV */}
                <nav className="space-y-1 relative">

                    {menu.map((item) => {
                        const Icon = item.icon;
                        const isActive = activepage === item.title;

                        return (
                            <motion.button
                                key={item.title}
                                onClick={() => setActivePage(item.title)}
                                whileHover={{ x: 6 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className={`relative w-full flex items-center gap-4 px-8 py-4 text-left transition-all
                                    ${isActive
                                        ? "text-black"
                                        : "text-zinc-500 hover:text-black"
                                    }`}
                            >

                                {/* ACTIVE INDICATOR */}
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebarActive"
                                        className="absolute left-0 top-0 h-full w-[3px] bg-black rounded-r-full"
                                        transition={{
                                            type: "spring",
                                            stiffness: 500,
                                            damping: 35,
                                        }}
                                    />
                                )}

                                <Icon size={18} strokeWidth={1.5} />

                                <span className="text-[11px] uppercase tracking-[0.2em]">
                                    {item.title}
                                </span>
                            </motion.button>
                        );
                    })}
                </nav>
            </div>

            {/* BOTTOM SECTION */}
            <div className="p-6 border-t border-zinc-200">

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-black text-white text-[11px] uppercase tracking-[0.25em]"
                >
                    <LogOut size={14} />
                    Sign Out
                </motion.button>

            </div>
        </aside>
    );
}