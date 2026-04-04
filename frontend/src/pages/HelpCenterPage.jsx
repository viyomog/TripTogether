import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const HelpCenterPage = () => {
  return (
    <div className="bg-[#0f172a] min-h-screen flex flex-col text-gray-200 font-sans">
      <Navbar />
      <main className="flex-grow pt-32 pb-16 px-6 max-w-5xl mx-auto w-full text-center z-10">
        <h1 className="text-4xl md:text-5xl font-black text-[#f43f5e] tracking-tight mb-6 mt-10">Welcome to the Help Center</h1>
        <p className="mb-16 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Need assistance planning your journey or managing your account? Find advice and answers from the TripTogether team below.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/faqs" className="bg-gray-900 border border-gray-800 hover:border-[#f43f5e] p-10 rounded-2xl shadow-lg transition-all hover:-translate-y-1 block group text-left">
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#f43f5e] transition-colors">FAQs</h3>
            <p className="text-gray-400">Browse answers to the most frequently asked questions about the platform.</p>
          </Link>
          
          <Link to="/contact" className="bg-gray-900 border border-gray-800 hover:border-[#f43f5e] p-10 rounded-2xl shadow-lg transition-all hover:-translate-y-1 block group text-left">
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#f43f5e] transition-colors">Contact Support</h3>
            <p className="text-gray-400">Can't find what you're looking for? Reach out directly to our support engineers.</p>
          </Link>
          
          <div className="bg-gray-900 border border-gray-800 p-10 rounded-2xl shadow-lg text-left opacity-60">
            <h3 className="text-2xl font-bold text-white mb-3">Community Guides</h3>
            <p className="text-gray-400">Step-by-step traveler tutorials and community tips (Coming soon).</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default HelpCenterPage;
