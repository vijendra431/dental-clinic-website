import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useClinic } from '../context/ClinicContext';
import { CommunicationPreference } from '../types';

export const BookAppointmentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { services, getTimeSlotsForDate, bookAppointment, settings } = useClinic();

  // Active services
  const activeServices = services.filter((s) => s.isEnabled);

  // Pre-select service from URL param if available
  const initialServiceSlug = searchParams.get('service');
  const matchedInitialService = activeServices.find((s) => s.slug === initialServiceSlug);

  // Form state
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState<string>('');
  const [communicationPref, setCommunicationPref] = useState<CommunicationPreference>('whatsapp');
  
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    matchedInitialService?.id || (activeServices[0]?.id ?? '')
  );

  // Date selection (default to tomorrow formatted as YYYY-MM-DD)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState<string>(defaultDateStr);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [patientMessage, setPatientMessage] = useState('');

  // Step wizard: 1 (Patient Info), 2 (Service), 3 (Date & Time), 4 (Review & Notes)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Available slots for selected date
  const availableSlots = getTimeSlotsForDate(selectedDate);

  // Auto select first available slot when date changes if current slot is invalid
  useEffect(() => {
    if (selectedTimeSlot) {
      const match = availableSlots.find((s) => s.time === selectedTimeSlot && s.isAvailable);
      if (!match) {
        setSelectedTimeSlot('');
      }
    }
  }, [selectedDate, availableSlots, selectedTimeSlot]);

  // Validation per step
  const validateStep = (step: number): boolean => {
    setFormError(null);
    if (step === 1) {
      if (!patientName.trim()) {
        setFormError('Please enter your full name.');
        return false;
      }
      const digitsOnly = phoneNumber.replace(/\D/g, '');
      if (digitsOnly.length < 10) {
        setFormError('Please enter a valid 10-digit mobile number.');
        return false;
      }
      if (age && (Number(age) < 1 || Number(age) > 120)) {
        setFormError('Please enter a valid age.');
        return false;
      }
    }

    if (step === 2) {
      if (!selectedServiceId) {
        setFormError('Please choose a dental service or consultation.');
        return false;
      }
    }

    if (step === 3) {
      if (!selectedDate) {
        setFormError('Please choose an appointment date.');
        return false;
      }
      if (!selectedTimeSlot) {
        setFormError('Please select an available time slot.');
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setFormError(null);
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    const chosenService = services.find((s) => s.id === selectedServiceId);

    const res = await bookAppointment({
      patientName: patientName.trim(),
      phone: phoneNumber.trim(),
      email: email.trim() || undefined,
      age: age ? Number(age) : undefined,
      serviceId: selectedServiceId,
      serviceName: chosenService?.title || 'Dental Consultation',
      appointmentDate: selectedDate,
      appointmentTime: selectedTimeSlot,
      message: patientMessage.trim() || undefined,
      communicationPreference: communicationPref,
    });

    setIsSubmitting(false);

    if (res.success && res.appointment) {
      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // graceful fallback
      }

      navigate(`/confirmation/${res.appointment.id}`);
    } else {
      setFormError(res.error || 'Failed to complete booking. Please try another slot.');
    }
  };

  // Helper date strings
  const todayStr = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 45); // up to 45 days in advance
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const selectedServiceObj = services.find((s) => s.id === selectedServiceId);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 pb-20">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold mb-3 border border-sky-200">
          <CalendarIcon className="w-3.5 h-3.5 text-sky-600" />
          <span>Real-Time Appointment Scheduling</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 font-heading">
          Book Your Dental Appointment
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Reserve your preferred clinical consultation slot at Dr Nayak’s Dental in Raichur.
        </p>
      </div>

      {/* Step Indicator Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
          <span className={currentStep >= 1 ? 'text-sky-700' : ''}>1. Patient Details</span>
          <span className={currentStep >= 2 ? 'text-sky-700' : ''}>2. Select Service</span>
          <span className={currentStep >= 3 ? 'text-sky-700' : ''}>3. Date & Time</span>
          <span className={currentStep >= 4 ? 'text-sky-700' : ''}>4. Review & Confirm</span>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-sky-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs">
        
        {/* Error notification banner */}
        {formError && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-800 flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Please check:</span> {formError}
            </div>
          </div>
        )}

        <form onSubmit={handleFinalSubmit}>
          
          {/* STEP 1: Patient Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-heading">
                  Patient Information
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Please provide your contact details so our clinic can confirm your booking.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Patient Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kulkarni"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Mobile Number (10 digits) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 97417 69889"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="ramesh@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Patient Age (Optional)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    placeholder="e.g. 34"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Preferred Confirmation Method
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'whatsapp', label: 'WhatsApp' },
                    { id: 'phone', label: 'Phone Call' },
                    { id: 'sms', label: 'SMS Text' },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setCommunicationPref(item.id as CommunicationPreference)}
                      className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-colors ${
                        communicationPref === item.id
                          ? 'bg-sky-50 text-sky-700 border-sky-300 ring-2 ring-sky-500/20'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl shadow-xs transition-colors"
                >
                  <span>Continue to Service Selection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Service Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-heading">
                  Select Dental Service
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Choose the primary reason for your visit. The dentist will perform a complete clinical assessment.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                {activeServices.map((service) => {
                  const isSelected = selectedServiceId === service.id;
                  return (
                    <div
                      key={service.id}
                      onClick={() => setSelectedServiceId(service.id)}
                      className={`cursor-pointer p-4 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-sky-500 bg-sky-50/60 ring-2 ring-sky-500/20'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-sky-700 uppercase tracking-wide">
                          {service.category}
                        </span>
                        {isSelected && (
                          <CheckCircle className="w-4 h-4 text-sky-600" />
                        )}
                      </div>
                      <div className="text-sm font-bold text-slate-900 font-heading">
                        {service.title}
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {service.shortDescription}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Not sure which service fits? You can select <strong>Dental Check-up & Consultation</strong>.</span>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl shadow-xs transition-colors"
                >
                  <span>Select Date & Time</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Date & Time Slot Selection */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-heading">
                  Choose Appointment Date & Time
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Clinic working hours: Mon–Sat 9:30 AM–9:30 PM · Sun 10:00 AM–9:00 PM. Booked slots are disabled in real-time.
                </p>
              </div>

              {/* Date Input */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Select Date *
                </label>
                <div className="relative max-w-sm">
                  <CalendarIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    min={todayStr}
                    max={maxDateStr}
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
                  />
                </div>
                <div className="text-[11px] text-slate-500">
                  Selected date: {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>

              {/* Time Slots Grid */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-700">
                    Available Time Slots * ({availableSlots.filter((s) => s.isAvailable).length} available)
                  </label>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-white border border-slate-300" /> Available
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-200" /> Booked
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-[260px] overflow-y-auto p-1 border border-slate-100 rounded-2xl bg-slate-50/30">
                  {availableSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot.time;
                    if (!slot.isAvailable) {
                      return (
                        <div
                          key={slot.time}
                          className="py-2.5 px-2 text-center text-xs font-medium text-slate-400 bg-slate-100 rounded-xl cursor-not-allowed border border-slate-200/60 line-through"
                          title="Slot already booked"
                        >
                          {slot.time}
                        </div>
                      );
                    }

                    return (
                      <button
                        type="button"
                        key={slot.time}
                        onClick={() => setSelectedTimeSlot(slot.time)}
                        className={`py-2.5 px-2 text-center text-xs font-semibold rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-sky-600 text-white border-sky-600 shadow-xs ring-2 ring-sky-500/20'
                            : 'bg-white text-slate-800 border-slate-200 hover:border-sky-300 hover:bg-sky-50/50'
                        }`}
                      >
                        {slot.time}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl shadow-xs transition-colors"
                >
                  <span>Review Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Patient Concern & Review */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-heading">
                  Review & Additional Notes
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Confirm your appointment summary and share any specific symptoms with the dentist.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-500 block text-xs">Patient Name:</span>
                    <strong className="text-slate-900 font-semibold">{patientName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Mobile Number:</span>
                    <strong className="text-slate-900 font-semibold">{phoneNumber}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Selected Service:</span>
                    <strong className="text-sky-700 font-semibold">{selectedServiceObj?.title}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Date & Time:</span>
                    <strong className="text-slate-900 font-semibold">{selectedDate} at {selectedTimeSlot}</strong>
                  </div>
                </div>
              </div>

              {/* Message field */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Tell us briefly about your dental concern (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Mild pain in upper right tooth when drinking cold water..."
                  value={patientMessage}
                  onChange={(e) => setPatientMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
                />
              </div>

              {/* Privacy agreement & policy */}
              <div className="text-xs text-slate-500 flex items-start gap-2 pt-1">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  By booking, your contact information will be securely used by Dr Nayak’s Dental strictly for scheduling and appointment reminders.
                </span>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 disabled:bg-sky-400 rounded-xl shadow-xs transition-colors"
                >
                  {isSubmitting ? (
                    <span>Confirming...</span>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Confirm Appointment Request</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </form>

      </div>

      {/* Direct Phone Fallback */}
      <div className="mt-8 text-center text-xs text-slate-500">
        Prefer booking over a phone call? Contact Dr Nayak’s Dental directly at{' '}
        <a href={`tel:${settings.rawPhone}`} className="font-bold text-sky-700 hover:underline">
          {settings.phone}
        </a>.
      </div>

    </div>
  );
};
