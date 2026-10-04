import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar, Phone, ArrowLeft } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const NotFoundPage: React.FC = () => {
  const { settings } = useClinic();

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md space-y-5">
        <div className="text-6xl font-extrabold text-sky-600 font-heading">
          404
        </div>
        <h1 className="text-2xl font-bold text-slate-900 font-heading">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          The page you requested could not be located. You may have followed an outdated link or mistyped the address.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-colors shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <Link
            to="/book"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-sky-700 bg-white border border-slate-200 rounded-xl transition-colors"
          >
            <Calendar className="w-4 h-4 text-sky-600" />
            <span>Book Appointment</span>
          </Link>
        </div>

        <div className="pt-4 text-xs text-slate-400">
          Need immediate assistance? Call {settings.name} at {settings.phone}
        </div>
      </div>
    </div>
  );
};
