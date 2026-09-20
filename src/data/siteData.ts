import { ServiceItem, ProcessStep, WhyUsBenefit, Testimonial, PricingPlan, FAQItem, PortfolioCase } from '../types';

export const TRUST_BADGES = [
  'Local business specialists',
  'Mobile-first design',
  'Live in 2 weeks',
];

export const TRUSTED_CLIENTS = [
  {
    name: "Joe's Plumbing",
    industry: 'Plumbing & Emergency Services',
    icon: 'Wrench',
    tag: 'Trades & Home Services',
    quoteSnip: 'Phone hasn’t stopped ringing',
  },
  {
    name: 'Verde Kitchen',
    industry: 'Modern Farm-to-Table Bistro',
    icon: 'UtensilsCrossed',
    tag: 'Restaurant & Dining',
    quoteSnip: 'Online reservations surged 2.4x',
  },
  {
    name: 'FitLocal Gym',
    industry: 'Neighborhood Strength & Cross Training',
    icon: 'Dumbbell',
    tag: 'Health & Fitness',
    quoteSnip: 'Ranked #1 for local fitness search',
  },
  {
    name: 'Bloom Hair Studio',
    industry: 'Boutique Hair & Color Salon',
    icon: 'Scissors',
    tag: 'Beauty & Wellness',
    quoteSnip: 'Client calendar booked out 4 weeks',
  },
  {
    name: 'PrimeRealty',
    industry: 'Residential Real Estate Agency',
    icon: 'Building2',
    tag: 'Real Estate & Properties',
    quoteSnip: 'Inquiries increased 85% in month one',
  },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'service-1',
    title: 'Custom Website Design',
    tagline: 'Service 1',
    description:
      'We design modern, mobile-friendly websites that reflect your brand and convert visitors into customers. No templates. No cookie-cutter layouts.',
    features: ['Custom design', 'Mobile-first', 'Fast load times'],
    icon: 'Palette',
  },
  {
    id: 'service-2',
    title: 'Web Development',
    tagline: 'Service 2',
    description:
      "Clean, reliable code built to last. Your site will be fast, secure, and easy to update — whether it's a simple brochure site or a full booking system.",
    features: ['Fast & secure', 'Easy to manage', 'Built to scale'],
    icon: 'Code2',
  },
  {
    id: 'service-3',
    title: 'Local SEO Setup',
    tagline: 'Service 3',
    description:
      'We make sure Google knows you exist. Every site we build is optimized so local customers can find you when it matters most.',
    features: ['Google-ready', 'Local SEO built-in', 'More organic traffic'],
    icon: 'MapPinCheck',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    timeframe: 'Week 1: Discovery Call',
    title: 'Discovery Call',
    description:
      'We learn everything about your business, your goals, and your customers. No fluff — just a focused conversation so we can hit the ground running.',
    checkpoints: [
      'Business goals audit',
      'Competitor review',
      'Website plan & sitemap',
    ],
    iconName: 'PhoneCall',
  },
  {
    step: 2,
    timeframe: 'Week 1–2: Design',
    title: 'Design',
    description:
      "We create a custom design mockup tailored to your brand. You review it, give feedback, and we refine until it's perfect.",
    checkpoints: [
      'Custom design mockup',
      'Brand color & font match',
      '2 rounds of revisions',
    ],
    iconName: 'LayoutTemplate',
  },
  {
    step: 3,
    timeframe: 'Week 2: Build & Test',
    title: 'Build & Test',
    description:
      'We build your site and test it across all devices and browsers. Speed, security, and mobile experience are all locked in before launch.',
    checkpoints: [
      'Cross-device testing',
      'Speed optimization',
      'Contact forms & integrations',
    ],
    iconName: 'Cpu',
  },
  {
    step: 4,
    timeframe: 'Launch & Support',
    title: 'Launch & Support',
    description:
      "We go live and make sure everything runs smoothly. After launch, we're still here if you need updates or support.",
    checkpoints: [
      'Smooth launch',
      'Google Analytics setup',
      '30-day post-launch support',
    ],
    iconName: 'Rocket',
  },
];

export const WHY_US_BENEFITS: WhyUsBenefit[] = [
  {
    id: 'benefit-1',
    title: 'We speak your language',
    description:
      'No tech jargon. No confusing reports. We explain everything clearly and keep you in the loop from day one.',
    iconName: 'MessageSquareText',
    highlight: 'Clear communication',
  },
  {
    id: 'benefit-2',
    title: 'Fast turnaround',
    description:
      'Most agencies take months. We deliver professional websites in as little as 2 weeks, so you can start winning customers sooner.',
    iconName: 'Zap',
    highlight: '2-week delivery',
  },
  {
    id: 'benefit-3',
    title: 'Affordable pricing',
    description:
      'Premium design without the premium agency price tag. We work with local business budgets and offer flexible payment options.',
    iconName: 'PiggyBank',
    highlight: 'Fixed, fair rates',
  },
  {
    id: 'benefit-4',
    title: 'Built to get you found',
    description:
      'Every site we build is SEO-ready from day one, so local customers can find you on Google without extra cost.',
    iconName: 'SearchCheck',
    highlight: 'Rank locally',
  },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    quote:
      "Nearsite built us a website in under 2 weeks and our phone hasn't stopped ringing since. Best investment we've made.",
    author: 'Maria S.',
    role: 'Owner',
    business: 'Bloom Hair Studio',
    industry: 'Salon & Spa',
    rating: 5,
    metric: '4x monthly online bookings',
    avatarColor: 'from-pink-500 to-rose-400',
  },
  {
    id: 'test-2',
    quote:
      'We were invisible online before Nearsite. Now we show up on Google and get new customers every week.',
    author: 'James T.',
    role: 'Owner',
    business: 'FitLocal Gym',
    industry: 'Fitness & Wellness',
    rating: 5,
    metric: '#1 Google ranking in town',
    avatarColor: 'from-blue-600 to-cyan-500',
  },
  {
    id: 'test-3',
    quote:
      'Professional, fast, and actually affordable. I wish I found them sooner.',
    author: 'David R.',
    role: 'Owner',
    business: 'PrimeRealty',
    industry: 'Real Estate',
    rating: 5,
    metric: '+85% qualified seller leads',
    avatarColor: 'from-emerald-600 to-teal-400',
  },
  {
    id: 'test-4',
    quote:
      'They made the whole process so easy. I had no idea what I needed — they figured it out for me.',
    author: 'Priya K.',
    role: 'Owner',
    business: 'Verde Kitchen',
    industry: 'Restaurant & Dining',
    rating: 5,
    metric: 'Doubled weekend reservations',
    avatarColor: 'from-amber-500 to-yellow-400',
  },
  {
    id: 'test-5',
    quote:
      'Our old website was embarrassing. The new one actually makes us look like the pros we are.',
    author: 'Carlos M.',
    role: 'Owner',
    business: "Joe's Plumbing",
    industry: 'Home Services & Plumbing',
    rating: 5,
    metric: 'Emergency dispatch calls +120%',
    avatarColor: 'from-sky-600 to-indigo-500',
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$799',
    period: 'one-time',
    description: 'Perfect for new businesses getting online',
    features: [
      '3-page custom website (Home, About, Contact)',
      'Mobile-friendly design',
      'Contact form',
      'Basic SEO setup',
      '30-day support',
    ],
    ctaText: 'Get Started',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$1,499',
    period: 'one-time',
    popular: true,
    badge: '⭐ Most Popular',
    description: 'For businesses ready to grow online',
    features: [
      'Up to 6 custom pages',
      'Mobile-first design',
      'Contact form + booking integration',
      'Full local SEO setup',
      'Google Analytics',
      '60-day support',
    ],
    ctaText: 'Get Started',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$2,499',
    period: 'one-time',
    description: 'For established businesses that want it all',
    features: [
      'Up to 10 custom pages',
      'Premium custom design',
      'E-commerce or booking system',
      'Advanced SEO',
      'Speed & performance optimization',
      '90-day priority support',
    ],
    ctaText: 'Book a Call',
  },
];

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How long does it take to build my website?',
    answer:
      "Most projects are completed in 1–2 weeks. Larger or more complex sites may take up to 3 weeks. We'll give you a clear timeline before we start.",
  },
  {
    id: 'faq-2',
    question: 'Do I need to provide anything?',
    answer:
      'Just your logo (or we can help you get one), some photos, and a rough idea of what you need. We handle everything else.',
  },
  {
    id: 'faq-3',
    question: 'Will my website work on phones?',
    answer:
      'Absolutely. Every site we build is designed mobile-first, so it looks great on any device.',
  },
  {
    id: 'faq-4',
    question: 'Can I update the site myself after launch?',
    answer:
      'Yes. We build on user-friendly platforms so you can make simple updates yourself, or we can handle it for you.',
  },
  {
    id: 'faq-5',
    question: 'Do you offer payment plans?',
    answer:
      'Yes! We offer 50% upfront and 50% on launch, and can discuss other arrangements for larger projects.',
  },
  {
    id: 'faq-6',
    question: "What if I'm not happy with the design?",
    answer:
      "Every package includes revision rounds. We work with you until you love it — that's our guarantee.",
  },
];

export const PORTFOLIO_CASES: PortfolioCase[] = [
  {
    id: 'bloom',
    businessName: 'Bloom Hair Studio',
    industry: 'Boutique Hair & Color Salon',
    headline: 'High-end appointment booking with Instagram showcase integration',
    results: '+135% booking rate, 99 Mobile Speed Score',
    features: ['Direct Calendar Sync', 'Stylist Portfolios', 'Google Local Reviews Widget'],
    color: 'border-rose-200 bg-rose-50/50',
    badge: 'Salon',
    rating: 5,
  },
  {
    id: 'verde',
    businessName: 'Verde Kitchen',
    industry: 'Farm-to-Table Restaurant & Bar',
    headline: 'Mouthwatering menu presentation and OpenTable reservation routing',
    results: '2.4x online dinner reservations in 30 days',
    features: ['Mobile Interactive Menu', 'Catering Request System', 'One-Tap Directions'],
    color: 'border-emerald-200 bg-emerald-50/50',
    badge: 'Restaurant',
    rating: 5,
  },
  {
    id: 'plumbing',
    businessName: "Joe's Plumbing & Drain",
    industry: 'Residential & Commercial Trades',
    headline: 'Instant emergency dispatch calling and transparent pricing guides',
    results: '120% more incoming phone calls from local Google search',
    features: ['24/7 Emergency Call Bar', 'Zip-Code Service Area Checker', 'Instant Quote Form'],
    color: 'border-sky-200 bg-sky-50/50',
    badge: 'Home Services',
    rating: 5,
  },
  {
    id: 'fitlocal',
    businessName: 'FitLocal Strength & Conditioning',
    industry: 'Neighborhood Gym & Fitness Center',
    headline: 'Free trial class pass signup funnel with interactive class schedule',
    results: 'Ranked #1 on Google Maps for local area within 3 weeks',
    features: ['Class Schedule Viewer', 'Member Pass Funnel', 'Virtual Gym Tour'],
    color: 'border-amber-200 bg-amber-50/50',
    badge: 'Fitness',
    rating: 5,
  },
  {
    id: 'prime',
    businessName: 'PrimeRealty Partners',
    industry: 'Boutique Real Estate Agency',
    headline: 'Clean neighborhood property listings with automated MLS inquiry routing',
    results: 'Zero lost leads, 85% increase in home valuation requests',
    features: ['Featured Listings Grid', 'Instant Home Value Estimator', 'Agent Direct Chat'],
    color: 'border-indigo-200 bg-indigo-50/50',
    badge: 'Real Estate',
    rating: 5,
  },
];

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  featured?: boolean;
  content: string[];
  takeaways: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: '5 Local SEO Fixes That Bring Walk-In Customers This Weekend',
    excerpt:
      'Most local small businesses miss out on high-intent searchers because of three common Google Business Profile mistakes. Here is how to fix them in 20 minutes.',
    date: 'Sep 12, 2026',
    readTime: '4 min read',
    category: 'Local SEO',
    author: {
      name: 'Ahmad',
      role: 'Founder of Nearsite',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    },
    featured: true,
    content: [
      'If someone in Stafford, Fredericksburg, or your hometown searches "emergency plumber near me" or "best salon near me", Google looks for 3 immediate signals: proximity, review velocity, and page relevance.',
      'Most business owners set up their Google Business profile once in 2018 and haven’t touched it since. Here are the 5 highest-leverage fixes you can make in under half an hour:',
      '1. Exact Primary Category Matching: Do not select general "Contractor" if you are an "HVAC Contractor" or "Plumber". Google’s search index weights your primary category above all other keyword tags.',
      '2. Consistent NAP (Name, Address, Phone): Ensure the exact suite number, phone format, and business name match word-for-word on your website header, footer, and Google listing.',
      '3. High-Resolution Geotagged Photos: Upload fresh photos of your team, work van, storefront, and completed projects. Google rewards listings with active monthly photo contributions with 42% higher click-throughs.',
      '4. Local Schema Markup on Your Website: Embed JSON-LD structured data on your website so Google crawlers read your service radius, opening hours, and accepted payment methods with zero ambiguity.',
      '5. Active Review Reply System: Replying to every review (both 5-star praise and feedback) signals to Google algorithms that your business is responsive and dependable.'
    ],
    takeaways: [
      'Audit your primary Google Business category today.',
      'Standardize your business address down to the suite number across all profiles.',
      'Embed LocalBusiness structured schema markup directly in your website code.',
      'Commit to requesting reviews from every happy customer via direct SMS link.'
    ]
  },
  {
    id: 'blog-2',
    title: 'Why Slow Websites Kill High-Value Service Bookings on Mobile',
    excerpt:
      'If your mobile site takes more than 3 seconds to load, over 53% of local customers hit back and call your closest competitor. How we achieve sub-second load times.',
    date: 'Aug 29, 2026',
    readTime: '5 min read',
    category: 'Web Performance',
    author: {
      name: 'Ahmad',
      role: 'Founder of Nearsite',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    },
    content: [
      'When a homeowner has water leaking through their drywall, they pull out their phone, tap the first sponsored or map result, and expect the page to load instantaneously.',
      'Every 1-second delay in page load time reduces mobile conversion rates by 7%. For a local service company doing $30,000/month in billable jobs, a slow WordPress site bloated with 35 conflicting plugins is costing thousands in missed inquiries.',
      'Why modern sites outshine bloated templates:',
      '• Zero Plugin Bloat: Clean, hand-crafted code with modern bundling loads in under 400 milliseconds, compared to 4-7 seconds for outdated builders.',
      '• Next-Gen Image Compression: Converting heavy 5MB camera photos to optimized WebP/AVIF formats reduces download size by 85% while keeping retina sharpness.',
      '• Instant Tap-to-Call Buttons: Sticky mobile action bars that allow callers to tap once and ring your dispatch phone without zooming or hunting through navigation menus.'
    ],
    takeaways: [
      'Test your mobile site on 4G cellular connections, not office Wi-Fi.',
      'Compress all images before uploading or use automated next-gen format conversion.',
      'Implement an unmissable sticky "Call Now" or "Book Online" button on mobile screens.'
    ]
  },
  {
    id: 'blog-3',
    title: 'The "Anti-Agency" Approach: How We Launch in Just 2 Weeks',
    excerpt:
      'Why take 4 months to launch a website when your business needs customers today? A behind-the-scenes look at our streamlined 4-step local build sprint.',
    date: 'Aug 14, 2026',
    readTime: '3 min read',
    category: 'Process',
    author: {
      name: 'Ahmad',
      role: 'Founder of Nearsite',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    },
    content: [
      'Traditional web design agencies love long billing cycles. They conduct endless committee meetings, submit 50-page strategy decks, and spend months designing wireframes that look like every other corporate template.',
      'At Nearsite, we built our workflow around how local business owners actually operate: you want a clear quote ($699 all-inclusive), a single point of contact with the founder, and a website live before next month.',
      'Our 2-Week Launch Blueprint:',
      '• Day 1-3: Rapid Discovery. We gather your services, pricing, service areas, and photos in one focused session.',
      '• Day 4-7: Custom Design & Approval. We build the live Figma prototype so you see exactly how it looks on mobile and desktop.',
      '• Day 8-12: High-Performance Build. We code the site with clean TypeScript, mobile-first CSS, and SEO optimization.',
      '• Day 13-14: Domain Connect & Launch. We wire your custom domain, test forms, submit sitemaps to Google, and hand over the keys.'
    ],
    takeaways: [
      'Never pay thousands in upfront retainer fees for months of bureaucratic delays.',
      'Work directly with the designer and builder who actually writes the code.',
      'Demand a fixed launch date and clear deliverables before starting.'
    ]
  },
  {
    id: 'blog-4',
    title: 'How Joe’s Plumbing Tripled Incoming Phone Calls in 30 Days',
    excerpt:
      'A real case study on taking a local trades business from an outdated 90s website to a modern, conversion-focused powerhouse.',
    date: 'Aug 02, 2026',
    readTime: '6 min read',
    category: 'Case Studies',
    author: {
      name: 'Ahmad',
      role: 'Founder of Nearsite',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    },
    content: [
      'Joe came to us with a website originally built in 2004: small illegible font on mobile phones, no clear call-to-action, and a table listing prices that had been outdated for a decade.',
      'Despite 15 years of exceptional community reputation in Stafford, VA, younger homeowners moving into the area were hiring newer franchises that simply appeared more legitimate online.',
      'The Transformation:',
      'We redesigned Joe’s online presence from the ground up: added prominent 24/7 Emergency Dispatch badges, transparent service checklists, genuine customer review quotes, and a 1-tap quote request modal.',
      'The Results:',
      'Within 30 days of launch, inbound service quote inquiries increased by 120%, bounce rate dropped by 64%, and organic search rankings for local plumbing terms jumped into the top 3 on Google Maps.'
    ],
    takeaways: [
      'Modern web design signals trustworthiness and professionalism before a customer ever speaks to you.',
      'Position your core differentiators (Licensed, Insured, 5-Star Rated) right above the fold.',
      'Make requesting a quote friction-free with simple 3-field forms.'
    ]
  }
];
