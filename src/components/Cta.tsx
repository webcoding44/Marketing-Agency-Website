import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight, Check, Clock3, Mail, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Cta({ onOpenContact }: { onOpenContact: (service?: string) => void }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".cta-panel", {
        y: 38,
        opacity: 0,
        scale: 0.985,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true },
      });
      gsap.to(".cta-ring", {
        rotate: 60,
        yPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
      const marquee = document.querySelector(".cta-marquee-track");
      if (marquee) {
        const tween = gsap.to(marquee, { xPercent: -50, duration: 26, ease: "none", repeat: -1 });
        return () => tween.kill();
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden bg-cream pt-16 pb-10 sm:pt-20 lg:pt-24">
      <div className="container-x">
        <div className="cta-panel relative overflow-hidden rounded-[28px] bg-ink text-white shadow-[0_50px_120px_-60px_rgba(40,20,100,0.7)] sm:rounded-[34px]">
          <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(60%_100%_at_85%_0%,#6d3fd4_0%,transparent_62%),radial-gradient(50%_80%_at_0%_100%,#3b1d7e_0%,transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:56px_56px]" />
          <div className="cta-ring pointer-events-none absolute -top-24 right-[8%] h-72 w-72 rounded-full border border-white/15" />
          <div className="cta-ring pointer-events-none absolute -top-10 right-[24%] h-40 w-40 rounded-full border border-dashed border-brand-light/25" />
          <Sparkles className="pointer-events-none absolute right-[30%] bottom-[22%] hidden h-7 w-7 text-brand-light/40 sm:block" strokeWidth={1.2} />

          <div className="relative grid grid-cols-1 gap-10 p-6 sm:p-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-start lg:gap-12 lg:p-14">
            <div>
              <span className="font-display inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-[9px] font-bold tracking-[0.15em] uppercase backdrop-blur">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Booking projects for Q3
              </span>
              <h2 className="font-display mt-5 max-w-[600px] text-[34px] leading-[1.02] font-extrabold tracking-[-0.045em] sm:text-[46px] lg:text-[55px]">
                Your next stage of <span className="text-gradient brightness-125">growth</span> starts with a conversation.
              </h2>
              <p className="mt-4 max-w-md text-[13px] leading-relaxed text-white/60 sm:text-[14px]">
                Tell us where you want to go. We&rsquo;ll bring a clear point of view, the right people, and a plan to get
                there—no pitch theatre.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenContact("New project enquiry")}
                  className="btn group bg-white text-ink hover:bg-brand-light hover:text-ink"
                >
                  Let&rsquo;s talk
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
                <a href="mailto:hello@mavenmarketing.com" className="btn border border-white/20 bg-white/[0.05] text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10">
                  <Mail className="h-4 w-4" /> Email us
                </a>
              </div>
              <p className="mt-4 flex items-center gap-2 text-[10px] text-white/40">
                <Clock3 className="h-3 w-3" /> Average reply time: under 4 business hours
              </p>
            </div>

            <div className="w-full self-start rounded-2xl border border-white/12 bg-white/[0.06] p-5 backdrop-blur-md sm:p-6 lg:mt-8 lg:max-w-[340px]">
              <p className="font-display text-[10px] font-bold tracking-[0.14em] text-brand-light uppercase">What happens next</p>
              <div className="mt-4 space-y-4">
                {[
                  { title: "A short, useful reply", desc: "Within one business day, from a strategist." },
                  { title: "A 30-minute discovery call", desc: "Goals, constraints, and a point of view." },
                  { title: "A clear proposal", desc: "Scope, timeline, and the outcome we'll own." },
                ].map((item, i) => (
                  <div key={item.title} className="flex gap-3">
                    <span className="font-display mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/25 text-[9px] font-bold text-white ring-1 ring-white/15">
                      {i === 0 ? <Check className="h-3 w-3" strokeWidth={3} /> : `0${i + 1}`}
                    </span>
                    <div>
                      <p className="text-[12px] font-semibold text-white">{item.title}</p>
                      <p className="mt-0.5 text-[10.5px] leading-snug text-white/45">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between gap-2 border-t border-white/10 pt-4">
                <div className="flex -space-x-2">
                  <img src="/images/avatar-james.jpg" alt="" className="h-7 w-7 rounded-full border border-ink object-cover" loading="lazy" />
                  <img src="/images/avatar-sarah.jpg" alt="" className="h-7 w-7 rounded-full border border-ink object-cover" loading="lazy" />
                  <img src="/images/avatar-daniel.jpg" alt="" className="h-7 w-7 rounded-full border border-ink object-cover" loading="lazy" />
                </div>
                <p className="text-[9px] text-white/45">Senior team. No handoffs.</p>
                <ArrowRight className="h-3.5 w-3.5 text-brand-light" />
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden border-t border-white/10 py-3.5">
            <div className="cta-marquee-track font-display flex w-max items-center gap-6 whitespace-nowrap text-[10px] font-bold tracking-[0.22em] text-white/30 uppercase">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="flex items-center gap-6" aria-hidden={i > 0}>
                  <span>Strategy</span>
                  <Sparkles className="h-3 w-3 text-brand-light/50" />
                  <span>Creativity</span>
                  <Sparkles className="h-3 w-3 text-brand-light/50" />
                  <span>Performance</span>
                  <Sparkles className="h-3 w-3 text-brand-light/50" />
                  <span>Growth</span>
                  <Sparkles className="h-3 w-3 text-brand-light/50" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
