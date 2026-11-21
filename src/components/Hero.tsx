import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Heart,
  Megaphone,
  PenTool,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { icon: Target, title: "ROI Focused", desc: "Results that matter" },
  { icon: BarChart3, title: "Data Driven", desc: "Insights that convert" },
  { icon: PenTool, title: "Creative Solutions", desc: "Ideas that stand out" },
  { icon: ShieldCheck, title: "Transparent", desc: "Clear communication" },
];

function TrafficCard() {
  return (
    <div className="float-card absolute bottom-[17%] -left-2 z-20 w-[146px] rounded-2xl border border-white/80 bg-white/95 p-3 shadow-[0_20px_40px_-20px_rgba(50,30,110,0.35)] backdrop-blur sm:top-[9%] sm:bottom-auto sm:-left-7 sm:w-[176px] sm:p-3.5 lg:-left-12 lg:top-[12%] lg:w-[185px]">
      <div className="flex items-center justify-between gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand/10 text-brand">
          <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
        <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[8.5px] font-bold text-emerald-600">↑ 24%</span>
      </div>
      <p className="mt-2 text-[9px] font-medium tracking-[0.03em] text-muted">Website Traffic</p>
      <p className="font-display mt-0.5 flex items-baseline gap-1.5 text-[21px] font-extrabold tracking-[-0.03em] text-ink">
        32.6K
        <span className="text-[8px] font-semibold tracking-normal text-muted">this week</span>
      </p>
      <svg viewBox="0 0 150 38" className="mt-1.5 h-9 w-full" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#8A5AE8" stopOpacity=".22" />
            <stop offset="1" stopColor="#8A5AE8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M2 29 20 25l11 3 16-11 12 6 17-9 12 3 15-8 9 3 16-7v31H2V29Z" fill="url(#spark-fill)" />
        <path
          className="spark-line"
          d="M2 29 20 25l11 3 16-11 12 6 17-9 12 3 15-8 9 3 16-7"
          stroke="#6D3FD4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="148" cy="9" r="3.5" fill="#fff" stroke="#6D3FD4" strokeWidth="2" />
      </svg>
    </div>
  );
}

function ConversionsCard() {
  const bars = [32, 46, 38, 62, 52, 74, 68, 92];
  return (
    <div className="float-card absolute top-[3%] right-0 z-20 hidden w-[136px] rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-[0_20px_40px_-20px_rgba(50,30,110,0.32)] backdrop-blur sm:right-0 sm:block sm:w-[154px] lg:-right-5 lg:top-[5%] lg:w-[162px]">
      <div className="flex items-start justify-between gap-1">
        <div>
          <p className="text-[9px] font-medium text-muted">Conversions</p>
          <p className="font-display text-[20px] font-extrabold tracking-[-0.03em] text-ink">7.8K</p>
        </div>
        <span className="rounded-full bg-brand/10 px-1.5 py-0.5 text-[8.5px] font-bold text-brand">↑ 18%</span>
      </div>
      <div className="mt-2 flex h-11 items-end gap-[3px]" aria-hidden="true">
        {bars.map((h, i) => (
          <span
            key={i}
            className="chart-bar w-full rounded-t-[2px]"
            style={{
              height: `${h}%`,
              background: i > 4 ? "linear-gradient(180deg,#8A5AE8,#6D3FD4)" : "#D9CCF5",
            }}
          />
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-[7px] font-medium text-muted/70">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
      </div>
    </div>
  );
}

function RevenueCard() {
  return (
    <div className="float-card absolute bottom-[10%] right-0 z-20 hidden w-[152px] rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-[0_20px_40px_-20px_rgba(50,30,110,0.32)] backdrop-blur sm:-right-4 sm:block sm:w-[170px] lg:-right-9 lg:bottom-[12%] lg:w-[176px]">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[9px] font-medium text-muted">Revenue Generated</p>
          <p className="font-display text-[20px] font-extrabold tracking-[-0.03em] text-ink">$85.6K</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[8.5px] font-bold text-emerald-600">+35%</span>
      </div>
      <div className="mt-1 flex items-center gap-2.5">
        <div className="relative h-[58px] w-[58px] shrink-0">
          <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="32" cy="32" r="25" fill="none" stroke="#EEE8FA" strokeWidth="8" />
            <circle
              className="donut-progress"
              cx="32"
              cy="32"
              r="25"
              fill="none"
              stroke="url(#donut-gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="113 157"
            />
            <defs>
              <linearGradient id="donut-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#8F63E9" />
                <stop offset="1" stopColor="#5426B4" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-brand">72%</span>
        </div>
        <div className="space-y-1 text-[7.5px] text-muted">
          <p className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-brand" /> Organic</p>
          <p className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#C7B0F1]" /> Paid</p>
          <p className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#E5DAF8]" /> Referral</p>
        </div>
      </div>
    </div>
  );
}

export default function Hero({ onOpenContact }: { onOpenContact: (service?: string) => void }) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { y: 16, opacity: 0, duration: 0.6 })
        .from(".hero-word", { yPercent: 118, duration: 1, stagger: 0.065, ease: "power4.out" }, "-=0.3")
        .from(".hero-copy", { y: 18, opacity: 0, duration: 0.7 }, "-=0.55")
        .from(".hero-actions > *", { y: 16, opacity: 0, duration: 0.55, stagger: 0.08 }, "-=0.45")
        .from(".hero-feature", { y: 14, opacity: 0, duration: 0.5, stagger: 0.07 }, "-=0.35")
        .from(".hero-visual", { opacity: 0, scale: 0.94, x: 20, duration: 1, ease: "power3.out" }, "-=0.85")
        .from(".float-card", { y: 35, opacity: 0, scale: 0.92, duration: 0.8, stagger: 0.12 }, "-=0.55")
        .from(".float-badge", { scale: 0, opacity: 0, duration: 0.6, stagger: 0.12, ease: "back.out(2)" }, "-=0.55")
        .from(".connector-path", { opacity: 0, duration: 0.8 }, "-=0.5")
        .fromTo(".spark-line", { strokeDasharray: 240, strokeDashoffset: 240 }, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" }, "-=1")
        .from(".chart-bar", { scaleY: 0, transformOrigin: "bottom center", duration: 0.6, stagger: 0.05, ease: "power3.out" }, "-=1.1")
        .fromTo(".donut-progress", { strokeDashoffset: 120 }, { strokeDashoffset: 0, duration: 1.2, ease: "power3.out" }, "-=1.1");

      gsap.to(".float-card", {
        y: (i) => (i % 2 === 0 ? -9 : 8),
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.45,
        delay: 1.4,
      });
      gsap.to(".float-badge", {
        y: (i) => (i % 2 === 0 ? -7 : 9),
        x: (i) => (i % 2 === 0 ? 4 : -3),
        rotate: (i) => (i % 2 === 0 ? 4 : -5),
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
        delay: 1.2,
      });

      gsap.to(".hero-arch-inner", {
        yPercent: 5,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-visual-wrap", {
        yPercent: -4,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-orb", {
        y: 60,
        rotate: 25,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="top" className="hero-glow relative overflow-hidden bg-cream">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      <div className="hero-orb pointer-events-none absolute -top-24 right-[12%] h-64 w-64 rounded-full border border-brand/10" />
      <div className="pointer-events-none absolute top-24 right-[16%] h-3 w-3 rounded-full bg-brand/30" />
      <div className="pointer-events-none absolute top-[38%] left-[4%] h-2 w-2 rounded-full bg-brand/25" />

      <div className="container-x relative grid grid-cols-1 items-center gap-12 pt-10 pb-14 lg:grid-cols-[1.04fr_0.96fr] lg:gap-6 lg:pt-14 lg:pb-20">
        <div className="relative z-10">
          <div className="hero-eyebrow flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand/15 bg-white text-brand shadow-sm">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="font-display text-[10.5px] font-bold tracking-[0.2em] text-brand uppercase sm:text-[11px]">
              Data-driven strategies.
            </span>
            <span className="hidden h-px w-10 bg-brand/25 sm:block" aria-hidden="true" />
          </div>

          <h1 className="font-display mt-6 text-[42px] leading-[1.02] font-extrabold tracking-[-0.045em] text-ink sm:text-[56px] lg:text-[60px] xl:text-[66px]">
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="hero-word inline-block">Marketing That</span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="hero-word inline-block">Drives</span>
              <span className="inline-block">&nbsp;</span>
              <span className="hero-word text-gradient inline-block">Growth</span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="hero-word inline-block">&amp; Delivers Results</span>
            </span>
          </h1>

          <p className="hero-copy mt-5 max-w-[455px] text-[14px] leading-[1.75] text-muted sm:text-[15px]">
            From strategy to execution, we help ambitious brands attract, engage, and convert their ideal audience
            — with work that is measured, not guessed.
          </p>

          <div className="hero-actions mt-7 flex flex-wrap items-center gap-3">
            <a href="#services" className="btn-primary group">
              Our services
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href="#work" className="btn-outline group">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white">
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </span>
              View our work
            </a>
          </div>

          <div className="hero-features mt-8 grid max-w-[520px] grid-cols-2 gap-x-3 gap-y-4 border-t border-brand/10 pt-5 sm:mt-9 sm:aspect-auto sm:grid-cols-4 sm:gap-x-2">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="hero-feature group flex items-start gap-2">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brand/15 bg-white text-brand transition duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                  <feature.icon className="h-3 w-3" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span>
                  <span className="font-display block text-[8.5px] font-extrabold tracking-[0.06em] text-ink uppercase sm:text-[9px]">
                    {feature.title}
                  </span>
                  <span className="mt-0.5 block text-[9px] leading-tight text-muted sm:text-[9.5px]">{feature.desc}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual hero-visual-wrap relative mx-auto w-full max-w-[500px]">
          <div className="pointer-events-none absolute top-[12%] left-[8%] h-[76%] w-[84%] rounded-[50%] bg-brand/10 blur-3xl" />
          <div className="relative mx-auto w-[86%] max-w-[430px] sm:w-[82%] lg:w-[88%]">
            <svg viewBox="0 0 460 540" className="connector-path pointer-events-none absolute -inset-x-[22%] inset-y-0 h-full w-[144%] overflow-visible" fill="none" aria-hidden="true">
              <path
                d="M40 145C-8 238 42 330 150 330c86 0 88 96 210 122"
                stroke="#aa8ce6"
                strokeWidth="1.4"
                strokeDasharray="4 7"
                opacity=".65"
                strokeLinecap="round"
              />
              <path d="M40 145c-20 32-28 63-24 92" stroke="#C2ACEE" strokeWidth="1.2" strokeDasharray="2 7" opacity=".55" />
            </svg>
            <div className="hero-arch relative aspect-[0.91] overflow-hidden shadow-[0_40px_100px_-50px_rgba(64,36,140,0.5)]">
              <div className="absolute inset-0 dot-grid opacity-40" />
              <div className="hero-arch-inner absolute inset-x-0 -bottom-2 top-3">
                <img
                  src="/images/hero-woman.png"
                  alt="Marketing strategist smiling while reviewing campaign performance on her laptop"
                  className="h-full w-full object-cover object-[50%_28%]"
                  width={1280}
                  height={720}
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#e6d9f9]/80 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
                <span className="glass font-display inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[8.5px] font-bold tracking-[0.08em] text-ink uppercase shadow-sm">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Growth in progress
                </span>
                <span className="glass rounded-full px-2.5 py-1 text-[8px] font-semibold text-ink/70 shadow-sm">NYC · EST</span>
              </div>
            </div>
          </div>

          <TrafficCard />
          <ConversionsCard />
          <RevenueCard />

          <div className="float-badge absolute top-[30%] right-[3%] z-10 hidden h-9 w-9 items-center justify-center rounded-xl border border-white bg-white text-brand shadow-lg sm:flex">
            <Megaphone className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="float-badge absolute bottom-[28%] -left-1 z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-white bg-white text-brand shadow-lg sm:-left-3">
            <Heart className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="float-badge glass absolute bottom-[3%] left-[12%] z-20 hidden items-center gap-2 rounded-full px-3 py-2 shadow-md sm:flex">
            <span className="flex -space-x-1.5">
              <img src="/images/avatar-james.jpg" alt="" className="h-5 w-5 rounded-full border border-white object-cover" />
              <img src="/images/avatar-sarah.jpg" alt="" className="h-5 w-5 rounded-full border border-white object-cover" />
              <img src="/images/avatar-daniel.jpg" alt="" className="h-5 w-5 rounded-full border border-white object-cover" />
            </span>
            <span className="text-[8.5px] leading-tight font-semibold text-ink">
              120+ brands scaled
              <span className="block text-[7.5px] font-medium text-muted">4.9/5 client rating</span>
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onOpenContact("Free marketing audit")}
        className="group absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-[8.5px] font-semibold tracking-[0.16em] text-muted uppercase transition hover:text-brand xl:flex"
        aria-label="Scroll to services and book a free marketing audit"
      >
        Scroll to explore
        <span className="flex h-7 w-[18px] items-start justify-center rounded-full border border-muted/30 p-1">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand" />
        </span>
      </button>
    </section>
  );
}
