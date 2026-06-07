import { useEffect, useState } from 'react';
import { Routes, Route, NavLink, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';

const App = () => {
  const location = useLocation();
  const [navTheme, setNavTheme] = useState<'light' | 'dark'>('dark');
  const [navOffset, setNavOffset] = useState(0);

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
      <div className="page-shell">
        <header
          className="fixed w-full z-30 top-0 left-0 transition-all duration-300 ease-[cubic-bezier(0.215,0.61,0.355,1)]"
          style={{
            transform: `translateY(-${navOffset}px)`,
            opacity: `${Math.max(0, 1 - navOffset / 120)}`,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-[auto_1fr_auto] items-center gap-6 nav-glass">
            <div className="flex items-center gap-4">
              <img src="/Logo_bonenbakkie.jpeg" alt="'t Bonenbakkie" className="h-14 w-14 rounded-full object-cover" />
              <span className="text-2xl font-serif font-bold text-white tracking-wide">'t Bonenbakkie</span>
            </div>

            <nav className="top-nav flex items-center gap-8 text-sm justify-self-center">
              <NavLink to="/menu" className={({ isActive }) =>
                isActive ? activeThemeClass : hoverThemeClass
              }>Menu</NavLink>
              <NavLink to="/" end className={({ isActive }) =>
                isActive ? `home-link ${activeThemeClass}` : `home-link ${baseThemeClass}`
              }>Home</NavLink>
              <NavLink to="/about" className={({ isActive }) =>
                isActive ? activeThemeClass : hoverThemeClass
              }>Over Ons</NavLink>
            </nav>

            <div className="flex justify-end">
              <Link to="/contact"><button className="coffee-btn text-sm">Contact</button></Link>
            </div>
          </div>
        </header>

        <div className="pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>

        {/* Location section removed as requested */}

        {/* Footer */}
        <footer className="py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#4A3728', color: '#F5EFE7' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8 pb-8" style={{ borderBottom: '1px solid #6B4423' }}>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/Logo_bonenbakkie.jpeg" alt="'t Bonenbakkie" className="h-8 w-8 rounded-full object-cover" />
                <span className="text-xl font-serif font-bold">'t Bonenbakkie</span>
              </div>
              <p style={{ color: '#D4A574' }}>Premium koffie naar je buurt, één kopje tegelijk.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Snelle Links</h4>
              <ul className="space-y-2" style={{ color: '#D4A574' }}>
                <li><Link to="/menu" className="hover:text-white transition-colors">Menu</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">Over Ons</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Volg Ons</h4>
              <div className="flex gap-4" style={{ color: '#D4A574' }}>
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">Facebook</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
              </div>
            </div>
          </div>
          <div className="text-center text-sm" style={{ color: '#D4A574' }}>
            <p>© 2024 't Bonenbakkie. Met liefde gemaakt van de fijnste koffiebonen.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
