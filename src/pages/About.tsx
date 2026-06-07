import React from 'react';
import { Coffee } from 'lucide-react';

const About: React.FC = () => {
  return (
    <main>
      <section data-nav-theme="light" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white/50 backdrop-blur-md p-8 rounded-[2.5rem] border border-[#d4a574]/30 shadow-xl">
              <h2 className="section-title mb-6 text-[#3f2e1f]">Met Hartstocht Gemaakt</h2>
              <p className="text-lg mb-6 leading-relaxed" style={{ color: '#5c4839' }}>
                't Bonenbakkie is niet zomaar een koffiewagen—het is een mobiel paradijs voor koffieliefhebbers. We zijn begonnen met een eenvoudige missie: uitzonderlijke koffie naar je buurt brengen.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: '#5c4839' }}>
                Elk kopje wordt bereid door ervaren barista's met alleen de fijnste bonen, vers gemalen en perfect geëxtraheerd. We geloven in kwaliteit boven snelheid, en dat proef je in elke slok.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-[2.5rem] transform rotate-6" style={{ backgroundColor: '#D4A574', opacity: 0.3 }}></div>
              <div className="relative bg-white/70 backdrop-blur-md p-1 rounded-[3rem] border border-[#d4a574]/20 shadow-2xl">
                <div className="h-96 rounded-[2.5rem] flex items-center justify-center" style={{ backgroundColor: 'rgba(107, 68, 35, 0.9)' }}>
                  <Coffee className="w-32 h-32" style={{ color: '#F5EFE7', opacity: 0.8 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section-base py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2.5rem] border border-[#d4a574]/30 bg-white/60 backdrop-blur-xl p-10 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-[#3f2e1f]">Contact</h2>
            <p className="mb-6 text-[#5c4839]">Heb je vragen over onze mobiele koffiecar, wil je een reservering maken of wil je ons boeken voor een event? Stuur ons een bericht of bel ons direct.</p>
            <div className="grid sm:grid-cols-2 gap-6 text-[#5c4839]">
              <div>
                <h3 className="font-semibold mb-2 text-[#2f1f16]">E-mail</h3>
                <p>hallo@tbonenbakkie.com</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-[#2f1f16]">Telefoon</h3>
                <p>+31 6 1234 5678</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;