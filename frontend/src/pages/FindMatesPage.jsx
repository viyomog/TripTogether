import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Plane,
  Heart,
  UserPlus,
  Search,
  Filter,
  MessageCircle,
  Star,
  Users,
} from "lucide-react";
import Navbar from "../components/Navbar";

import toast from "react-hot-toast";

const dummyUsers = [
  {
    _id: "1",
    username: "wanderlust_sarah",
    fullName: "Sarah Chen",
    bio: "Digital nomad exploring Southeast Asia. Love street food and hidden beaches!",
    age: 26,
    gender: "female",
    location: { city: "Bangkok", country: "Thailand" },
    travelInterests: [
      "Street Food",
      "Beach Vibes",
      "Photography",
      "Backpacking",
    ],
    travelStyle: "budget",
    profilePic: "https://i.pravatar.cc/300?img=1",
    followers: ["a", "b", "c"],
    following: ["d", "e"],
  },
  {
    _id: "2",
    username: "mountain_mike",
    fullName: "Mike Torres",
    bio: "Adventure junkie. Hiking, camping, and conquering peaks. Next stop: Patagonia!",
    age: 31,
    gender: "male",
    location: { city: "Denver", country: "USA" },
    travelInterests: ["Hiking", "Camping", "Mountaineering", "Wildlife"],
    travelStyle: "mid-range",
    profilePic: "https://i.pravatar.cc/300?img=12",
    followers: ["a", "b"],
    following: ["c", "d", "e"],
  },
  {
    _id: "3",
    username: "luxury_luna",
    fullName: "Luna Rossi",
    bio: "Luxury travel curator. 5-star resorts, fine dining, and exclusive experiences.",
    age: 29,
    gender: "female",
    location: { city: "Milan", country: "Italy" },
    travelInterests: [
      "Fine Dining",
      "Spa & Wellness",
      "Art & Culture",
      "Shopping",
    ],
    travelStyle: "luxury",
    profilePic: "https://i.pravatar.cc/300?img=5",
    followers: ["a", "b", "c", "d"],
    following: ["e"],
  },
  {
    _id: "4",
    username: "backpacker_raj",
    fullName: "Raj Patel",
    bio: "Budget traveler on a mission to visit 50 countries. Currently at 32!",
    age: 24,
    gender: "male",
    location: { city: "Mumbai", country: "India" },
    travelInterests: [
      "Backpacking",
      "Cultural Heritage",
      "Local Experiences",
      "Street Food",
    ],
    travelStyle: "budget",
    profilePic: "https://i.pravatar.cc/300?img=8",
    followers: ["a"],
    following: ["b", "c"],
  },
  {
    _id: "5",
    username: "culture_emma",
    fullName: "Emma Johansson",
    bio: "History buff and museum lover. Every city has a story waiting to be discovered.",
    age: 33,
    gender: "female",
    location: { city: "Stockholm", country: "Sweden" },
    travelInterests: [
      "Cultural Heritage",
      "Museums",
      "Architecture",
      "Local Cuisine",
    ],
    travelStyle: "mid-range",
    profilePic: "https://i.pravatar.cc/300?img=9",
    followers: ["a", "b", "c"],
    following: ["d", "e", "f"],
  },
  {
    _id: "6",
    username: "surf_alex",
    fullName: "Alex Kim",
    bio: "Chasing waves around the world. Surf, sun, and good vibes only.",
    age: 27,
    gender: "other",
    location: { city: "Bali", country: "Indonesia" },
    travelInterests: ["Surfing", "Beach Vibes", "Yoga", "Photography"],
    travelStyle: "mid-range",
    profilePic: "https://i.pravatar.cc/300?img=15",
    followers: ["a", "b"],
    following: ["c"],
  },
  {
    _id: "7",
    username: "foodie_yuki",
    fullName: "Yuki Tanaka",
    bio: "Traveling the world one dish at a time. Food is the best way to experience culture!",
    age: 30,
    gender: "female",
    location: { city: "Tokyo", country: "Japan" },
    travelInterests: [
      "Street Food",
      "Fine Dining",
      "Cooking Classes",
      "Markets",
    ],
    travelStyle: "mid-range",
    profilePic: "https://i.pravatar.cc/300?img=20",
    followers: ["a", "b", "c", "d", "e"],
    following: ["f", "g"],
  },
  {
    _id: "8",
    username: "nomad_carlos",
    fullName: "Carlos Rivera",
    bio: "Remote worker by day, explorer by night. Let's connect and share travel tips!",
    age: 28,
    gender: "male",
    location: { city: "Lisbon", country: "Portugal" },
    travelInterests: ["Digital Nomad", "Co-working", "Nightlife", "Hiking"],
    travelStyle: "budget",
    profilePic: "https://i.pravatar.cc/300?img=11",
    followers: ["a"],
    following: ["b", "c", "d"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
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

const getTravelStyleColor = (style) => {
  switch (style) {
    case "budget":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "luxury":
      return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    default:
      return "bg-rose-500/20 text-rose-400 border-rose-500/30";
  }
};

const FindMatesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [followedUsers, setFollowedUsers] = useState(new Set());

  const filteredUsers = dummyUsers.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.location?.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.location?.country
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      user.travelInterests?.some((interest) =>
        interest.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesStyle =
      selectedStyle === "all" || user.travelStyle === selectedStyle;
    const matchesGender =
      selectedGender === "all" || user.gender === selectedGender;

    return matchesSearch && matchesStyle && matchesGender;
  });

  const handleFollow = (userId) => {
    setFollowedUsers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
        toast.success("Unfollowed!", {
          style: { background: "#321B22", color: "#fff", borderRadius: "12px" },
        });
      } else {
        newSet.add(userId);
        toast.success("Following! You'll see their travel updates.", {
          style: { background: "#321B22", color: "#fff", borderRadius: "12px" },
        });
      }
      return newSet;
    });
  };

  return (
    <div className="bg-[#0f172a] min-h-screen flex flex-col text-gray-200 font-sans overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-rose-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="pt-10 pb-20 px-4 sm:px-6 lg:px-8 z-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        ></motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mb-8 space-y-4"
        >
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by name, location, or interest..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-5 py-3.5 rounded-xl border transition-all flex items-center gap-2 ${
                showFilters
                  ? "bg-rose-500/20 border-rose-500/30 text-rose-400"
                  : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
              }`}
            >
              <Filter size={20} />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl flex flex-wrap gap-4 overflow-hidden"
              >
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-medium">
                    Travel Style
                  </label>
                  <div className="flex gap-2">
                    {["all", "budget", "mid-range", "luxury"].map((style) => (
                      <button
                        key={style}
                        onClick={() => setSelectedStyle(style)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                          selectedStyle === style
                            ? "bg-rose-500 text-white"
                            : "bg-white/5 text-gray-400 hover:bg-white/10"
                        }`}
                      >
                        {style === "all" ? "All" : style}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-medium">
                    Gender
                  </label>
                  <div className="flex gap-2">
                    {["all", "male", "female", "other"].map((gender) => (
                      <button
                        key={gender}
                        onClick={() => setSelectedGender(gender)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                          selectedGender === gender
                            ? "bg-rose-500 text-white"
                            : "bg-white/5 text-gray-400 hover:bg-white/10"
                        }`}
                      >
                        {gender === "all" ? "All" : gender}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-500 mb-6"
        >
          Showing {filteredUsers.length} traveler
          {filteredUsers.length !== 1 ? "s" : ""}
        </motion.p>

        {/* User Grid */}
        {filteredUsers.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredUsers.map((user) => (
              <motion.div key={user._id} variants={itemVariants}>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:border-rose-500/30 hover:bg-white/[0.07] transition-all duration-300 group">
                  {/* Profile Pic */}
                  <div className="relative shrink-0">
                    <img
                      src={user.profilePic}
                      alt={user.fullName}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white/20 group-hover:border-rose-500 transition-colors"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0f172a]" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-white truncate group-hover:text-rose-400 transition-colors">
                      {user.fullName}
                    </h3>
                    <p className="text-xs text-gray-400 truncate">
                      @{user.username}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => handleFollow(user._id)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        followedUsers.has(user._id)
                          ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                          : "bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-500/20"
                      }`}
                    >
                      <UserPlus size={12} />
                      {followedUsers.has(user._id) ? "Following" : "Follow"}
                    </button>
                    <button
                      onClick={() =>
                        toast("Message feature coming soon!", {
                          icon: "💬",
                          style: {
                            background: "#321B22",
                            color: "#fff",
                            borderRadius: "12px",
                          },
                        })
                      }
                      className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-all flex items-center gap-1.5 text-xs font-medium"
                    >
                      <MessageCircle size={14} />
                      Message
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <Search size={32} className="text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              No travelers found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filters to find more travel mates.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedStyle("all");
                setSelectedGender("all");
              }}
              className="px-6 py-3 bg-rose-500 text-white font-medium rounded-xl hover:bg-rose-600 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default FindMatesPage;
