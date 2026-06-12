import { Link } from "react-router-dom";
import { Search, Heart, ShoppingBag, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          BlueWhale
        </Link>

        <nav className="hidden md:flex gap-10 text-sm font-medium">
          <Link to="/"><p className="hover:underline transition duration-150">HOME</p></Link>
          <Link to="/products"><p className="hover:underline transition duration-150">SHOP</p></Link>
          <Link to="/men"><p className="hover:underline transition duration-150">MEN</p></Link>
          <Link to="/women"><p className="hover:underline transition duration-150">WOMEN</p></Link>
          <Link to="/kids"><p className="hover:underline transition duration-150">KIDS</p></Link>
          <Link to="/new-arrivals"><p className="hover:underline transition duration-150">NEW</p></Link>
        </nav>

        <div className="flex gap-4 items-center">
          <Search size={18} />
          <Heart size={18} />
          <Link to="/cart" aria-label="Cart">
            <ShoppingBag size={18} />
          </Link>
          <User size={18} />
        </div>
      </div>
    </header>
  );
}