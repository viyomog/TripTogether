import React from "react";
import { IoAddCircle } from "react-icons/io5";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const UserCard = ({ user, loggedInUserFollowing }) => {
  const avatarColors = [
    "bg-rose-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-orange-500",
    "bg-teal-500",
    "bg-cyan-500",
  ];

  const getColorClass = (username) => {
    let sum = 0;
    for (let i = 0; i < username.length; i++) {
      sum += username.charCodeAt(i);
    }
    return avatarColors[sum % avatarColors.length];
  };

  const handleFollow = async (userId, username) => {
    try {
      const {data} = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/follow`,
        { userId },
        { withCredentials: true }
      );

      if(data.success) {
        toast.success(`Following ${username}!`);
        loggedInUserFollowing.push(userId)
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Follow failed:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleunfollow = async (userId, username) => {
    try {
      const {data} = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/unfollow`,
        { userId },
        { withCredentials: true }
      );

      if(data.success) {
        toast.success(`Unfollowed ${username}!`);
        loggedInUserFollowing = loggedInUserFollowing.filter(id => {
            return id !== userId;
        })
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Follow failed:", error);
      toast.error("Something went wrong!");
    }
  }  

  return (
    <motion.div
      key={user._id}
      whileHover={{ scale: 1.03 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex items-center justify-between transition-transform duration-300"
    >
      {/* Left: Profile Pic */}
      <div className="flex items-center gap-4">
        {user.profilePic ? (
          <img
            src={user.profilePic}
            alt={user.username}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold ${getColorClass(
              user.username
            )}`}
          >
            {user.username.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="flex flex-col">
          {/* Username Link */}
          <Link
            to={`/user/profile/${user._id}`}
            className="text-lg font-semibold text-gray-900 dark:text-white hover:underline"
          >
            {user.username}
          </Link>

          {/* Stats */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {user.followers.length || 0} followers • {user.tripsCount || 0} trips
          </p>
        </div>
      </div>

      {/* Follow Button */}
      <div className="relative group">
        {loggedInUserFollowing.includes(user._id) ? (
          <>
            <button
              onClick={() => handleunfollow(user._id, user.username)}
              className="text-green-600 hover:text-green-700 transition-colors text-2xl"
            >
              <IoMdCheckmarkCircleOutline />
            </button>
            <div className="absolute right-1/2 translate-x-1/2 top-full mt-1 px-2 py-0.5 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
              Unfollow
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => handleFollow(user._id, user.username)}
              className="text-rose-600 hover:text-rose-700 transition-colors text-2xl"
            >
              <IoAddCircle />
            </button>
            <div className="absolute right-1/2 translate-x-1/2 top-full mt-1 px-2 py-0.5 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
              Follow
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default UserCard;
