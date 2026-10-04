import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const TermsPage: React.FC = () => {
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
          <FileText className="w-3.5 h-3.5 text-sky-600" />
          <span>Clinic Terms & Conditions</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-heading">
          Terms & Conditions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Last updated: October 2026 · {settings.name}, Raichur
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6 text-sm text-slate-600 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 font-heading">
            1. Clinical Information & Non-Emergency Disclaimer
          </h2>
          <p>
            The content on this website is provided for general informational purposes to help patients understand oral health concepts and learn about available clinic services. It does not replace in-person dental examination, diagnosis, or clinical prescription by a registered dental surgeon.
          </p>
          <p className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
            Medical Disclaimer: In the event of severe facial trauma, uncontrolled oral bleeding, or breathing difficulty, seek emergency medical care immediately at a local hospital emergency department.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 font-heading">
            2. Appointment Scheduling & Slot Availability
          </h2>
          <p>
            When you book an appointment online, you request a consultation slot. While we strive to adhere strictly to scheduled slots, medical emergencies or urgent clinical procedures may occasionally cause unforeseen delays. Our clinic staff will notify you whenever feasible.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 font-heading">
            3. Rescheduling & Cancellations
          </h2>
          <p>
            If you are unable to attend your scheduled visit, we kindly request at least 2 hours notice so that the time slot can be made available to patients in need of urgent care. You can reschedule or cancel by contacting the clinic via phone or WhatsApp at {settings.phone}.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 font-heading">
            4. Clinical Assessment & Treatment Feasibility
          </h2>
          <p>
            Every patient's oral anatomy is distinct. Any treatment plan, duration estimate, or restorative option described on this website is subject to the dentist's comprehensive clinical evaluation. The dentist reserves the right to decline or refer procedures that require tertiary maxillofacial or specialized interventions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 font-heading">
            5. Governing Law
          </h2>
          <p>
            These terms are governed by the laws applicable in Karnataka, India, and subject to the jurisdiction of the courts in Raichur.
          </p>
        </section>
      </div>
    </div>
  );
};
