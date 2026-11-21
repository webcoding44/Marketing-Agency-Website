import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Mail,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import { NAV_LINKS, SERVICES } from "@/lib/data";
import { cn } from "@/utils/cn";
import { Icon, Logo } from "./ui";

type NavbarProps = {
  onOpenContact: (service?: string) => void;
  onOpenService: (slug: string) => void;
};

const RESOURCE_LINKS = [
  { label: "Insights & articles", href: "#insights", desc: "Ideas from our strategists" },
  { label: "Free growth audit", href: "#newsletter", desc: "A fresh pair of eyes" },
  { label: "Case studies", href: "#work", desc: "Proof, not promises" },
  { label: "FAQs", href: "#faq", desc: "How we work together" },
];

export default function Navbar({ onOpenContact, onOpenService }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!openMenu) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const el = menuRef.current?.querySelector<HTMLElement>("[data-nav-dropdown]");
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { opacity: 0, y: -8, scale: 0.99 }, { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: "power3.out" });
      gsap.fromTo(
        el.querySelectorAll("[data-drop-item]"),
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.32, stagger: 0.035, ease: "power2.out", delay: 0.05 }
      );
    });
    return () => ctx.revert();
  }, [openMenu]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    if (!mobileOpen) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.fromTo(".mobile-nav-shell", { yPercent: -100 }, { yPercent: 0, duration: 0.55, ease: "power4.out" });
      gsap.fromTo(
        ".mobile-nav-link",
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, delay: 0.15, ease: "power3.out" }
      );
      gsap.fromTo(".mobile-nav-foot", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.42 });
    });
    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function dismissBanner() {
    const el = bannerRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setBannerOpen(false);
      return;
    }
    gsap.to(el, {
      height: 0,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => setBannerOpen(false),
    });
  }

  function handleNavClick() {
    setOpenMenu(null);
    setMobileOpen(false);
  }

  return (
    <div className="relative z-50">
      {bannerOpen && (
        <div
          ref={bannerRef}
          className="relative overflow-hidden bg-[linear-gradient(100deg,#6d3fd4_0%,#5a2cbe_55%,#7b4ee0_100%)] text-white"
        >
          <div className="container-x flex h-[38px] items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => onOpenContact("Free marketing audit")}
              className="group flex min-w-0 items-center gap-2 text-left text-[10.5px] font-medium tracking-[0.02em] sm:text-[11.5px]"
            >
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-300" aria-hidden="true" />
              <span className="truncate">
                <span className="mr-1.5 rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-bold tracking-[0.08em] uppercase">New</span>
                Get a Free Marketing Audit for Your Business — Limited Time Offer
              </span>
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenContact("Free marketing audit")}
                className="hidden shrink-0 items-center gap-1.5 text-[9.5px] font-bold tracking-[0.14em] uppercase transition hover:text-amber-200 sm:inline-flex"
              >
                Get your free audit <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={dismissBanner}
                aria-label="Dismiss announcement"
                className="ml-1 rounded-full p-1 text-white/70 transition hover:bg-white/15 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-white/95 transition-[box-shadow,background-color] duration-300",
          scrolled ? "border-line/80 shadow-[0_10px_30px_-24px_rgba(30,20,70,0.5)] backdrop-blur-xl" : "border-transparent"
        )}
      >
        <div className="container-x flex h-[74px] items-center justify-between gap-4 lg:h-[80px]">
          <a href="#top" aria-label="Maven Marketing home" onClick={handleNavClick} className="shrink-0">
            <Logo />
          </a>

          <div ref={menuRef} className="hidden items-center gap-0.5 lg:flex" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => {
              const hasMenu = Boolean(link.menu);
              const isOpen = openMenu === link.menu && hasMenu;
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => {
                    if (hasMenu) setOpenMenu(link.menu ?? null);
                  }}
                  onMouseLeave={() => {
                    if (hasMenu) setOpenMenu(null);
                  }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (hasMenu) {
                        e.preventDefault();
                        setOpenMenu(isOpen ? null : link.menu ?? null);
                        return;
                      }
                      handleNavClick();
                    }}
                    aria-expanded={hasMenu ? isOpen : undefined}
                    className={cn(
                      "font-display flex items-center gap-1 rounded-full px-3.5 py-2 text-[12.5px] font-semibold text-ink/75 transition hover:bg-brand/[0.06] hover:text-brand xl:px-4",
                      isOpen && "bg-brand/[0.06] text-brand"
                    )}
                  >
                    {link.label}
                    {hasMenu && (
                      <ChevronDown
                        className={cn("h-3.5 w-3.5 opacity-60 transition-transform duration-300", isOpen && "rotate-180")}
                        aria-hidden="true"
                      />
                    )}
                  </a>

                  {isOpen && link.menu === "services" && (
                    <div
                      data-nav-dropdown
                      className="absolute top-full left-1/2 mt-3 w-[580px] -translate-x-1/2 overflow-hidden rounded-2xl border border-line bg-white p-3 shadow-[0_30px_80px_-30px_rgba(36,20,80,0.35)]"
                    >
                      <div className="mb-2 flex items-center justify-between px-3 pt-1.5">
                        <span className="eyebrow">What we do</span>
                        <a href="#services" onClick={handleNavClick} className="link-arrow text-brand normal-case">
                          All services <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {SERVICES.map((service) => (
                          <a
                            key={service.slug}
                            data-drop-item
                            href="#services"
                            onClick={() => handleNavClick()}
                            onFocus={() => setOpenMenu("services")}
                            className="group flex items-start gap-3 rounded-xl p-3 transition hover:bg-lilac"
                          >
                            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white">
                              <Icon name={service.icon} className="h-4 w-4" />
                            </span>
                            <span>
                              <span className="font-display block text-[12.5px] font-bold text-ink">{service.title}</span>
                              <span className="mt-0.5 block text-[11px] leading-snug text-muted">{service.short}</span>
                            </span>
                          </a>
                        ))}
                      </div>
                      <div className="mt-2 flex items-center justify-between rounded-xl bg-ink px-4 py-3">
                        <span className="text-[11.5px] text-white/70">Not sure where to start? Get a free audit.</span>
                        <ArrowUpRight className="h-4 w-4 text-brand-light" />
                      </div>
                    </div>
                  )}

                  {isOpen && link.menu === "resources" && (
                    <div
                      data-nav-dropdown
                      className="absolute top-full right-0 mt-3 w-[320px] overflow-hidden rounded-2xl border border-line bg-white p-2.5 shadow-[0_30px_80px_-30px_rgba(36,20,80,0.35)]"
                    >
                      {RESOURCE_LINKS.map((item) => (
                        <a
                          key={item.label}
                          data-drop-item
                          href={item.href}
                          onClick={handleNavClick}
                          className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition hover:bg-lilac"
                        >
                          <span>
                            <span className="block text-[12.5px] font-semibold text-ink">{item.label}</span>
                            <span className="block text-[11px] text-muted">{item.desc}</span>
                          </span>
                          <ArrowUpRight className="h-4 w-4 text-muted transition group-hover:text-brand" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenContact()}
              className="btn-primary hidden !px-5 !py-2.5 !text-[11px] sm:inline-flex lg:!px-6 lg:!py-3 lg:!text-[12px]"
            >
              Let&rsquo;s talk
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition hover:border-brand hover:text-brand lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div ref={mobileRef} className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-[#100b25]/45 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="mobile-nav-shell absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto rounded-b-3xl bg-white pt-[86px] pb-8 shadow-2xl">
            <div className="container-x">
              <nav className="mt-4 flex flex-col divide-y divide-line/70 border-y border-line/70" aria-label="Mobile primary navigation">
                {NAV_LINKS.map((link, i) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={handleNavClick}
                    className="mobile-nav-link group flex items-center justify-between py-4"
                  >
                    <span className="font-display flex items-baseline gap-3 text-[22px] font-bold text-ink group-hover:text-brand">
                      <span className="text-[10px] font-semibold tracking-[0.1em] text-muted/60">0{i + 1}</span>
                      {link.label}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-muted transition group-hover:translate-x-0.5 group-hover:text-brand" />
                  </a>
                ))}
              </nav>

              <div className="mobile-nav-link mt-5 grid grid-cols-2 gap-2">
                {SERVICES.slice(0, 4).map((service) => (
                  <button
                    key={service.slug}
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      onOpenService(service.slug);
                    }}
                    className="flex items-center gap-2 rounded-xl bg-mist px-3 py-3 text-left text-[11.5px] font-semibold text-ink transition hover:bg-lilac hover:text-brand"
                  >
                    <Icon name={service.icon} className="h-4 w-4 text-brand" />
                    {service.title}
                  </button>
                ))}
              </div>

              <div className="mobile-nav-foot mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenContact();
                  }}
                  className="btn-primary w-full"
                >
                  Let&rsquo;s talk <ArrowRight className="h-4 w-4" />
                </button>
                <a href="mailto:hello@mavenmarketing.com" className="flex items-center justify-center gap-2 py-2 text-[12px] text-muted">
                  <Mail className="h-4 w-4 text-brand" /> hello@mavenmarketing.com
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
