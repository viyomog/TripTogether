import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactPage = () => {
  return (
    <div className="bg-[#0f172a] min-h-screen flex flex-col text-gray-200 font-sans">
      <Navbar />
      <main className="flex-grow pt-32 pb-16 px-6 max-w-4xl mx-auto w-full z-10">
        <h1 className="text-4xl font-black text-[#f43f5e] tracking-tight mb-6 mt-10">Contact Us</h1>
        <p className="mb-8 text-lg text-gray-300">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        
        <form className="space-y-6 bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-2xl">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">Name</label>
            <input type="text" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#f43f5e] text-white transition-colors" placeholder="Your Name" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">Email</label>
            <input type="email" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#f43f5e] text-white transition-colors" placeholder="your@email.com" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">Message</label>
            <textarea rows="5" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#f43f5e] text-white transition-colors" placeholder="How can we help you plan your journey?"></textarea>
          </div>
          <button type="button" className="w-full py-4 bg-[#f43f5e] hover:bg-[#e11d48] text-white font-bold rounded-lg transition-colors drop-shadow-md">
            Send Message
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};
export default ContactPage;
