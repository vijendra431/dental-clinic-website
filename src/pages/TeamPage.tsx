import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Phone, ShieldCheck, HeartHandshake, UserCheck, Stethoscope, Sparkles } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { SafeImage } from '../components/SafeImage';
import { CLINIC_IMAGES, PUBLIC_IMAGE_FALLBACKS } from '../assets/images';

export const TeamPage: React.FC = () => {
  const { settings } = useClinic();

  const consultationSuiteImg = CLINIC_IMAGES.consultationCare;

  return (
    <div className="space-y-12 lg:space-y-16 py-8 lg:py-12 pb-16">
      
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/80 text-sky-800 text-xs font-semibold tracking-wide border border-sky-200">
            <span>Clinical Leadership</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 font-heading">
            Our Dental Team
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Professional dental care delivered with clinical diligence, gentle chairside technique, and dedicated patient support in Raichur.
          </p>
        </div>
      </section>

      {/* 2. Team Overview Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Visual consultation suite */}
            <div className="lg:col-span-5 h-full min-h-[300px] relative bg-slate-100">
              <SafeImage
                src={consultationSuiteImg}
                fallbackSrc={PUBLIC_IMAGE_FALLBACKS.consultationCare}
                alt="Dr Nayak’s Dental clinical consultation suite"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <div className="text-xs uppercase tracking-wider text-sky-300 font-semibold mb-1">
                    Clinical Practice
                  </div>
                  <div className="text-lg font-bold font-heading">Dr Nayak’s Dental</div>
                  <div className="text-xs text-slate-300">Jain Temple Road, Raichur</div>
                </div>
              </div>
            </div>

            {/* Information & Ethical Statement */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md mb-2 border border-sky-100">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Lead Clinician & Dental Care Staff</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
                  Dr Nayak & Clinical Staff
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                  The clinic is led by <strong>Dr Nayak</strong>, providing individualized dental assessments and treatments. Backed by trained clinical assistants, our team focuses on patient comfort, thorough sterilization, and compassionate dental consultations for patients of all ages.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <Stethoscope className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Clinical Examination</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Comprehensive visual and digital oral assessments before formulating any treatment plan.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <HeartHandshake className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Patient Comfort</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Gentle chairside manner designed to help nervous or first-time dental patients feel at ease.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to="/book"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-xs transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation</span>
                </Link>

                <a
                  href={`tel:${settings.rawPhone}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:text-sky-700 bg-white border border-slate-200 rounded-xl transition-colors"
                >
                  <Phone className="w-4 h-4 text-sky-600" />
                  <span>Call {settings.phone}</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. Standards We Uphold */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-heading">
            Clinical Care Commitments
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Every patient interaction at Dr Nayak’s Dental is guided by our professional healthcare commitments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">Sterilization Rigor</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              All reusable dental instruments undergo ultrasonic cleaning and high-pressure steam autoclaving to prevent cross-contamination.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">Clear Guidance</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We take the time to explain diagnoses in simple, straightforward language so you can make informed decisions about your oral care.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">Respect for Your Time</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Organized scheduling with verified appointment slots to minimize waiting time while maintaining thorough clinical attention.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Verification Notice */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
          <div className="font-bold text-slate-800">
            Verified Information Policy
          </div>
          <p>
            In compliance with our policy against unverified medical marketing, we do not invent doctor degrees, awards, or medical claims. Detailed clinician bios and specialized credentials will be updated in coordination with Dr Nayak and verified clinic records.
          </p>
        </div>
      </section>

    </div>
  );
};
