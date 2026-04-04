import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './pages/ContactPage';
import FaqPage from './pages/FaqPage';
import HelpCenterPage from './pages/HelpCenterPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import { UserProvider } from './context/userContext';
import './App.css';

const routeOrder = ['/', '/contact', '/faqs', '/mates', '/login'];

const AppRoutes = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  let currentIndex = routeOrder.indexOf(currentPath);
  if (currentIndex === -1) currentIndex = 99; // Defaults

  const prevIndexRef = React.useRef(currentIndex);

  // Set the global direction hook prior to returning JSX and framer-motion evaluating components
  if (currentIndex >= prevIndexRef.current) {
    window.navDirection = 'right'; // pushing to a page further down the navbar
  } else {
    window.navDirection = 'left'; // navigating 'backwards' up the navbar
  }

  React.useEffect(() => {
    prevIndexRef.current = currentIndex;
  }, [currentIndex]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Set Home as the index route */}
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        
        {/* Auth routes */}
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><SignupPage /></PageTransition>} />

        {/* Info routes */}
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/faqs" element={<PageTransition><FaqPage /></PageTransition>} />
        <Route path="/help" element={<PageTransition><HelpCenterPage /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><PrivacyPolicyPage /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><TermsOfServicePage /></PageTransition>} />
        <Route path="/cookies" element={<PageTransition><CookiePolicyPage /></PageTransition>} />
        
        {/* User paths */}
        <Route path="/profile" element={<PageTransition><ProfilePage /></PageTransition>} />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

export default App;
