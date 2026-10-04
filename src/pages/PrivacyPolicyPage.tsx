import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const PrivacyPolicyPage: React.FC = () => {
  const { settings } = useClinic();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 pb-20 space-y-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-sky-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Homepage</span>
      </Link>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
          <span>Patient Data Privacy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-heading">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Last updated: October 2026 · {settings.name}, Raichur
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6 text-sm text-slate-600 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 font-heading">
            1. Overview & Healthcare Privacy Commitment
          </h2>
          <p>
            At {settings.name} ("the Clinic", "we", "us"), respecting patient privacy is fundamental to our medical practice. This Privacy Policy details how personal and contact information submitted through our website and appointment scheduling platform is collected, utilized, and safeguarded.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 font-heading">
            2. Information We Collect
          </h2>
          <p>
            When scheduling an appointment or sending an inquiry through this website, we may collect:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Patient full name</li>
            <li>Mobile phone number</li>
            <li>Email address (optional)</li>
            <li>Patient age (optional, for clinical scheduling context)</li>
            <li>Requested dental service and preferred appointment date and time</li>
            <li>Brief patient notes or symptoms shared voluntarily</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 font-heading">
            3. How We Use Patient Information
          </h2>
          <p>
            Collected details are used exclusively for:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Scheduling and validating clinic appointment bookings</li>
            <li>Sending appointment confirmations, reminders, and schedule updates via phone or WhatsApp</li>
            <li>Responding to direct patient questions or treatment inquiries</li>
            <li>Ensuring clinical readiness prior to in-person consultations</li>
          </ul>
          <p className="font-semibold text-slate-800">
            We never sell, rent, or trade patient personal contact information to third-party advertisers or commercial entities.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 font-heading">
            4. Clinical Records Confidentiality
          </h2>
          <p>
            Detailed clinical records, oral radiographs, and treatment notes generated during your clinic visit are maintained securely under doctor-patient confidentiality guidelines in compliance with medical healthcare standards.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 font-heading">
            5. Contacting the Clinic
          </h2>
          <p>
            If you have questions regarding your contact records or wish to update your scheduling information, please contact our clinic directly at:
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <strong>{settings.name}</strong><br />
            {settings.address}<br />
            Phone: {settings.phone}
          </div>
        </section>
      </div>
    </div>
  );
};
