import { ButtonLink } from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";
import Reveal from "@/components/ui/Reveal";

export default function Impact() {
  return (
    <section className="relative overflow-hidden border-y border-white/8 py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(63,140,255,0.14),transparent_70%),radial-gradient(ellipse_40%_40%_at_20%_80%,rgba(123,97,255,0.18),transparent_70%)]" />
        <div className="grid-bg grid-bg--center opacity-50" />
        <div
          className="animate-spin-slow absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]"
          aria-hidden="true"
        />
        <div
          className="animate-spin-slow absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.06]"
          style={{ animationDirection: "reverse", animationDuration: "120s" }}
          aria-hidden="true"
        />
      </div>

      <div className="shell relative text-center">
        <Reveal>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-white/40">The output</p>
        </Reveal>

        <Reveal delay={90}>
          <h2 className="display mx-auto mt-7 max-w-5xl text-[clamp(2.2rem,6.2vw,5.4rem)] text-white">
            Turning complex ideas into
            <span className="text-gradient"> powerful digital products.</span>
          </h2>
        </Reveal>

        <Reveal delay={180}>
          <p className="mx-auto mt-8 max-w-xl text-[0.95rem] leading-relaxed text-mist">
            The work is not the animation on the homepage. It is the fee receipt that reconciles, the result that
            saves, the document that prints correctly — held together by an interface people can learn in an afternoon.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Magnetic>
              <ButtonLink href="/#contact" size="lg">
                Start a conversation
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                  <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink href="/projects" variant="outline" size="lg">
                Browse all 13 projects
              </ButtonLink>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={340}>
          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/8 bg-white/[0.06] sm:grid-cols-4">
            {[
              { value: "7", label: "Industries" },
              { value: "13", label: "Platforms" },
              { value: "2018", label: "Since" },
              { value: "1", label: "Accountable team" },
            ].map((stat) => (
              <div key={stat.label} className="bg-void/85 px-4 py-5">
                <p className="text-xl font-medium tracking-[-0.03em] text-white">{stat.value}</p>
                <p className="mt-1 font-mono text-[0.52rem] uppercase tracking-[0.16em] text-white/30">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
