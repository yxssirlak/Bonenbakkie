import React from 'react';
import { CalendarCheck, Briefcase, PartyPopper, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Boeken: React.FC = () => {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <section data-nav-theme="dark" className="max-w-6xl mx-auto relative z-10">
        
        {/* Introductie Sectie */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <CalendarCheck size={16} className="text-[#d4cab4]" />
            <span className="text-[#d4cab4] uppercase tracking-[0.15em] text-[11px] sm:text-[13px] font-semibold font-sans">
              Boeken
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#f8ede2] mb-6">
            Jouw moment, <br />onze <span className="text-[#d4cab4]">premium koffie</span>
          </h1>
          <p className="text-base sm:text-lg text-[#ebdad0] max-w-2xl mx-auto leading-relaxed font-sans opacity-90">
            Opzoek naar een sfeervolle koffiekar voor uw evenement? ‘t bonenbakkie serveert koffie en gezelligheid op iedere plek. Wij zijn inzetbaar door heel Nederland en komen graag naar uw locatie. Voor een soepele samenwerking horen wij details van uw evenement graag tijdig.
          </p>
        </div>

        {/* Pakketten / Arrangementen */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          
          {/* Particulier */}
          <div className="glass-card flex flex-col p-8 sm:p-12 border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#d4cab4]/10 px-4 py-2 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-[#d4cab4] mb-8 w-max">
              Voor privé momenten
            </div>
            
            <PartyPopper className="w-12 h-12 text-[#d4cab4] mb-6 group-hover:scale-110 transition-transform duration-500" />
            
            <h3 className="text-3xl font-serif text-[#F5EFE7] mb-4">Particulier</h3>
            
            <p className="text-[#ebdad0] opacity-80 mb-10 leading-relaxed font-sans text-sm sm:text-base">
              Perfect voor bruiloften, verjaardagen en familiefeestjes. Een warme, persoonlijke koffiebeleving met aandacht voor sfeer en smaak.
            </p>
            
            <ul className="space-y-4 mb-12 text-[#ebdad0] font-sans text-sm opacity-90">
              <li className="flex items-start gap-3">
                <span className="text-[#d4cab4] mt-0.5 font-bold">•</span> Barista service op locatie
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#d4cab4] mt-0.5 font-bold">•</span> Vers gezette koffie, thee en seizoensspecials
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#d4cab4] mt-0.5 font-bold">•</span> Een zachte, gastvrije uitstraling voor kleine gezelschappen
              </li>
            </ul>
            
            <Link 
  to="/contact" 
  state={{ formType: 'particulier' }} 
  className="coffee-btn-outline w-full text-center mt-auto py-4 font-sans font-semibold uppercase tracking-[0.15em] text-[11px] sm:text-[13px] hover:bg-[#d4cab4] hover:text-[#1e0f0a]"
>
  Vraag offerte aan
</Link>
          </div>

          {/* Zakelijk */}
          <div className="glass-card flex flex-col p-8 sm:p-12 border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#d4cab4]/10 px-4 py-2 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-[#d4cab4] mb-8 w-max">
              Voor bedrijven & events
            </div>
            
            <Briefcase className="w-12 h-12 text-[#d4cab4] mb-6 group-hover:scale-110 transition-transform duration-500" />
            
            <h3 className="text-3xl font-serif text-[#F5EFE7] mb-4">Zakelijk</h3>
            
            <p className="text-[#ebdad0] opacity-80 mb-10 leading-relaxed font-sans text-sm sm:text-base">
              Geschikt voor bedrijfsfeestjes, markten, festivals en beurzen. Professionele koffie met een toegankelijke én krachtige presentatie.
            </p>
            
            <ul className="space-y-4 mb-12 text-[#ebdad0] font-sans text-sm opacity-90">
              <li className="flex items-start gap-3">
                <span className="text-[#d4cab4] mt-0.5 font-bold">•</span> Snelle service voor grotere groepen
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#d4cab4] mt-0.5 font-bold">•</span> Flexibel inzetbaar op evenementen en buitenlocaties
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#d4cab4] mt-0.5 font-bold">•</span> Optie voor branding en een representatieve uitstraling
              </li>
            </ul>
            
            <Link 
  to="/contact" 
  state={{ formType: 'zakelijk' }} 
  className="coffee-btn w-full text-center mt-auto py-4 font-sans font-semibold uppercase tracking-[0.15em] text-[11px] sm:text-[13px] shadow-lg hover:shadow-[0_0_20px_rgba(212,202,180,0.2)]"
>
  Vraag offerte aan
</Link>
          </div>

        </div>

        {/* CTA Sectie Onderaan */}
        <div className="glass-card p-10 sm:p-16 lg:p-20 text-center animate-fade-in-up border border-white/10 bg-white/5 relative overflow-hidden rounded-[2rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,202,180,0.06)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif text-[#F5EFE7] mb-6">
              Interesse in 't Bonenbakkie?
            </h2>
            <p className="text-[#ebdad0] mb-10 max-w-2xl mx-auto font-sans leading-relaxed opacity-90">
              Bij interesse nodigen wij u uit om via onze contactpagina contact op te nemen. Ook hier zal er ruimte zijn om uw wensen te bespreken en eventuele vragen te beantwoorden.
            </p>
            <Link to="/contact" className="coffee-btn inline-flex items-center justify-center gap-3 py-4 px-8 font-sans font-semibold uppercase tracking-[0.15em] text-[11px] sm:text-[13px] hover:shadow-[0_0_20px_rgba(212,202,180,0.2)]">
              Neem contact op <ArrowRight size={16} />
            </Link>
          </div>
        </div>

      </section>
    </main>
  );
};

export default Boeken;