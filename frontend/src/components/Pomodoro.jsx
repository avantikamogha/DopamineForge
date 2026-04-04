import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Pomodoro = ({ activeTheme, themeData }) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work');

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(prev => prev - 1);
        } else if (minutes > 0) {
          setMinutes(prev => prev - 1);
          setSeconds(59);
        } else {
          handleSwitchMode();
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes]);

  const handleSwitchMode = () => {
    setIsActive(false);
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play();

    const newMode = mode === 'work' ? 'break' : 'work';
    setMode(newMode);
    setMinutes(newMode === 'work' ? 25 : 5);
    setSeconds(0);
  };

  const totalTime = mode === 'work' ? 25 * 60 : 5 * 60;
  const currentTime = minutes * 60 + seconds;
  const progress = (currentTime / totalTime) * 100;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[600px] w-full max-w-5xl mx-auto rounded-[4rem] overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)]">
      
      {/* HD BACKGROUND IMAGE LAYER */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTheme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={themeData.img} 
            className="w-full h-full object-cover scale-105" 
            alt="Theme Background" 
          />
          {/* Dark Cinematic Gradient Overlay (No more grey boxes) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70 backdrop-blur-[1px]" />
        </motion.div>
      </AnimatePresence>

      {/* FLOATING CONTENT (No Container Box) */}
      <div className="relative z-10 flex flex-col items-center w-full">
        
        <div className="text-center mb-12">
          <motion.div
            key={mode}
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`text-sm font-black uppercase tracking-[0.6em] drop-shadow-lg ${themeData.text}`}
          >
            {mode === 'work' ? 'Deep Work Session' : 'Neural Recovery'}
          </motion.div>
        </div>

        {/* Circular Timer with Progress */}
        <div className="relative w-80 h-80 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle 
              cx="160" cy="160" r="145" 
              stroke="currentColor" 
              strokeWidth="2" 
              fill="transparent" 
              className="text-white/10" 
            />
            <motion.circle
              cx="160"
              cy="160" r="145"
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray="911"
              animate={{ strokeDashoffset: 911 - (911 * progress) / 100 }}
              transition={{ ease: "linear", duration: 0.5 }}
              className={themeData.text.replace('text-', 'stroke-')}
              strokeLinecap="round"
            />
          </svg>
          
          <div className="absolute flex flex-col items-center drop-shadow-2xl">
            <span className="text-[6rem] font-extralight tabular-nums tracking-tighter text-white leading-none">
              {String(minutes).padStart(2, '0')}<span className="opacity-20">:</span>{String(seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-12 mt-16">
          {/* Reset */}
          <motion.button 
            whileHover={{ rotate: -180, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { setIsActive(false); setMinutes(25); setSeconds(0); }}
            className="p-4 text-white/50 hover:text-white transition-all bg-white/5 backdrop-blur-md rounded-full border border-white/10"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8m0-5v5h5"/>
            </svg>
          </motion.button>

          {/* Start/Pause */}
          <motion.button 
            whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsActive(!isActive)}
            className={`w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all border border-white/20 ${
              isActive 
              ? 'bg-white text-black' 
              : 'bg-white/10 backdrop-blur-xl text-white'
            }`}
          >
            {isActive ? (
              <svg width="32" height="32" fill="currentColor">
                <rect x="8" y="6" width="5" height="20" rx="1.5"/>
                <rect x="19" y="6" width="5" height="20" rx="1.5"/>
              </svg>
            ) : (
              <svg width="32" height="32" fill="currentColor" className="ml-2">
                <path d="M5 3l18 9-18 9V3z"/>
              </svg>
            )}
          </motion.button>

          {/* Skip */}
          <motion.button 
            whileHover={{ x: 8, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSwitchMode}
            className="p-4 text-white/50 hover:text-white transition-all bg-white/5 backdrop-blur-md rounded-full border border-white/10"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m6 17 5-5-5-5m7 10 5-5-5-5"/>
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;