import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import Navbar from "../components/Navbar";
import TimelineJourney from "../components/TimeLineJouney";
import TravelLoader from "../components/TravelLoader";
import API_BASE_URL from "../config/api";
import toast from "react-hot-toast";

export default function JourneyPlanner() {
  const [places, setPlaces] = useState([]);
  const [placeSearch, setPlaceSearch] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const addCity = () => {
    if (!placeSearch.trim() || !arrivalDate) {
      toast.error("Please fill all fields");

      return;
    }

    const newPlace = {
      id: uuidv4(),

      place: placeSearch.trim(),

      date: arrivalDate,
    };

    setPlaces((prev) => [...prev, newPlace]);

    setPlaceSearch("");

    setArrivalDate("");

    toast.success("Destination added!");
  };

  const handlePlanWithAI = async () => {
    try {
      if (prompt.trim() === "") {
        toast.error("Please enter a prompt!");

        return;
      }

      setIsGenerating(true);

      const response = await fetch(`${API_BASE_URL}/api/city/ai-plan`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userPrompt: prompt,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (!data.success) {
        toast.error(data.message || "Failed to generate AI plan");

        return;
      }

      setPlaces(data.tripPlan || []);

      toast.success("AI Trip Generated!");
    } catch (err) {
      console.error("AI Planning Error:", err);

      toast.error("Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1707343848552-893e05dba6ac?w=1600&auto=format&fit=crop&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/70 z-0" />

      <div className="relative z-10">
        <Navbar />

        <div className="px-4 md:px-6 py-10 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-center my-10">
            Plan Your Journey
          </h1>

          {isGenerating === true ? (
            <div className="mt-10">
              <TravelLoader />
            </div>
          ) : (
            <>
              {!isGenerating && places.length > 0 && (
                <div className="mt-12">
                  <TimelineJourney places={places} setPlaces={setPlaces} />
                </div>
              )}

              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl mb-8">
                <h2 className="text-2xl font-semibold mb-5">
                  Add Destination Manually
                </h2>

                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="Enter place"
                    value={placeSearch}
                    onChange={(e) => setPlaceSearch(e.target.value)}
                    className="flex-1 p-3 rounded-xl bg-white/20 border border-white/10 outline-none placeholder:text-gray-300"
                  />

                  <input
                    type="date"
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                    className="p-3 rounded-xl bg-white/20 border border-white/10 outline-none"
                  />

                  <button
                    onClick={addCity}
                    className="bg-rose-600 hover:bg-rose-700 transition px-6 py-3 rounded-xl font-semibold"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                <h2 className="text-2xl font-semibold mb-5">
                  Generate AI Travel Plan
                </h2>

                <textarea
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={`Examples:

Plan a 3 day Delhi trip

Plan Rajasthan trip

Plan a Goa vacation

Plan a Japan tour

Plan a Himachal road trip`}
                  className="w-full p-4 rounded-2xl bg-white/20 border border-white/10 outline-none resize-none placeholder:text-gray-300"
                />

                <div className="flex justify-center mt-6">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handlePlanWithAI}
                    className="bg-purple-700 hover:bg-purple-800 px-8 py-4 rounded-full flex items-center gap-3 text-lg font-semibold shadow-xl"
                  >
                    <FaRobot className="text-xl" />
                    Generate AI Plan
                  </motion.button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
