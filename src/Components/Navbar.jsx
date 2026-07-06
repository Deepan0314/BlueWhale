import { NavLink } from "react-router-dom";
import { Heart, Search, ShoppingBag, User } from "lucide-react";
import { useWishlist } from "../Context/WhislistContext";
import { useCart } from "../CartContext";
import hairalogo from "../assets/HairaLogo.png";
import CategoriesSidebar from "./CategoriesSidebar";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import logotransparent from "../assets/HaierahLogoTransparent.png";
const navItems = [
  { name: "HOME", path: "/" },
  { name: "MEN", path: "/men" },
  { name: "WOMEN", path: "/women" },
  { name: "KIDS", path: "/kids" },
  { name: "NEW", path: "/new-arrivals" },
  { name: "ORDERS", path: "/orders" },
];

export default function Navbar() {
  const { wishlist } = useWishlist();
  const { cart } = useCart();

  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("MEN");
  const [search, setSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
     const handleScroll = () => {
     setIsScrolled(window.scrollY > 50);
     };

     window.addEventListener("scroll", handleScroll);

     return () => {
       window.removeEventListener("scroll", handleScroll);
   };
  }, []);
  const handleMenu = (item) => {
    setActiveMenu(item.name);

    if (item.name === "MEN" || item.name === "WOMEN" || item.name === "KIDS" || item.name === "NEW") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <header
       className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
         isScrolled
           ? "bg-white shadow-md "
           : "bg-transparent"
     }`}
   >
      <div className="relative max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* LOGO */}
        <NavLink to="/" className="text-2xl font-bold text-amber-700">
         <img src={logotransparent} alt="HAIRA Logo" className="h-14 w-auto object-contain  transition-all duration-300"/>
        </NavLink>

        {/* NAV */}
        <nav className=" navbar hidden md:flex gap-10 text-sm font-medium">
          {navItems.map((item) => (
            <motion.div
              key={item.path}
              whileHover={{ y: -2 }}
              onMouseEnter={() => handleMenu(item)}
              className="serif"
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                 `relative py-1 transition-all duration-300 ${
                    isActive
                      ? isScrolled
                         ? "text-amber-700"
                         : "text-white"
                      : isScrolled
                      ? "text-gray-900 hover:text-amber-700"
                      : "text-white hover:text-gray-300"
                   }`
                }
            >
                {({ isActive }) => (
                  <>
                    {item.name}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] bg-amber-700 transition-all ${isActive ? "w-full" : "w-0"
                        }`}
                    />
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* ICONS */}
        <div
          className={`flex gap-4 items-center transition-colors duration-300${
            isScrolled ? "text-gray-800" : "text-white"
         }`}
        >
          <div onClick={()=>setSearch(true)}>
            <Search />
          </div>
          <NavLink to="/wishlist">
            <Heart />
          </NavLink>
          <NavLink to="/cart">
            <ShoppingBag />
          </NavLink>
          <NavLink to="/account">
            <User />
          </NavLink>
        </div>
      </div>

      {/* MEGA MENU */}
      <CategoriesSidebar
        open={open}
        setOpen={setOpen}
        activeMenu={activeMenu}
      />

      {search && (
        <SearchBar
        open={search}
        setOpen={setSearch} />
      )}
    </header>
  );
}