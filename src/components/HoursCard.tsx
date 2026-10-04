import React from 'react';
import { Clock, Calendar, CheckCircle } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const HoursCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { settings, clinicStatus } = useClinic();

  const days = [
    { day: 'Monday', hours: `${settings.hours.weekdays.openDisplay} – ${settings.hours.weekdays.closeDisplay}`, dayIndex: 1 },
    { day: 'Tuesday', hours: `${settings.hours.weekdays.openDisplay} – ${settings.hours.weekdays.closeDisplay}`, dayIndex: 2 },
    { day: 'Wednesday', hours: `${settings.hours.weekdays.openDisplay} – ${settings.hours.weekdays.closeDisplay}`, dayIndex: 3 },
    { day: 'Thursday', hours: `${settings.hours.weekdays.openDisplay} – ${settings.hours.weekdays.closeDisplay}`, dayIndex: 4 },
    { day: 'Friday', hours: `${settings.hours.weekdays.openDisplay} – ${settings.hours.weekdays.closeDisplay}`, dayIndex: 5 },
    { day: 'Saturday', hours: `${settings.hours.weekdays.openDisplay} – ${settings.hours.weekdays.closeDisplay}`, dayIndex: 6 },
    { day: 'Sunday', hours: `${settings.hours.sunday.openDisplay} – ${settings.hours.sunday.closeDisplay}`, dayIndex: 0 },
  ];

  const currentDayIndex = new Date().getDay();

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs ${className}`}>
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
            <Clock className="w-5 h-5 text-sky-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 font-heading text-lg">Clinic Hours</h3>
            <p className="text-xs text-slate-500">Raichur local time</p>
          </div>
        </div>

        {/* Dynamic Open/Closed badge */}
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
          clinicStatus.isOpen 
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
            : 'bg-amber-50 text-amber-700 border border-amber-200'
        }`}>
          <span className={`w-2 h-2 rounded-full ${clinicStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
          <span>{clinicStatus.badgeText}</span>
        </div>
      </div>

      <div className="space-y-2.5">
        {days.map((item) => {
          const isToday = item.dayIndex === currentDayIndex;
          return (
            <div 
              key={item.day}
              className={`flex items-center justify-between text-sm py-1.5 px-2 rounded-lg transition-colors ${
                isToday 
                  ? 'bg-sky-50/80 font-semibold text-slate-900 border border-sky-100' 
                  : 'text-slate-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{item.day}</span>
                {isToday && (
                  <span className="text-[10px] text-sky-700 font-bold uppercase tracking-wide bg-sky-100/70 px-1.5 py-0.5 rounded">
                    Today
                  </span>
                )}
              </div>
              <span className={`tabular-nums text-right ${isToday ? 'text-sky-800 font-bold' : 'text-slate-700'}`}>
                {item.hours}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Walk-in & Appointments Welcome
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-sky-500" /> Open 7 Days
        </span>
      </div>
    </div>
  );
};
