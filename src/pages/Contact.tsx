import React from 'react';
import { Mail, Phone, MapPin, Send, Star } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <section data-nav-theme="dark" className="max-w-4xl mx-auto relative z-10">
        
        {/* Titel Sectie */}
        <div className="text-center mb-16 fade-in-up">
          <div className="hero-pill mb-6 mx-auto inline-flex">
            <Star size={14} className="text-[#D4A574]" />
            Direct Contact
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-black text-[#F5EFE7] tracking-tighter mb-4">CONTACT</h1>
          <p className="text-[#ebdad0] font-sans tracking-[0.2em] uppercase text-xs">VRAAG EEN OFFERTE AAN OF ZEG GEDAG</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Contact Details */}
          <div className="space-y-8">
            <div className="glass-card p-8">
              <h2 className="text-sm font-bold text-[#F5EFE7] tracking-[0.3em] uppercase mb-8">LOCATIE & GEGEVENS</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-[#ebdad0]">
                  <MapPin className="text-[#D4A574]" size={20} />
                  <span className="font-sans text-xs tracking-[0.1em]">BODEGRAVEN, SOUTH HOLLAND</span>
                </div>
                <div className="flex items-center gap-4 text-[#ebdad0]">
                  <Mail className="text-[#D4A574]" size={20} />
                  <span className="font-sans text-xs tracking-[0.1em]">INFO@BONENBAKKIE.NL</span>
                </div>
                <div className="flex items-center gap-4 text-[#ebdad0]">
                  <Phone className="text-[#D4A574]" size={20} />
                  <span className="font-sans text-xs tracking-[0.1em]">+31 6 123 456 78</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Formulier */}
          <div className="glass-card p-8">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-[10px] font-bold text-[#D4A574] uppercase tracking-[0.2em] mb-2">NAAM</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4A574] transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#D4A574] uppercase tracking-[0.2em] mb-2">E-MAIL</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4A574] transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#D4A574] uppercase tracking-[0.2em] mb-2">BERICHT</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4A574] transition-colors"></textarea>
              </div>
              <button className="w-full coffee-btn flex items-center justify-center gap-2 py-4">
                VERSTUUR BERICHT <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;