import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaShoppingCart, FaUser, FaTimes, FaHeart, FaSearch, FaBox, FaHome } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", path: "/", icon: <FaHome /> },
  { label: "Products", path: "/products", icon: <FaBox /> },
  { label: "Orders", path: "/orders", icon: <FaBox /> },
  { label: "Wishlist", path: "/wishlist", icon: <FaHeart /> },
];

const PublicLayout = ({ children, cartCount = 0 }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* ── HEADER ── */}
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "shadow-sm border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex items-center h-16 gap-4">

            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <FaBars size={16} />
            </button>

            <div
              className="flex items-center gap-2 cursor-pointer shrink-0"
              onClick={() => navigate("/")}
            >
              <img
                src="./mainlogo.jpeg"
                alt="Logo"
                className="h-9 w-auto object-contain"
                onError={(e) => { e.target.style.display = "none"; }}
              />
             
             
            </div>

            <nav className="hidden md:flex items-center gap-1 ml-6">
              {NAV_LINKS.slice(0, 2).map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-rose-50 text-rose-600"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="hidden md:flex flex-1 mx-4 max-w-md">
              <div className="relative w-full">
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
                <input
                  type="text"
                  placeholder="Search products, categories..."
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="flex-1 md:hidden" />

            <div className="flex items-center gap-1">

              <button
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
                onClick={() => setSearchOpen((v) => !v)}
                aria-label="Search"
              >
                <FaSearch size={14} />
              </button>

              <button
                onClick={() => navigate("/wishlist")}
                className="hidden md:flex items-center justify-center w-9 h-9 rounded-xl hover:bg-gray-100 transition-colors text-gray-500 hover:text-rose-500"
                aria-label="Wishlist"
              >
                <FaHeart size={15} />
              </button>

              <button
                onClick={() => navigate("/login")}
                className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
                aria-label="Account"
              >
                <FaUser size={14} />
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="relative flex items-center justify-center w-9 h-9 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
                aria-label="Cart"
              >
                <FaShoppingCart size={15} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 flex items-center justify-center bg-rose-500 text-white text-[10px] font-bold rounded-full px-1 shadow">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              searchOpen ? "max-h-16 pb-3" : "max-h-0"
            }`}
          >
            <div className="relative">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search products..."
                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </header>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />

          <div className="fixed top-0 left-0 w-72 h-full bg-white z-50 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <img
                  src="./mainlogo.jpeg"
                  alt="Logo"
                  className="h-8 w-auto object-contain"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
               
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
              >
                <FaTimes size={14} />
              </button>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.path}
                  onClick={() => { navigate(link.path); setMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? "bg-rose-50 text-rose-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span className={`text-xs ${isActive(link.path) ? "text-rose-400" : "text-gray-400"}`}>
                    {link.icon}
                  </span>
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="p-4 border-t border-gray-100">
              <button
                onClick={() => { navigate("/login"); setMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold py-3 rounded-2xl transition-colors"
              >
                <FaUser size={12} />
                Sign In / Register
              </button>
            </div>
          </div>
        </>
      )}

      <main className="flex-1 w-full min-h-screen p-4">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-100 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <img
                  src="./mainlogo.jpeg"
                  alt="Logo"
                  className="h-8 w-auto"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Premium quality products delivered to your doorstep.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Shop</h4>
              <ul className="space-y-2">
                {["Products", "New Arrivals", "Sale", "Categories"].map((item) => (
                  <li key={item}>
                    <button className="text-sm text-gray-400 hover:text-gray-700 transition-colors">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Account</h4>
              <ul className="space-y-2">
                {["My Orders", "Wishlist", "Profile", "Sign In"].map((item) => (
                  <li key={item}>
                    <button className="text-sm text-gray-400 hover:text-gray-700 transition-colors">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Help</h4>
              <ul className="space-y-2">
                {["Contact Us", "FAQs", "Return Policy", "Track Order"].map((item) => (
                  <li key={item}>
                    <button className="text-sm text-gray-400 hover:text-gray-700 transition-colors">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} Kartly. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {["Privacy Policy", "Terms of Service"].map((item) => (
                <button key={item} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;