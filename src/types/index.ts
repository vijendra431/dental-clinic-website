export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';

export type CommunicationPreference = 'phone' | 'whatsapp' | 'sms';

export interface Appointment {
  id: string;
  referenceNumber: string;
  patientName: string;
  phone: string;
  email?: string;
  age?: number;
  serviceId: string;
  serviceName: string;
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // e.g. "10:30 AM"
  message?: string;
  communicationPreference: CommunicationPreference;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: 'General' | 'Preventive' | 'Restorative' | 'Cosmetic' | 'Specialized';
  shortDescription: string;
  fullOverview: string;
  symptoms: string[];
  treatmentOverview: string;
  whatToExpect: string[];
  faqs: { question: string; answer: string }[];
  iconName: string;
  isEnabled: boolean;
  isVerifiedByClinic: boolean;
  estimatedDuration?: string;
  imageUrl?: string;
}

export interface ClinicHours {
  open: string;  // "09:30"
  close: string; // "21:30"
  openDisplay: string;  // "9:30 AM"
  closeDisplay: string; // "9:30 PM"
}

export interface ClinicSettings {
  name: string;
  category: string;
  phone: string;
  rawPhone: string;
  whatsappNumber: string;
  address: string;
  shortAddress: string;
  googleMapsQuery: string;
  googleMapsEmbedUrl: string;
  googleRating: number;
  reviewCount: number;
  slotDurationMinutes: number;
  hours: {
    weekdays: ClinicHours; // Mon - Sat
    sunday: ClinicHours;   // Sun
  };
  closedDays: number[]; // 0 for Sunday if ever closed, default none
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  dateText: string;
  text: string;
  source: 'Google Reviews' | 'Verified Patient';
  initials: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Clinic' | 'Reception' | 'Treatment Room' | 'Equipment' | 'Team';
  imageUrl: string;
  caption: string;
}
