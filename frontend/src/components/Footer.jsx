import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-gray-300 py-16 px-6 border-t border-gray-800 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="space-y-4">
          <h3 className="text-2xl font-black text-[#f43f5e] tracking-tight">TripTogether</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Organize your trips with friends, discover places, and create unforgettable journeys — all in one place.
          </p>
        </div>
        
        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-4">Explore</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-[#f43f5e] transition-colors">Home</Link></li>
            <li><Link to="/plan" className="hover:text-[#f43f5e] transition-colors">Plan a Journey</Link></li>
            <li><Link to="/mates" className="hover:text-[#f43f5e] transition-colors">Find Mates</Link></li>
            <li><Link to="/destinations" className="hover:text-[#f43f5e] transition-colors">Destinations</Link></li>
          </ul>
        </div>
        
        {/* Support Links */}
        <div>
          <h4 className="text-white font-bold mb-4">Support</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/faqs" className="hover:text-[#f43f5e] transition-colors">FAQs</Link></li>
            <li><Link to="/contact" className="hover:text-[#f43f5e] transition-colors">Contact Us</Link></li>
            <li><Link to="/help" className="hover:text-[#f43f5e] transition-colors">Help Center</Link></li>
          </ul>
        </div>
        
        {/* Legal Links */}
        <div>
          <h4 className="text-white font-bold mb-4">Legal</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/privacy" className="hover:text-[#f43f5e] transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-[#f43f5e] transition-colors">Terms of Service</Link></li>
            <li><Link to="/cookies" className="hover:text-[#f43f5e] transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} TripTogether. All rights reserved.</p>
        <div className="mt-4 md:mt-0 flex space-x-6">
          <a href="#" className="hover:text-[#f43f5e] transition-colors font-medium">Twitter</a>
          <a href="#" className="hover:text-[#f43f5e] transition-colors font-medium">Instagram</a>
          <a href="#" className="hover:text-[#f43f5e] transition-colors font-medium">Facebook</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
