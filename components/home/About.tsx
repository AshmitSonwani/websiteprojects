import { site, stats } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";

const focus = [
  "Website development",
  "Custom web applications",
  "Educational platforms",
  "E-commerce solutions",
  "Digital transformation",
];

const flow = [
  { label: "Idea", detail: "A problem worth solving" },
  { label: "Structure", detail: "Scope, data, interface" },
  { label: "Build", detail: "Typed, tested, shipped" },
  { label: "Product", detail: "Maintained in production" },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="glow-orb -left-40 top-20 h-[26rem] w-[26rem] bg-violet/20" />
        <div className="glow-orb -right-32 bottom-0 h-[22rem] w-[22rem] bg-azure/15" />
      </div>

      <div className="shell">
        <div className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-mist">
          <span className="text-cyan/80">01</span>
          <span className="h-px w-8 bg-white/20" aria-hidden="true" />
          <span>About the showcase</span>
        </div>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <Reveal>
              <h2 className="display text-[clamp(2.1rem,4.8vw,4.2rem)] text-white">
                We build the product behind
                <span className="text-white/35"> the promise.</span>
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-8 max-w-xl text-[0.98rem] leading-relaxed text-mist">
                This showcase collects the work of {site.name}, a digital engineering studio in {site.city}. The
                projects focus on the parts of a business that cannot be faked: fee collection that reconciles, test
                engines that time correctly, catalogues that stay readable at a hundred products, documents that
                generate from real records.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-mist">
                Thirteen platforms are live across education, commerce, travel, logistics and support. Some began as a
                single page; several became the operational system a team runs on every day.
              </p>
            </Reveal>

            <Reveal delay={210}>
              <p className="mt-6 max-w-xl rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3 text-[0.76rem] leading-relaxed text-white/50">
                {site.disclaimer}{" "}
                <a
                  href={site.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit the official V3i Technology website (opens in a new tab)"
                  className="text-white/80 underline decoration-white/25 underline-offset-4 transition hover:text-white hover:decoration-white"
                >
                  Visit the official website
                </a>{" "}
                for the company&apos;s services, pricing and enquiries.
              </p>
            </Reveal>

            <div className="mt-10 flex flex-wrap gap-2">
              {focus.map((item, index) => (
                <Reveal key={item} delay={200 + index * 60}>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-2 text-[0.72rem] text-white/65">
                    <span className="h-1 w-1 rounded-full bg-cyan/70" aria-hidden="true" />
                    {item}
                  </span>
                </Reveal>
              ))}
            </div>

            <Reveal delay={280}>
              <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-white/8 pt-8 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-white/30">{stat.label}</dt>
                    <dd className="mt-2 text-2xl font-medium tracking-[-0.03em] text-white">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="relative">
            <Reveal variant="scale">
              <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
                <div className="absolute inset-0 rounded-full border border-white/8" aria-hidden="true" />
                <div
                  className="animate-spin-slow absolute inset-[10%] rounded-full border border-dashed border-white/10"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-[24%] rounded-full border border-violet/20"
                  aria-hidden="true"
                />
                <div
                  className="animate-pulse-soft absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(93,242,214,0.55),rgba(123,97,255,0.35)_45%,transparent_70%)] blur-xl"
                  aria-hidden="true"
                />

                <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_30px_8px_rgba(93,242,214,0.5)]" aria-hidden="true" />

                {flow.map((step, index) => {
                  const positions = [
                    "left-0 top-[16%]",
                    "right-0 top-[30%]",
                    "left-[6%] bottom-[16%]",
                    "right-[4%] bottom-[8%]",
                  ];
                  return (
                    <div
                      key={step.label}
                      className={`absolute ${positions[index]} w-[8.5rem] rounded-xl border border-white/10 bg-ink/70 p-3 backdrop-blur-md`}
                      style={{
                        boxShadow: "0 20px 40px -30px rgba(0,0,0,0.9)",
                        transform: `translateY(${index % 2 === 0 ? "-6px" : "6px"})`,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[0.5rem] uppercase tracking-[0.18em] text-cyan/80">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-white/30" aria-hidden="true" />
                      </div>
                      <p className="mt-2 text-[0.8rem] font-medium text-white">{step.label}</p>
                      <p className="mt-0.5 text-[0.62rem] leading-snug text-mist">{step.detail}</p>
                    </div>
                  );
                })}

                <span className="absolute left-1/2 top-[6%] -translate-x-1/2 font-mono text-[0.5rem] uppercase tracking-[0.22em] text-white/25">
                  Concept → product
                </span>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-6 text-center text-[0.7rem] leading-relaxed text-white/35 lg:text-left">
                An idea moves through structure, build and production. The studio stays involved after launch.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
