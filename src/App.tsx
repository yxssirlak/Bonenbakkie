import { useEffect, useState } from 'react';
import { Routes, Route, NavLink, Link, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X } from 'lucide-react';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import Events from './pages/Events'; // 1. De nieuwe pagina geïmporteerd!

const App = () => {
  const location = useLocation();
  const [navTheme, setNavTheme] = useState<'light' | 'dark'>('dark');
  const [navOffset, setNavOffset] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0); // Zorgt ervoor dat je bovenaan begint bij een nieuwe pagina
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

  const activeThemeClass = navTheme === 'light' ? 'font-semibold text-[#4f2f17]' : 'font-semibold text-white';
  const baseThemeClass = navTheme === 'light' ? 'text-[#6B4423]' : 'text-[#f7efe7]';
  const hoverThemeClass = navTheme === 'light' ? 'hover:text-[#4f2f17]' : 'hover:text-white';

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

          <nav className="hidden md:flex top-nav items-center gap-8 text-sm">
            <NavLink to="/menu" className={({ isActive }) => isActive ? activeThemeClass : hoverThemeClass}>Menu</NavLink>
            <NavLink to="/" end className={({ isActive }) => isActive ? `home-link ${activeThemeClass}` : `home-link ${baseThemeClass}`}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? activeThemeClass : hoverThemeClass}>Over Ons</NavLink>
            {/* 2. De link toegevoegd aan de navigatie */}
            <NavLink to="/events" className={({ isActive }) => isActive ? activeThemeClass : hoverThemeClass}>Evenementen</NavLink>
          </nav>

          <div className="hidden md:flex absolute right-4 lg:right-8 justify-end">
            <Link to="/contact"><button className="coffee-btn text-sm">Contact</button></Link>
          </div>

          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>

        <div className={`md:hidden absolute w-full bg-[#110904]/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 py-4' : 'max-h-0 py-0'}`}>
          <div className="flex flex-col px-6 gap-4 text-center">
            <NavLink to="/" end className="text-white py-2 border-b border-white/10">Home</NavLink>
            <NavLink to="/menu" className="text-white py-2 border-b border-white/10">Menu</NavLink>
            <NavLink to="/about" className="text-white py-2 border-b border-white/10">Over Ons</NavLink>
            <NavLink to="/events" className="text-white py-2 border-b border-white/10">Evenementen</NavLink>
            <NavLink to="/contact" className="text-white py-2 font-bold text-[#D4A574]">Contact</NavLink>
          </div>
        </div>
      </header>

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} /> {/* 3. Route gekoppeld aan de nieuwe pagina */}
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
              <h4 className="font-bold mb-5 text-[#F5EFE7] uppercase tracking-wider text-sm">Snelle Links</h4>
              <ul className="space-y-3 text-[#D4A574]">
                <li><Link to="/menu" className="hover:text-white transition-colors block">Menu</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors block">Over Ons</Link></li>
                <li><Link to="/events" className="hover:text-white transition-colors block">Evenementen</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors block">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-5 text-[#F5EFE7] uppercase tracking-wider text-sm">Volg Ons</h4>
              <div className="flex flex-col gap-3 text-[#D4A574]">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">Facebook</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-[#ebdad0]/60">
            <p>© 2026 't Bonenbakkie. Met liefde gemaakt van de fijnste koffiebonen.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;