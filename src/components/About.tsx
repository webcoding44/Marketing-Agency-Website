import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, BadgeCheck, HeartHandshake, Lightbulb, MessagesSquare, Sparkles } from "lucide-react";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    icon: Lightbulb,
    title: "Clarity over hype",
    desc: "Plain-language strategy, honest numbers, no jargon tax.",
  },
  {
    icon: BadgeCheck,
    title: "Craft that converts",
    desc: "Beautiful work is table stakes. Commercial impact is the brief.",
  },
  {
    icon: MessagesSquare,
    title: "Partnership, not handoffs",
    desc: "Senior people in the room, every week—not just at the pitch.",
  },
  {
    icon: HeartHandshake,
    title: "Insatiably curious",
    desc: "We test, learn, and bring the next useful idea to the table.",
  },
];

const TEAM = [
  { name: "James Carter", role: "Founder & CEO", img: "/images/avatar-james.jpg" },
  { name: "Sarah Whitman", role: "VP, Growth", img: "/images/avatar-sarah.jpg" },
  { name: "Daniel Kim", role: "Creative Director", img: "/images/avatar-daniel.jpg" },
];

export default function About({ onOpenContact }: { onOpenContact: (service?: string) => void }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".about-value", {
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-values", start: "top 88%", once: true },
      });
      gsap.from(".about-metric", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-metrics", start: "top 92%", once: true },
      });
      gsap.from(".about-team-card", {
        x: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-team", start: "top 88%", once: true },
      });
      gsap.to(".about-spark-ring", {
        rotate: 80,
        yPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden bg-cream py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute top-16 -left-32 h-80 w-80 rounded-full border border-brand/10" />
      <div className="about-spark-ring pointer-events-none absolute right-[6%] bottom-[10%] hidden text-brand/15 xl:block">
        <Sparkles className="h-16 w-16" strokeWidth={0.8} />
      </div>

      <div className="container-x relative">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.06fr] lg:gap-16">
          <div>
            <div data-reveal>
              <span className="eyebrow inline-flex items-center gap-2">
                <span className="h-px w-6 bg-brand/50" /> About Maven
              </span>
              <h2 className="font-display mt-3 text-[30px] leading-[1.07] font-extrabold tracking-[-0.035em] text-ink sm:text-[38px] lg:text-[43px]">
                A small senior team with <span className="text-gradient">unreasonably big outcomes.</span>
              </h2>
              <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-muted sm:text-[15px]">
                Maven was founded on a simple frustration: marketing had become noisy, fragmented, and hard to
                measure. So we built the agency we wished existed—strategists, creatives, and analysts in one room,
                accountable to the same number.
              </p>
              <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-muted">
                Today we partner with ambitious teams across North America and Europe. No layers. No busywork. Just
                the work that moves your business forward.
              </p>
            </div>

            <div className="about-metrics mt-8 grid max-w-lg grid-cols-2 gap-x-4 gap-y-5 border-t border-line pt-6 sm:grid-cols-4">
              {[
                { value: "2014", label: "Founded" },
                { value: "32", label: "Specialists" },
                { value: "14", label: "Industry awards" },
                { value: "9", label: "Countries served" },
              ].map((metric) => (
                <div key={metric.label} className="about-metric">
                  <p className="font-display text-[24px] leading-none font-extrabold tracking-[-0.04em] text-ink">{metric.value}</p>
                  <p className="mt-1.5 text-[9.5px] font-medium tracking-[0.04em] text-muted uppercase">{metric.label}</p>
                </div>
              ))}
            </div>

            <div className="about-team mt-8 flex flex-wrap items-center gap-4" data-reveal>
              <div className="flex -space-x-2.5">
                {TEAM.map((person) => (
                  <img
                    key={person.name}
                    src={person.img}
                    alt={person.name}
                    className="h-10 w-10 rounded-full border-2 border-cream object-cover"
                    loading="lazy"
                  />
                ))}
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-cream bg-brand text-[10px] font-bold text-white">
                  +29
                </span>
              </div>
              <p className="max-w-[220px] text-[11px] leading-snug text-muted">
                Senior-led teams, named on your account from day one.
              </p>
              <button type="button" onClick={() => onOpenContact("About Maven")} className="link-arrow text-brand">
                Meet the team <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="about-values grid grid-cols-1 gap-3 sm:grid-cols-2">
            {VALUES.map((value, i) => (
              <div
                key={value.title}
                className={cn(
                  "about-value card-hover group rounded-2xl border p-5 sm:p-6",
                  i === 3
                    ? "border-ink bg-ink text-white hover:border-brand"
                    : "border-line bg-white hover:border-brand/25",
                  i === 0 && "sm:translate-y-4"
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl transition duration-300",
                      i === 3
                        ? "bg-white/10 text-brand-light group-hover:bg-brand group-hover:text-white"
                        : "bg-lilac text-brand group-hover:bg-brand group-hover:text-white"
                    )}
                  >
                    <value.icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
                  </span>
                  <span className={cn("font-display text-[10px] font-bold", i === 3 ? "text-white/20" : "text-muted/25")}>
                    0{i + 1}
                  </span>
                </div>
                <h3 className={cn("font-display mt-4 text-[15px] font-bold tracking-[-0.01em]", i === 3 ? "text-white" : "text-ink")}>
                  {value.title}
                </h3>
                <p className={cn("mt-1.5 text-[11.5px] leading-relaxed", i === 3 ? "text-white/55" : "text-muted")}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
