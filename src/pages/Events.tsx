import React from 'react';
import { Calendar, Briefcase, PartyPopper, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Events: React.FC = () => {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Introductie Sectie */}
        <div className="text-center mb-20 fade-in-up">
          <div className="hero-pill mb-6 mx-auto inline-flex">
            <Calendar size={16} className="text-[#D4A574]" />
            Huur de wagen
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-[#f8ede2] leading-tight">
            Jouw evenement, <br />onze <span className="text-[#D4A574]">premium koffie</span>
          </h1>
          <p className="text-lg text-[#ebdad0] max-w-2xl mx-auto leading-relaxed">
            Van intieme bruiloften tot grote bedrijfsfeesten: 't Bonenbakkie rolt zo jouw locatie op en voorziet al je gasten van de allerbeste koffie, vers gezet met een glimlach.
          </p>
        </div>

        {/* Pakketten / Arrangementen (Glass Cards) */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          
          {/* Particulier */}
          <div className="glass-card group relative overflow-hidden flex flex-col fade-in-up border-white/10 bg-white/5 shadow-[0_26px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl p-10 transition duration-300 hover:-translate-y-1" style={{ animationDelay: '0.1s' }}>
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#D4A574] via-[#c8b191] to-transparent opacity-60" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#d4cab4]/15 px-4 py-2 text-xs uppercase tracking-[0.25em] font-bold text-[#f4ebd9] mb-5">
                Voor jouw privé momenten
              </div>
              <PartyPopper className="w-14 h-14 text-[#D4A574] mb-6" />
              <h3 className="text-3xl font-serif font-bold text-[#F5EFE7] mb-4">Particulier</h3>
              <p className="text-[#ebdad0] mb-10 leading-relaxed text-base max-w-xl">
                Perfect voor bruiloften, verjaardagen en familiefeestjes. Een warme, persoonlijke koffiebeleving met aandacht voor sfeer en smaak.
              </p>
              <div className="space-y-4 mb-10 text-[#ebdad0]/90 text-sm">
                <p>Barista service op locatie</p>
                <p>Vers gezette koffie, thee en seizoensspecials</p>
                <p>Een zachte, gastvrije uitstraling voor kleine gezelschappen</p>
              </div>
              <Link to="/contact" className="coffee-btn-outline w-full text-center mt-auto">Vraag offerte aan</Link>
            </div>
          </div>

          {/* Zakelijk */}
          <div className="glass-card group relative overflow-hidden flex flex-col fade-in-up border-white/10 bg-white/5 shadow-[0_26px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl p-10 transition duration-300 hover:-translate-y-1" style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-transparent via-[#D4A574] to-[#c8b191] opacity-60" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#d4cab4]/15 px-4 py-2 text-xs uppercase tracking-[0.25em] font-bold text-[#f4ebd9] mb-5">
                Voor bedrijfsfeesten en events
              </div>
              <Briefcase className="w-14 h-14 text-[#D4A574] mb-6" />
              <h3 className="text-3xl font-serif font-bold text-[#F5EFE7] mb-4">Zakelijk</h3>
              <p className="text-[#ebdad0] mb-10 leading-relaxed text-base max-w-xl">
                Geschikt voor bedrijfsfeestjes, markten, festivals en beurzen. Professionele koffie met een toegankelijke én krachtige presentatie.
              </p>
              <div className="space-y-4 mb-10 text-[#ebdad0]/90 text-sm">
                <p>Snelle service voor grotere groepen</p>
                <p>Flexibel inzetbaar op evenementen en buitenlocaties</p>
                <p>Optie voor branding en een representatieve uitstraling</p>
              </div>
              <Link to="/contact" className="coffee-btn w-full text-center mt-auto">Vraag offerte aan</Link>
            </div>
          </div>

        </div>

        {/* CTA Sectie Onderaan */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 sm:p-16 text-center fade-in-up shadow-2xl relative overflow-hidden">
          <div className="absolute -inset-24 bg-[radial-gradient(ellipse_at_center,rgba(212,165,116,0.15),transparent_60%)]"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#F5EFE7] mb-4">Weet je niet precies wat je nodig hebt?</h2>
            <p className="text-[#ebdad0] mb-8 max-w-2xl mx-auto">
              Geen probleem! Elk evenement is uniek. Neem vrijblijvend contact met ons op, vertel ons je wensen, en we maken een arrangement volledig op maat voor jouw moment.
            </p>
            <Link to="/contact" className="coffee-btn inline-flex items-center gap-2 text-lg">
              Neem contact op <ArrowRight size={20} />
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Events;