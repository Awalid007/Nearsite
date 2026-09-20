export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  tagline: string;
}

export interface ProcessStep {
  step: number;
  timeframe: string;
  title: string;
  description: string;
  checkpoints: string[];
  iconName: string;
}

export interface WhyUsBenefit {
  id: string;
  title: string;
  description: string;
  iconName: string;
  highlight: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  business: string;
  industry: string;
  rating: number;
  metric?: string;
  avatarColor: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
  badge?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface PortfolioCase {
  id: string;
  businessName: string;
  industry: string;
  headline: string;
  results: string;
  features: string[];
  color: string;
  badge: string;
  rating: number;
}

export interface QuoteFormData {
  businessName: string;
  industry: string;
  contactName: string;
  email: string;
  phone: string;
  selectedPlan: string;
  timeline: string;
  goals: string[];
  notes: string;
}
