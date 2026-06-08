import { useEffect, useState, useRef } from 'react';
import { Routes, Route, NavLink, Link, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X } from 'lucide-react';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Events from './pages/Events';
import Sfeer from './pages/Sfeer';
import Contact from './pages/Contact';

const App = () => {
  const location = useLocation();
  const [navTheme, setNavTheme] = useState<'light' | 'dark'>('dark');
  const [navOffset, setNavOffset] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navRef = useRef<HTMLElement>(null);
  const [bubbleStyle, setBubbleStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const updateBubble = () => {
      if (navRef.current) {
        const activeLink = navRef.current.querySelector('.active-link') as HTMLElement;
        if (activeLink) {
          setBubbleStyle({
            left: activeLink.offsetLeft,
            width: activeLink.offsetWidth,
            opacity: 1,
          });
        } else {
          setBubbleStyle((prev) => ({ ...prev, opacity: 0 }));
        }
      }
    };

    setTimeout(updateBubble, 50);
    window.addEventListener('resize', updateBubble);
    
    return () => window.removeEventListener('resize', updateBubble);
  }, [location.pathname, navTheme]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0); 
  }, [location.pathname]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[data-nav-theme]'));
    if (!sections.length) return;

    const headerHeight = 92;
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (!visibleEntries.length) return;
        const best = visibleEntries.reduce((previous, current) =>
          previous.intersectionRatio > current.intersectionRatio ? previous : current
        );
        const theme = best.target.getAttribute('data-nav-theme');
        setNavTheme(theme === 'light' ? 'light' : 'dark');
      },
      {
        rootMargin: `-${headerHeight}px 0px 0px 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setNavOffset(Math.min(currentY, 120));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bubbleClass = navTheme === 'dark' 
    ? 'bg-white/15 border-white/20 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.1)]' 
    : 'bg-[#6b4423]/10 border-[#6b4423]/20 backdrop-blur-md shadow-sm';

  return (
    <div className="page-shell flex flex-col min-h-screen">
      <header
        className="fixed w-full z-50 top-0 left-0 transition-all duration-300 ease-[cubic-bezier(0.215,0.61,0.355,1)]"
        style={{
          transform: `translateY(-${navOffset}px)`,
          opacity: `${Math.max(0, 1 - navOffset / 120)}`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between md:justify-center gap-6 relative">
          
          <div className="flex items-center gap-4 md:absolute md:left-4 lg:left-8">
            <img src="/Logo_bonenbakkie.jpeg" alt="'t Bonenbakkie" className="h-10 w-10 sm:h-14 sm:w-14 rounded-full object-cover shadow-lg" />
            <span className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">'t Bonenbakkie</span>
          </div>

          <nav ref={navRef} className={`hidden md:flex top-nav items-center gap-2 text-sm theme-${navTheme}`}>
            <div
              className={`absolute h-full top-0 left-0 rounded-full border transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none z-0 ${bubbleClass}`}
              style={{
                left: `${bubbleStyle.left}px`,
                width: `${bubbleStyle.width}px`,
                opacity: bubbleStyle.opacity,
              }}
            />

            <NavLink to="/menu" className={({ isActive }) => (isActive ? 'active-link' : '')}>MENU</NavLink>
            <NavLink to="/events" className={({ isActive }) => (isActive ? 'active-link' : '')}>EVENTS</NavLink>
            
            <NavLink to="/" end className={({ isActive }) => `home-link ${isActive ? 'active-link' : ''}`}>HOME</NavLink>
            
            <NavLink to="/sfeer" className={({ isActive }) => (isActive ? 'active-link' : '')}>SFEER</NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active-link' : '')}>OVER ONS</NavLink>
          </nav>

          <div className="hidden md:flex absolute right-4 lg:right-8 justify-end">
            {/* Contact knop heeft nu automatisch de strakke stijl vanuit de CSS class .coffee-btn */}
            <Link to="/contact"><button className="coffee-btn">CONTACT</button></Link>
          </div>

          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>

        <div className={`md:hidden absolute w-full bg-[#110904]/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 py-4' : 'max-h-0 py-0'}`}>
          <div className="flex flex-col px-6 gap-4 text-center font-sans uppercase tracking-widest text-xs font-bold">
            <NavLink to="/" end className="text-white py-2 border-b border-white/10">HOME</NavLink>
            <NavLink to="/menu" className="text-white py-2 border-b border-white/10">MENU</NavLink>
            <NavLink to="/events" className="text-white py-2 border-b border-white/10">EVENTS</NavLink>
            <NavLink to="/sfeer" className="text-white py-2 border-b border-white/10">SFEER</NavLink>
            <NavLink to="/about" className="text-white py-2 border-b border-white/10">OVER ONS</NavLink>
            <NavLink to="/contact" className="text-[#D4A574] py-2">CONTACT</NavLink>
          </div>
        </div>
      </header>

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/events" element={<Events />} />
          <Route path="/sfeer" element={<Sfeer />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>

      <footer className="w-full border-t border-white/10 bg-white/5 backdrop-blur-md py-14 px-4 sm:px-6 lg:px-8 mt-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10 pb-10 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <img src="/Logo_bonenbakkie.jpeg" alt="'t Bonenbakkie" className="h-10 w-10 rounded-full object-cover shadow-lg" />
                <span className="text-2xl font-serif font-bold text-[#F5EFE7]">'t Bonenbakkie</span>
              </div>
              <p className="text-[#ebdad0] leading-relaxed">
                Premium koffie naar je buurt, één kopje tegelijk. Ervaar de warmte van onze mobiele wagen.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-5 text-[#F5EFE7] uppercase tracking-wider text-sm font-sans">Snelle Links</h4>
              <ul className="space-y-3 text-[#D4A574] text-xs uppercase tracking-widest font-bold font-sans">
                <li><Link to="/menu" className="hover:text-white transition-colors block">MENU</Link></li>
                <li><Link to="/events" className="hover:text-white transition-colors block">EVENTS</Link></li>
                <li><Link to="/sfeer" className="hover:text-white transition-colors block">SFEER</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors block">OVER ONS</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-5 text-[#F5EFE7] uppercase tracking-wider text-sm font-sans">Volg Ons</h4>
              <div className="flex flex-col gap-3 text-[#D4A574] text-xs uppercase tracking-widest font-bold font-sans">
                <a href="#" className="hover:text-white transition-colors">INSTAGRAM</a>
                <a href="#" className="hover:text-white transition-colors">FACEBOOK</a>
                <a href="#" className="hover:text-white transition-colors">LINKEDIN</a>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-[#ebdad0]/60 font-sans">
            <p>© 2026 't Bonenbakkie. Met liefde gemaakt van de fijnste koffiebonen.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;