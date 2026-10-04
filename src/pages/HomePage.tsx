import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Calendar, 
  Star, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle, 
  ChevronRight,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { TrustStrip } from '../components/TrustStrip';
import { ServiceCard } from '../components/ServiceCard';
import { HoursCard } from '../components/HoursCard';
import { MapCard } from '../components/MapCard';
import { SafeImage } from '../components/SafeImage';
import { CLINIC_IMAGES, PUBLIC_IMAGE_FALLBACKS } from '../assets/images';

export const HomePage: React.FC = () => {
  const { settings, services, reviews, clinicStatus } = useClinic();

  const enabledServices = services.filter(s => s.isEnabled).slice(0, 6);

  const heroImage = CLINIC_IMAGES.heroOperatory;
  const aboutImage = CLINIC_IMAGES.receptionLounge;

  const faqs = [
    {
      q: "How do I book an appointment?",
      a: "You can book easily online using our step-by-step booking form by selecting your preferred date and available time slot, or call the clinic directly at +91 97417 69889."
    },
    {
      q: "Where is Dr Nayak's Dental located in Raichur?",
      a: "The clinic is centrally located on Jain Temple Road, directly opposite Vani Medicals, in Arab Mohalla, Androon Quilla, Raichur."
    },
    {
      q: "What are the clinic's opening hours?",
      a: "We are open Monday through Saturday from 9:30 AM to 9:30 PM, and on Sunday from 10:00 AM to 9:00 PM to accommodate busy patient routines."
    },
    {
      q: "Do I need to book an appointment before visiting?",
      a: "While walk-in patients are welcomed, booking an appointment in advance minimizes waiting time and guarantees your consultation slot."
    }
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-12">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-6 sm:pt-10 lg:pt-14 pb-12 bg-linear-to-b from-sky-50/50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column (7 cols on desktop) */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 text-sky-800 text-xs font-semibold tracking-wide border border-sky-200">
                <span className="w-2 h-2 rounded-full bg-sky-600" />
                <span>Trusted Dental Care in Raichur</span>
              </div>

              {/* Large Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12] text-balance font-heading">
                Healthy Smiles Start With the Right Care.
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Professional dental care focused on your comfort, oral health, and confident smile. Centrally located on Jain Temple Road with extended evening hours.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                <Link
                  to="/book"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book an Appointment</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <a
                  href={`tel:${settings.rawPhone}`}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-slate-700 hover:text-sky-700 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 shadow-xs transition-all duration-200"
                >
                  <Phone className="w-5 h-5 text-sky-600" />
                  <span>Call the Clinic</span>
                </a>
              </div>

              {/* Quick Trust Indicator Bar */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-600 border-t border-slate-200/80">
                <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{settings.googleRating} Google Rating</span>
                  <span className="text-slate-400 font-normal">({settings.reviewCount} Reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Clean & Sanitized Clinic</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Clock className="w-4 h-4 text-sky-600" />
                  <span>Open Until 9:30 PM</span>
                </div>
              </div>

            </div>

            {/* Right Visual Column (5 cols on desktop) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Hero Image Frame */}
                <div className="relative aspect-4/3 sm:aspect-16/11 rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-100">
                  <SafeImage
                    src={heroImage}
                    fallbackSrc={PUBLIC_IMAGE_FALLBACKS.heroOperatory}
                    alt="Dr Nayak’s Dental clinic interior and consultation room"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/40 via-transparent to-transparent" />
                </div>

                {/* Floating Card: Google Rating */}
                <div className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-lg border border-slate-200/80 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-100">
                    <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 leading-tight">
                      4.9 ★ Rating
                    </div>
                    <div className="text-xs text-slate-500">
                      31 Verified Reviews
                    </div>
                  </div>
                </div>

                {/* Floating Card: Clinic Hours & Dynamic Status */}
                <div className="absolute -bottom-6 -left-2 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-slate-200/80 max-w-xs">
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <span className="text-xs font-bold text-slate-900 font-heading">
                      Extended Hours
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      clinicStatus.isOpen ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${clinicStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                      {clinicStatus.badgeText}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Mon–Sat: 9:30 AM–9:30 PM<br />
                    Sun: 10:00 AM–9:00 PM
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Trust Strip */}
      <TrustStrip />

      {/* 3. About Section Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Clinic Interior Image */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-4/3 bg-slate-100">
              <SafeImage
                src={aboutImage}
                fallbackSrc={PUBLIC_IMAGE_FALLBACKS.receptionLounge}
                alt="Dr Nayak’s Dental reception and patient waiting area"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg text-xs font-medium text-slate-800 shadow-xs">
                Patient Waiting Lounge & Reception
              </div>
            </div>
          </div>

          {/* About Copy */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-2">
                About The Practice
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 font-heading">
                Dental Care With a Patient-First Approach
              </h2>
            </div>

            <p className="text-slate-600 text-base leading-relaxed">
              Dr Nayak’s Dental provides professional dental care in Raichur with a steadfast commitment to patient comfort, thorough clinical assessment, and sustainable oral health.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-slate-200/80">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center mb-2.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1 font-heading">Strict Hygiene Protocols</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Rigorous instrument sterilization and sanitized treatment operatories for every patient visit.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/80">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mb-2.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1 font-heading">Clear Communication</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Conservative treatment plans with clear explanations of procedures and options before starting.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 group"
              >
                <span>Learn more about our clinic philosophy</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Services Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-2">
              Oral Health Solutions
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 font-heading">
              Our Dental Services
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:text-sky-700"
          >
            <span>View All Services</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enabledServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="mt-8 text-center bg-slate-100/60 rounded-xl p-4 border border-slate-200 text-xs text-slate-600">
          <span>* Treatment suitability depends on clinical evaluation by the dentist during your visit.</span>
        </div>
      </section>

      {/* 5. Opening Hours & Location (Find Us) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-2">
            Visit Us in Raichur
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 font-heading">
            Hours & Location
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Located conveniently opposite Vani Medicals on Jain Temple Road, open all 7 days with late evening availability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <HoursCard />
          </div>
          <div className="lg:col-span-7">
            <MapCard />
          </div>
        </div>
      </section>

      {/* 6. Google Reviews Highlight */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-800">4.9 / 5.0 Rating</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 font-heading">
                What Patients Say
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Reflecting feedback from approximately 31 verified reviews on Google.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={settings.googleMapsQuery}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
              >
                <span>View all Google Reviews</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
              <Link
                to="/reviews"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg border border-sky-100 transition-colors"
              >
                <span>All Reviews</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((rev) => (
              <div 
                key={rev.id}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-medium text-slate-400">{rev.dateText}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{rev.text}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-800 text-xs font-bold flex items-center justify-center">
                    {rev.initials}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{rev.author}</div>
                    <div className="text-[10px] text-slate-500">{rev.source}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQs Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-2">
            Got Questions?
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-heading">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 flex items-start gap-2.5 mb-2 font-heading">
                <HelpCircle className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-sm text-slate-600 pl-7 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Conversion Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Personalized Dental Care
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight font-heading">
              Ready to schedule your dental visit?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Book online to choose your preferred day and time slot, or call our Raichur clinic directly.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to="/book"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-xs transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Online</span>
              </Link>
              <a
                href={`tel:${settings.rawPhone}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4 text-sky-400" />
                <span>Call {settings.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
