import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: () => {
    const dir = window.navDirection === 'left' ? -30 : 30;
    return {
      opacity: 0,
      x: dir,
    };
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: () => {
    const dir = window.navDirection === 'left' ? 30 : -30;
    return {
      opacity: 0,
      x: dir,
    };
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.4,
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      custom={1}
      variants={pageVariants}
      transition={pageTransition}
      className="w-full min-h-screen flex flex-col"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
