import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Pencil, Check, X } from "lucide-react";

const initialData = [
    { label: "First Name", key: "firstName", value: "Deepan" },
    { label: "Last Name", key: "lastName", value: "Raj" },
    { label: "Email Address", key: "email", value: "deepanraj@gmail.com" },
    { label: "Phone Number", key: "phone", value: "+9345790345" },
    { label: "Gender", key: "gender", value: "Male" },
    { label: "Birthday", key: "birthday", value: "March 14, 2002" },
];

export default function PersonalInfo() {
    const [isEditing, setIsEditing] = useState(false);

    const [details, setDetails] = useState(initialData);

    const handleChange = (key, newValue) => {
        setDetails((prev) =>
            prev.map((item) =>
                item.key === key ? { ...item, value: newValue } : item
            )
        );
    };

    const handleSave = () => {
        setIsEditing(false);
        console.log("Saved Data:", details);
    };

    const handleCancel = () => {
        setDetails(initialData);
        setIsEditing(false);
    };

    return (
        <div className="min-h-full overflow-y-auto no-scrollbar px-4 mt-10">

            {/* HEADER */}
            <motion.section
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-10"
            >
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

                    {/* PROFILE IMAGE */}
                    <div className="relative shrink-0">
                        <img
                            src="https://i.pravatar.cc/300"
                            alt="Profile"
                            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-[6px] border-[#E5DFDA]"
                        />

                        <button className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white border flex items-center justify-center">
                            <Camera size={18} />
                        </button>
                    </div>

                    {/* INFO */}
                    <div className="text-center md:text-left">
                        <h1 className="font-serif text-3xl md:text-5xl">
                            {details[0].value} {details[1].value}
                        </h1>

                        <p className="mt-3 text-zinc-500 max-w-md">
                            Manage your personal information and profile settings.
                        </p>

                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="mt-6 px-8 py-2 border border-black rounded-full uppercase text-[11px]"
                            >
                                Edit Profile
                            </button>
                        ) : (
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={handleSave}
                                    className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-full text-[11px] uppercase"
                                >
                                    <Check size={14} /> Save
                                </button>

                                <button
                                    onClick={handleCancel}
                                    className="flex items-center gap-2 px-6 py-2 border rounded-full text-[11px] uppercase"
                                >
                                    <X size={14} /> Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </motion.section>

            {/* DETAILS */}
            <motion.section
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mt-24"
            >
                <div className="flex items-center justify-between">
                    <h2 className="font-serif text-[44px]">
                        Personal Information
                    </h2>

                    <button
                        onClick={() => setIsEditing((p) => !p)}
                        className="flex items-center gap-2 text-[11px] uppercase text-zinc-500"
                    >
                        <Pencil size={14} />
                        {isEditing ? "Submit" : "Edit Details"}
                    </button>
                </div>

                <div className="border-b border-zinc-300 mt-6" />

                {/* GRID */}
                <div className="grid grid-cols-2 gap-x-40 gap-y-16 mt-12">
                    {details.map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -3 }}
                            className="font-bold"
                        >
                            <p className="uppercase tracking-[0.25em] text-[10px] text-zinc-500 mb-3">
                                {item.label}
                            </p>

                            {isEditing ? (
                                <input
                                    value={item.value}
                                    onChange={(e) =>
                                        handleChange(item.key, e.target.value)
                                    }
                                    className="text-[28px] font-semibold text-zinc-800 border-b border-zinc-300 outline-none bg-transparent w-full"
                                />
                            ) : (
                                <p className="text-[32px] font-semibold text-zinc-800">
                                    {item.value}
                                </p>
                            )}
                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </div>
    );
}