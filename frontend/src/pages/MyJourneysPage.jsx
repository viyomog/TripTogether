import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Plane, Clock, CheckCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const dummyJourneys = [
  {
    _id: "1",
    destination: "Tokyo, Japan",
    country: "Japan",
    dates: "Oct 12 - Oct 25, 2026",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
    status: "Upcoming",
    daysLeft: 142,
    travelers: 3,
    itinerary: "Shibuya, Asakusa, Mount Fuji Day Trip",
  },
  {
    _id: "2",
    destination: "Paris, France",
    country: "France",
    dates: "Dec 5 - Dec 15, 2026",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
    status: "Planning",
    daysLeft: 205,
    travelers: 2,
    itinerary: "Eiffel Tower, Louvre, Versailles",
  },
  {
    _id: "3",
    destination: "Rome, Italy",
    country: "Italy",
    dates: "May 10 - May 20, 2025",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80",
    status: "Completed",
    daysLeft: null,
    travelers: 4,
    itinerary: "Colosseum, Vatican, Trevi Fountain",
  },
  {
    _id: "4",
    destination: "Bali, Indonesia",
    country: "Indonesia",
    dates: "Aug 1 - Aug 14, 2026",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
    status: "Planning",
    daysLeft: 110,
    travelers: 1,
    itinerary: "Ubud, Seminyak, Uluwatu Temple",
  },
  {
    _id: "5",
    destination: "New York, USA",
    country: "USA",
    dates: "Jan 15 - Jan 22, 2025",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80",
    status: "Completed",
    daysLeft: null,
    travelers: 2,
    itinerary: "Times Square, Central Park, Brooklyn Bridge",
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

const getStatusColor = (status) => {
  switch (status) {
    case "Upcoming":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "Planning":
      return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    case "Completed":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "Upcoming":
      return <Plane size={12} />;
    case "Planning":
      return <Loader2 size={12} />;
    case "Completed":
      return <CheckCircle size={12} />;
    default:
      return <Clock size={12} />;
  }
};

const MyJourneysPage = () => {
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
              <MapPin className="text-rose-500" size={32} />
              My Journeys
            </h1>
            <p className="text-gray-400 mt-1">
              Track your past adventures and upcoming trips
            </p>
          </div>
        </motion.div>

        {/* Journey Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {dummyJourneys.map((trip) => (
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
                  <div className="absolute top-3 right-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-full text-xs font-medium border ${getStatusColor(
                        trip.status
                      )}`}
                    >
                      {getStatusIcon(trip.status)}
                      {trip.status}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-full text-xs text-white font-medium border border-white/20">
                      {trip.country}
                    </span>
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
                      <MapPin size={14} />
                      {trip.travelers} traveler{trip.travelers > 1 ? "s" : ""}
                    </div>
                  </div>

                  {/* Itinerary Preview */}
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {trip.itinerary}
                  </p>

                  {/* Days Left / Status Info */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    {trip.daysLeft ? (
                      <span className="text-xs text-rose-400 font-medium">
                        {trip.daysLeft} days to go
                      </span>
                    ) : (
                      <span className="text-xs text-blue-400 font-medium">
                        Trip completed
                      </span>
                    )}
                    <button className="text-xs text-gray-400 hover:text-white transition-colors font-medium">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {dummyJourneys.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <Plane size={32} className="text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              No journeys yet
            </h3>
            <p className="text-gray-500">
              Start planning your first adventure!
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default MyJourneysPage;
