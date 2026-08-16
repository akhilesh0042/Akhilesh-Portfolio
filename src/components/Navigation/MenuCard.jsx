import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Edit3, Check } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export const MenuCard = () => {
  const { isEditMode, toggleEditMode } = useContent();
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Deepen shadow on scroll
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Detect active section
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = id === 'hero' ? 0 : -40;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      {/* Desktop Fixed Floating Menu Card — Anchored to content grid boundaries */}
      <header className="hidden md:block fixed top-6 inset-x-0 z-50 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex justify-end">
          <aside
            id="desktop-menu-card"
            aria-label="Main Navigation"
            className={`pointer-events-auto transition-all duration-300 ${
              isScrolled ? 'shadow-elevation-menu-scrolled' : 'shadow-elevation-menu'
            } bg-elevation1 border border-white/[0.06] rounded-xl px-5 py-3`}
          >
            <div className="flex items-center gap-5">
              {/* Subtle mono brand indicator */}
              <div className="flex items-center gap-2 pr-2 border-r border-white/[0.07] text-textMuted select-none">
                <Terminal className="w-3.5 h-3.5 text-accent" />
                <span className="font-mono text-xs text-textMuted/90 tracking-tight">akhilesh.py</span>
              </div>

              {/* Navigation links */}
              <nav className="flex items-center space-x-1" role="navigation">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className="relative px-3 py-1.5 text-xs font-mono tracking-wider transition-colors duration-150 rounded text-textMuted hover:text-textPrimary focus-visible:ring-1 focus-visible:ring-accent"
                    >
                      <span className={isActive ? 'text-textPrimary font-semibold' : ''}>
                        {item.label}
                      </span>
                      {/* Active indicator: thin amber underline only, no glow */}
                      {isActive && (
                        <span
                          className="absolute bottom-0 left-2 right-2 h-[2px] bg-accent rounded-full"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Edit Mode Toggle Button */}
              <div className="pl-2 border-l border-white/[0.08]">
                <button
                  onClick={toggleEditMode}
                  title={isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
                  aria-label={isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
                  className={`p-1.5 rounded-lg border transition-all duration-200 focus-visible:ring-1 focus-visible:ring-accent ${
                    isEditMode
                      ? 'bg-accent/20 border-accent text-accent shadow-sm'
                      : 'bg-elevation2/60 border-white/[0.06] text-textMuted hover:text-accent hover:border-accent/40'
                  }`}
                >
                  {isEditMode ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Edit3 className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </aside>
        </div>
      </header>

      {/* Mobile Fixed Toggle & Bottom Panel */}
      <div className="md:hidden fixed bottom-6 right-6 z-50 flex items-center gap-2">
        {/* Mobile Edit Mode Toggle */}
        <button
          onClick={toggleEditMode}
          aria-label={isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
          className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
            isEditMode
              ? 'bg-accent/20 border-accent text-accent'
              : 'bg-elevation1 border-white/[0.08] text-textMuted'
          } ${isScrolled ? 'shadow-elevation-menu-scrolled' : 'shadow-elevation-menu'} transition-transform active:scale-95`}
        >
          {isEditMode ? <Check className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
        </button>

        {/* Toggle Button on its own elevation plane */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileOpen}
          className={`w-12 h-12 rounded-xl flex items-center justify-center bg-elevation1 border border-white/[0.08] text-textPrimary ${
            isScrolled ? 'shadow-elevation-menu-scrolled' : 'shadow-elevation-menu'
          } transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-accent`}
        >
          {mobileOpen ? (
            <X className="w-5 h-5 text-accent" />
          ) : (
            <Menu className="w-5 h-5 text-textPrimary" />
          )}
        </button>

        {/* Mobile Dropdown Panel */}
        {mobileOpen && (
          <div
            className="absolute bottom-16 right-0 w-48 bg-elevation1 border border-white/[0.08] rounded-xl shadow-elevation-menu-scrolled p-2 flex flex-col space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-150"
            role="menu"
          >
            <div className="px-3 py-1.5 border-b border-white/[0.06] flex items-center gap-1.5 text-[11px] font-mono text-textMuted">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Navigation</span>
            </div>
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full text-left px-3 py-2 text-xs font-mono rounded flex items-center justify-between transition-colors ${
                    isActive
                      ? 'text-textPrimary font-semibold bg-elevation2 border-l-2 border-accent'
                      : 'text-textMuted hover:text-textPrimary hover:bg-elevation2/50'
                  }`}
                  role="menuitem"
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
