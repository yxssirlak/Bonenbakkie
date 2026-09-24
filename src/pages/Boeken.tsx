import React, { useEffect, useRef } from 'react';
import { Briefcase, PartyPopper, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Boeken: React.FC = () => {
  const beanRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 40;
      const y = (event.clientY / window.innerHeight - 0.5) * 40;

      beanRefs.current.forEach((bean, index) => {
        if (!bean) return;
        const depth = 0.2 + index * 0.08;
        bean.style.setProperty('--tx', `${x * depth}px`);
        bean.style.setProperty('--ty', `${y * depth}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const beanPositions = [
    'left-[-2%] top-[12%] opacity-50 blur-sm bean-large',
    'right-[5%] top-[18%] opacity-40 blur-sm bean-medium',
    'left-[18%] top-[42%] opacity-35 blur-sm bean-small',
    'right-[14%] top-[48%] opacity-45 blur-sm bean-medium',
    'left-[6%] bottom-[12%] opacity-40 blur-sm bean-small',
    'right-[-1%] bottom-[10%] opacity-35 blur-sm bean-large',
    'left-[46%] bottom-[8%] opacity-30 blur-sm bean-small',
    'left-[-3%] top-[58%] opacity-35 blur-sm bean-medium',
    'right-[-3%] top-[68%] opacity-40 blur-sm bean-small',
    'left-[2%] bottom-[28%] opacity-25 blur-sm bean-small',
    'right-[8%] bottom-[24%] opacity-30 blur-sm bean-medium',
  ];

  return (
    <main className="booking-page relative min-h-screen overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <style>{`
        .booking-bean {
          position: absolute;
          z-index: 0;
          width: 5rem;
          height: 5rem;
          pointer-events: none;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s;
          transform: translate(var(--tx, 0px), var(--ty, 0px)) rotate(var(--rot, 0deg));
          will-change: transform;
        }

        .bean-large { width: 8rem; height: 8rem; }
        .bean-medium { width: 6rem; height: 6rem; }
        .bean-small { width: 4.5rem; height: 4.5rem; }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(30,15,10,0.45)_150%)] pointer-events-none z-0" />
      <div className="absolute right-[0%] top-1/2 -translate-y-1/2 w-[60%] h-[80%] rounded-full bg-[#a37042] blur-[160px] opacity-25 pointer-events-none z-0" />
      {beanPositions.map((position, index) => (
        <div
          key={position}
          ref={(element) => { beanRefs.current[index] = element; }}
          className={`booking-bean ${position}`}
          style={{ ['--rot' as any]: `${[-12, 45, -8, 22, 12, 30, -18, 18, -28, 42, -16][index]}deg` }}
        >
          <img src="/Boontje.png" alt="" className="h-full w-full object-contain" />
        </div>
      ))}

      <section data-nav-theme="dark" className="max-w-6xl mx-auto relative z-10">
        
        {/* Introductie Sectie */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">
            Boeken
          </h1>
          <p className="text-base sm:text-lg text-[#ebdad0] max-w-2xl mx-auto leading-relaxed font-sans opacity-90">
            Opzoek naar een sfeervolle koffiekar voor uw evenement? ‘t bonenbakkie serveert koffie en gezelligheid op iedere plek. Wij zijn inzetbaar door heel Nederland en komen graag naar uw locatie. Samen bespreken we de sfeer, het aantal gasten en uw wensen, zodat alles goed aansluit en uw gasten zich welkom voelen.
          </p>
        </div>

        {/* Pakketten / Arrangementen */}
        <div className="flex flex-col items-center gap-16 mb-24 text-center">
          
          {/* Particulier */}
          <div className="flex w-full max-w-2xl flex-col items-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#d4cab4]/10 px-4 py-2 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-white mb-8">
              Voor privé momenten
            </div>
            
            <PartyPopper className="w-12 h-12 text-white mb-6" />
            
            <h3 className="text-3xl font-serif text-[#F5EFE7] mb-4">Particulier</h3>
            
            <p className="text-white opacity-90 mb-10 leading-relaxed font-sans text-sm sm:text-base max-w-xl">
              Perfect voor bruiloften, verjaardagen en familiefeestjes. Een warme, persoonlijke koffiebeleving met aandacht voor sfeer en smaak. Van een intiem koffiemoment tot een feestelijke ontvangst: wij zorgen voor vers gezette koffie en een gastvrije uitstraling die past bij uw gezelschap.
            </p>
          </div>

          <div className="flex w-full max-w-3xl items-center gap-5 py-2" aria-hidden="true">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4cab4]/45 to-[#d4cab4]/70" />
            <div className="h-2 w-2 rotate-45 border border-[#d4cab4]/70 bg-[#534026]" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#d4cab4]/45 to-[#d4cab4]/70" />
          </div>

          {/* Zakelijk */}
          <div className="flex w-full max-w-2xl flex-col items-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#d4cab4]/10 px-4 py-2 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-white mb-8">
              Voor bedrijven & events
            </div>
            
            <Briefcase className="w-12 h-12 text-white mb-6" />
            
            <h3 className="text-3xl font-serif text-[#F5EFE7] mb-4">Zakelijk</h3>
            
            <p className="text-white opacity-90 mb-10 leading-relaxed font-sans text-sm sm:text-base max-w-xl">
              Geschikt voor bedrijfsfeestjes, markten, festivals en beurzen. Professionele koffie met een toegankelijke én krachtige presentatie. Onze koffiekar brengt energie en beleving naar uw locatie en wordt afgestemd op de planning, uitstraling en omvang van uw zakelijke evenement.
            </p>
          </div>

        </div>

        {/* CTA Sectie Onderaan */}
        <div className="glass-card p-10 sm:p-16 lg:p-20 text-center animate-fade-in-up border border-white/10 bg-white/5 relative overflow-hidden rounded-[2rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,202,180,0.06)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif text-[#F5EFE7] mb-6">
              Interesse in 't bonenbakkie?
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