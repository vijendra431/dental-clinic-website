import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Calendar, ArrowRight, Shield } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const Footer: React.FC = () => {
  const { settings, clinicStatus } = useClinic();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-base">
                +
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-heading">
                {settings.name}
              </span>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed">
              Professional dental care in Raichur focused on your comfort, oral health, and confident smile.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 text-xs font-medium text-slate-300 border border-slate-700/60">
                <span className={`w-2 h-2 rounded-full ${clinicStatus.isOpen ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <span>{clinicStatus.badgeText} · {clinicStatus.detailText}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4 font-heading">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">About the Clinic</Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-white transition-colors">Dental Services</Link>
              </li>
              <li>
                <Link to="/team" className="text-slate-400 hover:text-white transition-colors">Our Dental Team</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-slate-400 hover:text-white transition-colors">Clinic Gallery</Link>
              </li>
              <li>
                <Link to="/reviews" className="text-slate-400 hover:text-white transition-colors">Google Reviews (4.9 ★)</Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">Contact & Directions</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Clinic Hours */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4 font-heading">
              Opening Hours
            </h3>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">Monday – Saturday</div>
                  <div>9:30 AM – 9:30 PM</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">Sunday</div>
                  <div>10:00 AM – 9:00 PM</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 pt-1">
                Extended evening clinic hours to accommodate work and family schedules in Raichur.
              </p>
            </div>
          </div>

          {/* Col 4: Contact & Appointments */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4 font-heading">
              Visit or Call
            </h3>
            <div className="space-y-3 text-sm text-slate-400 mb-5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <address className="not-italic leading-relaxed">
                  {settings.shortAddress}
                </address>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a 
                  href={`tel:${settings.rawPhone}`} 
                  className="text-white font-medium hover:text-sky-300 transition-colors"
                >
                  {settings.phone}
                </a>
              </div>
            </div>

            <Link
              to="/book"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-xs transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment Online</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 {settings.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            <Link to="/admin" className="hover:text-slate-400 transition-colors flex items-center gap-1">
              <Shield className="w-3 h-3" /> Admin Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
