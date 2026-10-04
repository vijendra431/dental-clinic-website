import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, Phone, Sparkles } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { ServiceCard } from '../components/ServiceCard';

export const ServicesPage: React.FC = () => {
  const { services, settings } = useClinic();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'General', 'Preventive', 'Restorative', 'Cosmetic', 'Specialized'];

  // Only display services that are enabled by clinic configuration
  const activeServices = services.filter((s) => s.isEnabled);

  const filteredServices = activeServices.filter((service) => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch = 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 lg:space-y-16 py-8 lg:py-12 pb-16">
      
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/80 text-sky-800 text-xs font-semibold tracking-wide border border-sky-200">
            <span>Clinical Treatments & Consultations</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 font-heading">
            Comprehensive Dental Services
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Professional oral health solutions provided at Dr Nayak’s Dental in Raichur. Explore our treatments below and schedule a consultation tailored to your needs.
          </p>
        </div>
      </section>

      {/* 2. Filters & Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Category Tabs (Interactive Segmented Control) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-slate-50/50"
            />
          </div>

        </div>
      </section>

      {/* 3. Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 p-8">
            <Sparkles className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No matching services found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search query or category filter. You can also contact the clinic directly for specialized treatment inquiries.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Clinical assessment note */}
        <div className="mt-10 p-4 rounded-xl bg-slate-100/70 border border-slate-200 text-xs text-slate-600 text-center">
          <p>
            <strong>Note on Treatment Suitability:</strong> Medical and dental procedures require thorough clinical evaluation by the dentist to assess individual oral conditions. No procedure is guaranteed without an in-person assessment.
          </p>
        </div>
      </section>

      {/* 4. Consultation CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-sky-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-xl sm:text-2xl font-bold font-heading">
              Unsure which dental treatment you need?
            </h2>
            <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
              Book a comprehensive dental check-up & consultation. We will examine your teeth, explain our findings, and discuss suitable options.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/book?service=dental-check-up-consultation"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-sky-900 bg-white hover:bg-sky-50 rounded-xl transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Check-up</span>
            </Link>
            <a
              href={`tel:${settings.rawPhone}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-sky-800/80 hover:bg-sky-800 rounded-xl border border-sky-700 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Clinic</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
