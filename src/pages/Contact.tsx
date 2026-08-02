import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Star, PartyPopper, Briefcase, ArrowLeft, ArrowDown } from 'lucide-react';
import { supabase } from '../supabaseClient';
import confetti from 'canvas-confetti'; // Confetti animatie toegevoegd!

const Contact: React.FC = () => {
  const [aanvraagType, setAanvraagType] = useState<'kies' | 'particulier' | 'zakelijk'>('kies');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const zakelijkeOpties = ['Bedrijfsfeest', 'Beurs / Congres', 'Netwerkevent', 'Festival / Markt', 'Anders'];
  const particuliereOpties = ['Bruiloft', 'Verjaardag', 'Jubileum', 'Tuinfeest / Buurtfeest', 'Anders'];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    
    delete formValues.privacy_akkoord;
    
    const aanvraagData = {
      ...formValues,
      type_aanvraag: aanvraagType,
      datum_ingediend: new Date().toISOString()
    };

    try {
      // 1. Sla de data op in je Supabase database
      const { error } = await supabase
        .from('offerte_aanvragen')
        .insert([aanvraagData]);

      if (error) throw error;
      
      // 2. Roep de Edge Function aan (verstuurt de mail)
      await supabase.functions.invoke('stuur-offerte-mail', {
        body: { record: aanvraagData },
      });

      // 3. Toon het succes scherm
      setIsSuccess(true);
      
      // 4. Confetti knallen in Bonenbakkie huisstijlkleuren
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#534026', '#f4ebd9', '#d4cab4', '#a37042'] 
      });

      // 5. Scroll soepel naar de top van de pagina
      window.scrollTo({ top: 100, behavior: 'smooth' });
      
    } catch (error) {
      console.error('Fout bij verzenden:', error);
      alert('Oeps, er ging iets mis bij het verzenden.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <section data-nav-theme="dark" className="max-w-5xl mx-auto relative z-10">
        
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <Star size={16} className="text-[#d4cab4]" />
            <span className="text-[#d4cab4] uppercase tracking-[0.15em] text-[11px] sm:text-[13px] font-semibold font-sans">
              Offerte Aanvragen
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-[#F5EFE7] mb-4">Contact</h1>
          <p className="text-[#ebdad0] font-sans tracking-[0.15em] uppercase text-xs sm:text-sm opacity-80">
            Laten we samen iets moois brouwen
          </p>
        </div>

        {isSuccess ? (
          /* --- HET NIEUWE, PREMIUM SUCCES SCHERM (VOLLE BREEDTE) --- */
          <div className="w-full max-w-3xl mx-auto relative glass-card overflow-hidden p-12 sm:p-16 lg:p-20 border border-[#d4cab4]/40 bg-gradient-to-b from-[#3d2f1b]/50 to-[#1e0f0a]/90 text-center animate-fade-in-up flex flex-col justify-center items-center rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            {/* Subtiele gloed in de achtergrond */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,202,180,0.08)_0%,transparent_70%)] pointer-events-none" />
            
            <img src="/bonenbakkielogo.png" alt="'t bonenbakkie" className="w-48 sm:w-64 mb-10 drop-shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500" />
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F5EFE7] mb-6 relative z-10">
              Aanvraag Ontvangen!
            </h2>
            
            <p className="text-[#ebdad0] font-sans text-sm sm:text-base leading-relaxed mb-10 max-w-md mx-auto opacity-90 relative z-10">
              Bedankt voor je interesse! We hebben je gegevens in goede orde ontvangen en de koffiemachine alvast aangezet. We sturen je zo snel mogelijk een voorstel op maat!
            </p>
            
            <button 
              onClick={() => { setIsSuccess(false); setAanvraagType('kies'); }}
              className="relative z-10 coffee-btn px-10 py-4 font-sans font-semibold uppercase tracking-[0.15em] text-[11px] sm:text-[13px] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              Nieuwe aanvraag doen
            </button>
          </div>
        ) : (
          /* --- HET ORIGINELE FORMULIER (MET ZIJPANEEL) --- */
          <div className="grid lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-4 space-y-8">
              <div className="glass-card p-8 border border-white/10 bg-white/5 h-full">
                <h2 className="text-[11px] font-sans font-bold text-[#F5EFE7] tracking-[0.2em] uppercase mb-8">Locatie & Gegevens</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 text-[#ebdad0]">
                    <MapPin className="text-[#d4cab4] shrink-0 mt-0.5" size={20} />
                    <span className="font-sans text-xs tracking-[0.1em] leading-relaxed uppercase">BODEGRAVEN,<br />ZUID-HOLLAND</span>
                  </div>
                  <div className="flex items-center gap-4 text-[#ebdad0]">
                    <Mail className="text-[#d4cab4] shrink-0" size={20} />
                    <a href="mailto:info@bonenbakkie.nl" className="font-sans text-xs tracking-[0.1em] uppercase hover:text-[#d4cab4] transition-colors">INFO@BONENBAKKIE.NL</a>
                  </div>
                  <div className="flex items-center gap-4 text-[#ebdad0]">
                    <Phone className="text-[#d4cab4] shrink-0" size={20} />
                    <a href="tel:+31612345678" className="font-sans text-xs tracking-[0.1em] uppercase hover:text-[#d4cab4] transition-colors">+31 6 123 456 78</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              {aanvraagType === 'kies' && (
                <div className="flex flex-col h-full animate-fade-in-up">
                  <div className="text-center mb-10 bg-white/5 border border-white/10 rounded-[2rem] p-6 glass-card relative">
                    <h2 className="text-2xl sm:text-3xl font-serif text-[#F5EFE7] mb-2">Voor welk type evenement wil je een offerte?</h2>
                    <p className="text-[#d4cab4] font-sans text-[10px] sm:text-xs tracking-[0.15em] uppercase font-semibold mb-6">Maak hieronder een keuze</p>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex justify-center w-full z-10 pointer-events-none">
                      <div className="bg-[#534026] rounded-full p-2.5 border-2 border-[#d4cab4]/30 animate-bounce shadow-[0_0_15px_rgba(212,202,180,0.3)]">
                        <ArrowDown className="text-[#d4cab4]" size={24} />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6 flex-grow mt-2">
                    <button type="button" onClick={() => setAanvraagType('particulier')} className="glass-card p-10 border border-white/10 bg-white/5 hover:bg-[#f4f1ea] transition-all duration-500 ease-out flex flex-col items-center justify-center text-center group hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] cursor-pointer">
                      <div className="w-20 h-20 rounded-full bg-[#d4cab4]/10 group-hover:bg-[#534026]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 ease-out">
                        <PartyPopper className="text-[#d4cab4] group-hover:text-[#534026] transition-colors duration-500" size={36} />
                      </div>
                      <h3 className="text-2xl font-serif text-[#F5EFE7] group-hover:text-[#534026] mb-3 transition-colors duration-500">Particulier</h3>
                      <p className="text-[#ebdad0] font-sans text-sm opacity-80 group-hover:text-[#534026] group-hover:opacity-100 leading-relaxed transition-all duration-500">Voor bruiloften, verjaardagen, tuinfeesten en andere privémomenten.</p>
                    </button>

                    <button type="button" onClick={() => setAanvraagType('zakelijk')} className="glass-card p-10 border border-white/10 bg-white/5 hover:bg-[#f4f1ea] transition-all duration-500 ease-out flex flex-col items-center justify-center text-center group hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] cursor-pointer">
                      <div className="w-20 h-20 rounded-full bg-[#d4cab4]/10 group-hover:bg-[#534026]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 ease-out">
                        <Briefcase className="text-[#d4cab4] group-hover:text-[#534026] transition-colors duration-500" size={36} />
                      </div>
                      <h3 className="text-2xl font-serif text-[#F5EFE7] group-hover:text-[#534026] mb-3 transition-colors duration-500">Zakelijk</h3>
                      <p className="text-[#ebdad0] font-sans text-sm opacity-80 group-hover:text-[#534026] group-hover:opacity-100 leading-relaxed transition-all duration-500">Voor bedrijfsfeesten, beurzen, netwerkevents en zakelijke bijeenkomsten.</p>
                    </button>
                  </div>
                </div>
              )}

              {aanvraagType !== 'kies' && (
                <div className="glass-card p-8 sm:p-10 border border-white/10 bg-white/5 animate-fade-in-up">
                  <button type="button" onClick={() => setAanvraagType('kies')} className="flex items-center gap-2 mb-8 text-[#d4cab4] hover:text-white transition-colors font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em]">
                    <ArrowLeft size={16} /> Terug naar keuze
                  </button>

                  <div className="mb-8 border-b border-white/10 pb-6">
                    <h3 className="text-2xl font-serif text-[#F5EFE7]">
                      {aanvraagType === 'particulier' ? 'Particuliere Aanvraag' : 'Zakelijke Aanvraag'}
                    </h3>
                    <p className="text-[#ebdad0] font-sans text-sm mt-2 opacity-80">
                      Vul de onderstaande details in, dan komen we zo snel mogelijk bij je terug met een voorstel op maat.
                    </p>
                  </div>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-sans font-semibold text-[#d4cab4] uppercase tracking-[0.15em] mb-2">
                          {aanvraagType === 'zakelijk' ? 'Naam Contactpersoon' : 'Volledige Naam'}
                        </label>
                        <input type="text" name="naam" placeholder="Jouw naam" className="w-full bg-white/5 border border-white/10 rounded-lg p-3.5 text-white font-sans text-sm focus:outline-none focus:border-[#d4cab4] transition-colors placeholder:text-white/20" required />
                      </div>
                      {aanvraagType === 'zakelijk' ? (
                        <div>
                          <label className="block text-[10px] font-sans font-semibold text-[#d4cab4] uppercase tracking-[0.15em] mb-2">Bedrijfsnaam</label>
                          <input type="text" name="bedrijfsnaam" placeholder="Naam van het bedrijf" className="w-full bg-white/5 border border-white/10 rounded-lg p-3.5 text-white font-sans text-sm focus:outline-none focus:border-[#d4cab4] transition-colors placeholder:text-white/20" required />
                        </div>
                      ) : (
                        <div>
                          <label className="block text-[10px] font-sans font-semibold text-[#d4cab4] uppercase tracking-[0.15em] mb-2">E-mailadres</label>
                          <input type="email" name="email" placeholder="jouw@email.nl" className="w-full bg-white/5 border border-white/10 rounded-lg p-3.5 text-white font-sans text-sm focus:outline-none focus:border-[#d4cab4] transition-colors placeholder:text-white/20" required />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {aanvraagType === 'zakelijk' && (
                        <div>
                          <label className="block text-[10px] font-sans font-semibold text-[#d4cab4] uppercase tracking-[0.15em] mb-2">Zakelijk E-mailadres</label>
                          <input type="email" name="email" placeholder="jouw@bedrijf.nl" className="w-full bg-white/5 border border-white/10 rounded-lg p-3.5 text-white font-sans text-sm focus:outline-none focus:border-[#d4cab4] transition-colors placeholder:text-white/20" required />
                        </div>
                      )}
                      <div>
                        <label className="block text-[10px] font-sans font-semibold text-[#d4cab4] uppercase tracking-[0.15em] mb-2">Telefoonnummer</label>
                        <input type="tel" name="telefoon" placeholder="+31 6 123 456 78" className="w-full bg-white/5 border border-white/10 rounded-lg p-3.5 text-white font-sans text-sm focus:outline-none focus:border-[#d4cab4] transition-colors placeholder:text-white/20" />
                      </div>
                      {aanvraagType === 'particulier' && (
                        <div>
                          <label className="block text-[10px] font-sans font-semibold text-[#d4cab4] uppercase tracking-[0.15em] mb-2">Aantal verwachte gasten</label>
                          <select name="aantal_gasten" defaultValue="" className="w-full bg-[#3d2f1b] border border-white/10 rounded-lg p-3.5 text-white font-sans text-sm focus:outline-none focus:border-[#d4cab4] transition-colors appearance-none cursor-pointer">
                            <option value="" disabled>Selecteer aantal...</option>
                            <option value="Minder dan 50">Minder dan 50 gasten</option>
                            <option value="50 - 100">50 - 100 gasten</option>
                            <option value="100 - 250">100 - 250 gasten</option>
                            <option value="Meer dan 250">Meer dan 250 gasten</option>
                          </select>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 rounded-xl bg-[#d4cab4]/5 border border-[#d4cab4]/10">
                      <div>
                        <label className="block text-[10px] font-sans font-semibold text-[#d4cab4] uppercase tracking-[0.15em] mb-2">Type Gelegenheid</label>
                        <select name="gelegenheid" defaultValue="" className="w-full bg-[#3d2f1b] border border-white/10 rounded-lg p-3.5 text-white font-sans text-sm focus:outline-none focus:border-[#d4cab4] transition-colors appearance-none cursor-pointer" required>
                          <option value="" disabled>Kies een gelegenheid...</option>
                          {aanvraagType === 'zakelijk' 
                            ? zakelijkeOpties.map(opt => <option key={opt} value={opt}>{opt}</option>)
                            : particuliereOpties.map(opt => <option key={opt} value={opt}>{opt}</option>)
                          }
                        </select>
                      </div>
                      {aanvraagType === 'zakelijk' && (
                        <div>
                          <label className="block text-[10px] font-sans font-semibold text-[#d4cab4] uppercase tracking-[0.15em] mb-2">Aantal verwachte gasten</label>
                          <select name="aantal_gasten" defaultValue="" className="w-full bg-[#3d2f1b] border border-white/10 rounded-lg p-3.5 text-white font-sans text-sm focus:outline-none focus:border-[#d4cab4] transition-colors appearance-none cursor-pointer">
                            <option value="" disabled>Selecteer aantal...</option>
                            <option value="Minder dan 50">Minder dan 50 gasten</option>
                            <option value="50 - 100">50 - 100 gasten</option>
                            <option value="100 - 250">100 - 250 gasten</option>
                            <option value="250 - 500">250 - 500 gasten</option>
                            <option value="Meer dan 500">Meer dan 500 gasten</option>
                          </select>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-sans font-semibold text-[#d4cab4] uppercase tracking-[0.15em] mb-2">Gewenste Datum</label>
                        <input type="date" name="datum" className="w-full bg-white/5 border border-white/10 rounded-lg p-3.5 text-white font-sans text-sm focus:outline-none focus:border-[#d4cab4] transition-colors [color-scheme:dark]" required />
                      </div>
                      <div>
                        <label className="block text-[10px] font-sans font-semibold text-[#d4cab4] uppercase tracking-[0.15em] mb-2">Locatie (Plaats/Adres)</label>
                        <input type="text" name="locatie" placeholder="Waar is het evenement?" className="w-full bg-white/5 border border-white/10 rounded-lg p-3.5 text-white font-sans text-sm focus:outline-none focus:border-[#d4cab4] transition-colors placeholder:text-white/20" required />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans font-semibold text-[#d4cab4] uppercase tracking-[0.15em] mb-2">Details & Extra Wensen</label>
                      <textarea name="bericht" rows={4} placeholder="Vertel ons meer over het evenement. Zijn er specifieke wensen voor het menu of de tijden?" className="w-full bg-white/5 border border-white/10 rounded-lg p-3.5 text-white font-sans text-sm focus:outline-none focus:border-[#d4cab4] transition-colors placeholder:text-white/20 resize-none"></textarea>
                    </div>

                    <div className="flex items-start gap-3 mt-4">
                      <input 
                        type="checkbox" 
                        id="privacy_akkoord" 
                        name="privacy_akkoord" 
                        required 
                        className="mt-1 shrink-0 cursor-pointer"
                      />
                      <label htmlFor="privacy_akkoord" className="text-[#ebdad0] font-sans text-[10px] sm:text-xs opacity-80 cursor-pointer leading-relaxed">
                        Ik ga ermee akkoord dat 't Bonenbakkie mijn gegevens veilig opslaat om contact op te nemen over deze offerte.
                      </label>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full coffee-btn flex items-center justify-center gap-3 py-4 font-sans font-semibold uppercase tracking-[0.15em] text-[11px] sm:text-[13px] mt-4 disabled:opacity-50 hover:shadow-[0_0_20px_rgba(212,202,180,0.2)]">
                      {isSubmitting ? 'Bezig met versturen...' : <>Vraag Vrijblijvend Aan <Send size={16} /></>}
                    </button>
                  </form>
                </div>
              )}
            </div>
            
          </div>
        )}
      </section>
    </main>
  );
};

export default Contact;