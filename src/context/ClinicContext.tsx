import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  Appointment, 
  ServiceItem, 
  ClinicSettings, 
  ReviewItem, 
  GalleryItem, 
  AppointmentStatus 
} from '../types';
import { 
  INITIAL_CLINIC_SETTINGS, 
  INITIAL_SERVICES, 
  INITIAL_APPOINTMENTS, 
  INITIAL_REVIEWS, 
  INITIAL_GALLERY 
} from '../data/initialData';
import { resolveClinicImage } from '../assets/images';
import { supabase, SUPABASE_PROJECT_ID } from '../lib/supabase';

interface TimeSlotInfo {
  time: string;
  isAvailable: boolean;
  bookedAppointmentId?: string;
}

interface ClinicStatus {
  isOpen: boolean;
  badgeText: string;
  detailText: string;
  todayHours: string;
}

export interface SupabaseStatusInfo {
  isConnected: boolean;
  message: string;
  isChecking: boolean;
  lastSyncedAt?: string;
}

interface ClinicContextType {
  settings: ClinicSettings;
  services: ServiceItem[];
  appointments: Appointment[];
  reviews: ReviewItem[];
  gallery: GalleryItem[];
  clinicStatus: ClinicStatus;
  supabaseStatus: SupabaseStatusInfo;
  
  // Appointment Actions
  bookAppointment: (data: Omit<Appointment, 'id' | 'referenceNumber' | 'status' | 'createdAt' | 'updatedAt'>) => Promise<{ success: boolean; appointment?: Appointment; error?: string }>;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => Promise<void>;
  rescheduleAppointment: (id: string, newDate: string, newTime: string) => Promise<{ success: boolean; error?: string }>;
  syncWithSupabase: () => Promise<void>;
  
  // Service Management Actions
  toggleServiceEnabled: (id: string) => void;
  updateService: (service: ServiceItem) => void;
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  
  // Settings Actions
  updateSettings: (newSettings: Partial<ClinicSettings>) => void;
  resetToDefaults: () => void;
  
  // Helpers
  getTimeSlotsForDate: (dateString: string) => TimeSlotInfo[];
  getServiceBySlug: (slug: string) => ServiceItem | undefined;
  getServiceById: (id: string) => ServiceItem | undefined;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SETTINGS: 'dr_nayak_clinic_settings_v2',
  SERVICES: 'dr_nayak_services_v2',
  APPOINTMENTS: 'dr_nayak_appointments_v1',
};

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<ClinicSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS) || localStorage.getItem('dr_nayak_clinic_settings_v1');
      return saved ? JSON.parse(saved) : INITIAL_CLINIC_SETTINGS;
    } catch {
      return INITIAL_CLINIC_SETTINGS;
    }
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERVICES) || localStorage.getItem('dr_nayak_services_v1');
      if (saved) {
        const parsed: ServiceItem[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item) => {
            const matchingInitial = INITIAL_SERVICES.find((s) => s.id === item.id || s.slug === item.slug);
            const resolved = resolveClinicImage(item.imageUrl, 'consultationCare');
            return {
              ...item,
              imageUrl: matchingInitial ? matchingInitial.imageUrl : resolved.primary,
            };
          });
        }
      }
      return INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  });

  const [reviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [gallery] = useState<GalleryItem[]>(INITIAL_GALLERY);

  const [supabaseStatus, setSupabaseStatus] = useState<SupabaseStatusInfo>({
    isConnected: false,
    message: 'Connecting to Supabase...',
    isChecking: true,
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch {
      // storage error fallback
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    } catch {
      // storage error fallback
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
    } catch {
      // storage error fallback
    }
  }, [appointments]);

  // Fetch appointments from Supabase on mount
  const syncWithSupabase = useCallback(async () => {
    setSupabaseStatus(prev => ({ ...prev, isChecking: true }));
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        // If table does not exist yet (code 42P01 or PGRST205)
        if (error.code === '42P01' || error.message.includes('relation') || error.code === 'PGRST205') {
          setSupabaseStatus({
            isConnected: true,
            message: `Connected to Supabase project (${SUPABASE_PROJECT_ID}). Table "appointments" needs SQL setup.`,
            isChecking: false,
            lastSyncedAt: new Date().toLocaleTimeString(),
          });
        } else {
          setSupabaseStatus({
            isConnected: false,
            message: `Supabase notice: ${error.message}`,
            isChecking: false,
          });
        }
        return;
      }

      if (data && data.length > 0) {
        // Map Supabase snake_case rows to Appointment interface
        const mappedFromDb: Appointment[] = data.map((item: any) => ({
          id: item.id || `apt-${Date.now()}`,
          referenceNumber: item.reference_number || item.referenceNumber || 'DND-10000',
          patientName: item.patient_name || item.patientName || 'Patient',
          phone: item.phone || '',
          email: item.email || undefined,
          age: item.age ? Number(item.age) : undefined,
          serviceId: item.service_id || item.serviceId || 'serv-checkup',
          serviceName: item.service_name || item.serviceName || 'Dental Consultation',
          appointmentDate: item.appointment_date || item.appointmentDate,
          appointmentTime: item.appointment_time || item.appointmentTime,
          message: item.message || undefined,
          communicationPreference: item.communication_preference || item.communicationPreference || 'whatsapp',
          status: (item.status as AppointmentStatus) || 'pending',
          createdAt: item.created_at || item.createdAt || new Date().toISOString(),
          updatedAt: item.updated_at || item.updatedAt || new Date().toISOString(),
        }));

        setAppointments(mappedFromDb);
        setSupabaseStatus({
          isConnected: true,
          message: `Live synced with Supabase (${data.length} appointments in database)`,
          isChecking: false,
          lastSyncedAt: new Date().toLocaleTimeString(),
        });
      } else {
        setSupabaseStatus({
          isConnected: true,
          message: `Connected to Supabase (${SUPABASE_PROJECT_ID}). Ready for new bookings.`,
          isChecking: false,
          lastSyncedAt: new Date().toLocaleTimeString(),
        });
      }
    } catch (err: any) {
      setSupabaseStatus({
        isConnected: false,
        message: err?.message || 'Could not connect to Supabase',
        isChecking: false,
      });
    }
  }, []);

  useEffect(() => {
    syncWithSupabase();
  }, [syncWithSupabase]);

  // Compute dynamic Open/Closed status
  const [clinicStatus, setClinicStatus] = useState<ClinicStatus>(() => computeStatus(settings));

  useEffect(() => {
    const update = () => setClinicStatus(computeStatus(settings));
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, [settings]);

  function computeStatus(currentSettings: ClinicSettings): ClinicStatus {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const isSunday = dayOfWeek === 0;

    const hoursConfig = isSunday ? currentSettings.hours.sunday : currentSettings.hours.weekdays;
    const todayHours = isSunday 
      ? `Sun: ${hoursConfig.openDisplay} – ${hoursConfig.closeDisplay}`
      : `Mon–Sat: ${hoursConfig.openDisplay} – ${hoursConfig.closeDisplay}`;

    const [openH, openM] = hoursConfig.open.split(':').map(Number);
    const [closeH, closeM] = hoursConfig.close.split(':').map(Number);

    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const openMinutes = openH * 60 + openM;
    const closeMinutes = closeH * 60 + closeM;

    const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

    if (isOpen) {
      return {
        isOpen: true,
        badgeText: "Open Now",
        detailText: `Closes at ${hoursConfig.closeDisplay} today`,
        todayHours,
      };
    } else {
      let nextOpenText = `Opens tomorrow at ${isSunday ? currentSettings.hours.weekdays.openDisplay : (dayOfWeek === 6 ? currentSettings.hours.sunday.openDisplay : currentSettings.hours.weekdays.openDisplay)}`;
      if (currentMinutes < openMinutes) {
        nextOpenText = `Opens today at ${hoursConfig.openDisplay}`;
      }
      return {
        isOpen: false,
        badgeText: "Closed Now",
        detailText: nextOpenText,
        todayHours,
      };
    }
  }

  // Calculate available time slots for a given date
  const getTimeSlotsForDate = (dateString: string): TimeSlotInfo[] => {
    if (!dateString) return [];
    
    const [year, month, day] = dateString.split('-').map(Number);
    const targetDate = new Date(year, month - 1, day);
    const dayOfWeek = targetDate.getDay();
    const isSunday = dayOfWeek === 0;

    const hoursConfig = isSunday ? settings.hours.sunday : settings.hours.weekdays;
    const [openH, openM] = hoursConfig.open.split(':').map(Number);
    const [closeH, closeM] = hoursConfig.close.split(':').map(Number);

    const slotInterval = settings.slotDurationMinutes || 30;
    const startMinutes = openH * 60 + openM;
    const endMinutes = closeH * 60 + closeM;

    const bookedForDate = appointments.filter(
      apt => apt.appointmentDate === dateString && apt.status !== 'cancelled'
    );

    const slots: TimeSlotInfo[] = [];

    for (let m = startMinutes; m + slotInterval <= endMinutes; m += slotInterval) {
      const h = Math.floor(m / 60);
      const min = m % 60;
      const period = h >= 12 ? 'PM' : 'AM';
      const displayH = h % 12 === 0 ? 12 : h % 12;
      const displayMin = min < 10 ? `0${min}` : min;
      const timeFormatted = `${displayH < 10 ? '0' : ''}${displayH}:${displayMin} ${period}`;

      const matchedBooking = bookedForDate.find(apt => apt.appointmentTime === timeFormatted);

      slots.push({
        time: timeFormatted,
        isAvailable: !matchedBooking,
        bookedAppointmentId: matchedBooking?.id,
      });
    }

    return slots;
  };

  const bookAppointment = async (data: Omit<Appointment, 'id' | 'referenceNumber' | 'status' | 'createdAt' | 'updatedAt'>) => {
    // Check if slot is already taken on that date
    const conflict = appointments.find(
      apt => apt.appointmentDate === data.appointmentDate &&
             apt.appointmentTime === data.appointmentTime &&
             apt.status !== 'cancelled'
    );

    if (conflict) {
      return {
        success: false,
        error: `The ${data.appointmentTime} slot on ${data.appointmentDate} is already booked. Please choose another time.`,
      };
    }

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const nowIso = new Date().toISOString();
    const newAppointment: Appointment = {
      ...data,
      id: `apt-${Date.now()}-${randomSuffix}`,
      referenceNumber: `DND-${randomSuffix}`,
      status: 'pending',
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    // Update local state immediately for seamless UX
    setAppointments(prev => [newAppointment, ...prev]);

    // Save directly to Supabase backend database
    try {
      const dbRow = {
        id: newAppointment.id,
        reference_number: newAppointment.referenceNumber,
        patient_name: newAppointment.patientName,
        phone: newAppointment.phone,
        email: newAppointment.email || null,
        age: newAppointment.age || null,
        service_id: newAppointment.serviceId,
        service_name: newAppointment.serviceName,
        appointment_date: newAppointment.appointmentDate,
        appointment_time: newAppointment.appointmentTime,
        message: newAppointment.message || null,
        communication_preference: newAppointment.communicationPreference,
        status: newAppointment.status,
        created_at: newAppointment.createdAt,
        updated_at: newAppointment.updatedAt,
      };

      const { error: insertError } = await supabase
        .from('appointments')
        .insert([dbRow]);

      if (insertError) {
        console.warn('Supabase database insert notice:', insertError.message);
        setSupabaseStatus(prev => ({
          ...prev,
          message: `Saved locally; Supabase notice: ${insertError.message}`,
        }));
      } else {
        setSupabaseStatus(prev => ({
          ...prev,
          isConnected: true,
          message: `Saved to Supabase database successfully (Ref: ${newAppointment.referenceNumber})`,
          lastSyncedAt: new Date().toLocaleTimeString(),
        }));
      }
    } catch (dbErr: any) {
      console.warn('Supabase network error:', dbErr);
    }

    return {
      success: true,
      appointment: newAppointment,
    };
  };

  const updateAppointmentStatus = async (id: string, status: AppointmentStatus) => {
    const updatedAt = new Date().toISOString();
    setAppointments(prev =>
      prev.map(apt => (apt.id === id ? { ...apt, status, updatedAt } : apt))
    );

    try {
      await supabase
        .from('appointments')
        .update({ status, updated_at: updatedAt })
        .eq('id', id);
    } catch (err) {
      console.warn('Supabase status update error:', err);
    }
  };

  const rescheduleAppointment = async (id: string, newDate: string, newTime: string) => {
    const conflict = appointments.find(
      apt => apt.id !== id &&
             apt.appointmentDate === newDate &&
             apt.appointmentTime === newTime &&
             apt.status !== 'cancelled'
    );

    if (conflict) {
      return {
        success: false,
        error: `The slot ${newTime} on ${newDate} is already booked by another patient.`,
      };
    }

    const updatedAt = new Date().toISOString();
    setAppointments(prev =>
      prev.map(apt =>
        apt.id === id
          ? { ...apt, appointmentDate: newDate, appointmentTime: newTime, updatedAt }
          : apt
      )
    );

    try {
      await supabase
        .from('appointments')
        .update({ 
          appointment_date: newDate, 
          appointment_time: newTime, 
          updated_at: updatedAt 
        })
        .eq('id', id);
    } catch (err) {
      console.warn('Supabase reschedule update error:', err);
    }

    return { success: true };
  };

  const toggleServiceEnabled = (id: string) => {
    setServices(prev =>
      prev.map(s => (s.id === id ? { ...s, isEnabled: !s.isEnabled } : s))
    );
  };

  const updateService = (updated: ServiceItem) => {
    setServices(prev =>
      prev.map(s => (s.id === updated.id ? updated : s))
    );
  };

  const addService = (newServiceData: Omit<ServiceItem, 'id'>) => {
    const newService: ServiceItem = {
      ...newServiceData,
      id: `serv-${Date.now()}`,
    };
    setServices(prev => [...prev, newService]);
  };

  const updateSettings = (newSettings: Partial<ClinicSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetToDefaults = () => {
    setSettings(INITIAL_CLINIC_SETTINGS);
    setServices(INITIAL_SERVICES);
    setAppointments(INITIAL_APPOINTMENTS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.APPOINTMENTS);
  };

  const getServiceBySlug = (slug: string) => {
    return services.find(s => s.slug === slug);
  };

  const getServiceById = (id: string) => {
    return services.find(s => s.id === id);
  };

  return (
    <ClinicContext.Provider
      value={{
        settings,
        services,
        appointments,
        reviews,
        gallery,
        clinicStatus,
        supabaseStatus,
        bookAppointment,
        updateAppointmentStatus,
        rescheduleAppointment,
        syncWithSupabase,
        toggleServiceEnabled,
        updateService,
        addService,
        updateSettings,
        resetToDefaults,
        getTimeSlotsForDate,
        getServiceBySlug,
        getServiceById,
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};
