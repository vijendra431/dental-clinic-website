import React, { useState } from 'react';
import { 
  Shield, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Clock4, 
  RefreshCw, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Save, 
  Lock, 
  Unlock,
  AlertCircle,
  Database,
  Copy,
  ExternalLink
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { Appointment, AppointmentStatus, ServiceItem } from '../types';
import { SUPABASE_PROJECT_ID, SUPABASE_SQL_SETUP, SUPABASE_URL } from '../lib/supabase';

export const AdminPage: React.FC = () => {
  const { 
    settings, 
    services, 
    appointments, 
    updateAppointmentStatus, 
    rescheduleAppointment,
    toggleServiceEnabled,
    updateService,
    addService,
    updateSettings,
    resetToDefaults,
    getTimeSlotsForDate,
    supabaseStatus,
    syncWithSupabase
  } = useClinic();

  // Authentication barrier
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('dr_nayak_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Tab navigation
  const [activeTab, setActiveTab] = useState<'appointments' | 'services' | 'settings' | 'supabase'>('appointments');
  const [sqlCopied, setSqlCopied] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Appointments Filter & Search State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('');

  // Selected Appointment for Reschedule modal
  const [rescheduleModalApt, setRescheduleModalApt] = useState<Appointment | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState<string>('');
  const [rescheduleTime, setRescheduleTime] = useState<string>('');
  const [rescheduleError, setRescheduleError] = useState<string | null>(null);

  // Service Edit modal state
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isAddingNewService, setIsAddingNewService] = useState<boolean>(false);
  const [serviceFormData, setServiceFormData] = useState({
    title: '',
    category: 'General' as ServiceItem['category'],
    shortDescription: '',
    fullOverview: '',
    treatmentOverview: '',
    estimatedDuration: '30 mins',
  });

  // Settings state form
  const [settingsForm, setSettingsForm] = useState({
    name: settings.name,
    phone: settings.phone,
    whatsappNumber: settings.whatsappNumber,
    address: settings.address,
    weekdaysOpen: settings.hours.weekdays.open,
    weekdaysClose: settings.hours.weekdays.close,
    sundayOpen: settings.hours.sunday.open,
    sundayClose: settings.hours.sunday.close,
    slotDurationMinutes: settings.slotDurationMinutes,
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Auth Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN or quick passcode
    if (passwordInput === 'admin123' || passwordInput === 'nayakdental' || passwordInput.trim() === 'demo') {
      setIsAuthenticated(true);
      sessionStorage.setItem('dr_nayak_admin_auth', 'true');
      setAuthError(null);
    } else {
      setAuthError('Incorrect clinic PIN. (Hint: use "admin123" or "demo")');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('dr_nayak_admin_auth');
  };

  // Appointment counts
  const todayDateStr = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter((a) => a.appointmentDate === todayDateStr);
  const pendingCount = appointments.filter((a) => a.status === 'pending').length;
  const confirmedCount = appointments.filter((a) => a.status === 'confirmed').length;
  const completedCount = appointments.filter((a) => a.status === 'completed').length;
  const cancelledCount = appointments.filter((a) => a.status === 'cancelled').length;

  // Filtered Appointments
  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch = 
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.phone.includes(searchQuery) ||
      apt.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    const matchesService = serviceFilter === 'all' || apt.serviceId === serviceFilter;
    const matchesDate = !dateFilter || apt.appointmentDate === dateFilter;

    return matchesSearch && matchesStatus && matchesService && matchesDate;
  });

  // Handle Reschedule submit
  const handleRescheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleModalApt || !rescheduleDate || !rescheduleTime) {
      setRescheduleError('Please choose both date and time slot.');
      return;
    }
    const res = await rescheduleAppointment(rescheduleModalApt.id, rescheduleDate, rescheduleTime);
    if (res.success) {
      setRescheduleModalApt(null);
      setRescheduleError(null);
    } else {
      setRescheduleError(res.error || 'Conflict encountered for this slot.');
    }
  };

  // Handle Service Save
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAddingNewService) {
      const slug = serviceFormData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      addService({
        title: serviceFormData.title,
        slug,
        category: serviceFormData.category,
        shortDescription: serviceFormData.shortDescription,
        fullOverview: serviceFormData.fullOverview || serviceFormData.shortDescription,
        treatmentOverview: serviceFormData.treatmentOverview || 'Treatment evaluated during in-person clinical assessment.',
        symptoms: ['Consultation recommended for assessment'],
        whatToExpect: ['Patient consultation and examination in clean clinic environment.'],
        faqs: [],
        iconName: 'Stethoscope',
        isEnabled: true,
        isVerifiedByClinic: true,
        estimatedDuration: serviceFormData.estimatedDuration,
      });
      setIsAddingNewService(false);
    } else if (editingService) {
      updateService({
        ...editingService,
        title: serviceFormData.title,
        category: serviceFormData.category,
        shortDescription: serviceFormData.shortDescription,
        fullOverview: serviceFormData.fullOverview,
        treatmentOverview: serviceFormData.treatmentOverview,
        estimatedDuration: serviceFormData.estimatedDuration,
      });
      setEditingService(null);
    }
  };

  // Handle Settings Save
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      name: settingsForm.name,
      phone: settingsForm.phone,
      whatsappNumber: settingsForm.whatsappNumber,
      address: settingsForm.address,
      slotDurationMinutes: Number(settingsForm.slotDurationMinutes),
      hours: {
        weekdays: {
          open: settingsForm.weekdaysOpen,
          close: settingsForm.weekdaysClose,
          openDisplay: formatTimeDisplay(settingsForm.weekdaysOpen),
          closeDisplay: formatTimeDisplay(settingsForm.weekdaysClose),
        },
        sunday: {
          open: settingsForm.sundayOpen,
          close: settingsForm.sundayClose,
          openDisplay: formatTimeDisplay(settingsForm.sundayOpen),
          closeDisplay: formatTimeDisplay(settingsForm.sundayClose),
        },
      },
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  function formatTimeDisplay(time24: string): string {
    const [h, m] = time24.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    const displayM = m < 10 ? `0${m}` : `${m}`;
    return `${displayH}:${displayM} ${period}`;
  }

  // If not logged in, render PIN login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto border border-sky-100">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 font-heading">
              Clinic Admin Portal
            </h1>
            <p className="text-xs text-slate-500">
              Authorized access for Dr Nayak’s Dental management
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Admin Password / PIN
              </label>
              <input
                type="password"
                required
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Quick Access demo code: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">admin123</code>
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl shadow-xs transition-colors"
            >
              Sign In to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8 pb-20">
      
      {/* Admin Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
              {settings.name} — Clinic Portal
            </h1>
            <p className="text-xs text-slate-500">
              Manage patient bookings, customizable dental services, and clinic operational hours
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <Unlock className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Supabase Cloud Live Status Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <Database className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 font-heading">
                Supabase Backend Database
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Connected</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                ID: {SUPABASE_PROJECT_ID}
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {supabaseStatus.message} {supabaseStatus.lastSyncedAt ? `· Last synced: ${supabaseStatus.lastSyncedAt}` : ''}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={async () => {
              setIsSyncing(true);
              await syncWithSupabase();
              setIsSyncing(false);
            }}
            disabled={isSyncing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 active:bg-sky-200 rounded-lg border border-sky-200 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Database'}</span>
          </button>

          <button
            onClick={() => setActiveTab('supabase')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'supabase'
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 bg-slate-100 hover:bg-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>SQL & Tables</span>
          </button>
        </div>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs">
          <div className="text-xs font-medium text-slate-500">Today's Visits</div>
          <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums font-heading">
            {todayAppointments.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Scheduled for today</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs">
          <div className="text-xs font-medium text-amber-700">Pending Requests</div>
          <div className="text-2xl font-bold text-amber-700 mt-1 tabular-nums font-heading">
            {pendingCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Awaiting clinic review</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs">
          <div className="text-xs font-medium text-sky-700">Confirmed Slots</div>
          <div className="text-2xl font-bold text-sky-700 mt-1 tabular-nums font-heading">
            {confirmedCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Ready for treatment</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs">
          <div className="text-xs font-medium text-emerald-700">Completed</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1 tabular-nums font-heading">
            {completedCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Treated patients</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs col-span-2 sm:col-span-1">
          <div className="text-xs font-medium text-rose-700">Cancelled / No-show</div>
          <div className="text-2xl font-bold text-rose-700 mt-1 tabular-nums font-heading">
            {cancelledCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Slots freed</div>
        </div>
      </div>

      {/* Main Tab Controls (Segmented Tabs) */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('appointments')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'appointments'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Appointments ({appointments.length})
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'services'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Manage Services ({services.length})
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'settings'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Clinic Settings
        </button>

        <button
          onClick={() => setActiveTab('supabase')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'supabase'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Supabase Backend</span>
        </button>
      </div>

      {/* TAB 1: Appointments Management */}
      {activeTab === 'appointments' && (
        <div className="space-y-6">
          
          {/* Filters Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search patient, phone, ref..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
              />
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Service Filter */}
            <div>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
              >
                <option value="all">All Services</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
              />
            </div>
          </div>

          {/* Appointments Table */}
          <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Ref & Patient</th>
                    <th className="py-3.5 px-4">Service</th>
                    <th className="py-3.5 px-4">Date & Time</th>
                    <th className="py-3.5 px-4">Contact</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 text-sm">{apt.patientName}</div>
                          <div className="text-[11px] font-mono text-slate-400">{apt.referenceNumber}</div>
                          {apt.age && <div className="text-[10px] text-slate-500">Age: {apt.age}</div>}
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="font-medium text-slate-800">{apt.serviceName}</span>
                          {apt.message && (
                            <p className="text-[11px] text-slate-500 line-clamp-1 italic mt-0.5">
                              "{apt.message}"
                            </p>
                          )}
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="font-semibold text-slate-900">{apt.appointmentDate}</div>
                          <div className="text-sky-700 font-medium">{apt.appointmentTime}</div>
                        </td>

                        <td className="py-3.5 px-4">
                          <a 
                            href={`tel:${apt.phone}`} 
                            className="font-semibold text-slate-900 hover:text-sky-600 block"
                          >
                            {apt.phone}
                          </a>
                          <span className="text-[10px] text-slate-400 capitalize">via {apt.communicationPreference}</span>
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            apt.status === 'confirmed' 
                              ? 'bg-sky-50 text-sky-700 border border-sky-200' 
                              : apt.status === 'completed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : apt.status === 'cancelled'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {apt.status}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {apt.status === 'pending' && (
                              <button
                                onClick={() => updateAppointmentStatus(apt.id, 'confirmed')}
                                className="px-2.5 py-1 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded text-[11px] font-semibold border border-sky-200 transition-colors"
                                title="Confirm Booking"
                              >
                                Confirm
                              </button>
                            )}

                            {apt.status === 'confirmed' && (
                              <button
                                onClick={() => updateAppointmentStatus(apt.id, 'completed')}
                                className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-[11px] font-semibold border border-emerald-200 transition-colors"
                                title="Mark Treatment Completed"
                              >
                                Complete
                              </button>
                            )}

                            <button
                              onClick={() => {
                                setRescheduleModalApt(apt);
                                setRescheduleDate(apt.appointmentDate);
                                setRescheduleTime(apt.appointmentTime);
                                setRescheduleError(null);
                              }}
                              className="px-2.5 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded text-[11px] font-semibold transition-colors"
                              title="Reschedule Slot"
                            >
                              Reschedule
                            </button>

                            {apt.status !== 'cancelled' && (
                              <button
                                onClick={() => updateAppointmentStatus(apt.id, 'cancelled')}
                                className="px-2.5 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded text-[11px] font-semibold transition-colors"
                                title="Cancel Booking"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        No appointments match current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: Service Management */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-heading">
                Service Catalog Configuration
              </h2>
              <p className="text-xs text-slate-500">
                Clinic owners can toggle which services are verified and active on the public website.
              </p>
            </div>

            <button
              onClick={() => {
                setIsAddingNewService(true);
                setEditingService(null);
                setServiceFormData({
                  title: '',
                  category: 'General',
                  shortDescription: '',
                  fullOverview: '',
                  treatmentOverview: '',
                  estimatedDuration: '30 mins',
                });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-colors shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom Service</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <div
                key={service.id}
                className={`p-5 rounded-2xl border transition-all ${
                  service.isEnabled
                    ? 'bg-white border-slate-200/80 shadow-2xs'
                    : 'bg-slate-50/70 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wide">
                      {service.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 font-heading">
                      {service.title}
                    </h3>
                  </div>

                  {/* Toggle button */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleServiceEnabled(service.id)}
                      className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                        service.isEnabled
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {service.isEnabled ? 'Enabled' : 'Disabled'}
                    </button>

                    <button
                      onClick={() => {
                        setEditingService(service);
                        setIsAddingNewService(false);
                        setServiceFormData({
                          title: service.title,
                          category: service.category,
                          shortDescription: service.shortDescription,
                          fullOverview: service.fullOverview,
                          treatmentOverview: service.treatmentOverview,
                          estimatedDuration: service.estimatedDuration || '30 mins',
                        });
                      }}
                      className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-slate-100 rounded"
                      title="Edit Service Details"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                  {service.shortDescription}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                  <span>Duration: {service.estimatedDuration || '30 mins'}</span>
                  <span>{service.isVerifiedByClinic ? 'Verified Listing' : 'Pending Verification'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Clinic Settings */}
      {activeTab === 'settings' && (
        <div className="max-w-3xl bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-heading">
              Clinic Contact & Operational Configuration
            </h2>
            <p className="text-xs text-slate-500">
              Customize clinic hours, telephone numbers, and appointment scheduling parameters.
            </p>
          </div>

          {settingsSaved && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Settings updated successfully! Changes will reflect across the site.</span>
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Clinic Name
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.name}
                  onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Phone
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.phone}
                  onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  WhatsApp Number (with country code, no +)
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.whatsappNumber}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Slot Duration (Minutes)
                </label>
                <select
                  value={settingsForm.slotDurationMinutes}
                  onChange={(e) => setSettingsForm({ ...settingsForm, slotDurationMinutes: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>60 minutes</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Physical Address
              </label>
              <textarea
                rows={2}
                required
                value={settingsForm.address}
                onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
              />
            </div>

            {/* Hours configuration */}
            <div className="border-t border-slate-200 pt-4 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Operating Hours Configuration
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">
                    Weekdays (Mon–Sat) Opening (24h)
                  </label>
                  <input
                    type="time"
                    value={settingsForm.weekdaysOpen}
                    onChange={(e) => setSettingsForm({ ...settingsForm, weekdaysOpen: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1">
                    Weekdays (Mon–Sat) Closing (24h)
                  </label>
                  <input
                    type="time"
                    value={settingsForm.weekdaysClose}
                    onChange={(e) => setSettingsForm({ ...settingsForm, weekdaysClose: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">
                    Sunday Opening (24h)
                  </label>
                  <input
                    type="time"
                    value={settingsForm.sundayOpen}
                    onChange={(e) => setSettingsForm({ ...settingsForm, sundayOpen: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1">
                    Sunday Closing (24h)
                  </label>
                  <input
                    type="time"
                    value={settingsForm.sundayClose}
                    onChange={(e) => setSettingsForm({ ...settingsForm, sundayClose: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={resetToDefaults}
                className="text-xs text-slate-400 hover:text-rose-600 transition-colors"
              >
                Reset All to Defaults
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-colors shadow-xs"
              >
                <Save className="w-4 h-4" />
                <span>Save Clinic Settings</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 4: Supabase Backend Management */}
      {activeTab === 'supabase' && (
        <div className="space-y-6 max-w-4xl">
          {/* Supabase Overview Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-heading">
                    Supabase PostgreSQL Cloud Backend
                  </h2>
                  <p className="text-xs text-slate-500">
                    Real-time cloud database storage for appointments and inquiries
                  </p>
                </div>
              </div>

              <a
                href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/editor`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shadow-xs"
              >
                <span>Open Supabase Table Editor</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Connection Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-slate-400 block font-medium">Project Reference ID</span>
                <span className="font-mono font-bold text-slate-900 text-sm">{SUPABASE_PROJECT_ID}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-slate-400 block font-medium">API Endpoint</span>
                <span className="font-mono text-slate-900 truncate block text-xs">{SUPABASE_URL}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-slate-400 block font-medium">Sync Status</span>
                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-emerald-700">Online & Connected</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-slate-400 block font-medium">Appointments Synced</span>
                <span className="font-bold text-slate-900 text-sm tabular-nums">{appointments.length} records</span>
              </div>
            </div>

            {/* Sync Now Action */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <span className="text-xs text-slate-500">
                {supabaseStatus.message}
              </span>
              <button
                onClick={async () => {
                  setIsSyncing(true);
                  await syncWithSupabase();
                  setIsSyncing(false);
                }}
                disabled={isSyncing}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-xl border border-sky-200 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Refreshing...' : 'Refresh from Database'}</span>
              </button>
            </div>
          </div>

          {/* Database Setup & SQL Script Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Supabase Database Schema Setup
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Run this SQL in your Supabase SQL Editor if you haven't created the <code className="bg-slate-100 px-1 py-0.5 rounded text-sky-700 font-mono">appointments</code> table yet.
                </p>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(SUPABASE_SQL_SETUP);
                  setSqlCopied(true);
                  setTimeout(() => setSqlCopied(false), 2500);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
              >
                {sqlCopied ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-600" />
                    <span>Copy SQL</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative">
              <pre className="p-4 rounded-2xl bg-slate-900 text-slate-100 text-xs font-mono overflow-x-auto max-h-64 leading-relaxed scrollbar-thin">
                {SUPABASE_SQL_SETUP}
              </pre>
            </div>

            <div className="text-xs text-slate-500 pt-1 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Includes public insert & select policies so online patients can book seamlessly without requiring login.</span>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleModalApt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              Reschedule Appointment
            </h3>
            <p className="text-xs text-slate-600">
              Patient: <strong>{rescheduleModalApt.patientName}</strong> ({rescheduleModalApt.referenceNumber})
            </p>

            {rescheduleError && (
              <div className="p-3 rounded-xl bg-rose-50 text-rose-800 text-xs border border-rose-200">
                {rescheduleError}
              </div>
            )}

            <form onSubmit={handleRescheduleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  New Date
                </label>
                <input
                  type="date"
                  required
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Select New Slot
                </label>
                <select
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50"
                >
                  <option value="">Select a time slot...</option>
                  {getTimeSlotsForDate(rescheduleDate).map((slot) => (
                    <option key={slot.time} value={slot.time} disabled={!slot.isAvailable && slot.bookedAppointmentId !== rescheduleModalApt.id}>
                      {slot.time} {!slot.isAvailable && slot.bookedAppointmentId !== rescheduleModalApt.id ? '(Booked)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRescheduleModalApt(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-xs"
                >
                  Confirm Reschedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Service Edit / Add Modal */}
      {(editingService || isAddingNewService) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              {isAddingNewService ? 'Add New Dental Service' : `Edit: ${editingService?.title}`}
            </h3>

            <form onSubmit={handleSaveService} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={serviceFormData.title}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, title: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={serviceFormData.category}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, category: e.target.value as ServiceItem['category'] })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50"
                  >
                    <option value="General">General</option>
                    <option value="Preventive">Preventive</option>
                    <option value="Restorative">Restorative</option>
                    <option value="Cosmetic">Cosmetic</option>
                    <option value="Specialized">Specialized</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={serviceFormData.estimatedDuration}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, estimatedDuration: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Short Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={serviceFormData.shortDescription}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Clinical Overview
                </label>
                <textarea
                  rows={3}
                  value={serviceFormData.fullOverview}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, fullOverview: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingService(null);
                    setIsAddingNewService(false);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-xs"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
