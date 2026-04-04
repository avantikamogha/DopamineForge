import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fireConfetti } from "../utils/confetti";

const XPTracker = ({ currentXP, totalNeeded = 100 }) => {
  const percentage = Math.min((currentXP / totalNeeded) * 100, 100);
  const isFull = percentage >= 100;

  useEffect(() => {
    if (isFull) {
      fireConfetti(); // Celebration when reaching 100%
    }
  }, [isFull]);

  return (
    <div className="relative w-full max-w-md group">
      <div className="flex justify-between items-end mb-2 px-1">
        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-[0.3em] uppercase">
          Neural Focus <span className="text-blue-600">Level 01</span>
        </span>
        <motion.span 
          key={currentXP}
          initial={{ scale: 1.5, color: "#2563eb" }}
          animate={{ scale: 1, color: "#64748b" }}
          className="text-xs font-bold tabular-nums"
        >
          {currentXP} / {totalNeeded} XP
        </motion.span>
      </div>

      {/* The Track */}
      <div className="relative h-4 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden border border-slate-200/50 dark:border-white/10 shadow-inner">
        
        {/* The Filling Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
          className={`relative h-full transition-colors duration-500 ${
            isFull ? "bg-gradient-to-r from-blue-600 to-indigo-600" : "bg-blue-600"
          }`}
        >
          {/* Shimmer Effect */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/2"
          />
        </motion.div>

        {/* Glow when gaining XP */}
        <AnimatePresence>
          {percentage > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              className="absolute inset-0 bg-blue-400/20 blur-sm"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Level Up Badge */}
      {isFull && (
        <motion.div
          initial={{ scale: 0, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          className="absolute -right-4 -top-4 bg-yellow-400 text-black text-[10px] font-black px-2 py-1 rounded-lg shadow-lg rotate-12"
        >
          MAXED
        </motion.div>
      )}
    </div>
  );
};

export default XPTracker;