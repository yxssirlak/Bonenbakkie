import React from 'react';
import { Calendar, Briefcase, PartyPopper, Check, ArrowRight, Star } from 'lucide-react';
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
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          
          {/* Pakket 1: Particulier */}
          <div className="glass-card flex flex-col fade-in-up" style={{ animationDelay: '0.1s' }}>
            <PartyPopper className="w-12 h-12 text-[#D4A574] mb-6" />
            <h3 className="text-2xl font-serif font-bold text-[#F5EFE7] mb-2">Particulier & Feesten</h3>
            <p className="text-[#ebdad0] mb-8 flex-grow leading-relaxed">
              Perfect voor bruiloften, verjaardagen en familiefeesten. Geef je gasten een unieke, warme welkomstbeleving.
            </p>
            <ul className="space-y-4 mb-10 text-[#ebdad0]/80">
              <li className="flex items-center gap-3"><Check size={20} className="text-[#D4A574]" /> Onbeperkt koffie, thee & water</li>
              <li className="flex items-center gap-3"><Check size={20} className="text-[#D4A574]" /> Vanaf 2 uur barista service</li>
              <li className="flex items-center gap-3"><Check size={20} className="text-[#D4A574]" /> Inclusief alle disposables</li>
            </ul>
            <Link to="/contact" className="coffee-btn-outline w-full text-center mt-auto">Vraag offerte aan</Link>
          </div>

          {/* Pakket 2: Zakelijk (Uitgelicht) */}
          <div className="glass-card flex flex-col fade-in-up relative border-[#D4A574]/40" style={{ animationDelay: '0.2s', background: 'rgba(212, 165, 116, 0.08)' }}>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#D4A574] text-[#140a07] px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase flex items-center gap-1">
              <Star size={12} /> Meest Gekozen
            </div>
            <Briefcase className="w-12 h-12 text-[#D4A574] mb-6" />
            <h3 className="text-2xl font-serif font-bold text-[#F5EFE7] mb-2">Zakelijk & Events</h3>
            <p className="text-[#ebdad0] mb-8 flex-grow leading-relaxed">
              Ideaal voor bedrijfsborrels, beurzen en open dagen. Een professionele uitstraling die indruk maakt op klanten en personeel.
            </p>
            <ul className="space-y-4 mb-10 text-[#ebdad0]/80">
              <li className="flex items-center gap-3"><Check size={20} className="text-[#D4A574]" /> Capaciteit tot 150+ kopjes/uur</li>
              <li className="flex items-center gap-3"><Check size={20} className="text-[#D4A574]" /> Mogelijkheid tot branding</li>
              <li className="flex items-center gap-3"><Check size={20} className="text-[#D4A574]" /> Uit te breiden met zoetigheden</li>
            </ul>
            <Link to="/contact" className="coffee-btn w-full text-center mt-auto">Vraag offerte aan</Link>
          </div>

          {/* Pakket 3: Maatwerk */}
          <div className="glass-card flex flex-col fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Calendar className="w-12 h-12 text-[#D4A574] mb-6" />
            <h3 className="text-2xl font-serif font-bold text-[#F5EFE7] mb-2">Festivals & Markten</h3>
            <p className="text-[#ebdad0] mb-8 flex-grow leading-relaxed">
              We komen graag naar jouw festival, braderie of foodtruck event om het publiek te voorzien van een snelle cafeïne-boost.
            </p>
            <ul className="space-y-4 mb-10 text-[#ebdad0]/80">
              <li className="flex items-center gap-3"><Check size={20} className="text-[#D4A574]" /> Hoge capaciteit en doorloop</li>
              <li className="flex items-center gap-3"><Check size={20} className="text-[#D4A574]" /> Ook Iced Coffees & Limonades</li>
              <li className="flex items-center gap-3"><Check size={20} className="text-[#D4A574]" /> Flexibele opstelling</li>
            </ul>
            <Link to="/contact" className="coffee-btn-outline w-full text-center mt-auto">Bespreek de opties</Link>
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