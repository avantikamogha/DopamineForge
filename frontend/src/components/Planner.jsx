import React from 'react';
import { motion } from 'framer-motion';

const FortyEightHourPlan = ({ schedule = [] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
      {schedule.map((item, index) => (
        <motion.div
          key={item.task_id || index}
          className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl relative group overflow-hidden"
        >
        {/* Energy Tag */}
          <div className="flex justify-between items-start mb-4">
            <span className={`text-[10px] font-black tracking-[0.3em] uppercase px-3 py-1 rounded-lg ${
              item.energy_status === 'Perfect Match' ? 'text-emerald-400 bg-emerald-400/10' : 'text-amber-400 bg-amber-400/10'
            }`}>
              {item.slot} • {item.energy_status}
            </span>
          </div>

        {/* Task Content */}
          <h3 className="text-2xl font-light text-white mb-2">
            {item.task_name}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6 italic">
            "{item.forge_note}"
          </p>

        {/* Metadata */}
          <div className="flex items-center gap-3">
            <div className="h-[1px] flex-grow bg-white/10"></div>
            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">
              Type: {item.type}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// CRITICAL: This line fixes the "does not provide an export named default" error
export default FortyEightHourPlan;