import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const faqs = [
  { q: "How do I create a new trip?", a: "To create a new trip, sign up for an account, go to your dashboard, and click 'Plan a Journey'. Follow the prompts to set your destination and dates." },
  { q: "Can I invite friends to my trip?", a: "Yes! Once you create a trip, you can invite friends via email or by sharing a unique trip link so you can collaborate." },
  { q: "Is TripTogether free to use?", a: "Yes, our core features for planning and collaborating with friends are completely free." },
  { q: "How do I find travel mates?", a: "Visit the 'Find Mates' section to connect with other travelers heading to similar destinations." }
];

const FaqPage = () => {
  return (
    <div className="bg-[#0f172a] min-h-screen flex flex-col text-gray-200 font-sans">
      <Navbar />
      <main className="flex-grow pt-32 pb-16 px-6 max-w-4xl mx-auto w-full z-10">
        <h1 className="text-4xl font-black text-[#f43f5e] tracking-tight mb-6 mt-10">Frequently Asked Questions</h1>
        <p className="mb-10 text-lg text-gray-300">Find answers to the most common questions about TripTogether.</p>
        
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-white mb-3">{faq.q}</h3>
              <p className="text-gray-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default FaqPage;
