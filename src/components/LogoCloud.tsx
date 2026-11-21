import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BRANDS } from "@/lib/data";
import { BrandMark } from "./ui";

export default function LogoCloud() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const wrapper = sectionRef.current;
    if (!track || !wrapper) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 32,
      ease: "none",
      repeat: -1,
    });
    const pause = () => tween.timeScale(0.15);
    const resume = () => tween.timeScale(1);
    wrapper.addEventListener("mouseenter", pause);
    wrapper.addEventListener("mouseleave", resume);
    wrapper.addEventListener("focusin", pause);
    wrapper.addEventListener("focusout", resume);

    return () => {
      wrapper.removeEventListener("mouseenter", pause);
      wrapper.removeEventListener("mouseleave", resume);
      wrapper.removeEventListener("focusin", pause);
      wrapper.removeEventListener("focusout", resume);
      tween.kill();
    };
  }, []);

  const group = (key: string) => (
    <div key={key} className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12 xl:gap-16 xl:pr-16" aria-hidden={key === "b"}>
      {BRANDS.map((brand) => (
        <div
          key={`${key}-${brand.name}`}
          className="group flex shrink-0 items-center gap-2 text-ink/45 transition-colors duration-300 hover:text-brand"
        >
          <BrandMark mark={brand.mark} className="h-[20px] w-[20px] opacity-80" />
          <span className="font-display text-[16px] font-bold tracking-[-0.02em] whitespace-nowrap sm:text-[18px]">
            {brand.name}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div ref={sectionRef} className="relative border-y border-line/80 bg-white py-6 sm:py-7">
      <div className="container-x flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
        <p className="font-display shrink-0 text-center text-[9px] leading-relaxed font-bold tracking-[0.17em] text-muted/80 uppercase sm:text-left sm:text-[9.5px]">
          Trusted by
          <br className="hidden sm:block" /> growing brands
        </p>
        <div className="marquee-mask w-full overflow-hidden">
          <div ref={trackRef} className="flex w-max items-center">
            {group("a")}
            {group("b")}
          </div>
        </div>
      </div>
    </div>
  );
}
