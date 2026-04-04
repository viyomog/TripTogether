import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CookiePolicyPage = () => {
  return (
    <div className="bg-[#0f172a] min-h-screen flex flex-col text-gray-200 font-sans">
      <Navbar />
      <main className="flex-grow pt-32 pb-16 px-6 max-w-4xl mx-auto w-full z-10">
        <h1 className="text-4xl font-black text-[#f43f5e] tracking-tight mb-8 mt-10">Cookie Policy</h1>
        
        <div className="bg-gray-900 border border-gray-800 p-8 md:p-12 rounded-2xl shadow-lg leading-relaxed text-gray-300">
          <p className="mb-8 text-sm text-gray-500 uppercase tracking-wider font-bold">Last updated: April 2026</p>
          
          <p className="mb-6">This Cookie Policy explains what cookies are and how TripTogether uses them to enhance your browsing and planning experience.</p>
          
          <h2 className="text-2xl font-bold text-white mt-10 mb-4">1. What Are Cookies?</h2>
          <p className="mb-4">Cookies are small pieces of data stored on your device (computer or mobile device) when you visit a website. They are widely used to make websites work more efficiently and provide information to the site owners.</p>
          
          <h2 className="text-2xl font-bold text-white mt-10 mb-4">2. How We Use Cookies</h2>
          <p className="mb-4">We use essential cookies to keep you logged in securely so you don't lose access to your trips. We also use functional cookies to remember your preferences, like whether you prefer the dark or light theme.</p>
          
          <h2 className="text-2xl font-bold text-white mt-10 mb-4">3. Managing Cookies</h2>
          <p className="mb-4">You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. However, please note that disabling cookies may significantly impact your ability to use the secure authentication features of our application.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default CookiePolicyPage;
