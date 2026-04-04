import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './themetoggle';

const Navbar = ({ isDark, toggleTheme, onNavigate }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // 1. Added 'view' property to match your App.jsx switch cases
  const features = [
    { title: "Energy Dump", desc: "Voice-to-schedule AI", view: "energy-dump" },
    { title: "Dopamine Menu", desc: "Quick motivation boosts", view: "dopamine-menu" },
    { title: "48H Smart Plan", desc: "AI task distribution", view: "48h" },
    { title: "Week View", desc: "Long-term forecasting", view: "week" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#0a1429]/90 backdrop-blur-md border-b border-slate-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo - Link it to Home */}
        <button 
          onClick={() => onNavigate('landing')} 
          className="flex items-center gap-2"
        >
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400">
            DOPAMINEFORGE
          </span>
        </button>

        {/* Navigation Links */}
        <div className="flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-white/80">
          <button 
            onClick={() => onNavigate('landing')} 
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Home
          </button>
          
          {/* Features with Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button 
              className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 py-2"
            >
              Features <span className={`text-[10px] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-0 w-64 bg-white dark:bg-[#0f172a] rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 p-2 overflow-hidden"
                >
                  {features.map((f, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        onNavigate(f.view); // 2. Calls the correct view ID
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left p-3 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors group"
                    >
                      <div className="text-slate-900 dark:text-white font-semibold group-hover:text-blue-600 transition-colors">
                        {f.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {f.desc}
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={() => onNavigate('pomodoro')} 
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Pomodoro
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
          <button 
            onClick={() => onNavigate('energy-dump')} // 3. Start Free goes to first step
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-2xl font-medium transition active:scale-95"
          >
            Start Free
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;