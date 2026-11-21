import {
  BarChart3,
  Compass,
  DollarSign,
  Layers,
  Lightbulb,
  Mail,
  Megaphone,
  PenTool,
  Rocket,
  Search,
  Smile,
  Star,
  Target,
  TrendingUp,
  Users,
  X,
  type LucideProps,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/utils/cn";
import type { IconName } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const ICONS: Record<IconName, React.ComponentType<LucideProps>> = {
  target: Target,
  search: Search,
  megaphone: Megaphone,
  pen: PenTool,
  chart: BarChart3,
  mail: Mail,
  rocket: Rocket,
  smile: Smile,
  trending: TrendingUp,
  dollar: DollarSign,
  compass: Compass,
  bulb: Lightbulb,
  layers: Layers,
  users: Users,
};

export function Icon({ name, className, strokeWidth = 1.6 }: { name: IconName; className?: string; strokeWidth?: number }) {
  const Cmp = ICONS[name];
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}

export function Logo({ variant = "dark", className }: { variant?: "dark" | "light"; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)} aria-label="Maven Marketing">
      <svg width="42" height="34" viewBox="0 0 48 38" fill="none" aria-hidden="true" className="shrink-0">
        <defs>
          <linearGradient id="maven-mark" x1="2" y1="4" x2="46" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8A5AE8" />
            <stop offset="0.55" stopColor="#6D3FD4" />
            <stop offset="1" stopColor="#4E23A8" />
          </linearGradient>
        </defs>
        <path d="M2 34 10 4l13.8 17.4L37 4l9 30h-9.2l-4-13.4L24.2 33 15 20.6 10.8 34H2Z" fill="url(#maven-mark)" />
        <path d="M24.3 32.6 30.6 23l3.9 8.2h-5.6l-2.9 4.6-1.7-3.2Z" fill="#C9B4F7" opacity="0.85" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[21px] font-extrabold tracking-[-0.04em]",
            variant === "light" ? "text-white" : "text-ink"
          )}
        >
          MAVEN
        </span>
        <span
          className={cn(
            "mt-1 font-display text-[7.5px] font-bold tracking-[0.42em]",
            variant === "light" ? "text-white/55" : "text-muted"
          )}
        >
          MARKETING
        </span>
      </span>
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className,
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 sm:gap-6",
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")} data-reveal>
        <span className={cn("eyebrow inline-flex items-center gap-2", light && "text-brand-light")}>
          <span className={cn("h-px w-6", light ? "bg-brand-light/60" : "bg-brand/50")} aria-hidden="true" />
          {eyebrow}
        </span>
        <h2
          className={cn(
            "font-display mt-3 text-[30px] leading-[1.08] font-extrabold tracking-[-0.035em] sm:text-[38px] lg:text-[44px]",
            light ? "text-white" : "text-ink"
          )}
        >
          {title}
        </h2>
        {description ? (
          <p className={cn("mt-4 max-w-xl text-[14px] leading-relaxed sm:text-[15px]", light ? "text-white/60" : "text-muted")}>
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <div className="shrink-0" data-reveal>
          {action}
        </div>
      ) : null}
    </div>
  );
}

export function Stars({ count = 5, className }: { count?: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
      ))}
    </span>
  );
}

export function BrandMark({ mark, className }: { mark: string; className?: string }) {
  const common = cn("h-[19px] w-[19px]", className);
  if (mark === "hex") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path d="M12 2.6 21 7.8v8.4L12 21.4 3 16.2V7.8L12 2.6Z" stroke="currentColor" strokeWidth="1.7" />
        <path d="m8 9 4-2.3L16 9v4.4l-4 2.3-4-2.3V9Z" fill="currentColor" opacity=".8" />
      </svg>
    );
  }
  if (mark === "orbit") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <circle cx="12" cy="12" r="4" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="10" ry="4.6" transform="rotate(-28 12 12)" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (mark === "bullseye") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="1.8" fill="currentColor" />
      </svg>
    );
  }
  if (mark === "wave") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path d="M2 15c3.2 0 3.2-6 6.4-6s3.2 6 6.4 6 3.2-6 6.4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M2 20c3.2 0 3.2-4 6.4-4s3.2 4 6.4 4 3.2-4 6.4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity=".45" />
      </svg>
    );
  }
  if (mark === "cloud") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path
          d="M7 18.5a4.5 4.5 0 0 1-.6-8.96A5.5 5.5 0 0 1 17 8.6a4.95 4.95 0 0 1 1 9.9H7Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (mark === "diamond") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <PathDiamond />
      </svg>
    );
  }
  if (mark === "spark") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path d="M12 2c.7 5.6 4.4 9.3 10 10-5.6.7-9.3 4.4-10 10-.7-5.6-4.4-9.3-10-10 5.6-.7 9.3-4.4 10-10Z" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="m8 15 4-7 4 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PathDiamond() {
  return (
    <>
      <path d="m12 3 9 9-9 9-9-9 9-9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="m12 8 4 4-4 4-4-4 4-4Z" fill="currentColor" />
    </>
  );
}

export function Counter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const format = (n: number) =>
      `${prefix}${n.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = format(value);
      return;
    }

    const state = { v: 0 };
    el.textContent = format(0);
    const tween = gsap.to(state, {
      v: value,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
      onUpdate: () => {
        el.textContent = format(state.v);
      },
      onComplete: () => {
        el.textContent = format(value);
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, suffix, prefix, decimals]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

export function Modal({
  open,
  onClose,
  children,
  label,
  size = "md",
  light = false,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  label: string;
  size?: "sm" | "md" | "lg" | "xl";
  light?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closing = useRef(false);

  useEffect(() => {
    if (!open) {
      setMounted(false);
      return;
    }
    setMounted(true);
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    closing.current = false;
    const previousFocus = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 26, scale: 0.975 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out", delay: 0.05 }
      );
    });

    const focusTimer = window.setTimeout(() => {
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      (focusables?.[0] ?? panelRef.current)?.focus();
    }, 80);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
      if (e.key === "Tab") {
        const nodes = panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!nodes || nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      window.clearTimeout(focusTimer);
      previousFocus?.focus?.();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  function close() {
    if (closing.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }
    closing.current = true;
    gsap
      .timeline({ onComplete: onClose })
      .to(panelRef.current, { opacity: 0, y: 18, scale: 0.98, duration: 0.25, ease: "power2.in" })
      .to(overlayRef.current, { opacity: 0, duration: 0.22 }, "-=0.1");
  }

  if (!open || !mounted) return null;

  const width = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  }[size];

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-[#120c28]/65 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={cn(
          "relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-3xl shadow-2xl sm:rounded-3xl",
          width,
          light ? "bg-lilac" : "bg-white"
        )}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close dialog"
          className="glass absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-line/70 text-ink shadow-sm transition hover:scale-105 hover:bg-white hover:text-brand"
        >
          <X className="h-4.5 w-4.5" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "font-display inline-flex items-center gap-1.5 rounded-full border border-brand/15 bg-brand/[0.07] px-3 py-1.5 text-[10px] font-bold tracking-[0.11em] text-brand uppercase",
        className
      )}
    >
      {children}
    </span>
  );
}
