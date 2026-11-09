import type { CSSProperties } from "react";
import { capabilities, capabilityNote } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function TechSection() {
  const step = 360 / capabilities.length;

  return (
    <section id="expertise-toolkit" className="relative overflow-hidden border-y border-white/8 bg-ink/50 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg grid-bg--center opacity-60" />
        <div className="glow-orb left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 bg-violet/15" />
      </div>

      <div className="shell">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <SectionHeading
              index="03"
              eyebrow="Our digital toolkit"
              title={
                <>
                  A stack chosen for
                  <span className="text-white/35"> what the product needs.</span>
                </>
              }
              description="Server-rendered interfaces, typed application code and content systems an editor can actually use. The orbit shows the studio's toolkit; the projects show where it is applied."
            />

            <Reveal delay={200}>
              <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/40">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
                  In a live build
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full border border-white/40" aria-hidden="true" />
                  Studio capability
                </span>
              </div>
              <p className="mt-5 max-w-md text-[0.75rem] leading-relaxed text-white/35">{capabilityNote}</p>
            </Reveal>
          </div>

          <div className="relative">
            <div
              className="orbit-scene relative mx-auto hidden h-[30rem] w-full max-w-[36rem] md:block"
              aria-hidden="true"
            >
              <div className="absolute inset-0 grid place-items-center">
                <div className="relative h-[26rem] w-[26rem]">
                  <div className="absolute inset-0 rounded-full border border-white/[0.06]" />
                  <div className="absolute inset-[12%] rounded-full border border-dashed border-white/[0.07]" />

                  <div className="orbit-stage" style={{ "--tilt": "14deg" } as CSSProperties}>
                    {capabilities.map((capability, index) => (
                      <div
                        key={capability.name}
                        className="orbit-item"
                        style={
                          {
                            "--angle": `${index * step}deg`,
                            "--radius": "12.5rem",
                          } as CSSProperties
                        }
                      >
                        <div className="orbit-label">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full border bg-ink/85 px-3 py-1.5 text-[0.68rem] backdrop-blur ${
                              capability.inPortfolio
                                ? "border-cyan/35 text-white/85"
                                : "border-white/12 text-white/55"
                            }`}
                          >
                            <span
                              className={`h-1 w-1 rounded-full ${
                                capability.inPortfolio ? "bg-cyan" : "border border-white/40"
                              }`}
                            />
                            {capability.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-[radial-gradient(circle,rgba(123,97,255,0.28),rgba(4,5,10,0.9)_70%)] text-center backdrop-blur">
                    <div>
                      <p className="text-lg font-medium tracking-[-0.04em] text-white">V3i</p>
                      <p className="font-mono text-[0.45rem] uppercase tracking-[0.2em] text-white/40">toolkit</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Reveal delay={120}>
              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3.5 border-t border-white/8 pt-6 sm:grid-cols-3">
                {capabilities.map((capability) => (
                  <li key={capability.name} className="flex items-start gap-2">
                    <span
                      className={`mt-[0.45rem] h-1 w-1 shrink-0 rounded-full ${
                        capability.inPortfolio ? "bg-cyan" : "border border-white/40"
                      }`}
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[0.78rem] text-white/80">{capability.name}</p>
                      <p className="text-[0.62rem] leading-snug text-white/35">{capability.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
