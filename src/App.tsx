import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, Sparkles } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoCloud from "./components/LogoCloud";
import Services from "./components/Services";
import Results from "./components/Results";
import Work from "./components/Work";
import About from "./components/About";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import Insights from "./components/Insights";
import Faq from "./components/Faq";
import Cta from "./components/Cta";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import { ArticleModal, CaseModal, ContactModal, ServiceModal } from "./components/Modals";

gsap.registerPlugin(ScrollTrigger);

type ModalState =
  | { type: "contact"; service?: string }
  | { type: "service"; slug: string }
  | { type: "case"; slug: string }
  | { type: "article"; slug: string }
  | null;

export default function App() {
  const [modal, setModal] = useState<ModalState>(null);
  const [showTop, setShowTop] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);

  const openContact = (service?: string) => setModal({ type: "contact", service });
  const closeModal = () => setModal(null);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const progress = progressRef.current;
    let progressTween: gsap.core.Tween | null = null;

    if (progress && !reduce) {
      gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
      progressTween = gsap.to(progress, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.25 },
      });
    }

    if (reduce) {
      return () => {
        progressTween?.kill();
      };
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 26,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        gsap.from(group.children, {
          y: 24,
          opacity: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: group, start: "top 92%", once: true },
        });
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const timer = window.setTimeout(refresh, 500);
    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh).catch(() => undefined);
    }

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(timer);
      progressTween?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <a
        href="#services"
        className="sr-only z-[200] rounded-full bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <span
        ref={progressRef}
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[90] h-[2.5px] origin-left scale-x-0 bg-gradient-to-r from-brand via-[#9a73ee] to-brand-light"
      />

      <Navbar onOpenContact={openContact} onOpenService={(slug) => setModal({ type: "service", slug })} />

      <main>
        <Hero onOpenContact={openContact} />
        <LogoCloud />
        <Services onOpenService={(slug) => setModal({ type: "service", slug })} onOpenContact={openContact} />
        <Results />
        <Work onOpenCase={(slug) => setModal({ type: "case", slug })} onOpenContact={openContact} />
        <About onOpenContact={openContact} />
        <Process onOpenContact={openContact} />
        <Testimonials onOpenContact={openContact} />
        <Insights
          onOpenArticle={(slug) => setModal({ type: "article", slug })}
          onOpenContact={openContact}
        />
        <Faq onOpenContact={openContact} />
        <Cta onOpenContact={openContact} />
        <Newsletter />
      </main>

      <Footer onOpenContact={openContact} />

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed right-4 bottom-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white shadow-[0_16px_40px_-16px_rgba(23,18,58,0.8)] transition-all duration-300 hover:-translate-y-1 hover:bg-brand sm:right-6 sm:bottom-6 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => openContact("Free marketing audit")}
        className={`group fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-full border border-brand/15 bg-white/95 py-2 pr-3.5 pl-2 text-ink shadow-[0_16px_40px_-20px_rgba(23,18,58,0.5)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand/35 sm:bottom-6 sm:left-6 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
        aria-label="Get a free marketing audit"
        tabIndex={showTop ? 0 : -1}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white">
          <Sparkles className="h-3.5 w-3.5" />
        </span>
        <span className="font-display text-[9.5px] font-bold tracking-[0.1em] uppercase">Free audit</span>
      </button>

      <ContactModal
        open={modal?.type === "contact"}
        initialService={modal?.type === "contact" ? modal.service : undefined}
        onClose={closeModal}
      />
      <ServiceModal
        slug={modal?.type === "service" ? modal.slug : null}
        open={modal?.type === "service"}
        onClose={closeModal}
        onOpenContact={openContact}
      />
      <CaseModal
        slug={modal?.type === "case" ? modal.slug : null}
        open={modal?.type === "case"}
        onClose={closeModal}
        onOpenContact={openContact}
      />
      <ArticleModal
        slug={modal?.type === "article" ? modal.slug : null}
        open={modal?.type === "article"}
        onClose={closeModal}
        onOpenContact={openContact}
      />
    </div>
  );
}
