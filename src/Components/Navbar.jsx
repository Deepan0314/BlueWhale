import { NavLink, useLocation } from "react-router-dom";
import { Heart, Search, ShoppingBag, User } from "lucide-react";
import { useWishlist } from "../Context/WhislistContext";
import { useCart } from "../CartContext";
import logotransparent from "../assets/HaierahLogoTransparent.png";
import CategoriesSidebar from "./CategoriesSidebar";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

const navItems = [
  { name: "HOME", path: "/" },
  { name: "MEN", path: "/men" },
  { name: "WOMEN", path: "/women" },
  { name: "KIDS", path: "/kids" },
  { name: "NEW", path: "/new-arrivals" },
  
];

export default function Navbar() {
  const { wishlist } = useWishlist();
  const { cart } = useCart();

  const location = useLocation();
  const isHomePage = location.pathname === "/";

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

    if (
      item.name === "MEN" ||
      item.name === "WOMEN" ||
      item.name === "KIDS" ||
      item.name === "NEW"
    ) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isHomePage
          ? isScrolled
            ? "bg-white shadow-md"
            : "bg-transparent"
          : "bg-white shadow-md"
      }`}
    >
      <div className="relative max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* LOGO */}
        <NavLink to="/">
        <img src={logotransparent} alt="HAIERAH Logo"className="h-14 w-auto object-contain transition-all duration-300"/>
</NavLink>
        {/* NAVIGATION */}
        <nav className="hidden md:flex gap-10 text-sm font-medium">
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
                    isHomePage
                      ? isScrolled
                        ? isActive
                          ? "text-amber-700"
                          : "text-gray-900 hover:text-amber-700"
                        : isActive
                        ? "text-white"
                        : "text-white hover:text-gray-300"
                      : isActive
                      ? "text-amber-700"
                      : "text-gray-900 hover:text-amber-700"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] bg-amber-700 transition-all duration-300 ${
                        isActive ? "w-full" : "w-0"
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
          className={`flex gap-4 items-center transition-colors duration-300 ${
            isHomePage
              ? isScrolled
                ? "text-gray-800"
                : "text-white"
              : "text-gray-800"
          }`}
        >
          <div
            onClick={() => setSearch(true)}
            className="cursor-pointer hover:text-amber-700 transition"
          >
            <Search />
          </div>

          <NavLink
            to="/wishlist"
            className="hover:text-amber-700 transition relative"
          >
            <Heart />

            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-700 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className="hover:text-amber-700 transition relative"
          >
            <ShoppingBag />

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-700 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/account"
            className="hover:text-amber-700 transition"
          >
            <User />
          </NavLink>
        </div>
      </div>

      {/* CATEGORY SIDEBAR */}
      <CategoriesSidebar
        open={open}
        setOpen={setOpen}
        activeMenu={activeMenu}
      />

      {/* SEARCH */}
      {search && (
        <SearchBar
          open={search}
          setOpen={setSearch}
        />
      )}
    </header>
  );
}