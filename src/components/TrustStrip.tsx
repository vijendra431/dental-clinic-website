import React from 'react';
import { Star, ShieldCheck, MapPin, Clock, Users } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const TrustStrip: React.FC = () => {
  const { settings } = useClinic();

  return (
    <section aria-label="Clinic Highlights" className="border-y border-slate-200/80 bg-white py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100 items-center">
          
          {/* 1. Google Rating */}
          <div className="flex items-center gap-3 pt-2 md:pt-0">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 leading-tight">
                {settings.googleRating} / 5.0
              </div>
              <div className="text-xs text-slate-500">Google Rating</div>
            </div>
          </div>

          {/* 2. Reviews */}
          <div className="flex items-center gap-3 pt-2 md:pt-0 md:pl-6">
            <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100">
              <Users className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 leading-tight">
                {settings.reviewCount}+ Verified
              </div>
              <div className="text-xs text-slate-500">Patient Reviews</div>
            </div>
          </div>

          {/* 3. Professional Dental Care */}
          <div className="flex items-center gap-3 pt-2 md:pt-0 md:pl-6">
            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-100">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 leading-tight">
                Patient-First
              </div>
              <div className="text-xs text-slate-500">Professional Care</div>
            </div>
          </div>

          {/* 4. Raichur Location */}
          <div className="flex items-center gap-3 pt-2 md:pt-0 md:pl-6">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
              <MapPin className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 leading-tight">
                Jain Temple Road
              </div>
              <div className="text-xs text-slate-500">Central Raichur</div>
            </div>
          </div>

          {/* 5. Extended Hours */}
          <div className="flex items-center gap-3 pt-2 md:pt-0 md:pl-6 col-span-2 md:col-span-1">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <Clock className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 leading-tight">
                Until 9:30 PM
              </div>
              <div className="text-xs text-slate-500">Open 7 Days a Week</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
