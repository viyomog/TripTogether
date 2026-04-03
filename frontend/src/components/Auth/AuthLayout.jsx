import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import '../../styles/Auth.css';
import logo from '../../assets/logo/logo.png';

const AuthLayout = ({ children, title, subtitle }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const moveX = clientX - window.innerWidth / 2;
    const moveY = clientY - window.innerHeight / 2;
    mouseX.set(moveX);
    mouseY.set(moveY);
  };

  const springConfig = { damping: 30, stiffness: 100, bounce: 0 };
  const floatX = useSpring(useTransform(mouseX, [-500, 500], [-20, 20]), springConfig);
  const floatY = useSpring(useTransform(mouseY, [-500, 500], [-20, 20]), springConfig);

  return (
    <div className="auth-container" onMouseMove={handleMouseMove}>
      {/* Mesh Gradient Background */}
      <div className="mesh-bg">
        <motion.div 
          className="mesh-blob mesh-blob-1"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="mesh-blob mesh-blob-2"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -60, 0],
            x: [0, -40, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="mesh-blob mesh-blob-3"
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>



      <motion.div 
        className="auth-card"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        style={{
            rotateX: useTransform(mouseY, [-500, 500], [5, -5]),
            rotateY: useTransform(mouseX, [-500, 500], [-5, 5]),
        }}
      >
        <div className="auth-header">
          <motion.div 
            className="auth-logo-wrapper"
            whileHover={{ scale: 1.1, rotate: 12 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src={logo} alt="Triptogether Logo" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
          </motion.div>
          <motion.h1 
            className="auth-title"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {title}
          </motion.h1>
          <motion.p 
            className="auth-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {subtitle}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
