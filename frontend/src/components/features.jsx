import React from 'react';
import { TrendingUp, Coffee, Calendar } from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    title: "Energy & Focus Forecast",
    color: "text-blue-400",
    desc: "AI predicts your personal hyperfocus windows for the next 48 hours using voice energy dumps and behavioral pattern recognition."
  },
  {
    icon: Coffee,
    title: "Personalized Dopamine Menu",
    color: "text-orange-400",
    desc: "Daily custom rewards tailored specifically to you: chai + lofi, Pinterest floofy cats, pen-pal notes, library rentals, or photo assignments."
  },
  {
    icon: Calendar,
    title: "Smart & Forgiving Scheduler",
    color: "text-emerald-400",
    desc: "Auto-schedules important tasks into your predicted high-energy windows, and gently reschedules when life happens — zero shame, just support."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-[#0a1429] dark:bg-[#0a1429]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-7xl font-bold text-white text-center mb-16">Features</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl p-10 hover:border-white/30 transition-all group"
            >
              <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition`}>
                <feature.icon className={`w-9 h-9 ${feature.color}`} />
              </div>

              <h3 className="text-3xl font-semibold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-white/90 text-1.5xl leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;