import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Starry = () => {
  const [message, setMessage] = useState("Hi! I'm Starry 🌟 your AI companion. Let's make your day extra productive!!!");

  const motivationalMessages = [
    "Hi! I'm Starry 🌟 Let's crush it today!",
    "Low energy? I've got your back with a dopamine boost!",
    "Time for a quick reward? ☕ You deserve it!",
    "You're doing amazing! Keep going, I'm cheering for you! 💖",
    "Hyperfocus window detected? Let's ride that wave!"
  ];

  const handleClick = () => {
    const randomMsg = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    setMessage(randomMsg);
  };

  return (
    <motion.div
      // Framer Motion's built-in drag props
      drag
      dragMomentum={false} 
      whileHover={{ scale: 1.1 }}
      whileTap={{ cursor: "grabbing" }}
      // Initial positioning
      className="fixed bottom-10 right-10 z-[9999] cursor-grab"
      onClick={handleClick}
    >
      <div className="relative">
        <motion.div
          animate={{
            rotate: [0, 8, -8, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-20 h-20 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 rounded-full flex items-center justify-center text-6xl shadow-2xl shadow-pink-500/60 border-4 border-white/30"
        >
          ⭐
        </motion.div>

        <div className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] font-bold w-7 h-7 rounded-full flex items-center justify-center border-2 border-white">
          AI
        </div>
      </div>

      {/* Speech Bubble */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-28 -left-20 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm leading-tight rounded-3xl px-5 py-4 w-[220px] shadow-xl border border-slate-200 dark:border-slate-700 pointer-events-none"
      >
        {message}
        <div className="absolute -bottom-2 left-24 w-5 h-5 bg-white dark:bg-slate-800 border-r border-b border-slate-200 dark:border-slate-700 rotate-45"></div>
      </motion.div>
    </motion.div>
  );
};

export default Starry;