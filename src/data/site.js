// Every piece of personal info used across the site lives here.
export const SITE = {
  first: 'Sakshaat',
  last: 'Raut',
  name: 'Sakshaat Raut',
  role: 'AI & Machine Learning Engineer',
  location: 'United States',
  timeZone: 'America/New_York',
  email: 'sash.raut10@gmail.com',
  phone: '+1 (227) 275-1236',
  phoneHref: 'tel:+12272751236',
  linkedin: 'https://www.linkedin.com/in/sakshaatraut/',
  github: 'https://github.com/SakshaatRaut',
  resume: '/assets/Sakshaat-Raut-Resume.pdf',
  // After you confirm FormSubmit's activation email, you can paste the random alias it gives you here
  // (e.g. 'a1b2c3d4...') so your address isn't in the site's code. Left empty, it uses `email`.
  formEmail: '',
  initials: 'SR',
  // To show a photo in the hero again, put a transparent PNG cutout in public/assets and set its path here,
  // e.g. '/assets/hero-cutout.png'. Left as null, the hero shows the SR monogram.
  photo: null,
};

export const NAV = [
  { path: '/work', label: 'Work' },
  { path: '/about', label: 'About' },
  { path: '/research', label: 'Research' },
  { path: '/life-beyond', label: 'Life Beyond' },
  { path: '/contact', label: 'Contact' },
];

export const SOCIALS = [
  { label: 'LinkedIn', href: SITE.linkedin, external: true },
  { label: 'GitHub', href: SITE.github, external: true },
  { label: 'Resume', href: SITE.resume, external: true },
  { label: 'Email', href: `mailto:${SITE.email}` },
];

export const SERVICES = [
  {
    title: 'Machine Learning',
    text: 'Predictive models, deep learning and computer vision, from data collection and annotation to training, evaluation and real-time inference on GPUs.',
  },
  {
    title: 'LLMs & GenAI',
    text: 'Retrieval-augmented generation, prompt tuning, query rewriting and custom embeddings, plus the optimization work that makes retrieval measurably better.',
  },
  {
    title: 'The full package',
    text: 'End-to-end AI products: FastAPI and Django backends, Next.js and TypeScript interfaces, Docker, Kubernetes and AWS to ship them.',
  },
];

export const EXPERIENCE = [
  {
    role: 'Software Development Engineer Intern',
    org: 'Ssingularity Technologies',
    where: 'Thane, India',
    when: 'Jan 2025 — May 2025',
    points: [
      'Built an AI privacy-policy automation platform on OpenAI APIs, processing 15 policy requests a week in beta with 2-minute generation.',
      'Designed a Next.js and TypeScript conversational interface handling 15+ parameters for GDPR-compliant documents.',
      'Added a rule-based compliance engine that improved policy accuracy by 18% across jurisdictions.',
    ],
  },
  {
    role: 'AI/ML Engineer Intern',
    org: 'Infomatica Tech Solutions',
    where: 'Pune, India · Remote',
    when: 'Jun 2024 — Aug 2024',
    points: [
      'Built a Django RAG chatbot with LLMs that automated about 60% of customer queries.',
      'Raised answer accuracy by 21% through prompt tuning, query rewriting and custom embeddings.',
      'Integrated OpenAI APIs with authentication and logging, cutting response latency by 30%.',
    ],
  },
  {
    role: 'Software Developer Intern',
    org: 'K.J. Somaiya College of Engineering',
    where: 'Mumbai, India',
    when: 'Aug 2023 — Apr 2024',
    points: [
      'Built real-time drone object detection with YOLOv8 and OpenCV at under 120 ms latency.',
      'Curated and annotated 10,000+ drone images, improving model precision by 38%.',
      'Ran autonomous flight simulations in Mission Planner with path planning and geofencing.',
    ],
  },
];

export const EDUCATION = [
  { label: 'Masters', degree: 'MS in Applied Machine Learning', school: 'University of Maryland, College Park (2025 — 2027) · GPA 4.0' },
  { label: 'Bachelors', degree: 'BTech in Information Technology', school: 'K.J. Somaiya College of Engineering, Mumbai (2021 — 2025) · GPA 3.8' },
];

export const SKILLS = [
  'Python', 'PyTorch', 'TensorFlow', 'scikit-learn', 'OpenCV', 'YOLOv8', 'Hugging Face', 'LLMs', 'RAG',
  'C / C++', 'TypeScript', 'SQL', 'FastAPI', 'Docker', 'Kubernetes', 'AWS', 'PostgreSQL', 'MongoDB',
];
