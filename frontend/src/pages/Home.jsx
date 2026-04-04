import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PopularCities from "../components/PopularCities";
import Footer from "../components/Footer";

const images = [
  { src: "/trip1.jpg", alt: "Trip 1", span: "row-span-2", full: true },
  { src: "/trip2.jpg", alt: "Trip 2", height: "h-48" },
  { src: "/trip6.jpg", alt: "Trip 6", height: "h-48" },
  { src: "/trip4.jpg", alt: "Trip 4", height: "h-48" },
  { src: "/trip5.jpg", alt: "Trip 5", span: "row-span-2", full: true },
  { src: "/trip3.jpg", alt: "Trip 3", span: "col-span-2", height: "h-60" },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      ease: "easeOut",
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <motion.img
          src="/main-img.jpg"
          alt="Home Background"
          className="w-full h-full object-cover opacity-90"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 bg-black/10">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Explore Together, Plan Smarter
          </motion.h1>

          <motion.p
            className="mt-6 text-lg md:text-2xl text-gray-100 max-w-3xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-rose-500 text-lg md:text-2xl font-bold">
              TripTogether
            </span>{" "}
            helps you organize your trips with friends, discover places,<br className="hidden md:block" />
            and create unforgettable journeys – all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link
              to={user ? "/plan" : "/login"}
              className="mt-6 inline-block px-6 py-3 bg-rose-500 text-white font-medium rounded-lg hover:bg-rose-600 transition duration-300"
            >
              {user ? "Plan a Journey" : "Get Started"}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Discover Memories Section */}
      <section className="py-16 px-4 bg-[#0f172a] transition-colors duration-300">
        <h2 className="text-3xl md:text-3xl font-bold text-center text-rose-400 mb-10">
          Discover Memories from Real Journeys
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto"
        >
          {images.map(({ src, alt, span = "", height = "", full = false }, index) => (
            <motion.div key={index} variants={item} className={`${span}`}>
              <motion.img
                src={src}
                alt={alt}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`w-full ${full ? "h-full" : height} object-cover rounded-xl shadow-md`}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Popular Cities */}
      <PopularCities />

      <Footer />
    </>
  );
};

export default Home;
