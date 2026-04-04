import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fireConfetti } from "../utils/confetti";

const DopamineMenu = ({ onEarnXP }) => {
  const [selected, setSelected] = useState(null);

  const snacks = [
    { id: 1, icon: "☕", title: "Ritual Break", desc: "5-min mindful tea or coffee", xp: 10 },
    { id: 2, icon: "🎵", title: "Sonic Reset", desc: "1 favorite high-energy track", xp: 15 },
    { id: 3, icon: "🧘", title: "Micro-Stretch", desc: "2-min guided movement", xp: 10 },
    { id: 4, icon: "☀️", title: "Light Soak", desc: "3-min sunlight step-out", xp: 20 },
    { id: 5, icon: "✍️", title: "Brain Dump", desc: "60-sec unfiltered journaling", xp: 15 },
    { id: 6, icon: "🚿", title: "Cold Splash", desc: "Quick cold water face rinse", xp: 25 },
  ];

  const handleClaimXP = () => {
    if (selected) {
      new Audio('https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3').play();
      fireConfetti();
      onEarnXP(selected.xp);
      setSelected(null);
    }
  };

  return (
    <div className="relative py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h2 className="text-7xl font-light text-white">
            Dopamine <span className="font-semibold text-blue-400">Menu</span>
          </h2>
          <p className="text-white/40 text-[13px] mt-3 font-black tracking-[0.3em] uppercase">Select your neuro-recharge snack</p>
        </div>
        
        <div className="flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
          <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">Energy Slots</span>
          <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className={`w-2 h-2 rounded-full ${i <= 2 ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-white/10'}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {snacks.map((snack) => (
          <motion.div
            key={snack.id}
            whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.08)" }}
            onClick={() => setSelected(snack)}
            className={`cursor-pointer p-8 rounded-[2.5rem] border backdrop-blur-md transition-all duration-300 ${
              selected?.id === snack.id 
              ? 'border-blue-500 bg-white/10 shadow-[0_0_30px_rgba(59,130,246,0.2)]' 
              : 'border-white/5 bg-white/5 hover:border-white/20'
            }`}
          >
            <div className="text-5xl mb-6">{snack.icon}</div>
            <h3 className="text-lg font-bold text-white mb-2">{snack.title}</h3>
            <p className="text-xs text-white/50 leading-relaxed mb-6">{snack.desc}</p>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-[10px] font-black uppercase tracking-widest">
              +{snack.xp} XP
            </span>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-2xl"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="bg-[#0a1429]/90 p-12 rounded-[3.5rem] max-w-md w-full text-center border border-white/10 shadow-2xl"
            >
              <div className="text-8xl mb-8 drop-shadow-2xl">{selected.icon}</div>
              <h2 className="text-3xl font-black text-white mb-3 uppercase tracking-tighter">Enjoy {selected.title}</h2>
              <p className="text-white/40 mb-10 text-sm font-medium">Enjoy your recharge.</p>
              <button 
                onClick={handleClaimXP}
                className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl transition-all active:scale-95"
              >
                Claim Reward & XP
              </button>
              <button onClick={() => setSelected(null)} className="mt-8 text-white/20 text-[10px] font-black uppercase tracking-widest hover:text-red-400 transition-colors">
                Skip Recharge
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DopamineMenu;