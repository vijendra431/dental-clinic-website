import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const FloatingWhatsApp: React.FC = () => {
  const { settings } = useClinic();
  const [showTooltip, setShowTooltip] = useState(false);

  const defaultMessage = encodeURIComponent(
    `Hello Dr Nayak's Dental, I would like to inquire about a dental appointment.`
  );
  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-5 z-40 flex items-center gap-3">
      {/* Subtle contextual tooltip on desktop */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs py-2 px-3 rounded-lg shadow-lg border border-slate-200 animate-fade-in">
          <span>Chat directly with Dr Nayak’s Dental</span>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 group focus:outline-hidden focus-visible:ring-4 focus-visible:ring-emerald-300"
        aria-label="Chat with Dr Nayak's Dental on WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>
    </div>
  );
};
