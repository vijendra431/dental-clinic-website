import React, { useState } from 'react';
import { Eye, Sparkles, AlertCircle, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useClinic } from '../context/ClinicContext';
import { ImageLightbox } from '../components/ImageLightbox';
import { SafeImage } from '../components/SafeImage';
import { PUBLIC_IMAGE_FALLBACKS } from '../assets/images';

export const GalleryPage: React.FC = () => {
  const { gallery } = useClinic();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  const categories = ['All', 'Clinic', 'Reception', 'Treatment Room', 'Equipment', 'Before & After'];

  const filteredItems = gallery.filter((item) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Before & After') return false; // Handled with special informational view
    return item.category === activeCategory;
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="space-y-12 lg:space-y-16 py-8 lg:py-12 pb-16">
      
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/80 text-sky-800 text-xs font-semibold tracking-wide border border-sky-200">
            <span>Clinic Photography</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 font-heading">
            Inside Dr Nayak’s Dental
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Take a visual tour of our modern dental clinic in Raichur. Explore our reception lounge, sterilized operatories, and modern equipment.
          </p>
        </div>
      </section>

      {/* 2. Category Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Image Grid or Before/After Notice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeCategory === 'Before & After' ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-100">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-heading">
              Patient Clinical Cases Policy
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              In accordance with medical ethics and patient privacy regulations, Dr Nayak’s Dental does not publish simulated or unverified "before and after" promotional images.
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              During clinical consultations, anonymized clinical case records and restorative examples may be reviewed directly with the dentist to discuss what outcomes are realistic for your specific oral anatomy.
            </p>
            <div className="pt-2">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Clinical Consultation</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                  <SafeImage
                    src={item.imageUrl}
                    fallbackSrc={PUBLIC_IMAGE_FALLBACKS.heroOperatory}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-xs text-slate-900 px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md">
                      <Eye className="w-4 h-4 text-sky-600" />
                      <span>View Full Image</span>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-700">
                    {item.category}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-slate-900 text-base font-heading mb-1 group-hover:text-sky-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Component */}
      <ImageLightbox
        items={filteredItems}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />

      {/* Bottom Visit Invitation */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-sky-50/70 border border-sky-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="text-base font-bold text-sky-900 font-heading">
              Visit Dr Nayak’s Dental in Person
            </h3>
            <p className="text-xs text-sky-700 mt-1">
              Located on Jain Temple Road, opposite Vani Medicals, Raichur.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-xs transition-colors shrink-0"
          >
            Get Directions
          </Link>
        </div>
      </section>

    </div>
  );
};
