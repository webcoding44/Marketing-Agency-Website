import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { SERVICES } from "@/lib/data";
import { Icon, SectionHead } from "./ui";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  onOpenService: (slug: string) => void;
  onOpenContact: (service?: string) => void;
};

export default function Services({ onOpenService, onOpenContact }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        y: 34,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".services-grid", start: "top 88%", once: true },
      });
      gsap.from(".services-foot", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".services-foot", start: "top 94%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  function iconHover(e: React.MouseEvent<HTMLButtonElement>) {
    const icon = e.currentTarget.querySelector("[data-service-icon]");
    if (!icon || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(icon, { y: 0, rotate: 0 }, { y: -4, rotate: -7, duration: 0.32, ease: "power2.out", yoyo: true, repeat: 1 });
  }

  return (
    <section ref={sectionRef} id="services" className="relative bg-cream py-16 sm:py-20 lg:py-24">
      <div className="container-x">
        <SectionHead
          eyebrow="What we do"
          title={
            <>
              Marketing Services That{" "}
              <span className="text-gradient">Make&nbsp;an&nbsp;Impact</span>
            </>
          }
          description="Six connected disciplines, one growth system. We plug in where it matters most and own the outcome."
          action={
            <button type="button" onClick={() => onOpenContact("Full services menu")} className="link-arrow text-brand">
              Explore all services
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          }
        />

        <div className="services-grid mt-9 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-[0_20px_60px_-50px_rgba(40,25,90,0.5)] sm:grid-cols-2 lg:grid-cols-3 xl:mt-11 xl:grid-cols-6">
          {SERVICES.map((service, index) => (
            <button
              key={service.slug}
              type="button"
              onClick={() => onOpenService(service.slug)}
              onMouseEnter={iconHover}
              aria-label={`Learn more about ${service.title}`}
              className="service-card group relative flex flex-col items-start bg-white p-6 text-left transition-colors duration-300 hover:bg-[#fdfcff] xl:p-5"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-brand to-brand-light transition-transform duration-500 group-hover:scale-x-100"
              />
              <div className="flex w-full items-start justify-between">
                <span
                  data-service-icon
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand/10 bg-lilac text-brand transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white xl:h-12 xl:w-12"
                >
                  <Icon name={service.icon} className="h-[21px] w-[21px]" />
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden="true" />
              </div>
              <h3 className="font-display mt-5 text-[14px] leading-snug font-bold tracking-[-0.015em] text-ink xl:text-[13.5px]">
                {service.title}
              </h3>
              <p className="mt-2 text-[11px] leading-[1.65] text-muted xl:text-[10.5px]">{service.short}</p>
              <span className="font-display mt-auto flex items-center gap-1 pt-5 text-[9px] font-bold tracking-[0.1em] text-brand/0 uppercase transition-colors duration-300 group-hover:text-brand">
                Learn more <ArrowRight className="h-3 w-3" />
              </span>
              <span className="absolute right-4 bottom-4 text-[8px] font-semibold text-muted/25 xl:hidden">0{index + 1}</span>
            </button>
          ))}
        </div>

        <div className="services-foot mt-5 flex flex-col items-start justify-between gap-4 rounded-2xl border border-brand/10 bg-lilac/60 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
          <p className="flex items-center gap-2.5 text-[12px] text-muted">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span>
              <strong className="font-semibold text-ink">Not sure what you need?</strong> Start with a free growth audit—we&rsquo;ll
              show you the biggest opportunity.
            </span>
          </p>
          <button
            type="button"
            onClick={() => onOpenContact("Free marketing audit")}
            className="link-arrow shrink-0 text-brand"
          >
            Get a free audit <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
