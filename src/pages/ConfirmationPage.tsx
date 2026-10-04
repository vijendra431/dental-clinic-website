import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Download, 
  Printer, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const ConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { appointments, settings } = useClinic();

  const appointment = appointments.find((a) => a.id === id) || appointments[0];

  if (!appointment) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center">
        <h1 className="text-2xl font-bold text-slate-800">No appointment found</h1>
        <p className="text-sm text-slate-500 mt-2">Please initiate your booking from the appointment portal.</p>
        <Link to="/book" className="mt-4 inline-block px-5 py-2.5 bg-sky-600 text-white rounded-xl text-sm font-semibold">
          Book Appointment
        </Link>
      </div>
    );
  }

  // Pre-filled WhatsApp message
  const whatsappText = encodeURIComponent(
    `Hello Dr Nayak's Dental, I booked an appointment (Ref: ${appointment.referenceNumber}). Patient: ${appointment.patientName}, Service: ${appointment.serviceName}, Date: ${appointment.appointmentDate}, Time: ${appointment.appointmentTime}.`
  );
  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${whatsappText}`;

  // Google Calendar URL generator
  const createGoogleCalendarUrl = () => {
    // appointmentDate is YYYY-MM-DD
    // appointmentTime is e.g. "10:30 AM" or "04:30 PM"
    const dateParts = appointment.appointmentDate.replace(/-/g, '');
    const timeMatch = appointment.appointmentTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
    let hours = 10;
    let mins = 0;
    if (timeMatch) {
      hours = parseInt(timeMatch[1], 10);
      mins = parseInt(timeMatch[2], 10);
      const ampm = timeMatch[3].toUpperCase();
      if (ampm === 'PM' && hours < 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;
    }
    const startH = hours < 10 ? `0${hours}` : `${hours}`;
    const startM = mins < 10 ? `0${mins}` : `${mins}`;
    const endH = hours + 1 < 10 ? `0${hours + 1}` : `${hours + 1}`;
    
    // YYYYMMDDTHHMMSS
    const startDateTime = `${dateParts}T${startH}${startM}00`;
    const endDateTime = `${dateParts}T${endH}${startM}00`;

    const title = encodeURIComponent(`Dental Appointment: ${appointment.serviceName} - Dr Nayak’s Dental`);
    const details = encodeURIComponent(
      `Appointment Ref: ${appointment.referenceNumber}\nPatient: ${appointment.patientName}\nClinic: Dr Nayak’s Dental\nAddress: ${settings.shortAddress}\nPhone: ${settings.phone}`
    );
    const location = encodeURIComponent(settings.address);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDateTime}/${endDateTime}&details=${details}&location=${location}`;
  };

  // Download .ics file
  const downloadIcsFile = () => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Dr Nayaks Dental//Appointment Booking//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:Dental Visit: ${appointment.serviceName} at Dr Nayak's Dental
DESCRIPTION:Ref: ${appointment.referenceNumber}\\nPatient: ${appointment.patientName}\\nService: ${appointment.serviceName}\\nContact: ${settings.phone}
LOCATION:${settings.shortAddress}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `DrNayakDental_${appointment.referenceNumber}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 pb-24">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs text-center space-y-3 mb-8">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Booking Confirmed & Recorded
        </span>

        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 font-heading">
          Appointment Request Received
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
          Thank you, <strong>{appointment.patientName}</strong>. Your consultation has been scheduled with Dr Nayak’s Dental. Please review your details below.
        </p>

        <div className="pt-2">
          <span className="inline-block px-3 py-1 bg-slate-100 rounded-lg text-xs font-mono font-bold text-slate-700">
            Booking Ref: {appointment.referenceNumber}
          </span>
        </div>
      </div>

      {/* Appointment Receipt Details Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6 mb-8 print:border-none print:shadow-none">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-900 font-heading">
            Consultation Summary
          </h2>
          <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
            Status: {appointment.status.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs text-slate-400">Patient Name</div>
              <div className="font-semibold text-slate-900">{appointment.patientName}</div>
              {appointment.age && (
                <div className="text-xs text-slate-500">Age: {appointment.age}</div>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs text-slate-400">Contact Number</div>
              <div className="font-semibold text-slate-900">{appointment.phone}</div>
              <div className="text-xs text-slate-500 capitalize">Pref: {appointment.communicationPreference}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CalendarIcon className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs text-slate-400">Appointment Date</div>
              <div className="font-semibold text-slate-900">
                {new Date(appointment.appointmentDate + 'T00:00:00').toLocaleDateString('en-IN', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs text-slate-400">Time Slot</div>
              <div className="font-semibold text-slate-900">{appointment.appointmentTime}</div>
              <div className="text-xs text-slate-500">Scheduled arrival 10m prior</div>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:col-span-2">
            <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs text-slate-400">Clinic & Location</div>
              <div className="font-semibold text-slate-900">{settings.name}</div>
              <div className="text-xs text-slate-600">{settings.address}</div>
            </div>
          </div>

          {appointment.message && (
            <div className="sm:col-span-2 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
              <span className="font-bold text-slate-800 block mb-1">Patient Dental Note:</span>
              <span>{appointment.message}</span>
            </div>
          )}

        </div>
      </div>

      {/* Action Buttons: WhatsApp, Call, Add to Calendar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        
        {/* WhatsApp Clinic */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 p-3.5 text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 border border-emerald-200 rounded-xl transition-colors shadow-2xs"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600" />
          <span>WhatsApp Clinic</span>
        </a>

        {/* Call Clinic */}
        <a
          href={`tel:${settings.rawPhone}`}
          className="inline-flex items-center justify-center gap-2 p-3.5 text-xs sm:text-sm font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 border border-slate-200 rounded-xl transition-colors shadow-2xs"
        >
          <Phone className="w-4 h-4 text-sky-600" />
          <span>Call Clinic</span>
        </a>

        {/* Add to Calendar */}
        <a
          href={createGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 p-3.5 text-xs sm:text-sm font-semibold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-xl transition-colors shadow-2xs"
        >
          <CalendarIcon className="w-4 h-4 text-sky-600" />
          <span>Add to Google Cal</span>
        </a>

      </div>

      {/* Secondary utility actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 pt-2 border-t border-slate-200">
        <div className="flex items-center gap-4">
          <button
            onClick={downloadIcsFile}
            className="hover:text-slate-800 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .ICS file (Apple / Outlook)</span>
          </button>

          <button
            onClick={handlePrint}
            className="hover:text-slate-800 flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
        </div>

        <Link
          to="/"
          className="font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
        >
          <span>Return to Homepage</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
};
