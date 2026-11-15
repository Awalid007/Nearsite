/**
 * Homepage content for Nearsite.
 * Everything marked  [PLACEHOLDER]  is meant to be replaced with real info.
 * (Blog posts and legal text still live in siteData.ts.)
 */

/* ------------------------------------------------------------------ */
/* Contact details shown in the CTA + footer                           */
/* ------------------------------------------------------------------ */
export const CONTACT = {
  /** [PLACEHOLDER] Leave '' to hide the phone number everywhere. */
  phone: '',
  /** [PLACEHOLDER] Confirm this is the address you want shown publicly. */
  email: 'Nearsiteahmad@gmail.com',
  /** [PLACEHOLDER] Add your social links; empty ones are hidden. */
  socials: {
    instagram: '',
    facebook: '',
    linkedin: '',
  },
};

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */
export const NAV_LINKS = [
  { label: 'Services', id: 'services' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'Our Work', id: 'work' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'FAQ', id: 'faq' },
];

/* ------------------------------------------------------------------ */
/* Trust bar  [PLACEHOLDER]                                            */
/* ------------------------------------------------------------------ */
export const TRUST_STATS = [
  { value: '20+', label: 'local sites launched' }, // [PLACEHOLDER] use your real number
  { value: '2 wks', label: 'typical time to launch' },
  { value: '5.0★', label: 'average client rating' }, // [PLACEHOLDER] use your real rating
];

/**
 * Client logos. Add a `src` (e.g. '/logos/acme-roofing.svg' placed in /public/logos)
 * and the logo shows up automatically; without `src` a neutral placeholder is shown.
 */
export const TRUST_LOGOS: { name: string; src?: string }[] = [
  { name: 'Client Logo One' },
  { name: 'Client Logo Two' },
  { name: 'Client Logo Three' },
  { name: 'Client Logo Four' },
  { name: 'Client Logo Five' },
  { name: 'Client Logo Six' },
];

export const TRADES = [
  'Roofers',
  'HVAC',
  'Plumbers',
  'Landscapers',
  'Salons & Barbers',
  'Electricians',
  'Cleaners',
  'Contractors',
];

/* ------------------------------------------------------------------ */
/* Problem / solution                                                  */
/* ------------------------------------------------------------------ */
export const PROBLEMS = [
  'Looks outdated, so people call the competitor who looks more professional',
  'Hard to use on a phone, where most local customers search',
  'Slow to load, so visitors leave before they ever see your number',
  'No way to book online, so after-hours customers move on',
  'Missed calls and form fills go unanswered for hours (or days)',
  'Happy customers never leave reviews, so you rank below the guys with more stars',
];

export const SOLUTIONS = [
  'A clean, modern site that makes you look like the obvious choice',
  'Designed phone-first, with tap-to-call right where people need it',
  'Fast on every connection, so visitors stay and take action',
  'Online booking that fills your calendar 24/7',
  'Instant text or email back to every lead and missed call',
  'Automatic review requests after every job that build your Google rating',
];

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */
export interface Service {
  id: string;
  icon: 'Layout' | 'CalendarCheck' | 'MessageSquareReply' | 'Star' | 'Bot';
  title: string;
  outcome: string;
  description: string;
  plan: string;
  wide?: boolean;
}

export const SERVICES: Service[] = [
  {
    id: 'website',
    icon: 'Layout',
    title: 'Website Design',
    outcome: 'Look credible. Get found. Get the call.',
    description:
      'A custom, phone-first website built around one goal: turning local searchers into customers. Clear services, real photos, click-to-call buttons and local SEO built in.',
    plan: 'In every plan',
    wide: true,
  },
  {
    id: 'booking',
    icon: 'CalendarCheck',
    title: 'Online Booking',
    outcome: 'Fill your calendar while you sleep.',
    description:
      'Let customers pick a time that works for them, any hour of the day, without playing phone tag.',
    plan: 'Get More Calls & up',
  },
  {
    id: 'followup',
    icon: 'MessageSquareReply',
    title: 'Instant Lead Follow-Up',
    outcome: 'Be first to reply, every time.',
    description:
      'Every new lead and missed call gets an instant text or email from you, so they don’t move on to the next name on Google.',
    plan: 'Get More Calls & up',
  },
  {
    id: 'reviews',
    icon: 'Star',
    title: 'Automatic Review Requests',
    outcome: 'Turn happy customers into 5-star reviews.',
    description:
      'After each job, customers get a friendly nudge with a one-tap link to review you on Google. More stars means more trust and more calls.',
    plan: 'Get More Calls & up',
  },
  {
    id: 'assistant',
    icon: 'Bot',
    title: 'AI Voice & Chat Assistant',
    outcome: 'Answer every question, even after hours.',
    description:
      'An assistant that answers common questions, collects job details and books appointments by chat or voice, plus discount offers that bring new customers in the door.',
    plan: 'Full Customer System',
  },
];

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */
export interface Tier {
  id: string;
  name: string;
  tagline: string;
  build: string;
  monthly: string;
  popular?: boolean;
  includesLabel?: string;
  features: string[];
}

export const TIERS: Tier[] = [
  {
    id: 'starter',
    name: 'Starter Site',
    tagline: 'A professional website that finally does your business justice.',
    build: '$750 – $1,200',
    monthly: '$79 – $99',
    features: [
      'Custom, mobile-first website design',
      'Tap-to-call buttons and contact form',
      'Local SEO setup so you can be found on Google',
      'Fast, secure hosting',
      'Ongoing updates and support',
    ],
  },
  {
    id: 'calls',
    name: 'Get More Calls',
    tagline: 'A website plus the tools that turn visitors into booked jobs.',
    build: '$1,500 – $2,500',
    monthly: '$149 – $249',
    popular: true,
    includesLabel: 'Everything in Starter Site, plus:',
    features: [
      'Online booking, 24/7',
      'Instant follow-up to every lead and missed call',
      'Automatic Google review requests',
    ],
  },
  {
    id: 'full',
    name: 'Full Customer System',
    tagline: 'The complete system that works for you around the clock.',
    build: '$2,500 – $4,000',
    monthly: '$299 – $449',
    includesLabel: 'Everything in Get More Calls, plus:',
    features: ['AI voice and chat assistant', 'Discount offers that bring in new customers'],
  },
];

/* ------------------------------------------------------------------ */
/* Portfolio / before & after  [PLACEHOLDER]                           */
/* ------------------------------------------------------------------ */
export interface WorkExample {
  id: string;
  trade: string;
  client: string; // [PLACEHOLDER]
  summary: string; // [PLACEHOLDER]
  result: string; // [PLACEHOLDER] a real result you can stand behind
  /** Drop screenshots in /public/work and set the paths to replace the sketches. */
  beforeSrc?: string;
  afterSrc?: string;
}

export const WORK: WorkExample[] = [
  {
    id: 'roofing',
    trade: 'Roofing',
    client: '[Roofing Company Name]',
    summary: 'From a slow, hard-to-read page to a site built around “Get a free estimate.”',
    result: '[+XX% more calls in 60 days]',
  },
  {
    id: 'hvac',
    trade: 'HVAC',
    client: '[HVAC Company Name]',
    summary: 'Emergency service front and center, with booking and instant lead follow-up.',
    result: '[XX more booked jobs per month]',
  },
  {
    id: 'salon',
    trade: 'Salon',
    client: '[Salon Name]',
    summary: 'A dated brochure site became an online booking machine.',
    result: '[+XX% online bookings]',
  },
];

/* ------------------------------------------------------------------ */
/* How it works                                                        */
/* ------------------------------------------------------------------ */
export const STEPS = [
  {
    title: 'Tell us about your business',
    description:
      'Fill out the quick form below. It takes about a minute, and there’s nothing to pay.',
    tag: 'Takes 1 minute',
  },
  {
    title: 'See your free mockup',
    description:
      'We design a mockup of your new website so you can see exactly what you’d get before you commit to anything.',
    tag: 'Free, no obligation',
  },
  {
    title: 'We build and connect everything',
    description:
      'Love it? We build your site and set up booking, instant follow-up and review requests, then test it on every device.',
    tag: 'Live in as little as 2 weeks',
  },
  {
    title: 'Launch and grow',
    description:
      'Your site goes live and starts working for you. We stay on to keep it fast, secure and up to date.',
    tag: 'Ongoing support',
  },
];

/* ------------------------------------------------------------------ */
/* Testimonials  [PLACEHOLDER: replace each with a real customer quote] */
/* ------------------------------------------------------------------ */
export const TESTIMONIALS = [
  {
    quote:
      '[Replace with a real quote about getting more calls. Example: “Our phone started ringing the week the new site went live.”]',
    name: '[Owner Name]',
    role: '[Business Name], [City]',
    result: '[+XX% calls]',
  },
  {
    quote:
      '[Replace with a real quote about booking or follow-up. Example: “I used to lose jobs to missed calls. Now every lead gets a reply in seconds.”]',
    name: '[Owner Name]',
    role: '[Business Name], [City]',
    result: '[XX new bookings]',
  },
  {
    quote:
      '[Replace with a real quote about reviews. Example: “We went from a handful of reviews to dozens without asking anyone ourselves.”]',
    name: '[Owner Name]',
    role: '[Business Name], [City]',
    result: '[XX new 5★ reviews]',
  },
];

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */
export const FAQS = [
  {
    q: 'What is the free mockup?',
    a: 'It’s a design preview of what your new website would look like, made for your business. It’s free, and there’s no obligation to move forward. You see it first, then decide.',
  },
  {
    q: 'How long does it take to get my website?',
    a: 'Most projects go live in 1–2 weeks once you approve the design. Larger sites can take up to 3 weeks, and we’ll give you a clear timeline before we start.',
  },
  {
    q: 'What does the monthly fee cover?',
    a: 'The monthly plan keeps your site and your tools running: hosting, security, updates and support, plus the booking, follow-up, review and assistant features that come with your plan.',
  },
  {
    q: 'What is “instant lead follow-up”?',
    a: 'When someone fills out your form or calls and you can’t pick up, they automatically get a friendly text or email from your business right away. Customers hire whoever replies first, and this makes that you.',
  },
  {
    q: 'How do automatic review requests work?',
    a: 'After a job, your customer gets a short message with a one-tap link to leave you a Google review. More reviews help you stand out in local search.',
  },
  {
    q: 'What can the AI voice and chat assistant do?',
    a: 'It answers common questions about your services, hours and pricing, collects job details from new customers and can help book appointments, even when you’re on a roof or asleep.',
  },
  {
    q: 'Can I start small and add features later?',
    a: 'Yes. Many owners start with the Starter Site and upgrade to booking, follow-up and the assistant when they’re ready.',
  },
  {
    q: 'Do I need to provide anything?',
    a: 'Just your logo if you have one, a few photos and a rough idea of what you offer. We handle the rest.',
  },
];

/* ------------------------------------------------------------------ */
/* Lead form options                                                   */
/* ------------------------------------------------------------------ */
export const PLAN_OPTIONS = [
  'Not sure yet',
  'Starter Site',
  'Get More Calls',
  'Full Customer System',
];

export const TRADE_OPTIONS = [
  'Roofing',
  'HVAC',
  'Plumbing',
  'Landscaping',
  'Salon / Barber',
  'Electrical',
  'Cleaning',
  'General contractor',
  'Other',
];
