import React from "react";
import { FaGlobeAmericas, FaMapMarkerAlt } from "react-icons/fa";

const TravelLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 dark:bg-gray-900 text-blue-600 dark:text-white">
      <div className="relative">
        <FaGlobeAmericas className="w-16 h-16 animate-spin-slow text-blue-500" />
        <FaMapMarkerAlt className="absolute top-0 right-0 w-5 h-5 animate-bounce text-red-500" />
        <FaMapMarkerAlt className="absolute bottom-2 left-1 w-4 h-4 animate-bounce text-yellow-500" />
      </div>
      <p className="mt-4 text-lg font-medium animate-pulse">Planning your perfect journey...</p>
    </div>
  );
};

export default TravelLoader;
