import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EnergyDump = ({ onBack, onComplete, isLoading }) => {
  const [text, setText] = useState("");

const handleSync = () => {
  // Pass the raw text directly to the onComplete prop from App.jsx
  if (onComplete) {
    onComplete(text, { status: "raw_dump" });
  }
};

  return (
    <div className="pt-10 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <button 
            onClick={onBack}
            className="text-[15px] font-black text-white/70 hover:text-blue-400 tracking-[0.3em] transition-colors mb-6 flex items-center justify-center gap-2 mx-auto uppercase"
          >
            ← RETURN TO DASHBOARD
          </button>
          <h1 className="text-7xl font-light text-white tracking-tight">
            Energy <span className="font-semibold text-blue-400">Dump</span>
          </h1>
          <p className="mt-4 text-slate-300/80  text-lg max-w-md mx-auto leading-relaxed">
            Provide a brief overview of your current mental state. Our AI will calibrate your 48-hour focus window.
          </p>
        </motion.div>

        {/* Main Input Area - GLASS CARD */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-2xl rounded-[3rem] shadow-2xl border border-white/10 p-8 md:p-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-[16px] font-black uppercase tracking-[0.2em] text-white/40">System Ready: Awaiting Input</span>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="E.g., 'I feel a surge of creative energy now, but I have a long meeting at 3 PM...'"
            className="w-full h-64 bg-black/20 rounded-3xl p-6 text-lg text-white placeholder:text-white/10 outline-none resize-none leading-relaxed border border-white/5 focus:border-blue-500/50 transition-all"
          />

          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5 pt-8">
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-white/5 rounded-xl text-[10px] font-black tracking-widest text-white/40 uppercase">
                SENTIMENT: <span className="text-blue-400 ml-1">ANALYZING...</span>
              </div>
              <div className="px-4 py-2 bg-white/5 rounded-xl text-[10px] font-black tracking-widest text-white/40 uppercase">
                EST. LOAD: <span className="text-blue-400 ml-1">CALCULATING...</span>
              </div>
            </div>

            <button 
              disabled={!text.trim() || isLoading}
              onClick={handleSync} // <--- Add this!
              className="w-full md:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-widest uppercase rounded-2xl shadow-xl transition-all disabled:opacity-20 disabled:cursor-not-allowed transform active:scale-95"
          >
              {isLoading ? "Forging..." : "Analyze & Sync Schedule"}
          </button>
          </div>
        </motion.div>

        {/* Professional Tip Footer - GLASS TILES */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Pro Tip", text: "Be specific about 'brain fog' or 'caffeine peaks' for better accuracy." },
            { label: "Privacy", text: "Your energy data is processed locally to protect your records." },
            { label: "Automation", text: "Forge will auto-adjust your Pomodoro intervals based on this dump." }
          ].map((tip, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
              <h4 className="text-[10px] font-black text-blue-400 uppercase mb-2 tracking-widest">{tip.label}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnergyDump;