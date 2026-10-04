import React from 'react';
import { Star, ExternalLink, CheckCircle, MessageSquarePlus, ShieldCheck } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const ReviewsPage: React.FC = () => {
  const { settings, reviews } = useClinic();

  const writeReviewUrl = `https://search.google.com/local/writereview?placeid=ChIJqyB5Y1sAvDsRR5LVouRm4bM`;

  return (
    <div className="space-y-12 lg:space-y-16 py-8 lg:py-12 pb-16">
      
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/80 text-sky-800 text-xs font-semibold tracking-wide border border-sky-200">
            <span>Patient Feedback</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 font-heading">
            Google Reviews & Ratings
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Read what patients in Raichur say about their experiences at Dr Nayak’s Dental. Verified public ratings reflecting genuine clinical care.
          </p>
        </div>
      </section>

      {/* 2. Rating Summary Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Rating score */}
            <div className="md:col-span-5 text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-8">
              <div className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight font-heading">
                {settings.googleRating}
              </div>
              <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-sm text-slate-600 font-medium">
                Based on approximately {settings.reviewCount} verified reviews on Google Maps
              </div>
            </div>

            {/* Actions & Verification Note */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={settings.googleMapsQuery}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl shadow-xs transition-colors"
                >
                  <span>View all Google Reviews</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href={settings.googleMapsQuery}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 hover:text-sky-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
                >
                  <MessageSquarePlus className="w-4 h-4 text-sky-600" />
                  <span>Leave a Review</span>
                </a>
              </div>

              <div className="text-xs text-slate-500 flex items-center gap-2 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Reviews are publicly sourced from patient submissions on Google Maps.</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Review Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {rev.dateText}
                  </span>
                </div>

                <blockquote className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
                  "{rev.text}"
                </blockquote>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-800 text-xs font-bold flex items-center justify-center">
                    {rev.initials}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{rev.author}</div>
                    <div className="text-[11px] text-slate-500">{rev.source}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Verification Notice */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 rounded-2xl bg-slate-100/70 border border-slate-200 text-xs text-slate-600 space-y-1 text-center">
          <p className="font-semibold text-slate-800">
            Review Authenticity Commitment
          </p>
          <p>
            In alignment with medical marketing standards, patient testimonials shown are referenced from authentic public Google Maps feedback for Dr Nayak’s Dental in Raichur. We do not invent fictional patients or paid endorsements.
          </p>
        </div>
      </section>

    </div>
  );
};
