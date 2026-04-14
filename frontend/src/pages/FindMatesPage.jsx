import React, { useState, useEffect, useRef, useCallback } from "react";
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
  Loader2,
} from "lucide-react";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";

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

const FindMatesPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const [followedUsers, setFollowedUsers] = useState(new Set());

  const observer = useRef();
  const lastUserElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchUsers = useCallback(async (pageNum, query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/user-profile/get-profiles-from-username`,
        {
          params: {
            username: query,
            page: pageNum,
            limit: 12,
          },
          withCredentials: true,
        }
      );

      const data = response.data;
      if (data.success) {
        if (pageNum === 1) {
          setUsers(data.profiles);
        } else {
          setUsers((prev) => [...prev, ...data.profiles]);
        }
        setHasMore(data.profiles.length === 12);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Fetch users error:", error);
      toast.error("Failed to fetch travelers");
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, []);

  // Reset and fetch when search query changes
  useEffect(() => {
    setPage(1);
    fetchUsers(1, searchQuery);
  }, [searchQuery, fetchUsers]);

  // Fetch more when page changes
  useEffect(() => {
    if (page > 1) {
      fetchUsers(page, searchQuery);
    }
  }, [page, searchQuery, fetchUsers]);

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

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 z-10 max-w-7xl mx-auto w-full">
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
                placeholder="Search by username..."
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

        {/* User Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {users.map((user, index) => {
            if (users.length === index + 1) {
              return (
                <motion.div ref={lastUserElementRef} key={user._id} variants={itemVariants}>
                  <UserCard user={user} handleFollow={handleFollow} followedUsers={followedUsers} />
                </motion.div>
              );
            } else {
              return (
                <motion.div key={user._id} variants={itemVariants}>
                  <UserCard user={user} handleFollow={handleFollow} followedUsers={followedUsers} />
                </motion.div>
              );
            }
          })}
        </motion.div>

        {loading && (
          <div className="flex justify-center mt-10">
            <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
          </div>
        )}

        {!hasMore && users.length > 0 && (
          <p className="text-center text-gray-500 mt-10">No more travelers to show.</p>
        )}

        {!loading && users.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <Search size={32} className="text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No travelers found</h3>
            <p className="text-gray-500 mb-6">Try searching for another username.</p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

const UserCard = ({ user, handleFollow, followedUsers }) => (
  <div className="flex flex-col gap-4 p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:border-rose-500/30 hover:bg-white/[0.07] transition-all duration-300 group h-full">
    <div className="flex items-center gap-4">
      <div className="relative shrink-0">
        <img
          src={user.profilePic || "https://i.pravatar.cc/300"}
          alt={user.fullName}
          className="w-16 h-16 rounded-full object-cover border-2 border-white/20 group-hover:border-rose-500 transition-colors"
        />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0f172a]" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-base font-bold text-white truncate group-hover:text-rose-400 transition-colors">
          {user.fullName}
        </h3>
        <p className="text-xs text-gray-400 truncate">@{user.username}</p>
      </div>
    </div>

    <p className="text-sm text-gray-400 line-clamp-2 min-h-[2.5rem]">
      {user.bio || "No bio available."}
    </p>

    <div className="flex flex-wrap gap-2 mt-auto pt-2">
      {user.location && (
        <div className="flex items-center gap-1 text-[10px] bg-white/5 px-2 py-1 rounded-full text-gray-400">
          <MapPin size={10} />
          {user.location.city}, {user.location.country}
        </div>
      )}
      {user.travelStyle && (
        <div className="text-[10px] bg-rose-500/10 border border-rose-500/20 px-2 py-1 rounded-full text-rose-400">
          {user.travelStyle}
        </div>
      )}
    </div>

    <div className="flex gap-2 mt-2">
      <button
        onClick={() => handleFollow(user._id)}
        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
          followedUsers.has(user._id)
            ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
            : "bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-500/20"
        }`}
      >
        <UserPlus size={14} />
        {followedUsers.has(user._id) ? "Following" : "Follow"}
      </button>
      <button
        onClick={() => toast("Messaging coming soon!", { style: { background: "#321B22", color: "#fff" } })}
        className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-all"
      >
        <MessageCircle size={18} />
      </button>
    </div>
  </div>
);

export default FindMatesPage;
