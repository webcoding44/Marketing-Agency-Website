import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { STATS } from "@/lib/data";
import { Counter, Icon, SectionHead } from "./ui";

gsap.registerPlugin(ScrollTrigger);

export default function Results() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".result-stat", {
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".results-stats", start: "top 88%", once: true },
      });
      gsap.fromTo(
        ".results-rule",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          duration: 1,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: ".results-stats", start: "top 88%", once: true },
        }
      );
      gsap.to(".results-giant-word", {
        xPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.to(".results-orb", {
        rotate: 40,
        yPercent: -20,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-ink py-14 text-white sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(60%_70%_at_75%_10%,#6d3fd4_0%,transparent_60%),radial-gradient(45%_50%_at_10%_100%,#4d2a9c_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:68px_68px]" />
      <div className="results-orb pointer-events-none absolute -top-28 -right-24 h-80 w-80 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute top-10 right-[35%] h-2 w-2 rounded-full bg-brand-light/70" />
      <div className="pointer-events-none absolute bottom-12 left-[45%] h-1.5 w-1.5 rounded-full bg-white/25" />

      <p
        aria-hidden="true"
        className="results-giant-word font-display pointer-events-none absolute -bottom-7 left-0 w-[120%] text-[16vw] leading-none font-extrabold tracking-[-0.05em] whitespace-nowrap text-white/[0.025] select-none"
      >
        REAL GROWTH · REAL GROWTH
      </p>

      <div className="container-x relative">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.88fr_1.5fr] lg:gap-12">
          <div>
            <SectionHead
              light
              eyebrow="Real strategies. Real results."
              title={
                <>
                  Real Results
                  <br className="hidden sm:block" /> for <span className="text-brand-light">Real Growth</span>
                </>
              }
              description="We combine creativity, data, and technology to deliver measurable results that compound for your business."
            />
            <div className="mt-6 flex flex-wrap items-center gap-3" data-reveal>
              <a href="#work" className="btn group border border-white/20 bg-white/[0.06] text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10">
                See our case studies
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <span className="flex items-center gap-2 text-[10px] font-medium tracking-wide text-white/45">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Reporting you can trust
              </span>
            </div>
          </div>

          <div className="results-stats grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-y-0">
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                className="result-stat relative flex flex-col items-center px-2 text-center sm:px-3 lg:items-start lg:px-5 lg:text-left"
              >
                {index > 0 && (
                  <span
                    className="results-rule absolute top-1 -left-0 hidden h-[calc(100%-8px)] w-px bg-white/12 sm:block"
                    aria-hidden="true"
                  />
                )}
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-brand-light">
                  <Icon name={stat.icon} className="h-[18px] w-[18px]" strokeWidth={1.7} />
                </span>
                <p className="font-display mt-3 text-[32px] leading-none font-extrabold tracking-[-0.04em] text-white sm:text-[36px] lg:text-[40px]">
                  <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
                </p>
                <p className="mt-2 text-[9.5px] leading-snug font-medium tracking-[0.04em] text-white/55 sm:text-[10px]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
