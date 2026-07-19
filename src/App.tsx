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
  
  // Bubbel animatie states
  const navRef = useRef<HTMLElement>(null);
  const [bubbleStyle, setBubbleStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Verplaats bubbel naar een specifiek element
  const moveBubbleTo = (element: HTMLElement) => {
    setBubbleStyle({
      left: element.offsetLeft,
      width: element.offsetWidth,
      opacity: 1,
    });
  };

  // Schiet bubbel terug naar de actieve pagina
  const snapToActive = () => {
    if (navRef.current) {
      const activeLink = navRef.current.querySelector('.active-link') as HTMLElement;
      if (activeLink) {
        moveBubbleTo(activeLink);
      } else {
        setBubbleStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    }
  };

  useEffect(() => {
    if (!isHovering) {
      setTimeout(snapToActive, 50);
    }
    const handleResize = () => {
      if (!isHovering) snapToActive();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [location.pathname, navTheme, isHovering]);

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
    ? 'bg-white/10 border border-white/20 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.1)]' 
    : 'bg-white/40 border border-white/50 backdrop-blur-md shadow-sm';

  const menuItems = [
    { path: '/', label: 'Home', end: true },
    { path: '/menu', label: 'Menu' },
    { path: '/events', label: 'Boeken' },
    { path: '/sfeer', label: 'Sfeer' },
    { path: '/about', label: 'Over ons' },
  ];

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
          
          <nav 
            ref={navRef} 
            className={`hidden md:flex flex-1 max-w-[40%] justify-start top-nav items-center gap-1 theme-${navTheme} -ml-5 relative`}
            onMouseLeave={() => {
              setIsHovering(false);
              snapToActive();
            }}
          >
            <div
              className={`absolute h-full top-0 left-0 rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none z-0 ${bubbleClass}`}
              style={{
                left: `${bubbleStyle.left}px`,
                width: `${bubbleStyle.width}px`,
                opacity: bubbleStyle.opacity,
              }}
            />

            {menuItems.map((item) => (
              <NavLink 
                key={item.path}
                to={item.path} 
                end={item.end} 
                className={({ isActive }) => `px-3 py-1.5 transition-colors relative z-10 ${isActive ? 'active-link' : ''}`}
                onMouseEnter={(e) => {
                  setIsHovering(true);
                  moveBubbleTo(e.currentTarget);
                }}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="absolute top-1/2 left-1/2 lg:left-[53%] transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10 w-56 sm:w-64 md:w-72">
            <img 
              src="/bonenbakkielogo.png" 
              alt="'t bonenbakkie" 
              className="w-full h-auto object-contain pointer-events-auto filter drop-shadow-md" 
            />
          </div>

          <div className="flex-1 max-w-[40%] flex justify-end items-center gap-4">
            <div className="hidden md:block">
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

      {/* VERNIEUWDE, STRAKKE FOOTER */}
      <footer className="w-full border-t border-white/10 bg-white/5 backdrop-blur-md py-16 px-4 sm:px-6 lg:px-8 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-12 pb-12 border-b border-white/10">
            
            {/* Kolom 1: Logo & Info */}
            <div className="md:col-span-5 lg:col-span-4">
              <Link to="/" className="inline-block mb-6 w-56 sm:w-64">
                <img src="/bonenbakkielogo.png" alt="'t bonenbakkie" className="w-full h-auto object-contain" />
              </Link>
              <p className="text-[#f4ebd9] leading-relaxed opacity-80 font-sans text-sm max-w-sm mb-6">
                Premium koffie naar je buurt, één kopje tegelijk. Ervaar de warmte van onze mobiele wagen.
              </p>
              
              {/* Je zakelijke details (KvK etc) */}
              <div className="text-[#f4ebd9] opacity-60 font-sans text-sm flex flex-col gap-1">
                <p>KvK: 99842807</p> {/* <-- Vul hier je echte KvK in */}
                <p>info@bonenbakkie.nl</p>
              </div>
            </div>

            {/* Kolom 2: Snelle Links */}
            <div className="md:col-span-3 lg:col-span-2 lg:col-start-7">
              <h4 className="font-sans font-bold tracking-widest uppercase mb-6 text-[var(--logo-cream)] text-xs opacity-50">
                Snelle Links
              </h4>
              <ul className="space-y-4 text-[var(--logo-cream)]">
                <li><Link to="/menu" className="hover:text-white hover:translate-x-1 transition-transform inline-block font-sans text-sm">Menu</Link></li>
                <li><Link to="/events" className="hover:text-white hover:translate-x-1 transition-transform inline-block font-sans text-sm">Boeken</Link></li>
                <li><Link to="/sfeer" className="hover:text-white hover:translate-x-1 transition-transform inline-block font-sans text-sm">Sfeer</Link></li>
                <li><Link to="/about" className="hover:text-white hover:translate-x-1 transition-transform inline-block font-sans text-sm">Over ons</Link></li>
              </ul>
            </div>

            {/* Kolom 3: Volg Ons */}
            <div className="md:col-span-4 lg:col-span-3">
              <h4 className="font-sans font-bold tracking-widest uppercase mb-6 text-[var(--logo-cream)] text-xs opacity-50">
                Volg Ons
              </h4>
              <div className="flex flex-col gap-4 text-[var(--logo-cream)]">
                <a href="#" className="hover:text-white hover:translate-x-1 transition-transform inline-flex items-center gap-3 font-sans text-sm w-max">
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
                <a href="#" className="hover:text-white hover:translate-x-1 transition-transform inline-flex items-center gap-3 font-sans text-sm w-max">
                  <Facebook className="w-4 h-4" /> Facebook
                </a>
                <a href="#" className="hover:text-white hover:translate-x-1 transition-transform inline-flex items-center gap-3 font-sans text-sm w-max">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Bar met Copyright & Verborgen Login */}
          <div className="flex justify-between items-center text-xs text-[#f4ebd9] font-sans">
            <p className="opacity-50">© 2026 't bonenbakkie. Met liefde gemaakt.</p>
            
            {/* De bijna onzichtbare login knop (opacity-5) */}
            <Link 
              to="/admin" 
              className="opacity-5 hover:opacity-100 transition-opacity duration-300 px-2 py-1 uppercase tracking-widest font-bold"
              aria-label="Admin Login"
            >
              Admin
            </Link>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default App;