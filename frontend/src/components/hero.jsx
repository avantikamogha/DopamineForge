import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center starry-bg relative overflow-hidden pt-20">
      <div className="max-w-5xl mx-auto px-6 text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-7xl md:text-8xl font-bold text-slate-900 dark:text-white mb-6 leading-none"
        >
          Your Personal<br />
          Dopamine Map
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-slate-600 dark:text-white/70 max-w-2xl mx-auto mb-12"
        >
          AI that learns your unique energy patterns through voice dumps,<br className="hidden md:block" />
          predicts hyperfocus windows, and rewards you with Starry the Starfish.
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white hover:bg-white text-black px-10 py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-blue-500/30 transition"
          >
            Start planning
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="border-2 border-slate-300 dark:border-white/30 text-slate-700 dark:text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-white/10 transition"
          >
            Show Demo
          </motion.button>
        </div>
      </div>

      {/* Twinkling Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full bg-gradient-to-br from-white to-blue-300 shadow-lg shadow-blue-500/50"
            initial={{ opacity: 0.2 }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 2.5 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.08,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 65}%`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;