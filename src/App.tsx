import { useEffect, useState, useRef } from 'react';
import { Routes, Route, NavLink, Link, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X, Instagram, Facebook, Linkedin } from 'lucide-react';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Boeken from './pages/Boeken';
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

  // Luxere bubbel styling
  const bubbleClass = navTheme === 'dark' 
    ? 'bg-white/10 border border-white/20 backdrop-blur-md shadow-[0_4px_20px_rgba(255,255,255,0.05)]' 
    : 'bg-[#534026]/10 border border-[#534026]/20 backdrop-blur-md shadow-sm';

  const menuItems = [
    { path: '/menu', label: 'Menu' },
    { path: '/boeken', label: 'Boeken' },
    { path: '/sfeer', label: 'Sfeer' },
    { path: '/about', label: 'Over ons' },
  ];

  return (
    <div className="page-shell flex flex-col min-h-screen">
      <header
        className="fixed w-full z-50 top-0 left-0 transition-all duration-500 ease-out"
        style={{
          transform: `translateY(-${navOffset}px)`,
          opacity: `${Math.max(0, 1 - navOffset / 120)}`,
        }}
      >
        {/* HIER GEWIJZIGD: px-[2px] zorgt ervoor dat alles strak 2 pixels van de rand staat */}
        <div className="w-full px-[2px] flex items-center justify-between h-28 relative">
          
          {/* LINKER KANT (Navigatie) */}
          <div className="flex-1 flex justify-start items-center z-20">
            <nav 
              ref={navRef} 
              className={`hidden lg:flex top-nav items-center gap-1 xl:gap-2 theme-${navTheme} relative`}
              onMouseLeave={() => {
                setIsHovering(false);
                snapToActive();
              }}
            >
              <div
                className={`absolute h-full top-0 left-0 rounded-full transition-all duration-300 ease-out pointer-events-none z-0 ${bubbleClass}`}
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
                  className={({ isActive }) => `px-3 xl:px-4 py-1.5 whitespace-nowrap text-[11px] xl:text-[13px] font-semibold tracking-[0.15em] uppercase transition-colors duration-300 relative z-10 ${isActive ? 'active-link text-white' : 'opacity-80 hover:opacity-100'}`}
                  onMouseEnter={(e) => {
                    setIsHovering(true);
                    moveBubbleTo(e.currentTarget);
                  }}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            
            <button 
              className="lg:hidden p-2 text-white hover:opacity-80 transition-opacity ml-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Open mobiel menu"
            >
              {isMobileMenuOpen ? <X size={32} color="#f4ebd9" /> : <MenuIcon size={32} color="#f4ebd9" />}
            </button>
          </div>

          {/* MIDDEN (Logo) */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 flex justify-center">
            <Link 
              to="/" 
              className="w-48 sm:w-60 lg:w-72 xl:w-80 transition-transform duration-300 ease-out hover:scale-[1.03] group"
              aria-label="Terug naar Home"
            >
              <img 
                src="/bonenbakkielogo.png" 
                alt="'t bonenbakkie" 
                className="w-full h-auto object-contain filter drop-shadow-md transition-all duration-300 group-hover:drop-shadow-xl" 
              />
            </Link>
          </div>

          {/* RECHTER KANT (Contact Knop) */}
          <div className="flex-1 flex justify-end items-center z-20">
            <div className="hidden lg:block">
              <Link 
                to="/contact" 
                className="coffee-btn text-[11px] xl:text-[13px] tracking-[0.15em] whitespace-nowrap px-6 py-2.5 xl:px-8 xl:py-3 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Contact
              </Link>
            </div>
          </div>
          
        </div>

        <div className={`lg:hidden absolute w-full bg-[#3d2f1b]/95 backdrop-blur-xl transition-all duration-500 overflow-hidden shadow-2xl ${isMobileMenuOpen ? 'max-h-96 py-4 border-b border-white/10' : 'max-h-0 py-0'}`}>
          <div className="flex flex-col px-8 gap-2 text-center top-nav">
            <NavLink to="/" end className="text-[#f4ebd9] py-3 text-sm tracking-widest uppercase border-b border-white/5" onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
            <NavLink to="/menu" className="text-[#f4ebd9] py-3 text-sm tracking-widest uppercase border-b border-white/5" onClick={() => setIsMobileMenuOpen(false)}>Menu</NavLink>
            <NavLink to="/boeken" className="text-[#f4ebd9] py-3 text-sm tracking-widest uppercase border-b border-white/5" onClick={() => setIsMobileMenuOpen(false)}>Boeken</NavLink>
            <NavLink to="/sfeer" className="text-[#f4ebd9] py-3 text-sm tracking-widest uppercase border-b border-white/5" onClick={() => setIsMobileMenuOpen(false)}>Sfeer</NavLink>
            <NavLink to="/about" className="text-[#f4ebd9] py-3 text-sm tracking-widest uppercase border-b border-white/5" onClick={() => setIsMobileMenuOpen(false)}>Over ons</NavLink>
            <NavLink to="/contact" className="text-[#d4cab4] py-3 text-sm tracking-widest uppercase font-bold" onClick={() => setIsMobileMenuOpen(false)}>Contact</NavLink>
          </div>
        </div>
      </header>

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/boeken" element={<Boeken />} />
          <Route path="/sfeer" element={<Sfeer />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>

      <footer className="w-full border-t border-white/10 bg-white/5 backdrop-blur-md py-24 px-4 sm:px-6 lg:px-12 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16 pb-16 border-b border-white/10">
            
            {/* Logo & Info */}
            <div className="md:col-span-5 lg:col-span-5">
              <Link to="/" className="inline-block mb-8 w-64 sm:w-80 transition-transform hover:scale-105">
                <img src="/bonenbakkielogo.png" alt="'t bonenbakkie" className="w-full h-auto object-contain" />
              </Link>
              <p className="text-[#f4ebd9] leading-relaxed opacity-80 font-sans text-base max-w-md mb-8">
                Premium koffie naar je buurt, één kopje tegelijk. Ervaar de warmte van onze mobiele wagen.
              </p>
              
              <div className="text-[#f4ebd9] opacity-60 font-sans text-base flex flex-col gap-2">
                <p>KvK: 99842807</p>
                <p>info@bonenbakkie.nl</p>
              </div>
            </div>

            {/* Snelle Links */}
            <div className="md:col-span-3 lg:col-span-2 lg:col-start-8">
              <h4 className="font-sans font-bold tracking-[0.2em] uppercase mb-8 text-[#d4cab4] text-sm opacity-70">
                Snelle Links
              </h4>
              <ul className="space-y-5 text-[#f4ebd9]">
                <li><Link to="/menu" className="hover:text-white hover:translate-x-2 transition-transform inline-block font-sans text-base">Menu</Link></li>
                <li><Link to="/boeken" className="hover:text-white hover:translate-x-2 transition-transform inline-block font-sans text-base">Boeken</Link></li>
                <li><Link to="/sfeer" className="hover:text-white hover:translate-x-2 transition-transform inline-block font-sans text-base">Sfeer</Link></li>
                <li><Link to="/about" className="hover:text-white hover:translate-x-2 transition-transform inline-block font-sans text-base">Over ons</Link></li>
              </ul>
            </div>

            {/* Volg Ons */}
            <div className="md:col-span-4 lg:col-span-2">
              <h4 className="font-sans font-bold tracking-[0.2em] uppercase mb-8 text-[#d4cab4] text-sm opacity-70">
                Volg Ons
              </h4>
              <div className="flex flex-col gap-5 text-[#f4ebd9]">
                <a href="#" className="hover:text-white hover:translate-x-2 transition-transform inline-flex items-center gap-4 font-sans text-base w-max">
                  <Instagram className="w-5 h-5 text-[#d4cab4]" /> Instagram
                </a>
                <a href="#" className="hover:text-white hover:translate-x-2 transition-transform inline-flex items-center gap-4 font-sans text-base w-max">
                  <Facebook className="w-5 h-5 text-[#d4cab4]" /> Facebook
                </a>
                <a href="#" className="hover:text-white hover:translate-x-2 transition-transform inline-flex items-center gap-4 font-sans text-base w-max">
                  <Linkedin className="w-5 h-5 text-[#d4cab4]" /> LinkedIn
                </a>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[#f4ebd9] font-sans">
            <p className="opacity-50">© 2026 't bonenbakkie. Met liefde gemaakt.</p>
            
            <Link 
              to="/admin" 
              className="opacity-10 hover:opacity-100 transition-opacity duration-300 px-4 py-2 uppercase tracking-[0.2em] font-bold text-xs bg-white/5 hover:bg-white/10 rounded-full"
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