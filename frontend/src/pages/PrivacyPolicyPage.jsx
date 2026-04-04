import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-[#0f172a] min-h-screen flex flex-col text-gray-200 font-sans">
      <Navbar />
      <main className="flex-grow pt-32 pb-16 px-6 max-w-4xl mx-auto w-full z-10">
        <h1 className="text-4xl font-black text-[#f43f5e] tracking-tight mb-8 mt-10">Privacy Policy</h1>
        
        <div className="bg-gray-900 border border-gray-800 p-8 md:p-12 rounded-2xl shadow-lg leading-relaxed text-gray-300">
          <p className="mb-8 text-sm text-gray-500 uppercase tracking-wider font-bold">Last updated: April 2026</p>
          
          <p className="mb-6">At TripTogether, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our application.</p>
          
          <h2 className="text-2xl font-bold text-white mt-10 mb-4">1. Information We Collect</h2>
          <p className="mb-4">We collect information that you provide directly to us when you register for an account, create a trip itinerary, or communicate with us. This may include your name, email address, profile picture, and content you post about your travels.</p>
          
          <h2 className="text-2xl font-bold text-white mt-10 mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect to operate, maintain, and provide the features and functionality of TripTogether. This includes verifying access to your account, sending you planning updates, and facilitating communication between your travel mates.</p>
          
          <h2 className="text-2xl font-bold text-white mt-10 mb-4">3. Sharing Your Information</h2>
          <p className="mb-4">We do not share your personal information with third parties without your consent, except in circumstances where it is legally required or absolutely necessary to provide our core service (such as securely authenticating you).</p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">4. Security</h2>
          <p className="mb-4">We utilize standard, secure encryption protocols to protect your password and personal travel itineraries. However, no internet transmission is ever fully secure.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default PrivacyPolicyPage;
