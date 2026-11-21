import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Copy,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { ARTICLES, CONTACT, SERVICES, WORK } from "@/lib/data";
import { cn } from "@/utils/cn";
import { Icon, Logo, Modal, Stars } from "./ui";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type ContactValues = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  consent: boolean;
};

const EMPTY_FORM: ContactValues = {
  name: "",
  email: "",
  company: "",
  service: "",
  budget: "",
  message: "",
  consent: false,
};

export function ContactModal({
  open,
  onClose,
  initialService,
}: {
  open: boolean;
  onClose: () => void;
  initialService?: string;
}) {
  const [values, setValues] = useState<ContactValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const serviceOptions = Array.from(
    new Set([...SERVICES.map((s) => s.title), "Free marketing audit", "Not sure yet", ...(initialService ? [initialService] : [])])
  );

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setSent(false);
    setSending(false);
    setValues((prev) => ({
      ...prev,
      service: initialService ?? prev.service ?? "",
    }));
  }, [open, initialService]);

  useEffect(() => {
    if (!sent || !successRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-success > *", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: "power2.out" });
      gsap.fromTo(".contact-success-check", { scale: 0, rotate: -30 }, { scale: 1, rotate: 0, duration: 0.6, ease: "back.out(2)" });
    }, successRef);
    return () => ctx.revert();
  }, [sent]);

  function update<K extends keyof ContactValues>(key: K, value: ContactValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (values.name.trim().length < 2) next.name = "Please tell us your name.";
    if (!EMAIL_RE.test(values.email.trim())) next.email = "Please enter a valid work email.";
    if (!values.service) next.service = "Choose the service you're interested in.";
    if (values.message.trim().length < 10) next.message = "Give us a sentence or two about your goal (10+ characters).";
    if (!values.consent) next.consent = "Please agree to be contacted about your enquiry.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      if (formRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.fromTo(formRef.current, { x: -8 }, { x: 0, duration: 0.5, ease: "elastic.out(1,0.35)" });
      }
      const firstKey = Object.keys(next)[0];
      const field = formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`);
      field?.focus();
      return;
    }
    setSending(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSending(false);
    setSent(true);
  }

  return (
    <Modal open={open} onClose={onClose} label="Start a conversation with Maven Marketing" size="lg">
      <div className="grid grid-cols-1 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="relative hidden overflow-hidden bg-ink p-7 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(75%_80%_at_20%_5%,#6d3fd4_0%,transparent_65%),radial-gradient(60%_60%_at_100%_100%,#4a2299_0%,transparent_70%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:42px_42px]" />
          <div className="relative">
            <Logo variant="light" />
            <span className="mt-7 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1.5 text-[8.5px] font-bold tracking-[0.1em] uppercase backdrop-blur">
              <Sparkles className="h-3 w-3 text-brand-light" /> Free 30-minute consult
            </span>
            <h2 className="font-display mt-4 text-[27px] leading-[1.08] font-extrabold tracking-[-0.035em]">
              Let&rsquo;s find the next thing worth doing.
            </h2>
            <p className="mt-3 text-[11.5px] leading-relaxed text-white/55">
              No pitch deck, no pressure. Bring a goal or a growth frustration—we&rsquo;ll bring a clear point of view and
              honest advice.
            </p>
            <div className="mt-6 space-y-3">
              {[
                { icon: Clock3, text: "Reply within one business day" },
                { icon: ShieldCheck, text: "Your details stay private" },
                { icon: TrendingUp, text: "Senior strategists, not salespeople" },
              ].map((item) => (
                <p key={item.text} className="flex items-center gap-2.5 text-[10.5px] text-white/65">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-brand-light">
                    <item.icon className="h-3 w-3" />
                  </span>
                  {item.text}
                </p>
              ))}
            </div>
          </div>

          <div className="relative mt-8 rounded-xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
            <Stars />
            <p className="mt-2 text-[10.5px] leading-relaxed text-white/70">
              &ldquo;They found the 20% of work driving 80% of growth. Genuinely the most useful agency conversation
              we&rsquo;ve had.&rdquo;
            </p>
            <div className="mt-3 flex items-center gap-2">
              <img src="/images/avatar-sarah.jpg" alt="" className="h-6 w-6 rounded-full object-cover" />
              <p className="text-[9px] font-semibold text-white">Sarah Whitman <span className="font-normal text-white/40">· VP Marketing</span></p>
            </div>
          </div>
        </div>

        <div className="relative p-5 sm:p-7">
          {sent ? (
            <div ref={successRef} className="contact-success flex min-h-[430px] flex-col items-center justify-center py-8 text-center">
              <span className="contact-success-check flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 ring-8 ring-emerald-50/60">
                <CheckCircle2 className="h-8 w-8" strokeWidth={1.8} />
              </span>
              <p className="eyebrow mt-6">Message received</p>
              <h2 className="font-display mt-2 text-[25px] leading-tight font-extrabold tracking-[-0.03em] text-ink">
                Thanks{values.name ? `, ${values.name.split(" ")[0]}` : ""}. We&rsquo;re on it.
              </h2>
              <p className="mt-3 max-w-sm text-[12.5px] leading-relaxed text-muted">
                Your enquiry about <strong className="font-semibold text-ink">{values.service}</strong> has landed with our
                strategy team. Expect a real reply from a real person within one business day.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
                <button type="button" onClick={onClose} className="btn-primary">
                  Back to the site <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={() => { setSent(false); setValues(EMPTY_FORM); }} className="btn-outline">
                  Send another message
                </button>
              </div>
              <a href={`mailto:${CONTACT.email}`} className="mt-5 flex items-center gap-1.5 text-[10.5px] text-muted transition hover:text-brand">
                <Mail className="h-3 w-3" /> {CONTACT.email}
              </a>
            </div>
          ) : (
            <>
              <div className="pr-10">
                <p className="eyebrow lg:hidden">Let&rsquo;s talk</p>
                <h2 className="font-display mt-1 text-[23px] leading-tight font-extrabold tracking-[-0.03em] text-ink sm:text-[26px]">
                  Tell us about your next move.
                </h2>
                <p className="mt-2 text-[11.5px] text-muted">A few details help us send the right person to the first call.</p>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} noValidate className="mt-5 grid grid-cols-1 gap-3.5">
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="field-label">Full name <span className="text-brand">*</span></label>
                    <input
                      id="contact-name"
                      name="name"
                      className={cn("field", errors.name && "!border-red-400 focus:!ring-red-100")}
                      placeholder="Jane Cooper"
                      value={values.name}
                      onChange={(e) => update("name", e.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "error-name" : undefined}
                    />
                    {errors.name && <p id="error-name" className="mt-1 text-[10px] font-medium text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="field-label">Work email <span className="text-brand">*</span></label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={cn("field", errors.email && "!border-red-400 focus:!ring-red-100")}
                      placeholder="jane@company.com"
                      value={values.email}
                      onChange={(e) => update("email", e.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "error-email" : undefined}
                    />
                    {errors.email && <p id="error-email" className="mt-1 text-[10px] font-medium text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-company" className="field-label">Company</label>
                    <input
                      id="contact-company"
                      name="company"
                      autoComplete="organization"
                      className="field"
                      placeholder="Company name"
                      value={values.company}
                      onChange={(e) => update("company", e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-service" className="field-label">I&rsquo;m interested in <span className="text-brand">*</span></label>
                    <select
                      id="contact-service"
                      name="service"
                      className={cn("field !py-[12.5px]", errors.service && "!border-red-400")}
                      value={values.service}
                      onChange={(e) => update("service", e.target.value)}
                      aria-invalid={Boolean(errors.service)}
                      aria-describedby={errors.service ? "error-service" : undefined}
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    {errors.service && <p id="error-service" className="mt-1 text-[10px] font-medium text-red-500">{errors.service}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-budget" className="field-label">Project budget</label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {["< $10k", "$10k–25k", "$25k–75k", "$75k+"].map((budget) => (
                      <button
                        key={budget}
                        type="button"
                        onClick={() => update("budget", budget)}
                        className={cn(
                          "rounded-xl border px-2 py-2.5 text-[10.5px] font-semibold transition",
                          values.budget === budget
                            ? "border-brand bg-brand/5 text-brand shadow-sm"
                            : "border-line bg-white text-muted hover:border-brand/30 hover:text-ink"
                        )}
                        aria-pressed={values.budget === budget}
                      >
                        {budget}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="field-label">What are you working on? <span className="text-brand">*</span></label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={3}
                    className={cn("field resize-none", errors.message && "!border-red-400")}
                    placeholder="Goals, challenges, timeline—anything useful."
                    value={values.message}
                    onChange={(e) => update("message", e.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "error-message" : undefined}
                  />
                  {errors.message && <p id="error-message" className="mt-1 text-[10px] font-medium text-red-500">{errors.message}</p>}
                </div>

                <div>
                  <label className="flex cursor-pointer items-start gap-2.5 text-[10.5px] leading-relaxed text-muted">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={values.consent}
                      onChange={(e) => update("consent", e.target.checked)}
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[#6d3fd4]"
                      aria-invalid={Boolean(errors.consent)}
                    />
                    <span>
                      I agree to be contacted about my enquiry. See our{" "}
                      <a href="#legal" onClick={onClose} className="font-medium text-brand underline decoration-brand/30 underline-offset-2">privacy policy</a>.
                    </span>
                  </label>
                  {errors.consent && <p className="mt-1 text-[10px] font-medium text-red-500">{errors.consent}</p>}
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <button type="submit" disabled={sending} className="btn-primary flex-1 disabled:cursor-wait disabled:opacity-85 sm:flex-none">
                    {sending ? (
                      <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Sending enquiry</>
                    ) : (
                      <>Send enquiry <ArrowRight className="h-3.5 w-3.5" /></>
                    )}
                  </button>
                  <span className="flex items-center gap-1.5 text-[9.5px] text-muted/80">
                    <ShieldCheck className="h-3 w-3 text-emerald-500" /> No spam, ever.
                  </span>
                </div>
              </form>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-3.5 text-[10px] text-muted">
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-1.5 transition hover:text-brand">
                  <Mail className="h-3 w-3 text-brand" /> {CONTACT.email}
                </a>
                <a href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-1.5 transition hover:text-brand">
                  <Phone className="h-3 w-3 text-brand" /> {CONTACT.phone}
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}

export function ServiceModal({
  slug,
  open,
  onClose,
  onOpenContact,
}: {
  slug: string | null;
  open: boolean;
  onClose: () => void;
  onOpenContact: (service?: string) => void;
}) {
  const service = SERVICES.find((s) => s.slug === slug) ?? SERVICES[0];
  return (
    <Modal open={open} onClose={onClose} label={`${service.title} service`} size="md">
      <div className="relative overflow-hidden bg-ink p-6 text-white sm:p-8">
        <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(70%_100%_at_85%_0%,#6d3fd4_0%,transparent_65%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="relative max-w-[85%]">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/15 backdrop-blur">
            <Icon name={service.icon} className="h-5 w-5" />
          </span>
          <p className="font-display mt-4 text-[9px] font-bold tracking-[0.16em] text-brand-light uppercase">Service · Maven Marketing</p>
          <h2 className="font-display mt-1.5 text-[27px] leading-[1.05] font-extrabold tracking-[-0.035em] sm:text-[32px]">{service.title}</h2>
          <p className="mt-3 max-w-lg text-[12px] leading-relaxed text-white/60">{service.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-[9px] font-semibold text-white/70">{service.timeline}</span>
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[9px] font-semibold text-emerald-300">{service.metric} {service.metricLabel}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 sm:p-8 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h3 className="font-display text-[14px] font-bold text-ink">What&rsquo;s included</h3>
          <ul className="mt-3 space-y-2.5">
            {service.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[12px] text-ink/75">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-xl border border-line bg-mist p-4">
            <p className="flex items-center gap-2 text-[10.5px] font-semibold text-ink">
              <MessageSquare className="h-3.5 w-3.5 text-brand" /> How we measure success
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
              Before we start, we agree on the commercial outcome and the leading indicators. Every engagement includes
              a live dashboard and a monthly business review.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-brand/15 bg-lilac p-4">
            <p className="font-display text-[26px] leading-none font-extrabold tracking-[-0.04em] text-brand">{service.metric}</p>
            <p className="mt-1.5 text-[10px] text-muted">Our average result: {service.metricLabel}</p>
          </div>
          <div className="rounded-xl border border-line bg-white p-4">
            <p className="font-display text-[9px] font-bold tracking-[0.12em] text-muted uppercase">Best for</p>
            <p className="mt-2 text-[11px] leading-relaxed text-ink/70">
              Teams ready to move from scattered tactics to a measurable growth system.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenContact(service.title);
            }}
            className="btn-primary w-full"
          >
            Start a project <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
          <p className="text-center text-[9.5px] text-muted">Free 30-min consult · No commitment</p>
        </div>
      </div>
    </Modal>
  );
}

export function CaseModal({
  slug,
  open,
  onClose,
  onOpenContact,
}: {
  slug: string | null;
  open: boolean;
  onClose: () => void;
  onOpenContact: (service?: string) => void;
}) {
  const study = WORK.find((w) => w.slug === slug) ?? WORK[0];
  return (
    <Modal open={open} onClose={onClose} label={`${study.client} case study`} size="lg">
      <div className="relative min-h-[210px] overflow-hidden bg-ink sm:min-h-[250px]">
        {study.image ? (
          <img src={study.image} alt={`${study.client} visual`} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 [background:linear-gradient(130deg,#2a1c5c_0%,#4a2a92_55%,#8a5ae8_100%)]">
            <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:44px_44px]" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10" />
        <div className="relative flex min-h-[210px] flex-col justify-end p-6 text-white sm:min-h-[250px] sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-[8px] font-bold tracking-[0.12em] uppercase backdrop-blur">{study.client}</span>
            <span className="rounded-full border border-white/15 bg-black/20 px-2.5 py-1 text-[8px] font-semibold text-white/70 backdrop-blur">{study.year}</span>
            {study.services.map((s) => (
              <span key={s} className="rounded-full border border-white/15 bg-black/20 px-2.5 py-1 text-[8px] font-semibold text-white/70 backdrop-blur">{s}</span>
            ))}
          </div>
          <h2 className="font-display mt-3 max-w-[85%] text-[27px] leading-[1.06] font-extrabold tracking-[-0.04em] sm:text-[36px]">{study.title}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-7 p-6 sm:p-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <p className="text-[13px] leading-relaxed text-ink/75">{study.summary}</p>
          <div className="mt-5">
            <h3 className="font-display text-[14px] font-bold text-ink">The challenge</h3>
            <p className="mt-2 text-[12px] leading-relaxed text-muted">{study.challenge}</p>
          </div>
          <div className="mt-5">
            <h3 className="font-display text-[14px] font-bold text-ink">What we did</h3>
            <ul className="mt-2.5 space-y-2.5">
              {study.approach.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[12px] leading-relaxed text-muted">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mt-6 overflow-hidden rounded-xl border border-line bg-lilac/60 p-5">
            <Quote className="absolute -top-1 right-3 h-12 w-12 rotate-180 text-brand/10" />
            <p className="font-display relative text-[13px] leading-relaxed font-semibold text-ink">&ldquo;{study.quote.text}&rdquo;</p>
            <p className="mt-2 text-[10px] font-medium text-muted">{study.quote.author} · {study.quote.role}</p>
          </div>
        </div>

        <div>
          <div className="rounded-xl border border-line bg-mist p-4">
            <p className="font-display text-[9px] font-bold tracking-[0.13em] text-muted uppercase">The impact</p>
            <div className="mt-3 space-y-3">
              {study.metrics.map((metric) => (
                <div key={metric.label} className="border-b border-line pb-3 last:border-0 last:pb-0">
                  <p className="font-display text-[25px] leading-none font-extrabold tracking-[-0.04em] text-brand">{metric.value}</p>
                  <p className="mt-1 text-[9.5px] tracking-[0.03em] text-muted uppercase">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 rounded-xl bg-ink p-4 text-white">
            <p className="font-display flex items-center gap-1.5 text-[11.5px] font-bold"><TrendingUp className="h-3.5 w-3.5 text-brand-light" /> Want numbers like these?</p>
            <p className="mt-1.5 text-[10px] leading-relaxed text-white/50">Let&rsquo;s scope the biggest opportunity for your brand.</p>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenContact(`Case study: ${study.client}`);
              }}
              className="btn mt-3 w-full bg-white !py-2.5 !text-[9.5px] text-ink hover:bg-brand hover:text-white"
            >
              Start a project <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export function ArticleModal({
  slug,
  open,
  onClose,
  onOpenContact,
}: {
  slug: string | null;
  open: boolean;
  onClose: () => void;
  onOpenContact: (service?: string) => void;
}) {
  const article = ARTICLES.find((a) => a.slug === slug) ?? ARTICLES[0];
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) setCopied(false);
  }, [open]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#insights`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  const initials = article.author
    .split(" ")[0]
    .slice(0, 1) + (article.author.includes(",") ? article.author.split(",")[1].trim().slice(0, 1) : "");

  return (
    <Modal open={open} onClose={onClose} label={`Article: ${article.title}`} size="md">
      <div className="p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-2 pr-10">
          <span className="rounded-full bg-brand/10 px-2.5 py-1 text-[8.5px] font-bold tracking-[0.12em] text-brand uppercase">{article.category}</span>
          <span className="flex items-center gap-1 text-[9.5px] text-muted"><CalendarDays className="h-3 w-3" /> {article.date}</span>
          <span className="flex items-center gap-1 text-[9.5px] text-muted"><Clock3 className="h-3 w-3" /> {article.readTime}</span>
        </div>
        <h2 className="font-display mt-3 max-w-[92%] text-[25px] leading-[1.12] font-extrabold tracking-[-0.035em] text-ink sm:text-[31px]">{article.title}</h2>
        <div className="mt-3 flex items-center justify-between gap-3 border-b border-line pb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-[10px] font-bold text-brand">{initials.toUpperCase()}</span>
            <div>
              <p className="text-[10.5px] font-semibold text-ink">Maven Strategy Team</p>
              <p className="text-[9px] text-muted">{article.author}</p>
            </div>
          </div>
          <button type="button" onClick={copyLink} className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[9.5px] font-semibold text-muted transition hover:border-brand/30 hover:text-brand">
            {copied ? <><Check className="h-3 w-3 text-emerald-500" /> Copied</> : <><Copy className="h-3 w-3" /> Copy link</>}
          </button>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl">
          {article.cover ? (
            <img src={article.cover} alt="" className="aspect-[16/8] w-full object-cover" />
          ) : (
            <div className="relative aspect-[16/8] overflow-hidden [background:linear-gradient(130deg,#2a1c5c,#8a5ae8)]">
              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:40px_40px]" />
              <Sparkles className="absolute right-[10%] bottom-[18%] h-16 w-16 text-white/40" strokeWidth={1} />
            </div>
          )}
        </div>

        <p className="mt-5 border-l-2 border-brand/40 pl-4 text-[13px] leading-relaxed font-medium text-ink/80">{article.excerpt}</p>

        <div className="mt-5 space-y-6">
          {article.sections.map((section) => (
            <div key={section.heading}>
              <h3 className="font-display text-[16px] font-bold tracking-[-0.015em] text-ink">{section.heading}</h3>
              {section.body.map((paragraph) => (
                <p key={paragraph.slice(0, 28)} className="mt-2 text-[12.5px] leading-[1.8] text-muted">{paragraph}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-col items-start justify-between gap-4 rounded-2xl border border-brand/15 bg-lilac/60 p-5 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-[13px] font-bold text-ink">Want this thinking applied to your brand?</p>
            <p className="mt-1 text-[10.5px] text-muted">Book a free 30-minute strategy conversation.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenContact("Strategy conversation");
            }}
            className="btn-primary shrink-0 !py-2.5 !text-[9.5px]"
          >
            Let&rsquo;s talk <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </Modal>
  );
}
