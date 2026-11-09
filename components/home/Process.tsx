"use client";

import { useEffect, useRef, useState } from "react";
import { processStages } from "@/lib/site";
import { clamp, cn } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";

export default function Process() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const start = window.innerHeight * 0.75;
      const span = rect.height + window.innerHeight * 0.25;
      setProgress(Math.round(clamp((start - rect.top) / span, 0, 1) * 100) / 100);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const items = itemRefs.current.filter((item): item is HTMLLIElement => Boolean(item));
    if (!items.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (!Number.isNaN(index)) setActive(index);
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const current = processStages[active];

  return (
    <section id="process" className="relative overflow-hidden border-t border-white/8 bg-ink/40 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="glow-orb right-0 top-40 h-[24rem] w-[24rem] bg-azure/12" />
      </div>

      <div className="shell" ref={sectionRef}>
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-mist">
              <span className="text-cyan/80">05</span>
              <span className="h-px w-8 bg-white/20" aria-hidden="true" />
              <span>How we work</span>
            </div>

            <h2 className="display mt-6 text-[clamp(2rem,4.4vw,3.6rem)] text-white">
              Seven stages,
              <span className="text-white/35"> no hand-offs.</span>
            </h2>

            <p className="mt-6 max-w-sm text-[0.9rem] leading-relaxed text-mist">
              Every engagement runs the same spine: understand the problem, agree the scope, design the system, build
              it, test the paths that matter, ship it properly, then stay for the changes.
            </p>

            <div className="mt-10 hidden items-stretch gap-5 lg:flex">
              <div className="rail w-px" aria-hidden="true">
                <div className="rail__fill" style={{ height: `${progress * 100}%` }} />
              </div>

              <div>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-white/30">
                  Stage {String(active + 1).padStart(2, "0")} / 07
                </p>
                <p key={current.title} className="animate-card-in mt-2 text-2xl font-medium tracking-[-0.03em] text-white">
                  {current.title}
                </p>
                <p className="mt-1 max-w-xs text-[0.78rem] leading-relaxed text-mist">{current.deliverables.join(" · ")}</p>

                <div className="mt-6 flex items-center gap-4">
                  <span className="font-mono text-[0.6rem] text-white/30">{Math.round(progress * 100)}%</span>
                  <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-white/25">
                    Concept → launch
                  </span>
                </div>
              </div>
            </div>
          </div>

          <ol className="relative">
            <span aria-hidden="true" className="absolute bottom-6 left-[1.05rem] top-6 w-px bg-white/8 lg:left-[1.3rem]" />
            {processStages.map((stage, index) => (
              <li
                key={stage.index}
                ref={(element) => {
                  itemRefs.current[index] = element;
                }}
                data-index={index}
                className="relative pb-10 pl-12 last:pb-0 sm:pl-16"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0 top-0 grid h-[2.1rem] w-[2.1rem] place-items-center rounded-full border font-mono text-[0.55rem] transition-all duration-500 lg:left-[0.25rem]",
                    active === index
                      ? "border-cyan/60 bg-cyan/10 text-cyan shadow-[0_0_30px_-6px_rgba(93,242,214,0.6)]"
                      : "border-white/12 bg-void text-white/35",
                  )}
                >
                  {stage.index}
                </span>

                <div
                  className={cn(
                    "rounded-xl border p-5 transition-all duration-500",
                    active === index
                      ? "border-white/15 bg-white/[0.045]"
                      : "border-white/8 bg-white/[0.015]",
                  )}
                >
                  <h3 className="text-[1.05rem] font-medium tracking-[-0.02em] text-white">{stage.title}</h3>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-mist">{stage.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {stage.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="rounded-full border border-white/8 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.08em] text-white/40"
                      >
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <Reveal delay={80}>
          <div className="mt-4 flex items-center justify-between gap-4 border-t border-white/8 pt-6 lg:mt-8">
            <p className="max-w-xl text-[0.7rem] leading-relaxed text-white/30">
              Timelines are scoped per project and confirmed in writing before work starts. No stage is skipped; no
              delivery date is invented on a sales call.
            </p>
            <span className="hidden font-mono text-[0.55rem] uppercase tracking-[0.18em] text-white/20 sm:block">
              Research → Maintenance
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
