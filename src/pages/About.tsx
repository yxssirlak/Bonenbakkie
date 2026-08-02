import React from 'react';
import { Heart, Coffee } from 'lucide-react';

const About: React.FC = () => {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      {/* HIER ZIT DE FIX: data-nav-theme="dark" */}
      <section data-nav-theme="dark" className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <Heart size={16} className="text-[#d4cab4]" />
            <span className="text-[#d4cab4] uppercase tracking-[0.15em] text-[11px] sm:text-[13px] font-semibold font-sans">
              Ons Verhaal
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#f8ede2] mb-6">Over Ons</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="glass-card fade-in-up border border-white/10 bg-white/5">
            <h2 className="text-3xl font-serif mb-6 text-[#F5EFE7]">Met Hartstocht Gemaakt</h2>
            <p className="text-lg mb-6 leading-relaxed text-[#ebdad0] font-sans">
              't Bonenbakkie is niet zomaar een koffiewagen—het is een mobiel paradijs voor koffieliefhebbers. We zijn begonnen met een eenvoudige missie: uitzonderlijke koffie naar je buurt brengen.
            </p>
            <p className="text-lg leading-relaxed text-[#ebdad0] font-sans">
              Elk kopje wordt bereid door ervaren barista's met alleen de fijnste bonen, vers gemalen en perfect geëxtraheerd. We geloven in kwaliteit boven snelheid, en dat proef je in elke slok.
            </p>
          </div>
          
          <div className="relative fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-0 rounded-[2.5rem] transform rotate-3 bg-[#d4cab4]/20 blur-lg"></div>
            <div className="relative glass-card p-2 border border-white/10 bg-white/5">
              <div className="h-80 rounded-[2rem] flex items-center justify-center bg-[#140a07]/50 overflow-hidden">
                 {/* Optioneel: vervang de Coffee icon hier door een echte foto src="/bonenbakkie1.jpeg" */}
                 <Coffee className="w-32 h-32 text-[#d4cab4] opacity-80" />
              </div>
            </div>
          </div>
        </div>

      </section>
    </main>
  );
};

export default About;