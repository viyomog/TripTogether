import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Heart, Star, Plane } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const dummySavedTrips = [
  {
    _id: "1",
    destination: "Kyoto, Japan",
    country: "Japan",
    dates: "Mar 15 - Mar 28, 2026",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
    tags: ["Cultural Heritage", "Temples", "Cherry Blossoms"],
    savedOn: "Jan 10, 2026",
    budget: "$2,500",
    rating: 4.8,
  },
  {
    _id: "2",
    destination: "Santorini, Greece",
    country: "Greece",
    dates: "Jun 5 - Jun 15, 2026",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80",
    tags: ["Beach Vibes", "Luxury", "Sunsets"],
    savedOn: "Feb 2, 2026",
    budget: "$3,200",
    rating: 4.9,
  },
  {
    _id: "3",
    destination: "Patagonia, Argentina",
    country: "Argentina",
    dates: "Oct 1 - Oct 14, 2026",
    image: "https://images.unsplash.com/photo-1531761535209-180857e963b9?w=600&q=80",
    tags: ["Hiking", "Mountains", "Wildlife"],
    savedOn: "Mar 18, 2026",
    budget: "$1,800",
    rating: 4.7,
  },
  {
    _id: "4",
    destination: "Marrakech, Morocco",
    country: "Morocco",
    dates: "Nov 10 - Nov 20, 2026",
    image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=600&q=80",
    tags: ["Street Food", "Markets", "Cultural Heritage"],
    savedOn: "Apr 5, 2026",
    budget: "$1,200",
    rating: 4.5,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] },
  },
};

const SavedTripsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0f172a] min-h-screen flex flex-col text-gray-200 font-sans overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-rose-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 z-10 max-w-7xl mx-auto w-full">
        {/* Header with Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <Heart className="text-rose-500" size={32} />
              Saved Trips
            </h1>
            <p className="text-gray-400 mt-1">
              Your curated collection of dream destinations
            </p>
          </div>
        </motion.div>

        {/* Trip Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {dummySavedTrips.map((trip) => (
            <motion.div key={trip._id} variants={itemVariants}>
              <div className="group rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden hover:border-rose-500/30 transition-all duration-300">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={trip.image}
                    alt={trip.destination}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-full text-xs text-white font-medium border border-white/20">
                      {trip.country}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs font-bold">{trip.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors">
                    {trip.destination}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {trip.dates}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Plane size={14} />
                      Est. {trip.budget}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {trip.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Saved Date */}
                  <p className="text-[10px] text-gray-500 pt-1 border-t border-white/5">
                    Saved on {trip.savedOn}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State (if needed later) */}
        {dummySavedTrips.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <Heart size={32} className="text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No saved trips yet</h3>
            <p className="text-gray-500">
              Start exploring and save your dream destinations!
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default SavedTripsPage;
