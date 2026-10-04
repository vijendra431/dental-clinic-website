import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, HeartHandshake, Sparkles, Clock, MapPin, Calendar, Phone, CheckCircle } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { SafeImage } from '../components/SafeImage';
import { CLINIC_IMAGES, PUBLIC_IMAGE_FALLBACKS } from '../assets/images';

export const AboutPage: React.FC = () => {
  const { settings } = useClinic();

  const clinicLoungeImg = CLINIC_IMAGES.receptionLounge;
  const equipmentImg = CLINIC_IMAGES.equipmentTech;

  return (
    <div className="space-y-16 lg:space-y-24 py-8 lg:py-12 pb-16">
      
      {/* 1. Header / Intro */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/80 text-sky-800 text-xs font-semibold tracking-wide border border-sky-200">
            <span>About Dr Nayak’s Dental</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 font-heading">
            Dental Care With a Patient-First Approach
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Providing reliable oral healthcare in Raichur, Karnataka, centered around patient comfort, rigorous hygiene, and honest clinical assessments.
          </p>
        </div>
      </section>

      {/* 2. Visual Split & Practice Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-heading">
              Dedicated to Your Long-Term Oral Health
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              At Dr Nayak’s Dental, we believe that an exceptional dental visit starts with listening. Located on Jain Temple Road opposite Vani Medicals, our practice serves individuals and families across Raichur with patient-centric care.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Whether you are visiting for a routine preventive check-up, managing tooth pain, or seeking restorative dental options, our focus is providing clear clinical advice without unnecessary procedures. Every patient receives a tailored treatment overview and transparent answers to their questions.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-slate-900">Hospital-Grade Sterilization</div>
                  <div className="text-xs text-slate-500">Autoclaved instruments & sanitized operatory</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <HeartHandshake className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-slate-900">Gentle & Reassuring</div>
                  <div className="text-xs text-slate-500">Prioritizing patient comfort at every step</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100 aspect-4/3">
              <SafeImage
                src={clinicLoungeImg}
                fallbackSrc={PUBLIC_IMAGE_FALLBACKS.receptionLounge}
                alt="Dr Nayak’s Dental patient reception and waiting lounge"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. Core Values */}
      <section className="bg-white border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-heading">
              Our Core Principles
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Every appointment is guided by clinical integrity, hygiene, and patient dignity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">Preventive Focus</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We emphasize preserving natural teeth through regular check-ups, early detection of minor issues, and practical daily oral hygiene guidance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">Honest Assessments</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We believe in ethical dentistry. We only recommend procedures that are clinically necessary and explain why they benefit your oral health.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">Patient Convenience</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Operating until 9:30 PM on weekdays/Saturdays and 9:00 PM on Sundays ensures that working professionals and students can receive care without missing commitments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Equipment & Facility Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100 aspect-4/3">
              <SafeImage
                src={equipmentImg}
                fallbackSrc={PUBLIC_IMAGE_FALLBACKS.equipmentTech}
                alt="Precision dental technology and sterilized operatory"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-heading">
              Hygienic, Well-Equipped Facility
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Patient safety is non-negotiable. Our dental suites utilize calibrated clinical tools, high-grade sterilization autoclaves, and disposable protective barriers for every patient.
            </p>

            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Strict multi-stage sterilization protocols for all instruments</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Clean, air-conditioned patient waiting area and consultation suite</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Digital examination and patient-first clinical discussion</span>
              </li>
            </ul>

            <div className="pt-2 flex items-center gap-4">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-xs transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation</span>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:text-sky-700 bg-white border border-slate-200 rounded-xl transition-colors"
              >
                <MapPin className="w-4 h-4 text-sky-600" />
                <span>Find Us in Raichur</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Clear Notice on Verification */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-200/80 text-xs text-slate-700 space-y-1.5">
          <div className="font-bold text-sky-900 text-sm">Practice Transparency Notice</div>
          <p>
            Information displayed on this website is based on verified public clinic records and direct configuration by Dr Nayak’s Dental. We do not publish unverified awards or medical guarantees. Treatment suitability is determined during in-person clinical assessment.
          </p>
        </div>
      </section>

    </div>
  );
};
