import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

/** Smooth-scrolls to a section, offset for the sticky nav. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - 76;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

/** Fades + lifts content in as it scrolls into view. */
export const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}> = ({ children, delay = 0, className, y = 24 }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

/** Small uppercase label above section headings. */
export const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-300 ${className}`}
  >
    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
    {children}
  </span>
);

/** Serif italic accent word used inside headings. */
export const Accent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="font-display italic font-normal text-accent">{children}</span>
);

/** Consistent section heading block. */
export const SectionHead: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  center?: boolean;
}> = ({ eyebrow, title, sub, center = true }) => (
  <Reveal className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="mt-5 text-balance text-[2rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
      {title}
    </h2>
    {sub && <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">{sub}</p>}
  </Reveal>
);

/** Primary (lime) and ghost buttons. Renders <a> when href is given. */
export const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'ghost';
  size?: 'md' | 'lg';
  arrow?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  arrow = false,
  className = '',
  type = 'button',
  disabled,
}) => {
  const base =
    'group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none';
  const sizes = size === 'lg' ? 'px-7 py-4 text-base' : 'px-5 py-2.5 text-sm';
  const variants =
    variant === 'primary'
      ? 'bg-accent text-[#060e0e] shadow-[0_0_0_0_rgba(200,255,62,0)] hover:shadow-[0_8px_40px_-6px_rgba(200,255,62,0.55)] hover:-translate-y-0.5'
      : 'border border-white/15 bg-white/[0.04] text-white hover:border-white/30 hover:bg-white/[0.08]';
  const cls = `${base} ${sizes} ${variants} ${className}`;
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );
  if (href) {
    return (
      <a href={href} className={cls}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled}>
      {content}
    </button>
  );
};

/** Card with a soft cursor-following lime glow on hover. */
export const SpotlightCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <div
      onMouseMove={onMove}
      className={`spotlight relative overflow-hidden rounded-3xl border border-white/10 bg-surface transition-colors duration-300 hover:border-white/20 ${className}`}
    >
      {children}
    </div>
  );
};
