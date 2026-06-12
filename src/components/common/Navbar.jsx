import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 300);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(prev => !prev);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleDocumentClick = () => {
      setDropdownOpen(false);
    };
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
    setDropdownOpen(false);
    setMobileDropdownOpen(false);
  }, [location]);

  const handleNavClick = (e, path, hashId) => {
    if (location.pathname === '/') {
      if (hashId) {
        e.preventDefault();
        const el = document.getElementById(hashId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      if (hashId) {
        e.preventDefault();
        navigate(`/${hashId ? '#' + hashId : ''}`);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#090909]/95 backdrop-blur-md border-b border-zinc-900/50 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl w-full mx-auto px-6 lg:px-10">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-24' : 'h-28'}`}>
          {/* Logo */}
          <Link to="/" className="flex flex-col select-none group shrink-0">
            <span className="font-bold text-4xl tracking-[0.05em] text-zinc-50 uppercase leading-none transition-all duration-300" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>
              UPPERINK
            </span>
            <span className="text-[11px] text-zinc-400/80 tracking-[0.15em] uppercase mt-2 leading-none font-semibold transition-all duration-300" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Professional Clothing Manufacturer
            </span>
          </Link>

          {/* Desktop Nav - Right Aligned */}
          <nav className="hidden lg:flex items-center gap-10 xl:gap-12 ml-auto h-full">
            <Link
              to="/"
              className={`text-[17px] tracking-wide transition-colors ${
                location.pathname === '/' && !location.hash
                  ? 'text-zinc-50 font-bold'
                  : 'text-zinc-400 font-semibold hover:text-zinc-50'
              }`}
            >
              Home
            </Link>

            {/* Panduan Dropdown */}
            <div 
              className="h-full flex items-center relative group"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={handleButtonClick}
                className={`flex items-center gap-1 text-[17px] tracking-wide transition-colors cursor-pointer ${
                  location.pathname === '/size-chart' || location.pathname === '/tracking'
                    ? 'text-zinc-50 font-bold'
                    : 'text-zinc-400 font-semibold hover:text-zinc-50'
                }`}
              >
                Panduan
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <div 
                className={`absolute top-full -left-4 pt-2 w-56 z-50 transition-all duration-200 ${
                  dropdownOpen 
                    ? 'opacity-100 translate-y-0 pointer-events-auto' 
                    : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
              >
                <div className="bg-[#1A1819] border border-zinc-800/80 shadow-2xl p-2 rounded-none">
                  <Link
                    to="/size-chart"
                    className="block px-4 py-3 text-[15px] font-medium tracking-wide text-zinc-400 hover:text-zinc-50 hover:bg-white/[0.02] transition-colors"
                  >
                    Size Chart
                  </Link>
                  <Link
                    to="/tracking"
                    className="block px-4 py-3 text-[15px] font-medium tracking-wide text-zinc-400 hover:text-zinc-50 hover:bg-white/[0.02] transition-colors"
                  >
                    Cek Status Produksi
                  </Link>
                  <Link
                    to="/produk"
                    className="block px-4 py-3 text-[15px] font-medium tracking-wide text-zinc-400 hover:text-zinc-50 hover:bg-white/[0.02] transition-colors"
                  >
                    E-Katalog
                  </Link>
                </div>
              </div>
            </div>

            <Link
              to="/produk"
              className={`text-[17px] tracking-wide transition-colors ${
                location.pathname === '/produk'
                  ? 'text-zinc-50 font-bold'
                  : 'text-zinc-400 font-semibold hover:text-zinc-50'
              }`}
            >
              Produk
            </Link>

            <a
              href="#tentang"
              onClick={(e) => handleNavClick(e, '/', 'tentang')}
              className={`text-[17px] tracking-wide transition-colors ${
                location.hash === '#tentang'
                  ? 'text-zinc-50 font-bold'
                  : 'text-zinc-400 font-semibold hover:text-zinc-50'
              }`}
            >
              Tentang
            </a>

            <a
              href="#kontak"
              onClick={(e) => handleNavClick(e, '/', 'kontak')}
              className={`text-[17px] tracking-wide transition-colors ${
                location.hash === '#kontak'
                  ? 'text-zinc-50 font-bold'
                  : 'text-zinc-400 font-semibold hover:text-zinc-50'
              }`}
            >
              Kontak
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-zinc-400 hover:text-zinc-50 transition-colors"
            onClick={() => setOpen(v => !v)}
            aria-label="Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#090909] border-t border-zinc-900 animate-slide-up h-screen">
          <div className="px-6 py-8 space-y-6">
            <Link
              to="/"
              className="block text-sm font-semibold uppercase tracking-wider text-zinc-300 hover:text-zinc-50"
            >
              Home
            </Link>

            {/* Mobile Dropdown */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                className="flex items-center justify-between w-full text-sm font-semibold uppercase tracking-wider text-zinc-300 hover:text-zinc-50"
              >
                <span>Panduan</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileDropdownOpen && (
                <div className="pl-4 space-y-3 border-l border-zinc-800">
                  <Link
                    to="/size-chart"
                    className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-zinc-50 py-1"
                  >
                    Size Chart
                  </Link>
                  <Link
                    to="/tracking"
                    className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-zinc-50 py-1"
                  >
                    Cek Status Produksi
                  </Link>
                  <Link
                    to="/produk"
                    className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-zinc-50 py-1"
                  >
                    E-Katalog
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/produk"
              className="block text-sm font-semibold uppercase tracking-wider text-zinc-300 hover:text-zinc-50"
            >
              Produk
            </Link>

            <a
              href="#tentang"
              onClick={(e) => { setOpen(false); handleNavClick(e, '/', 'tentang'); }}
              className="block text-sm font-semibold uppercase tracking-wider text-zinc-300 hover:text-zinc-50"
            >
              Tentang Kami
            </a>

            <a
              href="#kontak"
              onClick={(e) => { setOpen(false); handleNavClick(e, '/', 'kontak'); }}
              className="block text-sm font-semibold uppercase tracking-wider text-zinc-300 hover:text-zinc-50"
            >
              Kontak
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
