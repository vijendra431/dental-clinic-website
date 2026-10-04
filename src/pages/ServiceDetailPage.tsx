import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  Calendar, 
  Phone, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle, 
  HelpCircle, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { SafeImage } from '../components/SafeImage';
import { CLINIC_IMAGES, PUBLIC_IMAGE_FALLBACKS } from '../assets/images';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getServiceBySlug, settings } = useClinic();

  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  // Visual header image
  const headerImg = service.imageUrl || CLINIC_IMAGES.consultationCare;

  return (
    <div className="space-y-12 lg:space-y-16 py-8 lg:py-12 pb-16">
      
      {/* 1. Breadcrumb & Back Link */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-sky-600 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Dental Services</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
            {service.category} Dentistry
          </span>
          {service.estimatedDuration && (
            <>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Approx. {service.estimatedDuration}</span>
              </span>
            </>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 font-heading mb-4">
          {service.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
          {service.shortDescription}
        </p>
      </section>

      {/* 2. Hero Image Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-16/9 sm:aspect-21/9 rounded-3xl overflow-hidden shadow-md border border-slate-200 bg-slate-100">
          <SafeImage
            src={headerImg}
            fallbackSrc={PUBLIC_IMAGE_FALLBACKS.consultationCare}
            alt={`${service.title} - Dr Nayak’s Dental clinic Raichur`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/50 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white max-w-md">
            <span className="text-xs bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md font-medium">
              Dr Nayak’s Dental · Raichur
            </span>
          </div>
        </div>
      </section>

      {/* 3. Main Content Columns */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main content body (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Overview */}
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                Treatment Overview
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {service.fullOverview}
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {service.treatmentOverview}
              </p>
            </div>

            {/* Common Symptoms / Concerns */}
            {service.symptoms && service.symptoms.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 shadow-2xs">
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  When Is This Treatment Considered?
                </h3>
                <p className="text-xs text-slate-500">
                  Patients often schedule this consultation when experiencing:
                </p>
                <ul className="space-y-2.5">
                  {service.symptoms.map((symptom, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* What Patients Can Expect */}
            {service.whatToExpect && service.whatToExpect.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                  What Patients Can Expect
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {service.whatToExpect.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                      <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Clinical Disclaimer Box */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p>
                <strong>Clinical Assessment Disclaimer:</strong> Treatment suitability depends on the dentist's clinical assessment during your in-person examination. Specific procedural recommendations, alternative options, and care plans are discussed directly with the patient.
              </p>
            </div>

            {/* FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                  Common Questions
                </h2>
                <div className="space-y-3">
                  {service.faqs.map((faq, idx) => (
                    <div key={idx} className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
                      <h4 className="font-bold text-slate-900 text-sm flex items-start gap-2 mb-1.5 font-heading">
                        <HelpCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                        <span>{faq.question}</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 pl-6 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sticky Sidebar Booking Card (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
              
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600">
                  Appointment Booking
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-heading mt-1">
                  Book for {service.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Select your preferred slot online with real-time availability confirmation.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  to={`/book?service=${service.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl shadow-xs transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book This Service</span>
                </Link>

                <a
                  href={`tel:${settings.rawPhone}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-slate-700 hover:text-sky-700 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
                >
                  <Phone className="w-4 h-4 text-sky-600" />
                  <span>Call {settings.phone}</span>
                </a>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2 text-xs text-slate-500">
                <div className="flex items-center justify-between">
                  <span>Location:</span>
                  <span className="font-semibold text-slate-700">Jain Temple Rd, Raichur</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Hours:</span>
                  <span className="font-semibold text-slate-700">Open until 9:30 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Google Rating:</span>
                  <span className="font-semibold text-slate-700">4.9 ★ (31 reviews)</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
