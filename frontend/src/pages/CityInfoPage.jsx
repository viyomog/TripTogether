import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  CalendarDays,
  MapPin,
} from "lucide-react";
import API_BASE_URL from "../config/api";

const CityInfoPage = () => {
  const { cityName } = useParams();

  const [city, setCity] = useState(cityName || "");

  const [photos, setPhotos] = useState([]);
  const [cityInfo, setCityInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  const fetchCityPhotos = async (searchedCity) => {
    try {
      setLoading(true);

      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: `${searchedCity} famous places travel`,
            per_page: 10,
            orientation: "landscape",
          },
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        },
      );

      setPhotos(response.data.results || []);
    } catch (error) {
      console.error("Error fetching city photos:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCityInfo = async (city) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/city/${city}`);

      setCityInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (cityName) {
      setCity(cityName);
      fetchCityPhotos(cityName);
      fetchCityInfo(cityName);
    }
  }, [cityName]);

  // Auto carousel
  useEffect(() => {
    if (photos.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [photos]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1120] transition-colors duration-300">
      {/* HERO CAROUSEL */}
      <div className="relative h-[70vh] overflow-hidden">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-900">
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              Loading beautiful places...
            </p>
          </div>
        ) : (
          photos.map((photo, index) => (
            <div
              key={photo.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={photo.urls.regular}
                alt={photo.alt_description}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/55" />

              {/* Content */}
              <div className="absolute bottom-10 left-6 md:left-14 text-white max-w-3xl">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-rose-400" />

                  <span className="text-sm md:text-base tracking-wide">
                    Discover
                  </span>
                </div>

                <h1 className="text-4xl md:text-7xl font-extrabold mb-4">
                  {cityName}
                </h1>

                {/* DYNAMIC ONE LINER */}
                <p className="text-sm md:text-xl text-gray-200 leading-relaxed">
                  {cityInfo?.oneLiner ||
                    `Explore the beauty and unforgettable experiences of ${cityName}.`}
                </p>
              </div>
            </div>
          ))
        )}

        {/* Left Arrow */}
        {photos.length > 0 && (
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-md transition"
          >
            <ChevronLeft size={28} />
          </button>
        )}

        {/* Right Arrow */}
        {photos.length > 0 && (
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-md transition"
          >
            <ChevronRight size={28} />
          </button>
        )}

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* CITY DETAILS */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-gray-100 dark:bg-[#111827] rounded-3xl p-6 shadow-lg">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Why Visit {cityName}?
              </h2>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {cityInfo?.description}
              </p>
            </div>

            {/* Reasons */}
            <div className="bg-gray-100 dark:bg-[#111827] rounded-3xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-5 text-gray-900 dark:text-white">
                Reasons To Visit
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {cityInfo?.whyVisit?.map((reason, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-[#1F2937] rounded-2xl p-4"
                  >
                    <p className="text-gray-800 dark:text-gray-200">
                      ✨ {reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Must Visit */}
            <div className="bg-gray-100 dark:bg-[#111827] rounded-3xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-5 text-gray-900 dark:text-white">
                Must Visit Places
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {cityInfo?.mustVisit?.map((place, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-[#1F2937] rounded-2xl p-4"
                  >
                    <p className="text-gray-800 dark:text-gray-200">
                      📍 {place}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Famous Foods */}
            <div className="bg-gray-100 dark:bg-[#111827] rounded-3xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-5 text-gray-900 dark:text-white">
                Famous Foods
              </h2>

              <div className="flex flex-wrap gap-3">
                {cityInfo?.famousFood?.map((food, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 rounded-full bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-300 font-medium"
                  >
                    🍜 {food}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-5">
            {/* Rating */}
            <div className="bg-gray-100 dark:bg-[#111827] rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <Star className="text-yellow-400 fill-yellow-400" />

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Traveler Rating
                </h3>
              </div>

              <p className="text-5xl font-bold text-gray-900 dark:text-white">
                {cityInfo?.rating || "9/10"}
              </p>

              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Loved by travelers worldwide
              </p>
            </div>

            {/* Best Time */}
            <div className="bg-gray-100 dark:bg-[#111827] rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <CalendarDays className="text-rose-400" />

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Best Time to Visit
                </h3>
              </div>

              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {cityInfo?.bestTime}
              </p>

              <p className="text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
                {cityInfo?.bestTimeReason}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityInfoPage;
