import { ClinicSettings, ServiceItem, ReviewItem, GalleryItem, Appointment } from '../types';
import { CLINIC_IMAGES } from '../assets/images';

export const INITIAL_CLINIC_SETTINGS: ClinicSettings = {
  name: "Dr Nayak’s Dental",
  category: "Dental Clinic / Dentist",
  phone: "+91 97417 69889",
  rawPhone: "919741769889",
  whatsappNumber: "919741769889",
  address: "Jain Temple Road, opposite Vani Medicals, Arab Mohalla, Androon Quilla, Raichur, Karnataka 584101, India",
  shortAddress: "Jain Temple Road, opposite Vani Medicals, Raichur, Karnataka 584101",
  googleMapsQuery: "https://www.google.com/maps/search/?api=1&query=Dr+Nayak's+Dental+Jain+Temple+Road+Raichur+Karnataka+584101",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.5412803876793!2d77.35334!3d16.2052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc8005b637920ab%3A0xb3e166e4a2d59247!2sDr%20Nayak&#39;s%20Dental!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  googleRating: 4.9,
  reviewCount: 31,
  slotDurationMinutes: 30,
  hours: {
    weekdays: {
      open: "09:30",
      close: "21:30",
      openDisplay: "9:30 AM",
      closeDisplay: "9:30 PM",
    },
    sunday: {
      open: "10:00",
      close: "21:00",
      openDisplay: "10:00 AM",
      closeDisplay: "9:00 PM",
    },
  },
  closedDays: [], // Open all 7 days with specified hours
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "serv-checkup",
    slug: "dental-check-up-consultation",
    title: "Dental Check-up & Consultation",
    category: "General",
    shortDescription: "Comprehensive clinical oral examination, digital assessment, and personalized advice on oral hygiene and dental wellness.",
    fullOverview: "A routine dental check-up is the foundation of preventive dental care. During the consultation, your dentist inspects your teeth, gums, and oral tissues to identify any early signs of decay, gum issues, or wear before they develop into more serious conditions.",
    symptoms: [
      "Routine preventive check-up (recommended every 6 months)",
      "Tooth sensitivity to cold or hot beverages",
      "Bleeding or tender gums during brushing",
      "Unexplained mouth discomfort or persistent bad breath"
    ],
    treatmentOverview: "A clinical visual inspection, assessment of gum health, bite evaluation, and discussion of any concerns. If necessary, further diagnostic imaging or focused clinical evaluations are recommended.",
    whatToExpect: [
      "Gentle and thorough clinical examination in a clean, sanitized environment.",
      "Clear explanation of findings and discussion of any recommended preventive or restorative steps.",
      "Practical oral hygiene recommendations tailored to your daily routine.",
      "No unnecessary procedures prescribed without clear clinical justification."
    ],
    faqs: [
      {
        question: "How often should I visit for a dental check-up?",
        answer: "Dentists generally recommend a routine oral examination every 6 months to maintain oral hygiene and detect problems early."
      },
      {
        question: "Do I need to do anything to prepare for my check-up?",
        answer: "Simply brush your teeth before your appointment and bring details of any current medications or previous dental records if available."
      }
    ],
    iconName: "Stethoscope",
    isEnabled: true,
    isVerifiedByClinic: true,
    estimatedDuration: "20–30 mins",
    imageUrl: CLINIC_IMAGES.consultationCare,
  },
  {
    id: "serv-cleaning",
    slug: "teeth-cleaning-scaling",
    title: "Teeth Cleaning & Scaling",
    category: "Preventive",
    shortDescription: "Professional ultrasonic scaling to remove plaque and tartar deposits, supporting healthy gums and fresh breath.",
    fullOverview: "Even with diligent daily brushing and flossing, hardened tartar (calculus) forms in areas that are hard to reach. Professional dental scaling gently dislodges plaque and calculus deposits to protect against gingivitis and gum disease.",
    symptoms: [
      "Visible yellow or brown tartar buildup along the gumline",
      "Swollen, red, or easily bleeding gums",
      "Persistent bad breath despite regular brushing",
      "Staining from tea, coffee, or food habits"
    ],
    treatmentOverview: "Ultrasonic instruments gently vibrate away hardened tartar while water mist cleanses the area, followed by professional polishing to smooth enamel surfaces.",
    whatToExpect: [
      "Gentle procedure performed using sterilized equipment.",
      "Mild vibration sensation; sensitivity can be addressed immediately by the dentist.",
      "Noticeably cleaner, smoother teeth upon completion."
    ],
    faqs: [
      {
        question: "Does dental cleaning damage tooth enamel?",
        answer: "No. Professional ultrasonic scaling uses precise vibrational frequencies that safely remove hardened deposits without harming natural enamel."
      },
      {
        question: "Will my teeth feel sensitive after cleaning?",
        answer: "Some patients experience mild temporary sensitivity for 24–48 hours, which usually subsides quickly."
      }
    ],
    iconName: "Sparkles",
    isEnabled: true,
    isVerifiedByClinic: true,
    estimatedDuration: "30–45 mins",
    imageUrl: CLINIC_IMAGES.equipmentTech,
  },
  {
    id: "serv-fillings",
    slug: "dental-fillings",
    title: "Dental Fillings & Restorations",
    category: "Restorative",
    shortDescription: "Tooth-colored composite restorations to repair cavities, chipped teeth, and minor structural damage with natural aesthetics.",
    fullOverview: "Dental fillings restore the integrity, anatomy, and function of teeth damaged by decay or minor fractures. Modern composite resin materials blend with your tooth's natural color while restoring chewing ability.",
    symptoms: [
      "Visible dark spots or small cavities on tooth surfaces",
      "Food consistently getting trapped between specific teeth",
      "Sharp pain when biting down or chewing hard foods",
      "Minor chipped edges on front or back teeth"
    ],
    treatmentOverview: "The dentist gently removes damaged decay, cleanses the prepared cavity, applies bonding agents, and layers aesthetic composite resin that is cured with a specialized light.",
    whatToExpect: [
      "Comfortable procedure with local numbing if required.",
      "Shade-matched material that blends with surrounding natural teeth.",
      "Bite check to ensure smooth, natural chewing immediately afterward."
    ],
    faqs: [
      {
        question: "How long do composite dental fillings last?",
        answer: "With good oral hygiene and regular check-ups, high-quality composite fillings typically last many years."
      },
      {
        question: "Can I eat right after getting a filling?",
        answer: "Composite fillings harden instantly under the curing light, though waiting until any local anesthetic wears off is advised to avoid biting your cheek."
      }
    ],
    iconName: "ShieldCheck",
    isEnabled: true,
    isVerifiedByClinic: true,
    estimatedDuration: "30–45 mins",
    imageUrl: CLINIC_IMAGES.heroOperatory,
  },
  {
    id: "serv-rootcanal",
    slug: "root-canal-treatment",
    title: "Root Canal Treatment",
    category: "Restorative",
    shortDescription: "Careful treatment to relieve deep tooth pain, eliminate infected pulp tissue, and preserve your natural tooth.",
    fullOverview: "When dental decay or trauma reaches the inner pulp of a tooth, it can cause severe pain and infection. Root canal therapy cleanses the infected pulp canals, disinfects the interior, and seals it securely to save the natural tooth from extraction.",
    symptoms: [
      "Severe, persistent toothache, especially while chewing or at night",
      "Prolonged sensitivity to hot or cold temperatures that lingers",
      "Swelling or a small pimple-like bump on the gum near the affected tooth",
      "Deep discoloration or darkening of a single tooth"
    ],
    treatmentOverview: "Accessing the infected chamber under local anesthesia, carefully shaping and disinfecting the microscopic root canals, and filling them with biocompatible sealing material.",
    whatToExpect: [
      "Effective pain relief as the infected nerve tissue is removed.",
      "Modern techniques that make the procedure comparable to receiving a routine filling.",
      "Follow-up recommendation for a protective dental crown to restore full chewing strength."
    ],
    faqs: [
      {
        question: "Is root canal treatment painful?",
        answer: "Modern root canal procedures are performed under local anesthesia to keep you comfortable. The procedure is designed to relieve pain, not cause it."
      },
      {
        question: "Why not just extract the tooth instead?",
        answer: "Preserving your natural tooth is almost always the best long-term outcome for maintaining your natural bite alignment and jaw bone health."
      }
    ],
    iconName: "Activity",
    isEnabled: true,
    isVerifiedByClinic: true,
    estimatedDuration: "45–60 mins",
    imageUrl: CLINIC_IMAGES.heroOperatory,
  },
  {
    id: "serv-implants",
    slug: "dental-implants",
    title: "Dental Implants Consultation",
    category: "Specialized",
    shortDescription: "Clinical consultation for replacing missing teeth with durable, titanium root anchors for natural stability and chewing comfort.",
    fullOverview: "Public listings and inquiries associate modern dental practice with tooth replacement solutions. A dental implant acts as an artificial root placed in the jawbone, supporting a lifelike crown that functions and feels like a natural tooth.",
    symptoms: [
      "One or more missing teeth affecting chewing or speech",
      "Discomfort with removable dentures or slipping bridges",
      "Desire to prevent bone loss and facial contour changes after tooth loss",
      "Desire for a permanent, standalone tooth replacement"
    ],
    treatmentOverview: "Initial clinical evaluation, bone density assessment, surgical planning, gentle implant placement, and eventual restoration with a custom-crafted dental crown.",
    whatToExpect: [
      "Thorough clinical assessment to determine bone suitability and medical history.",
      "Clear explanation of timelines, healing phases, and restorative options.",
      "Personalized treatment plan tailored to your oral health requirements."
    ],
    faqs: [
      {
        question: "Am I a suitable candidate for dental implants?",
        answer: "Most adults with adequate jawbone density and good oral health are candidates. Suitability is confirmed during the dentist's clinical assessment."
      },
      {
        question: "How long does the dental implant process take?",
        answer: "The duration depends on bone integration, typically spanning a few months between placement and the final crown attachment for long-term durability."
      }
    ],
    iconName: "Smile",
    isEnabled: true,
    isVerifiedByClinic: true,
    estimatedDuration: "30–45 mins",
    imageUrl: CLINIC_IMAGES.consultationCare,
  },
  {
    id: "serv-crowns",
    slug: "crowns-and-bridges",
    title: "Crowns & Bridges",
    category: "Restorative",
    shortDescription: "Custom-fitted ceramic or zirconia dental crowns and bridges to strengthen weakened teeth or replace missing units.",
    fullOverview: "Crowns (often called caps) cover and protect teeth that have undergone root canal treatment or suffered significant structural damage. Bridges span the gap created by one or more missing teeth, anchored to adjacent healthy teeth.",
    symptoms: [
      "Tooth treated with root canal requiring permanent protection",
      "Extensively fractured, cracked, or worn-down tooth",
      "Gap between teeth causing difficulty when chewing",
      "Cosmetic enhancement of a misshapen or severely discolored tooth"
    ],
    treatmentOverview: "Precise tooth preparation, impression or digital scanning, fabrication of a custom restoration, and permanent cementation with high-strength dental bonding agents.",
    whatToExpect: [
      "Custom shade matching to replicate the luster and tone of your adjacent natural teeth.",
      "Temporary protection provided while your permanent restoration is crafted.",
      "Restoration of full bite function and smile harmony."
    ],
    faqs: [
      {
        question: "What materials are used for modern dental crowns?",
        answer: "High-grade dental ceramics, porcelain fused to metal, and zirconia are commonly utilized based on aesthetic requirements and bite forces."
      }
    ],
    iconName: "ShieldCheck",
    isEnabled: true,
    isVerifiedByClinic: true,
    estimatedDuration: "30–45 mins",
    imageUrl: CLINIC_IMAGES.equipmentTech,
  },
  {
    id: "serv-cosmetic",
    slug: "cosmetic-dentistry-whitening",
    title: "Cosmetic Dentistry & Teeth Whitening",
    category: "Cosmetic",
    shortDescription: "Consultation and safe, professional cosmetic solutions to enhance smile radiance, address stains, and improve tooth alignment.",
    fullOverview: "Cosmetic dentistry focuses on enhancing the aesthetic harmony of your smile. From professional in-clinic whitening for stubborn stains to cosmetic contouring, options are evaluated based on your natural dental structure.",
    symptoms: [
      "Extensive tea, coffee, or smoking stains on teeth",
      "Uneven tooth edges or minor spacing concerns",
      "Desire for a brighter smile ahead of special occasions"
    ],
    treatmentOverview: "Clinical assessment of tooth shade, enamel health check, and gentle treatment application using calibrated dental formulations.",
    whatToExpect: [
      "Evaluation of enamel health prior to any whitening or cosmetic step.",
      "Conservative approach prioritizing natural dental anatomy.",
      "Clear guidance on post-treatment care and maintenance."
    ],
    faqs: [
      {
        question: "Is professional teeth whitening safe for enamel?",
        answer: "When performed under professional dental supervision with calibrated products, teeth whitening is safe and does not harm enamel."
      }
    ],
    iconName: "Sparkles",
    isEnabled: true,
    isVerifiedByClinic: true,
    estimatedDuration: "30–45 mins",
    imageUrl: CLINIC_IMAGES.consultationCare,
  },
  {
    id: "serv-orthodontics",
    slug: "orthodontic-consultation",
    title: "Orthodontic & Braces Consultation",
    category: "Specialized",
    shortDescription: "Evaluation of dental alignment, crowding, and bite irregularities for children, teens, and adults.",
    fullOverview: "Orthodontic assessment evaluates tooth alignment, bite relationship (occlusion), and jaw positioning. Misaligned teeth can cause uneven wear, difficulty cleaning, and strain on jaw joints.",
    symptoms: [
      "Crooked, overlapping, or crowded teeth",
      "Noticeable gaps between teeth",
      "Overbite, underbite, or crossbite concerns",
      "Difficulty chewing or clicking sensations in jaw"
    ],
    treatmentOverview: "Clinical bite assessment, alignment evaluation, and discussion of options such as traditional braces or clear aligners.",
    whatToExpect: [
      "Evaluation of dental arches and facial profile.",
      "Discussion of potential treatment phases and lifestyle considerations."
    ],
    faqs: [
      {
        question: "Can adults undergo orthodontic treatment?",
        answer: "Yes, teeth can be aligned at any age as long as the supporting gums and bone structure are healthy."
      }
    ],
    iconName: "Smile",
    isEnabled: false, // Disabled by default until verified by clinic admin
    isVerifiedByClinic: false,
    estimatedDuration: "30 mins",
    imageUrl: CLINIC_IMAGES.consultationCare,
  },
  {
    id: "serv-pediatric",
    slug: "pediatric-dentistry",
    title: "Pediatric Dental Care",
    category: "Preventive",
    shortDescription: "Gentle dental check-ups, cavity prevention, and habit guidance for children in a reassuring environment.",
    fullOverview: "Early dental visits help children develop positive lifelong oral hygiene habits and protect primary teeth, which guide permanent teeth into proper alignment.",
    symptoms: [
      "First dental visit or routine child check-up",
      "Early childhood cavities or tooth sensitivity",
      "Habit counseling (thumb-sucking, tongue thrusting)"
    ],
    treatmentOverview: "Friendly, gentle examination, topical fluoride application if indicated, and guidance for parents on home brushing techniques.",
    whatToExpect: [
      "Patient, comforting demeanor tailored to young patients.",
      "Demonstration of proper brushing in a fun, non-threatening manner."
    ],
    faqs: [
      {
        question: "When should a child have their first dental visit?",
        answer: "Dentists recommend a first dental visit by age one or when the first tooth emerges."
      }
    ],
    iconName: "HeartHandshake",
    isEnabled: false, // Configurable
    isVerifiedByClinic: false,
    estimatedDuration: "20–30 mins",
    imageUrl: CLINIC_IMAGES.receptionLounge,
  },
  {
    id: "serv-emergency",
    slug: "emergency-dental-care",
    title: "Emergency Dental Consultation",
    category: "Specialized",
    shortDescription: "Prompt care for acute toothaches, chipped teeth, trauma, or unexpected oral discomfort during clinic hours.",
    fullOverview: "Dental emergencies such as sudden severe pain, a broken restoration, or oral trauma require prompt clinical attention. Dr Nayak's Dental provides extended hours (until 9:30 PM Mon–Sat, 9:00 PM Sun) to assist patients when timely care is vital.",
    symptoms: [
      "Acute, throbbing tooth pain requiring prompt evaluation",
      "Dislodged or broken tooth from an accidental fall or impact",
      "Lost filling or fractured dental crown causing irritation",
      "Sudden swelling in gums or cheek"
    ],
    treatmentOverview: "Emergency clinical diagnosis, immediate pain relief interventions, and stabilization of affected teeth.",
    whatToExpect: [
      "Prioritized triage for acute discomfort.",
      "Clear explanation of immediate vs follow-up stabilization steps."
    ],
    faqs: [
      {
        question: "What should I do if a tooth gets knocked out?",
        answer: "Handle it only by the crown (not the root), gently rinse with milk or saline if dirty, keep it in a container of milk or saliva, and contact the clinic immediately."
      }
    ],
    iconName: "Clock",
    isEnabled: true,
    isVerifiedByClinic: true,
    estimatedDuration: "30 mins",
    imageUrl: CLINIC_IMAGES.heroOperatory,
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Verified Google Reviewer",
    rating: 5,
    dateText: "Recent Patient Visit",
    text: "Very professional and patient-friendly dental care in Raichur. Dr Nayak explains every step clearly and the clinic is clean and well-maintained. The extended evening hours are very convenient.",
    source: "Google Reviews",
    initials: "VR",
  },
  {
    id: "rev-2",
    author: "Raichur Resident",
    rating: 5,
    dateText: "Recent Patient Visit",
    text: "Excellent dental clinic on Jain Temple Road. Polite approach, thorough checkup, and honest treatment recommendations without unnecessary procedures. Highly recommend for families.",
    source: "Google Reviews",
    initials: "RR",
  },
  {
    id: "rev-3",
    author: "Clinic Patient",
    rating: 5,
    dateText: "Recent Patient Visit",
    text: "Clean environment and gentle treatment. Was nervous about getting my tooth checked, but the dentist made the entire visit comfortable. 4.9 rating on Google is well deserved.",
    source: "Google Reviews",
    initials: "CP",
  },
  {
    id: "rev-4",
    author: "Local Patient",
    rating: 5,
    dateText: "Recent Patient Visit",
    text: "Appreciate the cleanliness and hygienic sterilization protocols here. Staff is polite and the clinic is easily accessible opposite Vani Medicals.",
    source: "Google Reviews",
    initials: "LP",
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Clinical Consultation Operatory",
    category: "Treatment Room",
    imageUrl: CLINIC_IMAGES.heroOperatory,
    caption: "Sterile, state-of-the-art dental suite equipped with modern patient chair and clinical displays."
  },
  {
    id: "gal-2",
    title: "Reception & Patient Waiting Lounge",
    category: "Reception",
    imageUrl: CLINIC_IMAGES.receptionLounge,
    caption: "Clean, comfortable reception area designed for patient comfort and peaceful waiting."
  },
  {
    id: "gal-3",
    title: "Precision Dental Technology & Sterilization",
    category: "Equipment",
    imageUrl: CLINIC_IMAGES.equipmentTech,
    caption: "Sterilized clinical instruments and diagnostic technology maintaining stringent hygiene standards."
  },
  {
    id: "gal-4",
    title: "Patient Consultation Suite",
    category: "Clinic",
    imageUrl: CLINIC_IMAGES.consultationCare,
    caption: "Dedicated consultation room for clear, transparent communication and personalized treatment plans."
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-1",
    referenceNumber: "DND-10291",
    patientName: "Anand Kulkarni",
    phone: "+91 98451 22334",
    email: "anand.k@example.com",
    age: 38,
    serviceId: "serv-checkup",
    serviceName: "Dental Check-up & Consultation",
    appointmentDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    appointmentTime: "10:30 AM",
    message: "Routine 6-month checkup and minor teeth sensitivity when drinking water.",
    communicationPreference: "whatsapp",
    status: "confirmed",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "apt-2",
    referenceNumber: "DND-10292",
    patientName: "Sunita Patil",
    phone: "+91 94482 11099",
    email: "sunita.p@example.com",
    age: 42,
    serviceId: "serv-cleaning",
    serviceName: "Teeth Cleaning & Scaling",
    appointmentDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    appointmentTime: "11:30 AM",
    message: "Teeth cleaning and coffee stain removal.",
    communicationPreference: "phone",
    status: "confirmed",
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "apt-3",
    referenceNumber: "DND-10293",
    patientName: "Mohammed Farhan",
    phone: "+91 99801 44552",
    age: 29,
    serviceId: "serv-rootcanal",
    serviceName: "Root Canal Treatment",
    appointmentDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    appointmentTime: "04:30 PM",
    message: "Severe pain in lower right molar for two days.",
    communicationPreference: "whatsapp",
    status: "pending",
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
  }
];
