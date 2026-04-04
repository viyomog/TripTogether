import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Plane, ArrowLeft } from "lucide-react";
import "../../styles/Auth.css";
import heroImage from "../../assets/loginpage/travel-hero.jpg";

const AuthLayout = ({ children, subtitle, onSubmit }) => {
  const navigate = useNavigate();
  return (
    <div className="auth-split-container relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all"
      >
        <ArrowLeft size={18} />
        Back
      </button>
      {/* Hero Section (Left) */}
      <div
        className="auth-hero-section"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="auth-hero-overlay">
          <div className="hero-icon-container">
            <div className="hero-icon-wrapper animate-float">
              <Plane size={48} strokeWidth={1.5} />
            </div>
          </div>
          <motion.h1
            className="auth-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          >
            Explore the world <br /> together
          </motion.h1>
          <motion.p
            className="auth-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          >
            Plan trips, share moments, and create unforgettable memories with
            your travel companions.
          </motion.p>
        </div>
      </div>

      {/* Form Section (Right) */}
      <div className="auth-form-section">
        <form className="auth-form-wrapper" onSubmit={onSubmit}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="auth-header-rose">
              <motion.h1
                className="brand-text-gradient"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                TripTogether
              </motion.h1>
              <p className="auth-subtitle-rose">{subtitle}</p>
            </div>

            <div className="auth-content-rose">{children}</div>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default AuthLayout;
