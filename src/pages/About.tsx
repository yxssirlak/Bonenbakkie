import React from 'react';
import { Heart, Coffee } from 'lucide-react';

const About: React.FC = () => {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      {/* HIER ZIT DE FIX: data-nav-theme="dark" */}
      <section data-nav-theme="dark" className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16 fade-in-up">
          <div className="hero-pill mb-6 mx-auto inline-flex">
            <Heart size={16} className="text-[#D4A574]" />
            Ons Verhaal
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#f8ede2] mb-6">Over Ons</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="glass-card fade-in-up">
            <h2 className="text-3xl font-serif font-bold mb-6 text-[#F5EFE7]">Met Hartstocht Gemaakt</h2>
            <p className="text-lg mb-6 leading-relaxed text-[#ebdad0]">
              't Bonenbakkie is niet zomaar een koffiewagen—het is een mobiel paradijs voor koffieliefhebbers. We zijn begonnen met een eenvoudige missie: uitzonderlijke koffie naar je buurt brengen.
            </p>
            <p className="text-lg leading-relaxed text-[#ebdad0]">
              Elk kopje wordt bereid door ervaren barista's met alleen de fijnste bonen, vers gemalen en perfect geëxtraheerd. We geloven in kwaliteit boven snelheid, en dat proef je in elke slok.
            </p>
          </div>
          
          <div className="relative fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-0 rounded-[2.5rem] transform rotate-3 bg-[#D4A574]/20 blur-lg"></div>
            <div className="relative glass-card p-2">
              <div className="h-80 rounded-[2rem] flex items-center justify-center bg-[#140a07]/50 overflow-hidden">
                 {/* Optioneel: vervang de Coffee icon hier door een echte foto src="/bonenbakkie1.jpeg" */}
                 <Coffee className="w-32 h-32 text-[#D4A574] opacity-80" />
              </div>
            </div>
          </div>
        </div>

      </section>
    </main>
  );
};

export default About;