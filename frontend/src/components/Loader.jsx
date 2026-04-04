import React, { useState, useEffect } from "react";
import { FaPlane, FaBus, FaTrain, FaShip } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const icons = [FaPlane, FaBus, FaTrain, FaShip];

const Loader = () => {
  const [index, setIndex] = useState(0);
  const Icon = icons[index];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % icons.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sky-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="text-5xl text-blue-500"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
        >
          <Icon />
        </motion.div>
      </AnimatePresence>
      <p className="mt-6 text-blue-800 text-lg animate-pulse">
        Planning your journey...
      </p>
    </div>
  );
};

export default Loader;
