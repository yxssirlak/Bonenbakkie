import React, { useEffect, useRef } from 'react';
import { Coffee } from 'lucide-react';

const About: React.FC = () => {
  const beanRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 40;
      const y = (event.clientY / window.innerHeight - 0.5) * 40;

      beanRefs.current.forEach((bean, index) => {
        if (!bean) return;
        const depth = 0.15 + index * 0.08;
        bean.style.setProperty('--tx', `${x * depth}px`);
        bean.style.setProperty('--ty', `${y * depth}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const beanPositions = [
    'left-[-2%] top-[12%] opacity-40 bean-large',
    'right-[4%] top-[20%] opacity-35 bean-small',
    'left-[16%] top-[44%] opacity-30 bean-medium',
    'right-[-2%] top-[48%] opacity-40 bean-medium',
    'left-[5%] bottom-[12%] opacity-35 bean-small',
    'right-[12%] bottom-[8%] opacity-30 bean-large',
    'left-[48%] bottom-[6%] opacity-25 bean-small',
  ];

  return (
    <main className="relative min-h-screen overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <style>{`
        .about-bean {
          position: absolute;
          z-index: 0;
          width: 5rem;
          height: 5rem;
          pointer-events: none;
          filter: blur(3px);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s;
          transform: translate(var(--tx, 0px), var(--ty, 0px)) rotate(var(--rot, 0deg));
          will-change: transform;
        }

        .bean-large { width: 8rem; height: 8rem; }
        .bean-medium { width: 6rem; height: 6rem; }
        .bean-small { width: 4.5rem; height: 4.5rem; }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(30,15,10,0.45)_150%)] pointer-events-none z-0" />
      <div className="absolute right-[0%] top-1/2 h-[80%] w-[60%] -translate-y-1/2 rounded-full bg-[#a37042] blur-[160px] opacity-20 pointer-events-none z-0" />
      {beanPositions.map((position, index) => (
        <div
          key={position}
          ref={(element) => { beanRefs.current[index] = element; }}
          className={`about-bean ${position}`}
          style={{ ['--rot' as any]: `${[-18, 36, -8, 24, 42, -28, 12][index]}deg` }}
        >
          <img src="/Boontje.png" alt="" className="h-full w-full object-contain" />
        </div>
      ))}

      {/* HIER ZIT DE FIX: data-nav-theme="dark" */}
      <section data-nav-theme="dark" className="max-w-6xl mx-auto relative z-10">
        
        <div className="text-center mb-16 fade-in-up">
          <h1 className="text-4xl md:text-5xl font-serif text-[#f8ede2] mb-6">Over Ons</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="glass-card fade-in-up border border-white/10 bg-white/5 p-8 sm:p-10 lg:p-12">
            <h2 className="text-3xl font-serif mb-8 text-[#F5EFE7]">Van droom naar werkelijkheid</h2>
            
            <p className="text-base sm:text-lg mb-6 leading-relaxed text-[#ebdad0] font-sans">
              Van beste vrienden naar collega’s: wij zijn Quinn en Renske, de oprichters van ’t bonenbakkie.
            </p>

            <p className="text-base sm:text-lg mb-6 leading-relaxed text-[#ebdad0] font-sans">
              Al voordat we aan de ondernemersopleiding begonnen, waren we beste vriendinnen. Tijdens deze opleiding hebben we veel samengewerkt en ontstond het idee om samen een eigen bedrijf te starten. Omdat we allebei gek zijn op koffie en graag genieten van een goed bakkie buiten de deur, was het idee voor een koffiekar snel geboren.
            </p>

            <p className="text-base sm:text-lg mb-6 leading-relaxed text-[#ebdad0] font-sans">
              Wat begon als een leuk plan, groeide uit tot een echte onderneming. We volgden verschillende cursussen, verdiepten ons in de wereld van koffie en gingen op zoek naar een koffiekar die bij ons paste. Toen we die hadden gevonden, hebben we hem opgeknapt en ingericht naar onze eigen stijl.
            </p>

            <p className="text-base sm:text-lg mb-6 leading-relaxed text-[#ebdad0] font-sans">
              Met veel enthousiasme, creativiteit en hard werken hebben we de kar omgetoverd tot het ’t Bonenbakkie zoals het vandaag de dag is. Nu gaan we samen op pad naar evenementen, bedrijfsfeesten, markten en andere gelegenheden om mensen te voorzien van heerlijke koffie en een gezellige sfeer.
            </p>

            <p className="text-base sm:text-lg leading-relaxed text-[#ebdad0] font-sans">
              Met ’t Bonenbakkie combineren we onze passie voor koffie, onze vriendschap en ons ondernemerschap. Dat maakt dit avontuur voor ons extra bijzonder.
            </p>
          </div>
          
          <div className="relative fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-0 rounded-[2.5rem] transform rotate-3 bg-[#d4cab4]/20 blur-lg"></div>
            <div className="relative glass-card p-2 border border-white/10 bg-white/5">
              <div className="h-[36rem] rounded-[2rem] flex items-center justify-center bg-[#140a07]/50 overflow-hidden">
                {/* TIP: Super leuk om hier later een foto van jullie twee in te zetten! Bijv: <img src="/foto-quinn-renske.jpg" className="w-full h-full object-cover" /> */}
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