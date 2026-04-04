import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { UserContext } from '../context/userContext';
import { motion } from 'framer-motion';

const defaultAvatar = "https://ui-avatars.com/api/?name=User&background=c084fc&color=fff&size=128";

const ProfilePage = () => {
  const { user } = useContext(UserContext);

  // Mock data for frontend design - the backend will plug into this structure later
  const profileUser = user || {
    name: "Alex Traveler",
    email: "alex@example.com",
    bio: "Adventure seeker and food lover. Always planning the next escape!",
    location: "New York, USA",
    joined: "April 2026",
    avatar: defaultAvatar
  };

  const mockTrips = [
    { id: 1, destination: "Tokyo, Japan", dates: "Oct 12 - Oct 25, 2026", status: "Upcoming", image: "/tokyo.jpg" },
    { id: 2, destination: "Paris, France", dates: "Dec 5 - Dec 15, 2026", status: "Planning", image: "/paris.jpg" },
    { id: 3, destination: "Rome, Italy", dates: "May 10 - May 20, 2025", status: "Past", image: "/rome.jpg" }
  ];

  return (
    <div className="bg-[#0f172a] min-h-screen flex flex-col text-gray-200 font-sans">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-16 px-4 sm:px-6 max-w-6xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center"
            >
              <div className="relative mb-6 group cursor-pointer">
                <img 
                  src={profileUser.avatar} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-800 shadow-lg group-hover:border-[#f43f5e] transition-colors"
                />
                <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span className="text-white text-sm font-semibold">Change Photo</span>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-1">{profileUser.name}</h2>
              <p className="text-[#f43f5e] font-medium mb-4">{profileUser.email}</p>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-6 px-4">
                {profileUser.bio}
              </p>
              
              <div className="w-full flex justify-between text-sm text-gray-500 border-t border-gray-800 pt-5 mb-4">
                <span>Location</span>
                <span className="text-gray-300 font-medium">{profileUser.location}</span>
              </div>
              <div className="w-full flex justify-between text-sm text-gray-500 pb-5">
                <span>Joined</span>
                <span className="text-gray-300 font-medium">{profileUser.joined}</span>
              </div>
              
              <button className="w-full py-3 mt-2 border-2 border-gray-700 text-gray-300 hover:border-[#f43f5e] hover:text-[#f43f5e] font-bold rounded-lg transition-colors">
                Edit Profile
              </button>
            </motion.div>
          </div>

          {/* Right Content - Trips */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-3xl font-black text-white tracking-tight mb-6">My Journeys</h1>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {mockTrips.map((trip) => (
                  <div key={trip.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg group cursor-pointer hover:border-gray-600 transition-colors">
                    <div className="h-40 overflow-hidden relative">
                      <img 
                        src={trip.image} 
                        alt={trip.destination} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-xs font-bold px-3 py-1 rounded-full text-white border border-gray-500/30">
                        {trip.status}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#f43f5e] transition-colors">{trip.destination}</h3>
                      <p className="text-sm text-gray-400 flex items-center gap-2">
                        {/* Calendar Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {trip.dates}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Create New Trip Card */}
                <div className="bg-gray-800/20 border-2 border-dashed border-gray-700 rounded-2xl flex flex-col items-center justify-center p-8 hover:border-[#f43f5e] hover:bg-gray-800/40 transition-all cursor-pointer group min-h-[16rem]">
                  <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4 group-hover:bg-[#f43f5e] transition-colors shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-300 group-hover:text-white transition-colors">Plan a New Journey</h3>
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
