import { useEffect, useRef, type ComponentType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Clock3, Mail, MapPin, Phone, ArrowUp } from "lucide-react";
import { CONTACT, FOOTER_COLUMNS, SOCIALS } from "@/lib/data";
import { Logo } from "./ui";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

type SocialIconProps = { className?: string };

function LinkedinIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5A2.5 2.5 0 1 1 2.5 6 2.5 2.5 0 0 1 4.98 3.5ZM3 8.5h4V21H3V8.5Zm6.5 0h3.8v1.7h.06a4.2 4.2 0 0 1 3.77-2.07c4 0 4.74 2.63 4.74 6.05V21h-4v-5.9c0-1.4-.03-3.2-1.95-3.2-1.96 0-2.26 1.53-2.26 3.1V21h-4V8.5Z" />
    </svg>
  );
}

function InstagramIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H17V3.6A20 20 0 0 0 14.6 3.5C12.2 3.5 10.6 5 10.6 7.5v2.4H8V13h2.6v8h2.9Z" />
    </svg>
  );
}

function XIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.6 3h3.2l-7 8 8.2 10h-6.4l-5-6.1L4.8 21H1.6l7.5-8.6L1.2 3h6.6l4.5 5.6L17.6 3Zm-1.1 16.1h1.8L7.7 4.8H5.8l10.7 14.3Z" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, ComponentType<SocialIconProps>> = {
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  twitter: XIcon,
};

export default function Footer({ onOpenContact }: { onOpenContact: (service?: string) => void }) {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".footer-col", {
        y: 22,
        opacity: 0,
        duration: 0.6,
        stagger: 0.07,
        ease: "power2.out",
        scrollTrigger: { trigger: ".footer-grid", start: "top 95%", once: true },
      });
      gsap.from(".footer-bottom", {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: ".footer-bottom", start: "top 99%", once: true },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  function toTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer ref={footerRef} id="legal" className="relative overflow-hidden bg-[#120d29] text-white">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand/70 to-transparent" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[60%] -translate-x-1/2 rounded-full bg-brand/15 blur-[100px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "radial-gradient(60% 60% at 80% 0%, rgba(109,63,212,.14), transparent 60%), radial-gradient(40% 40% at 10% 100%, rgba(109,63,212,.12), transparent 70%)",
        }}
      />

      <div className="container-x relative pt-12 pb-6 sm:pt-14">
        <div className="footer-grid grid grid-cols-2 gap-x-6 gap-y-9 md:grid-cols-3 lg:grid-cols-[1.35fr_0.85fr_0.85fr_0.85fr_1.25fr] lg:gap-8">
          <div className="footer-col col-span-2 md:col-span-3 lg:col-span-1 lg:pr-4">
            <a href="#top" aria-label="Maven Marketing home">
              <Logo variant="light" />
            </a>
            <p className="mt-5 max-w-[250px] text-[11.5px] leading-relaxed text-white/45">
              We help ambitious brands turn strategy into measurable growth—with clear thinking, standout creative,
              and honest reporting.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {SOCIALS.map((social) => {
                const SocialIcon = SOCIAL_ICONS[social.icon as keyof typeof SOCIAL_ICONS];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Maven on ${social.label}`}
                    className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/60 transition duration-300 hover:-translate-y-0.5 hover:border-brand-light/50 hover:bg-brand hover:text-white"
                  >
                    <SocialIcon className="h-3.5 w-3.5" />
                  </a>
                );
              })}
            </div>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-2.5 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[8.5px] font-semibold tracking-[0.05em] text-emerald-300/90">Available for new projects</span>
            </div>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="footer-col">
              <h3 className="font-display text-[9px] font-bold tracking-[0.17em] text-white/40 uppercase">{column.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-[11.5px] text-white/65 transition hover:text-white"
                    >
                      <span className="transition-transform duration-300 group-hover:translate-x-0.5">{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="footer-col col-span-2 md:col-span-1">
            <h3 className="font-display text-[9px] font-bold tracking-[0.17em] text-white/40 uppercase">Let&rsquo;s connect</h3>
            <ul className="mt-4 space-y-3.5">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-2.5 text-[11.5px] text-white/65 transition hover:text-white">
                  <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-light" />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`} className="flex items-start gap-2.5 text-[11.5px] text-white/65 transition hover:text-white">
                  <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-light" />
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-[11.5px] leading-relaxed text-white/65">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-light" />
                {CONTACT.address}
              </li>
              <li className="flex items-start gap-2.5 text-[11.5px] text-white/65">
                <Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-light" />
                {CONTACT.hours}
              </li>
            </ul>
            <button type="button" onClick={() => onOpenContact()} className="btn mt-5 w-full border border-white/15 bg-white/[0.06] !py-2.5 !text-[9.5px] text-white transition hover:border-white/30 hover:bg-white/10">
              Start a conversation <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="footer-bottom mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 py-5 sm:flex-row sm:items-center">
          <p className="text-[10px] text-white/35">
            © {new Date().getFullYear()} Maven Marketing. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {[
              { label: "Privacy Policy", href: "#legal" },
              { label: "Terms of Service", href: "#legal" },
              { label: "Accessibility", href: "#legal" },
            ].map((link) => (
              <a key={link.label} href={link.href} className="text-[10px] text-white/35 transition hover:text-white/80">
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={toTop}
              className="group ml-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/12 text-white/55 transition hover:border-brand-light hover:bg-brand hover:text-white"
              aria-label="Back to top"
            >
              <ArrowUp className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none relative h-[86px] overflow-hidden sm:h-[110px]">
        <p
          className={cn(
            "font-display absolute inset-x-0 -bottom-4 text-center text-[19vw] leading-none font-extrabold tracking-[-0.06em] text-white/[0.035] select-none sm:-bottom-8"
          )}
        >
          MAVEN
        </p>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#120d29] to-transparent" />
      </div>
    </footer>
  );
}
