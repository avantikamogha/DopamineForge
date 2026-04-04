import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = ({ isDark, toggleTheme }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20 border border-white/20 transition-all"
      aria-label="Toggle theme"
    >
      <motion.div
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.4 }}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;