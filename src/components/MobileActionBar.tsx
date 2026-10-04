import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Calendar, MessageCircle } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const MobileActionBar: React.FC = () => {
  const { settings } = useClinic();

  const whatsappMessage = encodeURIComponent(
    `Hello Dr Nayak's Dental, I would like to book a dental appointment.`
  );
  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <aside 
      aria-label="Quick mobile clinic actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-lg safe-bottom"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto items-center">
        {/* Call button */}
        <a
          href={`tel:${settings.rawPhone}`}
          className="flex flex-col items-center justify-center py-2 px-1 text-slate-700 active:bg-slate-100 rounded-lg transition-colors border border-slate-200 text-center min-h-[46px]"
          aria-label={`Call ${settings.phone}`}
        >
          <Phone className="w-4 h-4 text-sky-600 mb-0.5" />
          <span className="text-[11px] font-semibold leading-tight">Call</span>
        </a>

        {/* WhatsApp button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 text-emerald-800 bg-emerald-50 active:bg-emerald-100 rounded-lg transition-colors border border-emerald-200 text-center min-h-[46px]"
          aria-label="Message Dr Nayak's Dental on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span className="text-[11px] font-semibold leading-tight">WhatsApp</span>
        </a>

        {/* Book Appointment button */}
        <Link
          to="/book"
          className="flex flex-col items-center justify-center py-2 px-1 text-white bg-sky-600 active:bg-sky-700 rounded-lg shadow-xs transition-colors text-center min-h-[46px]"
          aria-label="Book an appointment online"
        >
          <Calendar className="w-4 h-4 text-white mb-0.5" />
          <span className="text-[11px] font-semibold leading-tight whitespace-nowrap">Book Visit</span>
        </Link>
      </div>
    </aside>
  );
};
