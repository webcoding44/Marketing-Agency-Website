import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import { cn } from "@/utils/cn";
import { SectionHead, Stars } from "./ui";

export default function Testimonials({ onOpenContact }: { onOpenContact: (service?: string) => void }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const direction = useRef(1);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const active = TESTIMONIALS[index];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        y: 36,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: ".testimonial-card", start: "top 90%", once: true },
      });
      gsap.from(".testimonial-brand", {
        opacity: 0,
        y: 12,
        duration: 0.6,
        stagger: 0.07,
        ease: "power2.out",
        scrollTrigger: { trigger: ".testimonial-brands", start: "top 94%", once: true },
      });
      gsap.to(".testimonial-orb", {
        yPercent: -18,
        rotate: 20,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-anim",
        { opacity: 0, x: 26 * direction.current },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.06, ease: "power3.out" }
      );
      gsap.fromTo(".testimonial-avatar", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.6)" });
    }, contentRef);
    return () => ctx.revert();
  }, [index]);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      direction.current = 1;
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 8500);
    return () => window.clearInterval(timer);
  }, [paused]);

  function go(next: number, dir: number) {
    direction.current = dir;
    setIndex((next + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-mist py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(50%_60%_at_50%_0%,rgba(109,63,212,0.06),transparent)]" />
      <div className="testimonial-orb pointer-events-none absolute top-16 right-[8%] h-48 w-48 rounded-full border border-brand/10" />
      <div className="container-x relative">
        <SectionHead
          eyebrow="What our clients say"
          title={
            <>
              The work speaks. <span className="text-gradient">So do they.</span>
            </>
          }
          action={
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(index - 1, -1)}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-brand hover:bg-brand hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1, 1)}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-brand hover:bg-brand hover:text-white"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          }
        />

        <div
          className="testimonial-card relative mt-8 overflow-hidden rounded-3xl border border-line bg-white shadow-[0_30px_80px_-60px_rgba(50,30,110,0.45)] sm:mt-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >
          <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(45%_90%_at_0%_0%,rgba(109,63,212,0.055),transparent)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[0.42fr_1.58fr]">
            <div className="relative flex flex-col justify-between gap-6 border-b border-line bg-lilac/45 p-6 sm:p-8 lg:border-r lg:border-b-0">
              <div>
                <p className="font-display flex items-center gap-2 text-[9px] font-bold tracking-[0.15em] text-brand uppercase">
                  <span className="h-px w-5 bg-brand/50" /> Client stories
                </p>
                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="font-display text-[36px] leading-none font-extrabold tracking-[-0.04em] text-ink">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] font-medium text-muted">/ {String(TESTIMONIALS.length).padStart(2, "0")}</span>
                </div>
                <p className="mt-2 max-w-[190px] text-[11px] leading-relaxed text-muted">
                  Trusted by founders and marketing leaders to deliver work that moves the business.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  {TESTIMONIALS.map((t, i) => (
                    <button
                      key={t.name}
                      type="button"
                      onClick={() => go(i, i > index ? 1 : -1)}
                      aria-label={`Show testimonial from ${t.name}`}
                      aria-current={i === index}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-500",
                        i === index ? "w-8 bg-brand" : "w-2.5 bg-brand/20 hover:bg-brand/50"
                      )}
                    />
                  ))}
                </div>
                <button type="button" onClick={() => onOpenContact("Client reference")} className="link-arrow text-brand">
                  Become our next story <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div ref={contentRef} className="relative flex flex-col justify-between p-6 sm:p-9 lg:p-11" aria-live="polite">
              <div className="pointer-events-none absolute -top-6 right-4 text-brand/[0.055] sm:right-8">
                <Quote className="h-28 w-28 rotate-180" strokeWidth={1.4} fill="currentColor" />
              </div>
              <div>
                <div className="testimonial-anim flex items-center gap-2">
                  <Stars count={active.rating} />
                  <span className="text-[9.5px] font-medium tracking-[0.04em] text-muted uppercase">5.0 client rating</span>
                </div>
                <blockquote className="testimonial-anim font-display mt-4 max-w-[680px] text-[19px] leading-[1.45] font-semibold tracking-[-0.015em] text-ink sm:text-[23px] lg:text-[25px]">
                  &ldquo;{active.quote}&rdquo;
                </blockquote>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                <div className="flex items-center gap-3">
                  <img
                    src={active.avatar}
                    alt={active.name}
                    className="testimonial-avatar h-11 w-11 rounded-full border-2 border-white object-cover shadow-md sm:h-12 sm:w-12"
                    loading="lazy"
                  />
                  <div className="testimonial-anim">
                    <p className="font-display text-[12.5px] font-bold text-ink">{active.name}</p>
                    <p className="mt-0.5 text-[10px] text-muted">{active.role}</p>
                  </div>
                </div>
                <span className="font-display text-[12px] font-extrabold tracking-[0.2em] text-ink/35 uppercase sm:text-[14px]">
                  {active.brand}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="testimonial-brands mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-line/80 pt-6 sm:justify-between">
          {["HEXLAB", "Slimfinity", "kanba", "Cloudward", "BULLSEYE", "Vertoz"].map((brand) => (
            <span key={brand} className="testimonial-brand font-display text-[13px] font-bold tracking-[0.02em] text-ink/30 transition hover:text-brand sm:text-[15px]">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
