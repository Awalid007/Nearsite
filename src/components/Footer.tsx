import React from 'react';
import { Mail, Phone, Instagram, Facebook, Linkedin } from 'lucide-react';
import { Logo } from './Navbar';
import { Button } from './ui';
import { CONTACT, NAV_LINKS } from '../data/homeData';

interface FooterProps {
  onGetMockup: () => void;
  onOpenBlog: () => void;
  onOpenContact: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onNavigateHome?: (sectionId?: string) => void;
}

const linkCls = 'text-sm text-slate-400 transition-colors hover:text-white';

export const Footer: React.FC<FooterProps> = ({
  onGetMockup,
  onOpenBlog,
  onOpenContact,
  onOpenPrivacy,
  onOpenTerms,
  onNavigateHome,
}) => {
  const socials = [
    { href: CONTACT.socials.instagram, label: 'Instagram', Icon: Instagram },
    { href: CONTACT.socials.facebook, label: 'Facebook', Icon: Facebook },
    { href: CONTACT.socials.linkedin, label: 'LinkedIn', Icon: Linkedin },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-white/10 bg-[#050b0b] px-4 pb-28 pt-16 sm:px-6 lg:px-8 lg:pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo onClick={() => onNavigateHome?.()} />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">
              Websites and automation that help local businesses get more calls, more bookings and more
              reviews.
            </p>
            <div className="mt-6">
              <Button onClick={onGetMockup} arrow>
                Get My Free Mockup
              </Button>
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Explore</p>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <button type="button" className={linkCls} onClick={() => onNavigateHome?.(l.id)}>
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Company</p>
            <ul className="mt-4 space-y-3">
              <li>
                <button type="button" className={linkCls} onClick={onOpenBlog}>
                  Blog
                </button>
              </li>
              <li>
                <button type="button" className={linkCls} onClick={onOpenContact}>
                  Contact
                </button>
              </li>
              <li>
                <button type="button" className={linkCls} onClick={onOpenPrivacy}>
                  Privacy Policy
                </button>
              </li>
              <li>
                <button type="button" className={linkCls} onClick={onOpenTerms}>
                  Terms &amp; Conditions
                </button>
              </li>
            </ul>
          </nav>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Get in touch</p>
            <ul className="mt-4 space-y-3">
              {CONTACT.phone && (
                <li>
                  <a href={`tel:${CONTACT.phone.replace(/[^+\d]/g, '')}`} className={`${linkCls} inline-flex items-center gap-2`}>
                    <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
                    {CONTACT.phone}
                  </a>
                </li>
              )}
              <li>
                <a href={`mailto:${CONTACT.email}`} className={`${linkCls} inline-flex items-center gap-2 break-all`}>
                  <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {CONTACT.email}
                </a>
              </li>
            </ul>
            {socials.length > 0 && (
              <div className="mt-5 flex gap-2">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} Nearsite. All rights reserved.</p>
          <p>Websites for local businesses.</p>
        </div>
      </div>
    </footer>
  );
};
