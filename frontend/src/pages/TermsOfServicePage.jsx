import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsOfServicePage = () => {
  return (
    <div className="bg-[#0f172a] min-h-screen flex flex-col text-gray-200 font-sans">
      <Navbar />
      <main className="flex-grow pt-32 pb-16 px-6 max-w-4xl mx-auto w-full z-10">
        <h1 className="text-4xl font-black text-[#f43f5e] tracking-tight mb-8 mt-10">Terms of Service</h1>
        
        <div className="bg-gray-900 border border-gray-800 p-8 md:p-12 rounded-2xl shadow-lg leading-relaxed text-gray-300">
          <p className="mb-8 text-sm text-gray-500 uppercase tracking-wider font-bold">Last updated: April 2026</p>
          
          <p className="mb-6">Please read these Terms of Service carefully before using the TripTogether website and application operated by our team.</p>
          
          <h2 className="text-2xl font-bold text-white mt-10 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service or its planning utilities.</p>
          
          <h2 className="text-2xl font-bold text-white mt-10 mb-4">2. User Accounts</h2>
          <p className="mb-4">When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
          
          <h2 className="text-2xl font-bold text-white mt-10 mb-4">3. Content Restrictions</h2>
          <p className="mb-4">You are responsible for the content you post and organize in your itineraries. You may not post any content that is illegal, offensive, hazardous, or violates the rights of third parties or public safety regulations.</p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">4. Changes to Terms</h2>
          <p className="mb-4">We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of significant changes before they take effect.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default TermsOfServicePage;
