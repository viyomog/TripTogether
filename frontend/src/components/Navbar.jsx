import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UserContext } from "../context/userContext";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/contact", label: "Contact" },
    { to: "/faqs", label: "FAQs" },
    { to: "/mates", label: "Find Mates" },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-50 py-4 md:py-6 font-sans">
        <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="text-2xl font-black text-[#f43f5e] drop-shadow-md tracking-tight z-50 relative"
          >
            TripTogether
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8 text-white text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-medium hover:text-[#fda4af] transition-colors drop-shadow-sm ${location.pathname === link.to ? "font-bold text-[#fda4af]" : ""}`}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <Link
                to="/myprofile"
                className="px-6 py-2 bg-[#f43f5e] text-white rounded-md hover:bg-[#e11d48] transition-colors drop-shadow-md font-bold"
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 bg-[#f43f5e] text-white rounded-md hover:bg-[#e11d48] transition-colors drop-shadow-md font-bold"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden z-50 relative flex flex-col justify-center items-center w-10 h-10 rounded-lg focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : ""}`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 mt-1.5 ${isOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 mt-1.5 ${isOpen ? "-rotate-45 -translate-y-3" : ""}`}
            ></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0f172a]/95 backdrop-blur-md flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center space-y-8 text-xl">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={closeMenu}
                  className={`font-bold text-white hover:text-[#f43f5e] transition-colors ${location.pathname === link.to ? "text-[#f43f5e]" : ""}`}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <Link
                  to="/myprofile"
                  onClick={closeMenu}
                  className="mt-4 px-10 py-3 bg-[#f43f5e] text-white rounded-xl hover:bg-[#e11d48] transition-colors font-bold text-lg shadow-lg"
                >
                  Profile
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="mt-4 px-10 py-3 bg-[#f43f5e] text-white rounded-xl hover:bg-[#e11d48] transition-colors font-bold text-lg shadow-lg"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
