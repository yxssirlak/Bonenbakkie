import { useEffect, useState, useRef } from 'react';
import { Routes, Route, NavLink, Link, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X, Instagram, Facebook, Linkedin } from 'lucide-react';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Events from './pages/Events';
import Sfeer from './pages/Sfeer';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

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
        <div className="w-full px-6 lg:px-16 py-4 flex items-center justify-between h-24 relative">
          
          <nav ref={navRef} className={`hidden md:flex flex-1 max-w-[40%] justify-start top-nav items-center gap-1 theme-${navTheme} -ml-5`}>
            <div
              className={`absolute h-full top-0 left-0 rounded-full border transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none z-0 ${bubbleClass}`}
              style={{
                left: `${bubbleStyle.left}px`,
                width: `${bubbleStyle.width}px`,
                opacity: bubbleStyle.opacity,
              }}
            />

            {/* Navigatie-items: kleine letters voor perfecte CSS text-transform */}
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active-link' : '')}>Home</NavLink>
            <NavLink to="/menu" className={({ isActive }) => (isActive ? 'active-link' : '')}>Menu</NavLink>
            <NavLink to="/events" className={({ isActive }) => (isActive ? 'active-link' : '')}>Boeken</NavLink>
            <NavLink to="/sfeer" className={({ isActive }) => (isActive ? 'active-link' : '')}>Sfeer</NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active-link' : '')}>Over ons</NavLink>
          </nav>

          {/* Logo */}
          <div className="absolute left-1/2 lg:left-[52%] -top-2 md:top-1/4 transform -translate-x-1/2 flex items-center pointer-events-none z-10 w-64 sm:w-72">
            <img 
              src="/bonenbakkielogo.png" 
              alt="'t bonenbakkie" 
              className="w-full h-auto object-contain pointer-events-auto filter drop-shadow-md" 
            />
          </div>

          <div className="flex-1 max-w-[40%] flex justify-end items-center gap-4">
            <div className="hidden md:block">
              {/* Contact-knop strak uitgelijnd */}
              <Link to="/contact" className="coffee-btn">Contact</Link>
            </div>
            <button 
              className="md:hidden p-2 text-white z-30 absolute left-4 top-4"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Open mobiel menu"
            >
              {isMobileMenuOpen ? <X size={28} color="#f4ebd9" /> : <MenuIcon size={28} color="#f4ebd9" />}
            </button>
          </div>

        </div>

        {/* Mobiel menu */}
        <div className={`md:hidden absolute w-full bg-[#534026]/95 backdrop-blur-xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 py-4 border-b border-white/10' : 'max-h-0 py-0'}`}>
          <div className="flex flex-col px-6 gap-4 text-center top-nav">
            <NavLink to="/" end className="text-[#f4ebd9] py-2 border-b border-white/10" onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
            <NavLink to="/menu" className="text-[#f4ebd9] py-2 border-b border-white/10" onClick={() => setIsMobileMenuOpen(false)}>Menu</NavLink>
            <NavLink to="/events" className="text-[#f4ebd9] py-2 border-b border-white/10" onClick={() => setIsMobileMenuOpen(false)}>Boeken</NavLink>
            <NavLink to="/sfeer" className="text-[#f4ebd9] py-2 border-b border-white/10" onClick={() => setIsMobileMenuOpen(false)}>Sfeer</NavLink>
            <NavLink to="/about" className="text-[#f4ebd9] py-2 border-b border-white/10" onClick={() => setIsMobileMenuOpen(false)}>Over ons</NavLink>
            <NavLink to="/contact" className="text-[#e3cdb3] py-2" onClick={() => setIsMobileMenuOpen(false)}>Contact</NavLink>
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
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>

      <footer className="w-full border-t border-white/10 bg-white/5 backdrop-blur-md py-14 px-4 sm:px-6 lg:px-8 mt-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10 pb-10 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3 mb-5 w-64 sm:w-72 md:w-80">
                <img src="/bonenbakkielogo.png" alt="'t bonenbakkie" className="w-full h-auto object-contain" />
              </div>
              <p className="text-[#f4ebd9] leading-relaxed opacity-90 font-sans">
                Premium koffie naar je buurt, één kopje tegelijk. Ervaar de warmte van onze mobiele wagen.
              </p>
            </div>
            <div className="top-nav">
              <h4 className="font-serif font-bold mb-5 text-[var(--logo-cream)] text-center text-xl">Snelle Links</h4>
              <ul className="space-y-3 text-[var(--logo-cream)]">
                <li className="text-center"><Link to="/menu" className="hover:text-white transition-colors block font-serif">Menu</Link></li>
                <li className="text-center"><Link to="/events" className="hover:text-white transition-colors block font-serif">Boeken</Link></li>
                <li className="text-center"><Link to="/sfeer" className="hover:text-white transition-colors block font-serif">Sfeer</Link></li>
                <li className="text-center"><Link to="/about" className="hover:text-white transition-colors block font-serif">Over ons</Link></li>
              </ul>
            </div>
            <div className="flex flex-col justify-between">
              <h4 className="font-serif font-bold mb-5 text-[var(--logo-cream)] text-center text-xl">Volg Ons</h4>
              <div className="flex flex-col gap-3 text-[var(--logo-cream)]">
                <a href="#" className="hover:text-white transition-colors font-serif text-center inline-flex items-center justify-center gap-2">
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
                <a href="#" className="hover:text-white transition-colors font-serif text-center inline-flex items-center justify-center gap-2">
                  <Facebook className="w-4 h-4" /> Facebook
                </a>
                <a href="#" className="hover:text-white transition-colors font-serif text-center inline-flex items-center justify-center gap-2">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
                <Link to="/admin" className="accent-link footer-login">Login</Link>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-[#f4ebd9] opacity-60 font-sans">
            <p>© 2026 't bonenbakkie. Met liefde gemaakt van de fijnste koffiebonen.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;