// Production-ready dental clinic image imports processed by Vite
import heroDental from './hero-dental.jpg';
import clinicReception from './clinic-reception.jpg';
import dentalEquipment from './dental-equipment.jpg';
import dentalConsultation from './dental-consultation.jpg';

export const CLINIC_IMAGES = {
  heroOperatory: heroDental,
  receptionLounge: clinicReception,
  equipmentTech: dentalEquipment,
  consultationCare: dentalConsultation,
} as const;

// Public fallback paths (served statically from /public/images/ and /public/)
export const PUBLIC_IMAGE_FALLBACKS = {
  heroOperatory: '/images/hero-dental.jpg',
  receptionLounge: '/images/clinic-reception.jpg',
  equipmentTech: '/images/dental-equipment.jpg',
  consultationCare: '/images/dental-consultation.jpg',
} as const;

/**
 * Resolves any image path, legacy local path (e.g. /src/assets/...),
 * or key into a verified bundled asset URL with an absolute public fallback.
 */
export function resolveClinicImage(
  src?: string,
  defaultKey: keyof typeof CLINIC_IMAGES = 'heroOperatory'
): { primary: string; fallback: string } {
  if (!src || typeof src !== 'string' || src.trim() === '') {
    return {
      primary: CLINIC_IMAGES[defaultKey],
      fallback: PUBLIC_IMAGE_FALLBACKS[defaultKey],
    };
  }

  // Already a valid bundled /assets/ or static /images/ path
  if (src.startsWith('/assets/') || src.startsWith('/images/')) {
    return { primary: src, fallback: PUBLIC_IMAGE_FALLBACKS[defaultKey] };
  }

  // Remote URL or data URI
  if (
    src.startsWith('data:') ||
    src.startsWith('blob:') ||
    src.startsWith('http://') ||
    src.startsWith('https://')
  ) {
    return { primary: src, fallback: PUBLIC_IMAGE_FALLBACKS[defaultKey] };
  }

  // Detect and resolve legacy /src/assets/... paths or keywords
  const lower = src.toLowerCase();
  if (lower.includes('reception') || lower.includes('lounge') || lower.includes('waiting')) {
    return {
      primary: CLINIC_IMAGES.receptionLounge,
      fallback: PUBLIC_IMAGE_FALLBACKS.receptionLounge,
    };
  }
  if (
    lower.includes('equipment') ||
    lower.includes('tech') ||
    lower.includes('scaling') ||
    lower.includes('cleaning') ||
    lower.includes('instrument')
  ) {
    return {
      primary: CLINIC_IMAGES.equipmentTech,
      fallback: PUBLIC_IMAGE_FALLBACKS.equipmentTech,
    };
  }
  if (
    lower.includes('consultation') ||
    lower.includes('care') ||
    lower.includes('checkup') ||
    lower.includes('suite')
  ) {
    return {
      primary: CLINIC_IMAGES.consultationCare,
      fallback: PUBLIC_IMAGE_FALLBACKS.consultationCare,
    };
  }
  if (
    lower.includes('hero') ||
    lower.includes('operatory') ||
    lower.includes('dental') ||
    lower.includes('chair')
  ) {
    return {
      primary: CLINIC_IMAGES.heroOperatory,
      fallback: PUBLIC_IMAGE_FALLBACKS.heroOperatory,
    };
  }

  // If none matched, return primary with fallback
  return {
    primary: src.startsWith('/src/') ? CLINIC_IMAGES[defaultKey] : src,
    fallback: PUBLIC_IMAGE_FALLBACKS[defaultKey],
  };
}

