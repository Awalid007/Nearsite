import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { CONTACT, PLAN_OPTIONS, TRADE_OPTIONS } from '../data/homeData';

/**
 * Free-mockup request form.
 * Submits to Web3Forms (https://web3forms.com) which emails the request to you.
 * Set VITE_WEB3FORMS_ACCESS_KEY in Vercel (see .env.example).
 */
const ACCESS_KEY = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined)?.trim();

type Status = 'idle' | 'sending' | 'success' | 'error';

interface LeadFormProps {
  /** Plan chosen from the pricing cards (pre-fills the dropdown). */
  plan?: string;
}

const fieldBase =
  'w-full rounded-xl border border-white/10 bg-[#081414] px-4 py-3.5 text-base text-white placeholder:text-slate-500 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30';

const Field: React.FC<{
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}> = ({ id, label, required, hint, children }) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-200">
      {label}
      {required ? (
        <span className="text-accent" aria-hidden="true"> *</span>
      ) : (
        <span className="text-slate-400"> (optional)</span>
      )}
    </label>
    {children}
    {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
  </div>
);

export const LeadForm: React.FC<LeadFormProps> = ({ plan }) => {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('Not sure yet');
  const formRef = useRef<HTMLFormElement>(null);

  // Sync when the visitor clicks a plan card
  useEffect(() => {
    if (plan && PLAN_OPTIONS.includes(plan)) setSelectedPlan(plan);
  }, [plan]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots fill this hidden field, people never see it
    if (data.get('botcheck')) return;

    if (!ACCESS_KEY) {
      setStatus('error');
      setError(
        'The form isn’t connected yet. Please email us directly and we’ll send your free mockup.'
      );
      return;
    }

    setStatus('sending');
    setError('');

    const name = String(data.get('name') || '').trim();
    const business = String(data.get('business') || '').trim();
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const trade = String(data.get('trade') || '');
    const website = String(data.get('website') || '').trim();
    const message = String(data.get('message') || '').trim();

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Free mockup request: ${business || name}`,
          from_name: 'Nearsite website',
          name,
          email,
          phone,
          business,
          trade,
          current_website: website || 'None',
          plan_interest: selectedPlan,
          message: message || '(no message)',
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Something went wrong.');
      }

      // Best-effort: keep your existing CEO dashboard feed in sync (never blocks the user)
      const now = new Date().toISOString();
      fetch('/api/ceo-feed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'lead',
          data: {
            id: `lead-${Date.now().toString(36)}`,
            name,
            business: business || 'Website Inquiry',
            email,
            interestedIn: selectedPlan,
            source: 'Free mockup form',
            message: message || `Trade: ${trade}. Phone: ${phone}.`,
            status: 'new',
            notes: [],
            createdAt: now,
            updatedAt: now,
          },
        }),
      }).catch(() => {});

      setStatus('success');
      form.reset();
    } catch (err: any) {
      setStatus('error');
      setError(
        `We couldn’t send that just now (${err?.message || 'network error'}). Please try again or email us at ${CONTACT.email}.`
      );
    }
  };

  if (status === 'success') {
    return (
      <div
        role="status"
        className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-accent/30 bg-surface p-8 text-center sm:p-12"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-[#060e0e]">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-2xl font-semibold text-white sm:text-3xl">You’re in. Thank you!</h3>
        <p className="mt-3 max-w-sm text-slate-400">
          We’ve got your request and will be in touch soon with your free website mockup.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-8 text-sm font-semibold text-accent underline-offset-4 hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-surface p-6 shadow-2xl sm:p-9"
      aria-describedby="lead-form-status"
    >
      <h3 className="text-xl font-semibold text-white sm:text-2xl">Request your free mockup</h3>
      <p className="mt-1 text-sm text-slate-400">Takes about a minute. No payment, no obligation.</p>

      {/* Honeypot (hidden from people and screen readers) */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field id="lf-name" label="Your name" required>
          <input id="lf-name" name="name" type="text" required autoComplete="name" placeholder="Jane Smith" className={fieldBase} />
        </Field>
        <Field id="lf-business" label="Business name" required>
          <input id="lf-business" name="business" type="text" required autoComplete="organization" placeholder="Smith Roofing" className={fieldBase} />
        </Field>
        <Field id="lf-phone" label="Phone" required>
          <input id="lf-phone" name="phone" type="tel" required inputMode="tel" autoComplete="tel" placeholder="(555) 123-4567" className={fieldBase} />
        </Field>
        <Field id="lf-email" label="Email" required>
          <input id="lf-email" name="email" type="email" required autoComplete="email" placeholder="you@business.com" className={fieldBase} />
        </Field>
        <Field id="lf-trade" label="What kind of business?" required>
          <select id="lf-trade" name="trade" required defaultValue="" className={fieldBase}>
            <option value="" disabled>
              Select one
            </option>
            {TRADE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field id="lf-plan" label="Interested in">
          <select
            id="lf-plan"
            name="plan"
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className={fieldBase}
          >
            {PLAN_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field id="lf-website" label="Current website">
            <input id="lf-website" name="website" type="text" inputMode="url" autoComplete="url" placeholder="yourbusiness.com" className={fieldBase} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field id="lf-message" label="Anything we should know?">
            <textarea id="lf-message" name="message" rows={3} placeholder="Tell us about your business or what you’d like your site to do." className={`${fieldBase} resize-y`} />
          </Field>
        </div>
      </div>

      <div id="lead-form-status" aria-live="polite" className="mt-4 min-h-[1.25rem]">
        {status === 'error' && (
          <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="group mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-semibold text-[#060e0e] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_-6px_rgba(200,255,62,0.55)] disabled:pointer-events-none disabled:opacity-70"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Get My Free Mockup
            <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </>
        )}
      </button>
      <p className="mt-3 text-center text-xs text-slate-400">
        We’ll only use your info to send your mockup. No spam.
      </p>
    </form>
  );
};
