import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { PROCESS } from "@/lib/data";
import { Icon, SectionHead } from "./ui";

gsap.registerPlugin(ScrollTrigger);

export default function Process({ onOpenContact }: { onOpenContact: (service?: string) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const progress = progressRef.current;
      if (!section || !track) return;

      const getDistance = () => Math.max(track.scrollWidth - window.innerWidth + 80, 0);

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance() + 240}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progress) gsap.set(progress, { scaleX: Math.max(0.04, self.progress) });
          },
        },
      });

      const cards = gsap.utils.toArray<HTMLElement>(".process-card", track);
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 34, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            delay: i * 0.03,
            scrollTrigger: { trigger: section, start: "top 60%", once: true },
          }
        );
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".process-card");
      const triggers = cards.map((card) =>
        gsap.from(card, {
          y: 26,
          opacity: 0,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 92%", once: true },
        })
      );
      return () => {
        triggers.forEach((t) => {
          t.scrollTrigger?.kill();
          t.kill();
        });
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="process-section relative bg-white py-16 sm:py-20 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden lg:py-0"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/25 to-transparent" />
      <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-brand/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-[0.25] [mask-image:radial-gradient(60%_60%_at_70%_30%,black,transparent)]" />

      <div className="container-x relative">
        <SectionHead
          eyebrow="How we work"
          title={
            <>
              A process built to <span className="text-gradient">remove guesswork.</span>
            </>
          }
          description="Four clear phases. Named owners. No mystery about what happens next or how it gets measured."
          action={
            <button type="button" onClick={() => onOpenContact("Process enquiry")} className="link-arrow text-brand">
              Book a discovery call <ArrowRight className="h-4 w-4" />
            </button>
          }
        />
      </div>

      <div className="relative mt-7 lg:mt-7">
        <div
          ref={trackRef}
          className="flex flex-col gap-4 px-5 sm:gap-5 sm:px-8 lg:w-max lg:flex-row lg:gap-5 lg:px-0 lg:pr-12"
          style={{ paddingLeft: "max(1.25rem, calc((100vw - 1220px) / 2 + 2rem))" }}
        >
          {PROCESS.map((step, i) => (
            <article
              key={step.step}
              className="process-card group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-cream p-5 transition-[border-color,box-shadow] duration-500 hover:border-brand/30 hover:shadow-[0_30px_70px_-45px_rgba(60,35,130,0.45)] sm:p-6 lg:w-[366px] lg:shrink-0"
            >
              <div className="pointer-events-none absolute -top-10 -right-8 select-none">
                <span className="font-display text-[110px] leading-none font-extrabold tracking-[-0.06em] text-brand/[0.07] transition-colors duration-500 group-hover:text-brand/[0.11]">
                  {step.step}
                </span>
              </div>
              <div className="relative flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-brand shadow-sm ring-1 ring-brand/10 transition duration-500 group-hover:bg-brand group-hover:text-white">
                  <Icon name={step.icon} className="h-[18px] w-[18px]" />
                </span>
                <span className="rounded-full border border-brand/15 bg-white px-2.5 py-1 text-[8.5px] font-semibold tracking-[0.06em] text-muted uppercase">
                  {step.duration}
                </span>
              </div>
              <p className="font-display relative mt-4 text-[9px] font-bold tracking-[0.16em] text-brand uppercase">
                Phase {step.step}
              </p>
              <h3 className="font-display mt-1 text-[23px] leading-none font-extrabold tracking-[-0.035em] text-ink">{step.title}</h3>
              <p className="mt-2.5 text-[11.5px] leading-[1.6] text-muted">{step.description}</p>
              <ul className="mt-4 space-y-2 border-t border-line pt-4">
                {step.points.map((point) => (
                  <li key={point} className="flex items-center gap-2.5 text-[11.5px] font-medium text-ink/75">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[9px] font-semibold tracking-[0.08em] text-muted/60 uppercase">Output</span>
                <span className="font-display text-[9.5px] font-bold tracking-[0.08em] text-brand uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {i === 3 ? "A compounding growth engine" : "A decision-ready plan"}
                </span>
              </div>
            </article>
          ))}

          <article className="relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-3xl bg-ink p-6 text-white lg:w-[330px] lg:shrink-0">
            <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(70%_90%_at_80%_10%,#6d3fd4_0%,transparent_65%)] opacity-70" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:40px_40px]" />
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-[8.5px] font-bold tracking-[0.12em] uppercase">
                <Sparkles className="h-3 w-3 text-brand-light" /> Ready when you are
              </span>
              <h3 className="font-display mt-5 text-[26px] leading-[1.08] font-extrabold tracking-[-0.035em]">
                Let&rsquo;s find your next growth unlock.
              </h3>
              <p className="mt-3 text-[12px] leading-relaxed text-white/55">
                A 30-minute conversation, a clear point of view, and zero obligation. We&rsquo;ll tell you honestly whether
                we&rsquo;re the right fit.
              </p>
            </div>
            <div className="relative mt-6">
              <button type="button" onClick={() => onOpenContact("Discovery call")} className="btn w-full bg-white text-ink hover:bg-brand hover:text-white">
                Book a discovery call <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-3 text-center text-[9.5px] text-white/40">No pitch deck. No pressure. Ever.</p>
            </div>
          </article>
        </div>

        <div className="container-x mt-6 hidden items-center gap-4 lg:flex">
          <span className="font-display text-[9px] font-bold tracking-[0.14em] text-muted/60 uppercase">Drag to explore</span>
          <span className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-line">
            <span ref={progressRef} className="absolute inset-y-0 left-0 w-full origin-left scale-x-[0.04] rounded-full bg-gradient-to-r from-brand to-brand-light" />
          </span>
          <span className="font-display flex items-center gap-1.5 text-[9px] font-bold tracking-[0.14em] text-brand uppercase">
            Scroll <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </section>
  );
}
