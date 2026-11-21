import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ArrowRight, Check, Loader2, Lock, Send, Sparkles } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem("maven-newsletter") === "subscribed") setStatus("success");
    } catch {
      /* storage unavailable */
    }
  }, []);

  useEffect(() => {
    if (status !== "success" || !successRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".newsletter-success > *",
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out" }
      );
      gsap.fromTo(
        ".newsletter-check",
        { scale: 0, rotate: -25 },
        { scale: 1, rotate: 0, duration: 0.55, ease: "back.out(2)" }
      );
    }, successRef);
    return () => ctx.revert();
  }, [status]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".newsletter-card", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".newsletter-card", start: "top 92%", once: true },
      });
      gsap.to(".newsletter-plane", {
        y: -10,
        x: 8,
        rotate: 8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    if (!valid) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      if (formRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.fromTo(formRef.current, { x: -7 }, { x: 0, duration: 0.45, ease: "elastic.out(1,0.3)" });
      }
      return;
    }
    setStatus("loading");
    setMessage("");
    await new Promise((resolve) => setTimeout(resolve, 700));
    try {
      localStorage.setItem("maven-newsletter", "subscribed");
    } catch {
      /* ignore */
    }
    setStatus("success");
  }

  return (
    <section ref={sectionRef} id="newsletter" className="relative bg-white pb-4">
      <div className="container-x">
        <div className="newsletter-card relative overflow-hidden rounded-3xl border border-brand/10 bg-[linear-gradient(115deg,#efe9fc_0%,#e9e0fa_55%,#f2ecfd_100%)] px-5 py-6 sm:px-7 sm:py-7 lg:px-9">
          <div className="pointer-events-none absolute -top-16 right-1/4 h-56 w-56 rounded-full border border-brand/10" />
          <div className="pointer-events-none absolute right-10 bottom-0 h-2 w-2 rounded-full bg-brand/30" />
          <div className="relative grid grid-cols-1 items-center gap-5 lg:grid-cols-[auto_1fr_auto] lg:gap-8">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white bg-white text-brand shadow-sm sm:h-14 sm:w-14">
                <Send className="newsletter-plane h-5 w-5 -rotate-12" aria-hidden="true" />
              </span>
              <div className="lg:hidden">
                <p className="font-display text-[17px] font-extrabold tracking-[-0.02em] text-ink">Stay ahead in marketing</p>
                <p className="mt-0.5 text-[11px] text-muted">One useful email a month. No noise.</p>
              </div>
            </div>

            <div className="hidden lg:block">
              <h2 className="font-display text-[21px] leading-tight font-extrabold tracking-[-0.025em] text-ink">
                Stay Ahead in Marketing
              </h2>
              <p className="mt-1 text-[12px] leading-relaxed text-muted">
                Subscribe to our newsletter for the latest tips, strategies, and insights delivered to your inbox.
              </p>
            </div>

            <div className="w-full lg:w-auto">
              {status === "success" ? (
                <div ref={successRef} className="newsletter-success flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-white/80 px-4 py-3.5" role="status">
                  <span className="newsletter-check flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <div>
                    <p className="font-display text-[12px] font-bold text-ink">You&rsquo;re on the list. Welcome.</p>
                    <p className="mt-0.5 text-[10.5px] text-muted">Your first edit lands soon. No noise, promise.</p>
                  </div>
                </div>
              ) : (
                <form ref={formRef} onSubmit={submit} noValidate className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="relative flex-1 sm:min-w-[240px] lg:w-[290px]">
                      <label htmlFor="newsletter-email" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="newsletter-email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status === "error") {
                            setStatus("idle");
                            setMessage("");
                          }
                        }}
                        aria-invalid={status === "error"}
                        aria-describedby={message ? "newsletter-error" : "newsletter-privacy"}
                        className="field !py-3 bg-white/95 !text-[12px]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="btn-primary group !px-5 !py-3 disabled:cursor-wait disabled:opacity-80"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" /> Joining
                        </>
                      ) : (
                        <>
                          Subscribe <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>
                  </div>
                  <p className="flex items-center gap-1.5 text-[9px] text-muted/80" id="newsletter-privacy">
                    <Lock className="h-2.5 w-2.5" /> No spam. Unsubscribe anytime.
                  </p>
                  {message && (
                    <p id="newsletter-error" className="text-[10px] font-semibold text-red-500" role="alert">
                      {message}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>

          <p className="mt-4 flex items-center gap-1.5 text-[9.5px] text-muted/75 lg:hidden">
            <Sparkles className="h-3 w-3 text-brand" /> Join 4,200+ marketers. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
