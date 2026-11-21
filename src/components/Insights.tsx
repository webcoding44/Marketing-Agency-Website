import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight, ArrowUpRight, CalendarDays, Clock3, Sparkles } from "lucide-react";
import { ARTICLE_CATEGORIES, ARTICLES } from "@/lib/data";
import { cn } from "@/utils/cn";
import { SectionHead } from "./ui";

export default function Insights({
  onOpenArticle,
  onOpenContact,
}: {
  onOpenArticle: (slug: string) => void;
  onOpenContact: (service?: string) => void;
}) {
  const [category, setCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filtered =
    category === "All" ? (showAll ? ARTICLES : ARTICLES.slice(0, 3)) : ARTICLES.filter((article) => article.category === category);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".article-card",
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: "power3.out" }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [category, showAll]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".insight-pill",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: "power2.out", delay: 0.1 }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  function pick(next: string) {
    setCategory(next);
    setShowAll(false);
  }

  return (
    <section ref={sectionRef} id="insights" className="relative overflow-hidden bg-cream py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
      <div className="container-x relative">
        <SectionHead
          eyebrow="Marketing insights"
          title={
            <>
              Trending Tips & <span className="text-gradient">Insights</span>
            </>
          }
          description="Practical thinking on brand, demand, and the systems that make growth repeatable."
          action={
            <button
              type="button"
              onClick={() => {
                setCategory("All");
                setShowAll((v) => !v);
              }}
              className="link-arrow text-brand"
            >
              {showAll ? "Show fewer articles" : "View all articles"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          }
        />

        <div className="insight-filters mt-7 flex flex-wrap items-center gap-2" role="group" aria-label="Filter articles by category">
          {ARTICLE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => pick(cat)}
              aria-pressed={category === cat}
              className={cn(
                "insight-pill font-display rounded-full border px-3.5 py-2 text-[9.5px] font-bold tracking-[0.1em] uppercase transition-all duration-300",
                category === cat
                  ? "border-brand bg-brand text-white shadow-[0_8px_20px_-10px_rgba(109,63,212,0.8)]"
                  : "border-line bg-white text-muted hover:border-brand/40 hover:text-brand"
              )}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto hidden text-[10px] font-medium text-muted/60 sm:block" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "article" : "articles"}
          </span>
        </div>

        <div ref={gridRef} className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {filtered.map((article) => (
            <button
              key={article.slug}
              type="button"
              onClick={() => onOpenArticle(article.slug)}
              className="article-card group flex flex-col overflow-hidden rounded-2xl border border-line bg-white text-left shadow-[0_1px_2px_rgba(30,20,70,0.03)] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-brand/25 hover:shadow-[0_30px_60px_-40px_rgba(60,35,130,0.4)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-ink">
                {article.cover ? (
                  <img
                    src={article.cover}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                    loading="lazy"
                  />
                ) : (
                  <div className="relative h-full w-full overflow-hidden [background:linear-gradient(135deg,#2a1c5c,#6d3fd4)]">
                    <div className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:36px_36px]" />
                    <div className="absolute -top-8 -right-8 h-40 w-40 rounded-full border border-white/20" />
                    <div className="absolute right-10 bottom-[-30px] h-40 w-40 rounded-full bg-brand-light/20 blur-2xl" />
                    <Sparkles className="absolute right-[38%] bottom-[30%] h-12 w-12 text-white/25" strokeWidth={1} />
                    <p className="font-display absolute bottom-4 left-5 max-w-[220px] text-[19px] leading-tight font-extrabold tracking-[-0.03em] text-white/90">
                      Brand is the performance multiplier.
                    </p>
                  </div>
                )}
                <span className="absolute top-3 left-3 rounded-md bg-white/95 px-2.5 py-1 font-display text-[8px] font-bold tracking-[0.13em] text-brand uppercase shadow-sm backdrop-blur">
                  {article.category}
                </span>
                <span className="absolute top-3 right-3 flex h-8 w-8 translate-y-1 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:bg-brand group-hover:text-white group-hover:opacity-100">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <h3 className="font-display text-[15px] leading-[1.32] font-bold tracking-[-0.015em] text-ink transition group-hover:text-brand sm:text-[16px]">
                  {article.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-muted">{article.excerpt}</p>
                <div className="mt-auto flex items-center gap-3 pt-4 text-[9px] font-medium text-muted/85">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" /> {article.date}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-muted/40" />
                  <span className="flex items-center gap-1">
                    <Clock3 className="h-3 w-3" /> {article.readTime}
                  </span>
                </div>
              </div>
            </button>
          ))}

          {filtered.length < 3 && (
            <div className="article-card relative flex min-h-[240px] flex-col justify-between overflow-hidden rounded-2xl bg-ink p-6 text-white">
              <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(70%_80%_at_85%_10%,#6d3fd4_0%,transparent_70%)] opacity-80" />
              <div className="relative">
                <span className="rounded-full border border-white/15 bg-white/[0.07] px-2.5 py-1 text-[8px] font-bold tracking-[0.12em] text-brand-light uppercase">
                  The monthly edit
                </span>
                <h3 className="font-display mt-4 text-[21px] leading-[1.15] font-extrabold tracking-[-0.03em]">
                  Better thinking, once a month.
                </h3>
                <p className="mt-2 text-[11.5px] leading-relaxed text-white/55">
                  One useful idea on brand, demand, and growth. No noise, no filler.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenContact("Newsletter")}
                className="link-arrow relative mt-6 w-fit text-brand-light"
              >
                Join 4,200+ readers <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
