import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight, Mail, Minus, Plus } from "lucide-react";
import { FAQS } from "@/lib/data";
import { cn } from "@/utils/cn";

function FaqItem({
  q,
  a,
  index,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.height = isOpen ? "auto" : "0px";
      el.style.opacity = isOpen ? "1" : "0";
      return;
    }
    gsap.killTweensOf(el);
    gsap.to(el, {
      height: isOpen ? "auto" : 0,
      opacity: isOpen ? 1 : 0,
      duration: 0.42,
      ease: "power2.inOut",
    });
  }, [isOpen]);

  return (
    <div
      className={cn(
        "group overflow-hidden rounded-2xl border transition-colors duration-300",
        isOpen ? "border-brand/25 bg-white shadow-[0_18px_50px_-40px_rgba(60,35,130,0.5)]" : "border-line bg-white/60 hover:border-brand/20"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${index}`}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
      >
        <span className="flex items-start gap-3">
          <span className="font-display mt-0.5 hidden text-[10px] font-bold tracking-[0.08em] text-brand/45 sm:block">
            0{index + 1}
          </span>
          <span className={cn("font-display text-[13.5px] font-bold tracking-[-0.01em] transition sm:text-[14.5px]", isOpen ? "text-brand" : "text-ink")}>
            {q}
          </span>
        </span>
        <span
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
            isOpen ? "rotate-180 border-brand bg-brand text-white" : "border-line bg-white text-ink group-hover:border-brand/40 group-hover:text-brand"
          )}
        >
          {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
        </span>
      </button>
      <div ref={panelRef} id={`faq-panel-${index}`} className="h-0 overflow-hidden opacity-0" role="region" aria-label={q}>
        <p className="px-5 pb-5 text-[12px] leading-relaxed text-muted sm:px-6 sm:pb-6 sm:pl-[52px]">{a}</p>
      </div>
    </div>
  );
}

export default function Faq({ onOpenContact }: { onOpenContact: (service?: string) => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".faq-item", {
        y: 18,
        opacity: 0,
        duration: 0.55,
        stagger: 0.07,
        ease: "power2.out",
        scrollTrigger: { trigger: ".faq-list", start: "top 90%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute top-0 right-0 h-72 w-72 rounded-full bg-brand/[0.04] blur-3xl" />
      <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div data-reveal>
            <span className="eyebrow inline-flex items-center gap-2">
              <span className="h-px w-6 bg-brand/50" /> Good to know
            </span>
            <h2 className="font-display mt-3 text-[30px] leading-[1.07] font-extrabold tracking-[-0.035em] text-ink sm:text-[38px]">
              Questions, <span className="text-gradient">answered.</span>
            </h2>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-muted">
              Everything you might want to know before we start working together. Still curious? We&rsquo;re one message
              away.
            </p>
          </div>

          <div className="relative mt-7 overflow-hidden rounded-2xl bg-ink p-6 text-white" data-reveal>
            <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(70%_90%_at_90%_5%,#6d3fd4_0%,transparent_70%)] opacity-70" />
            <div className="relative">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-brand-light">
                <Mail className="h-4 w-4" />
              </span>
              <p className="font-display mt-4 text-[16px] font-bold tracking-[-0.015em]">Prefer a real conversation?</p>
              <p className="mt-1.5 text-[11.5px] leading-relaxed text-white/55">
                Tell us what you&rsquo;re working on. A strategist—not a salesperson—will reply within one business day.
              </p>
              <button
                type="button"
                onClick={() => onOpenContact("FAQ enquiry")}
                className="link-arrow mt-4 text-brand-light hover:text-white"
              >
                Ask us anything <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="faq-list flex flex-col gap-2.5">
          {FAQS.map((faq, i) => (
            <div key={faq.q} className="faq-item">
              <FaqItem
                q={faq.q}
                a={faq.a}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
