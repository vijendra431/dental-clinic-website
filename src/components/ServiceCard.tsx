import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  Smile, 
  HeartHandshake, 
  Clock, 
  ArrowRight, 
  Calendar 
} from 'lucide-react';
import { ServiceItem } from '../types';

const iconMap: Record<string, React.ElementType> = {
  Stethoscope,
  Sparkles,
  ShieldCheck,
  Activity,
  Smile,
  HeartHandshake,
  Clock,
};

export const ServiceCard: React.FC<{ service: ServiceItem }> = ({ service }) => {
  const IconComponent = iconMap[service.iconName] || Stethoscope;

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between hover:border-sky-300 hover:shadow-md transition-all duration-200">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors duration-200 border border-sky-100">
            <IconComponent className="w-6 h-6" />
          </div>

          <span className="text-xs font-medium text-slate-500">
            {service.category}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors font-heading mb-2">
          {service.title}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">
          {service.shortDescription}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <Link
          to={`/services/${service.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-sky-700 transition-colors group/link"
        >
          <span>Learn More</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
        </Link>

        <Link
          to={`/book?service=${service.slug}`}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-600 hover:text-white rounded-lg transition-colors border border-sky-100"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book</span>
        </Link>
      </div>
    </article>
  );
};
