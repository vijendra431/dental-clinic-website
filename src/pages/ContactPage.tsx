import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle, 
  Calendar, 
  Navigation, 
  AlertCircle 
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { HoursCard } from '../components/HoursCard';
import { MapCard } from '../components/MapCard';
import { supabase } from '../lib/supabase';

export const ContactPage: React.FC = () => {
  const { settings, clinicStatus } = useClinic();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setError('Please provide your name, phone number, and message.');
      return;
    }

    if (formData.phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setError(null);
    setSubmitted(true);

    // Save inquiry to Supabase
    try {
      await supabase.from('contact_inquiries').insert([{
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || null,
        message: formData.message.trim(),
        created_at: new Date().toISOString(),
      }]);
    } catch (err) {
      console.warn('Supabase contact inquiry notice:', err);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dr Nayak's Dental, I would like to inquire about your clinic.`
  );

  return (
    <div className="space-y-12 lg:space-y-16 py-8 lg:py-12 pb-16">
      
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/80 text-sky-800 text-xs font-semibold tracking-wide border border-sky-200">
            <span>Get in Touch</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 font-heading">
            Contact Dr Nayak’s Dental
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Have questions about a dental treatment, timings, or directions? Contact our clinic directly by phone, WhatsApp, or through the inquiry form below.
          </p>
        </div>
      </section>

      {/* 2. Quick Contact Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Phone */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 font-heading text-base mb-1">
                Call the Clinic
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Speak directly with our team for questions or urgent queries.
              </p>
              <a
                href={`tel:${settings.rawPhone}`}
                className="text-base sm:text-lg font-bold text-sky-700 hover:text-sky-800 transition-colors"
              >
                {settings.phone}
              </a>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 text-xs text-slate-400">
              Mon–Sat: 9:30 AM–9:30 PM · Sun: 10:00 AM–9:00 PM
            </div>
          </div>

          {/* Card 2: WhatsApp */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 font-heading text-base mb-1">
                WhatsApp Messaging
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Send a quick chat message to our official WhatsApp number.
              </p>
              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                +91 97417 69889
              </a>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 text-xs text-slate-400">
              Quick replies during clinic hours
            </div>
          </div>

          {/* Card 3: Location */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 font-heading text-base mb-1">
                Clinic Location
              </h3>
              <p className="text-xs text-slate-500 mb-2">
                Conveniently located in central Raichur:
              </p>
              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                Jain Temple Road, opposite Vani Medicals, Arab Mohalla, Androon Quilla, Raichur 584101
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100">
              <a
                href={settings.googleMapsQuery}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Form & Hours Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs">
            <h2 className="text-2xl font-bold text-slate-900 font-heading mb-2">
              Send an Inquiry
            </h2>
            <p className="text-sm text-slate-600 mb-6">
              Need more information before your visit? Leave a message and our clinic staff will reach out to you.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-900 font-heading">
                  Message Sent Successfully
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. We have received your inquiry and will contact you via phone or WhatsApp at <strong>{formData.phone}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', email: '', message: '' });
                  }}
                  className="mt-2 text-xs font-semibold text-emerald-700 underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-slate-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Message or Dental Concern *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe how we can assist you..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-slate-50/50"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl shadow-xs transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Looking to book a consultation slot directly?</span>
              <Link to="/book" className="font-semibold text-sky-600 hover:text-sky-700">
                Book Online →
              </Link>
            </div>
          </div>

          {/* Opening Hours Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <HoursCard />

            <div className="bg-sky-50/80 rounded-2xl border border-sky-200/80 p-5 text-xs text-sky-900 space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-sky-950">
                <Calendar className="w-4 h-4 text-sky-600" />
                <span>Need Same-Day Care?</span>
              </div>
              <p>
                For acute dental toothache or sudden emergencies, please call the clinic directly at <strong>+91 97417 69889</strong> for immediate triage during opening hours.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Interactive Google Map Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MapCard />
      </section>

    </div>
  );
};
