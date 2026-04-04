import React from 'react';
import { motion } from 'framer-motion';

const ThemeSelector = ({ currentTheme, onThemeChange }) => {
  const options = [
    { id: 'forge', icon: '⚔️', label: 'Forge' },
    { id: 'beach', icon: '🏖️', label: 'Beach' },
    { id: 'nyc', icon: '🏙️', label: 'NYC' },
    { id: 'forest', icon: '🌲', label: 'Forest' },
    { id: 'summer', icon: '☀️', label: 'Summer' },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex gap-2 p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
      {options.map((opt) => (
        <motion.button
          key={opt.id}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onThemeChange(opt.id)}
          className={`w-10 h-10 flex items-center justify-center rounded-xl text-lg transition-all ${
            currentTheme === opt.id ? 'bg-white shadow-lg' : 'hover:bg-white/20'
          }`}
          title={opt.label}
        >
          {opt.icon}
        </motion.button>
      ))}
    </div>
  );
};

export default ThemeSelector;