import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight, Sparkles, TrendingUp } from "lucide-react";
import { WORK } from "@/lib/data";
import { SectionHead } from "./ui";

gsap.registerPlugin(ScrollTrigger);

export default function Work({
  onOpenCase,
  onOpenContact,
}: {
  onOpenCase: (slug: string) => void;
  onOpenContact: (service?: string) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".work-card").forEach((card, i) => {
        gsap.from(card, {
          y: 44 + i * 6,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%", once: true },
        });
        const media = card.querySelector(".work-media-content");
        if (media) {
          gsap.fromTo(
            media,
            { yPercent: -4, scale: 1.04 },
            {
              yPercent: 4,
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        }
        const mediaWrap = card.querySelector(".work-media");
        if (mediaWrap) {
          gsap.fromTo(
            mediaWrap,
            { clipPath: "inset(0 0 100% 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              duration: 1.1,
              ease: "power3.inOut",
              scrollTrigger: { trigger: mediaWrap, start: "top 92%", once: true },
            }
          );
        }
      });
      gsap.from(".work-feature-visual > *", {
        y: 24,
        opacity: 0,
        scale: 0.94,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".work-feature", start: "top 90%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const [lumen, northstar, solstice] = WORK;

  function Card({
    study,
    className = "",
  }: {
    study: (typeof WORK)[number];
    className?: string;
  }) {
    return (
      <button
        type="button"
        onClick={() => onOpenCase(study.slug)}
        className={`work-card group flex flex-col overflow-hidden rounded-3xl border border-line bg-white text-left shadow-[0_2px_3px_rgba(30,20,70,0.02)] transition-[box-shadow,transform,border-color] duration-500 hover:-translate-y-1.5 hover:border-brand/25 hover:shadow-[0_40px_80px_-40px_rgba(60,35,130,0.4)] ${className}`}
        aria-label={`Read the ${study.client} case study`}
      >
        <div className="work-media relative overflow-hidden bg-lilac">
          <div className="work-media-content relative aspect-[16/9] w-full">
            <img
              src={study.image}
              alt={`${study.client} campaign visual`}
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
          </div>
          <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-4">
            <span className="glass font-display rounded-full px-2.5 py-1 text-[8.5px] font-bold tracking-[0.12em] text-ink uppercase">
              {study.year} · {study.client}
            </span>
            <span className="glass flex h-9 w-9 items-center justify-center rounded-full text-ink transition duration-300 group-hover:bg-brand group-hover:text-white">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-1.5 p-4">
            {study.services.map((s) => (
              <span key={s} className="rounded-full border border-white/25 bg-white/15 px-2 py-1 text-[8px] font-semibold tracking-wide text-white backdrop-blur-sm">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-[20px] leading-[1.15] font-extrabold tracking-[-0.03em] text-ink transition-colors group-hover:text-brand sm:text-[23px]">
              {study.title}
            </h3>
          </div>
          <p className="mt-2.5 text-[12px] leading-relaxed text-muted">{study.summary}</p>
          <div className="mt-5 flex items-end justify-between gap-3 border-t border-line/80 pt-4">
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {study.metrics.slice(0, 2).map((m) => (
                <div key={m.label}>
                  <p className="font-display text-[17px] leading-none font-extrabold tracking-[-0.03em] text-brand">{m.value}</p>
                  <p className="mt-1 text-[8.5px] font-medium tracking-[0.04em] text-muted uppercase">{m.label}</p>
                </div>
              ))}
            </div>
            <span className="font-display flex items-center gap-1.5 text-[9px] font-bold tracking-[0.1em] text-ink uppercase opacity-70 transition group-hover:text-brand group-hover:opacity-100">
              Read story <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <section ref={sectionRef} id="work" className="relative overflow-hidden bg-mist py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute top-20 -right-24 h-72 w-72 rounded-full border border-brand/10" />
      <div className="container-x relative">
        <SectionHead
          eyebrow="Selected work"
          title={
            <>
              Proof, not <span className="text-gradient">promises.</span>
            </>
          }
          description="A look at what happens when strategy, creative, and measurement pull in the same direction."
          action={
            <button type="button" onClick={() => onOpenContact("New project")} className="link-arrow text-brand">
              Start a project
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          }
        />

        <div className="mt-9 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6 xl:mt-11">
          <Card study={lumen} className="lg:col-span-7" />
          <Card study={northstar} className="lg:col-span-5" />

          <button
            type="button"
            onClick={() => onOpenCase(solstice.slug)}
            className="work-card work-feature group relative flex flex-col overflow-hidden rounded-3xl bg-ink text-left text-white lg:col-span-12 lg:min-h-[270px] lg:flex-row"
            aria-label={`Read the ${solstice.client} case study`}
          >
            <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(55%_90%_at_88%_15%,#7c4ce3_0%,transparent_60%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:52px_52px]" />
            <div className="relative z-10 flex flex-col justify-center p-6 sm:p-8 lg:w-[52%] lg:p-9">
              <span className="font-display inline-flex w-fit items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-[8.5px] font-bold tracking-[0.13em] text-brand-light uppercase">
                <Sparkles className="h-3 w-3" /> Featured case study
              </span>
              <h3 className="font-display mt-4 max-w-md text-[26px] leading-[1.06] font-extrabold tracking-[-0.035em] sm:text-[32px]">
                {solstice.client}: {solstice.title}
              </h3>
              <p className="mt-3 max-w-md text-[12px] leading-relaxed text-white/55">{solstice.summary}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                {solstice.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="font-display text-[20px] leading-none font-extrabold tracking-[-0.03em] text-white">{m.value}</p>
                    <p className="mt-1 text-[8.5px] tracking-[0.04em] text-white/45 uppercase">{m.label}</p>
                  </div>
                ))}
              </div>
              <span className="font-display mt-6 inline-flex w-fit items-center gap-2 border-b border-white/25 pb-1 text-[9.5px] font-bold tracking-[0.12em] uppercase transition group-hover:border-brand-light group-hover:text-brand-light">
                Read the story <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>

            <div className="work-feature-visual relative z-10 flex-1 overflow-hidden px-6 pb-6 sm:px-8 sm:pb-8 lg:px-0 lg:py-8 lg:pr-9">
              <div className="relative mx-auto flex h-full min-h-[190px] max-w-[440px] items-center justify-center">
                <div className="absolute top-1/2 left-1/2 h-[84%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-2xl" />
                <div className="relative w-[220px] rounded-2xl border border-white/15 bg-white/[0.08] p-3 shadow-2xl backdrop-blur-md sm:w-[250px]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[8px] text-white/45">Revenue this quarter</p>
                      <p className="font-display text-[24px] font-extrabold tracking-tight text-white">$412.8K</p>
                    </div>
                    <span className="rounded-full bg-emerald-400/15 px-2 py-1 text-[8px] font-bold text-emerald-300">+64%</span>
                  </div>
                  <div className="mt-4 flex h-16 items-end gap-1.5" aria-hidden="true">
                    {[28, 44, 36, 58, 48, 70, 64, 82, 92].map((h, i) => (
                      <span
                        key={i}
                        className="w-full rounded-t-sm bg-gradient-to-t from-brand/40 to-brand-light"
                        style={{ height: `${h}%`, opacity: i > 5 ? 1 : 0.55 }}
                      />
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between rounded-lg bg-white/5 px-2 py-1.5">
                    <span className="flex items-center gap-1 text-[8px] text-white/55">
                      <TrendingUp className="h-2.5 w-2.5 text-emerald-300" /> Conversion rate
                    </span>
                    <span className="font-display text-[10px] font-bold text-white">8.4%</span>
                  </div>
                </div>
                <div className="absolute top-1 -right-1 rounded-xl border border-white/15 bg-white/90 px-3 py-2 text-ink shadow-xl sm:-right-2">
                  <p className="text-[7.5px] font-semibold text-muted">Bounce rate</p>
                  <p className="font-display flex items-center gap-1 text-[14px] font-extrabold text-ink">
                    -41% <TrendingUp className="h-3 w-3 rotate-180 text-brand" />
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 hidden rounded-xl border border-white/15 bg-white/[0.08] px-3 py-2 backdrop-blur-md sm:block">
                  <p className="text-[7.5px] text-white/50">Page speed</p>
                  <p className="font-display text-[13px] font-bold text-white">2.3s LCP</p>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
