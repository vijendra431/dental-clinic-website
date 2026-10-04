import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Calendar, Menu, X, Shield, Clock } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { settings, clinicStatus } = useClinic();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Our Team', path: '/team' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top micro-banner: Clinic Status & Quick Contact */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden sm:block border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <span className={`w-2 h-2 rounded-full ${clinicStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className={clinicStatus.isOpen ? 'text-emerald-400' : 'text-amber-400'}>{clinicStatus.badgeText}</span>
              <span className="text-slate-400">· {clinicStatus.detailText}</span>
            </span>
            <span className="text-slate-500 hidden md:inline">|</span>
            <span className="text-slate-400 hidden md:flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Mon–Sat: 9:30 AM–9:30 PM · Sun: 10:00 AM–9:00 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={`tel:${settings.rawPhone}`}
              className="text-slate-200 hover:text-white flex items-center gap-1.5 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>{settings.phone}</span>
            </a>
            <span className="text-slate-600">|</span>
            <Link 
              to="/admin" 
              className="text-slate-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
              title="Clinic Admin Portal"
            >
              <Shield className="w-3 h-3" />
              <span>Clinic Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar - Adhering to 3-Zone Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Zone 1: Single text wordmark in display font */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-500 rounded-md"
          >
            <div className="w-9 h-9 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-lg shadow-xs group-hover:bg-sky-700 transition-colors">
              +
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-sky-700 transition-colors">
                {settings.name}
              </span>
              <span className="text-[11px] text-slate-500 font-medium tracking-wide">
                Dental Clinic · Raichur
              </span>
            </div>
          </Link>

          {/* Zone 2: Navigation Links (single-line, subtle underlines) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                    active
                      ? 'text-sky-700 bg-sky-50/70 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${settings.rawPhone}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-sky-700 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
              aria-label={`Call ${settings.phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-sky-600" />
              <span>Call Clinic</span>
            </a>

            <Link
              to="/book"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-lg shadow-xs transition-colors whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-500"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg">
            <div className="pb-3 mb-2 border-b border-slate-100">
              <div className="flex items-center justify-between text-xs text-slate-600 py-1">
                <span className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${clinicStatus.isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span className="font-semibold text-slate-800">{clinicStatus.badgeText}</span>
                  <span>({clinicStatus.detailText})</span>
                </span>
                <Link 
                  to="/admin" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sky-600 font-medium text-xs flex items-center gap-1"
                >
                  <Shield className="w-3 h-3" /> Admin
                </Link>
              </div>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive(link.path)
                    ? 'bg-sky-50 text-sky-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={`tel:${settings.rawPhone}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4 text-sky-600" />
                <span>Call {settings.phone}</span>
              </a>
              <Link
                to="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-xs transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
