import React from 'react';
import { MapPin, Navigation, Phone, ExternalLink } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const MapCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { settings } = useClinic();

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    "Dr Nayak's Dental, Jain Temple Road, opposite Vani Medicals, Arab Mohalla, Androon Quilla, Raichur, Karnataka 584101"
  )}`;

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs ${className}`}>
      {/* Map visual embed / iframe */}
      <div className="relative w-full h-64 sm:h-72 bg-slate-100 border-b border-slate-200">
        <iframe
          title="Google Map location of Dr Nayak’s Dental Raichur"
          src="https://maps.google.com/maps?q=Jain+Temple+Road+opposite+Vani+Medicals+Arab+Mohalla+Androon+Quilla+Raichur+Karnataka+584101&t=&z=16&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-sky-600" />
          <span>Opposite Vani Medicals</span>
        </div>
      </div>

      {/* Information & Action buttons */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="font-bold text-slate-900 font-heading text-lg mb-1">
            {settings.name}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Jain Temple Road, opposite Vani Medicals,<br />
            Arab Mohalla, Androon Quilla,<br />
            Raichur, Karnataka 584101, India
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2">
          <a
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-lg shadow-xs transition-colors"
          >
            <Navigation className="w-4 h-4" />
            <span>Get Directions</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          <a
            href={`tel:${settings.rawPhone}`}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-sky-700 hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors"
          >
            <Phone className="w-4 h-4 text-sky-600" />
            <span>Call Clinic</span>
          </a>
        </div>
      </div>
    </div>
  );
};
