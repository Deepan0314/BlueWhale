import { Bird, Camera, FactoryIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-xl font-bold mb-4">
            BlueWhale
          </h2>

          <p className="text-slate-500 text-sm">
            Crafting timeless elegance for the modern lifestyle
            since 2024.
          </p>

          <div className="flex gap-3 mt-5">
            <FactoryIcon size={18} />
            <Camera size={18} />
            <Bird size={18} />
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">
            SHOP
          </h3>

          <ul className="space-y-2 text-slate-500 text-sm">
            <li>New Arrivals</li>
            <li>Best Sellers</li>
            <li>Men's Collection</li>
            <li>Women's Collection</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">
            CUSTOMER CARE
          </h3>

          <ul className="space-y-2 text-slate-500 text-sm">
            <li>Shipping & Returns</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">
            OUR BRAND
          </h3>

          <ul className="space-y-2 text-slate-500 text-sm">
            <li>Brand Story</li>
            <li>Sustainability</li>
            <li>Press</li>
            <li>Store Locator</li>
          </ul>
        </div>
      </div>

      <div className="border-t py-6 text-center text-sm text-slate-500">
        © 2024 BlueWhale Collection. All rights reserved.
      </div>
    </footer>
  );
}