import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/navbar';
import Hero from './components/hero';
import Features from './components/features';
import Starry from './components/starry';
import EnergyDump from './components/EnergyDump';
import Dopaminemenu from './components/DopamineMenu';
import XPTracker from './components/XPtracker';
import Pomodoro from './components/Pomodoro';

const THEMES = {
  forge: { img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80", accent: "border-blue-500/50", text: "text-blue-400" },
  beach: { img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80", accent: "border-teal-400/50", text: "text-teal-300" },
  nyc: { img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80", accent: "border-amber-500/50", text: "text-amber-400" },
  forest: { img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80", accent: "border-emerald-500/50", text: "text-emerald-400" },
  summer: { img: "https://images.unsplash.com/photo-1501436513145-30f24e19fcc8?auto=format&fit=crop&w=1200&q=80", accent: "border-orange-500/50", text: "text-orange-300" }
};

const FortyEightHourPlan = () => <div className="p-20 text-center dark:text-white border-2 border-dashed border-slate-200 rounded-3xl">48-Hour Smart Schedule View (Coming Soon)</div>;
const WeekView = () => <div className="p-20 text-center dark:text-white border-2 border-dashed border-slate-200 rounded-3xl">Weekly Forecast View (Coming Soon)</div>;

function App() {
  const [activeTheme, setActiveTheme] = useState('forge');
  const [isDark, setIsDark] = useState(() => {
    if (localStorage.getItem('theme') === 'dark') return true;
    if (localStorage.getItem('theme') === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [view, setView] = useState('landing'); 
  const [currentXP, setCurrentXP] = useState(0);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleEarnXP = (amount) => setCurrentXP(prev => Math.min(prev + amount, 100));
  const navigateTo = (targetView) => { setView(targetView); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const renderView = () => {
    switch(view) {
      case 'energy-dump': return <EnergyDump onBack={() => setView('landing')} onComplete={() => setView('48h')} />;
      case '48h': return <FortyEightHourPlan />;
      case 'week': return <WeekView />;
      case 'dopamine-menu': return <Dopaminemenu onEarnXP={handleEarnXP} />;
      case 'pomodoro': return <Pomodoro activeTheme={activeTheme} themeData={THEMES[activeTheme]} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen relative transition-colors duration-300 overflow-x-hidden bg-[#FDFCFB] dark:bg-[#0a1429]">
      
      {/* GLOBAL BACKGROUND IMAGE (Appears on all views except landing) */}
      <AnimatePresence>
        {view !== 'landing' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-0 pointer-events-none"
          >
            <img 
              src="https://images.unsplash.com/photo-1533713692156-f70938dc0d54?q=80&w=1374&auto=format&fit=crop" 
              className="w-full h-full object-cover" 
              alt="Global Background" 
            />
            {/* Cinematic Overlay - Darkened to kill the navy box feel */}
            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]" />
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} onNavigate={navigateTo} />

      <main className="pt-24 pb-12 relative z-10">
        {view === 'landing' ? (
          <div className="animate-in fade-in duration-700">
            <Hero onStart={() => setView('energy-dump')} />
            <section id="features">
              <Features activeTheme={activeTheme} themeData={THEMES[activeTheme]} />
            </section>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* --- INTERNAL APP HEADER (Now Fully Transparent/Glass) --- */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6 bg-transparent p-4 lg:p-6 rounded-[2.5rem] border border-white/10 backdrop-blur-md">
              <nav className="flex flex-wrap justify-center gap-2">
                {[
                  { id: 'energy-dump', label: 'Energy Dump' },
                  { id: '48h', label: '48H Plan' },
                  { id: 'pomodoro', label: 'Pomodoro' },
                  { id: 'week', label: 'Week View' },
                  { id: 'dopamine-menu', label: 'Dopamine Menu' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setView(item.id)}
                    className={`px-5 py-2.5 rounded-2xl text-xs font-bold tracking-widest uppercase transition-all ${
                      view === item.id 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                      : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <XPTracker currentXP={currentXP} totalNeeded={100} />
            </div>

            <div className="min-h-[60vh]">
              {renderView()}
            </div>

            <div className="text-center">
              <button 
                onClick={() => setView('landing')}
                className="text-[10px] font-bold text-slate-400 hover:text-red-400 tracking-[0.3em] uppercase transition-colors"
              >
                Close Session & Exit
              </button>
            </div>
          </div>
        )}
      </main>

      {/* THEME SELECTOR PILL */}
      <AnimatePresence>
        {view === 'pomodoro' && (
          <motion.div 
            initial={{ y: 100, x: '-50%', opacity: 0 }}
            animate={{ y: 0, x: '-50%', opacity: 1 }}
            exit={{ y: 100, x: '-50%', opacity: 0 }}
            className="fixed bottom-8 left-1/2 z-[100] flex gap-3 p-2 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20"
          >
            {Object.keys(THEMES).map(id => (
              <button
                key={id}
                onClick={() => setActiveTheme(id)}
                className={`w-12 h-12 flex items-center justify-center rounded-2xl text-xl transition-all ${
                  activeTheme === id ? 'bg-blue-600 shadow-xl scale-110' : 'hover:bg-white/10 opacity-60'
                }`}
              >
                {id === 'forge' ? '🛡️' : id === 'beach' ? '🏖️' : id === 'nyc' ? '🏙️' : id === 'forest' ? '🌲' : '☀️'}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Starry />
      
      {view === 'landing' && (
        <footer className="py-10 text-center text-slate-400 text-[10px] tracking-[0.2em] uppercase border-t border-slate-100 dark:border-white/10">
          © 2026 DOPAMINEFORGE • NEURAL OPTIMIZATION
        </footer>
      )}
    </div>
  );
}

export default App;