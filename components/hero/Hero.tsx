import Link from "next/link";
import { projectsCount, verifiedTechnologies } from "@/lib/projects";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";
import HeroCanvas from "@/components/scenes/HeroCanvas";

export default function Hero() {
  return (
    <section id="home" className="relative isolate min-h-[100svh] overflow-hidden pb-14 pt-28 sm:pb-20 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_70%_35%,rgba(63,140,255,0.16),transparent_65%),radial-gradient(ellipse_50%_50%_at_20%_80%,rgba(123,97,255,0.15),transparent_70%)]" />
        <div className="grid-bg" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-void" />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 md:left-[38%]">
        <HeroCanvas className="h-full w-full opacity-90 [mask-image:radial-gradient(ellipse_75%_70%_at_60%_50%,#000_35%,transparent_78%)] md:[mask-image:none]" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-void via-void/80 to-transparent md:via-void/45" />

      <div className="shell relative flex min-h-[calc(100svh-8rem)] flex-col justify-center">
        <div className="max-w-[46rem]">
          <div className="animate-fade inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-2 pr-4 backdrop-blur">
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span className="absolute h-2 w-2 rounded-full bg-cyan" />
              <span className="absolute h-2 w-2 animate-ping rounded-full bg-cyan/60" />
            </span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-white/65">
              {site.showcaseLabel}
            </span>
          </div>

          <h1 className="display mt-7 text-[clamp(2.2rem,7.4vw,6.2rem)] uppercase text-white">
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="animate-rise block" style={{ animationDelay: "80ms" }}>
                We engineer
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="animate-rise block" style={{ animationDelay: "200ms" }}>
                digital
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="animate-rise text-gradient block" style={{ animationDelay: "320ms" }}>
                experiences.
              </span>
            </span>
          </h1>

          <p
            className="animate-fade mt-7 max-w-xl text-[0.98rem] leading-relaxed text-mist sm:text-[1.05rem]"
            style={{ animationDelay: "460ms" }}
          >
            A showcase of {projectsCount} live platforms engineered by V3i Technology — education, commerce, travel,
            logistics and support, built in Kanpur and used far beyond it.
          </p>

          <div className="animate-fade mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ animationDelay: "560ms" }}>
            <Magnetic>
              <ButtonLink href="/#work" size="lg">
                Explore Our Work
                <ArrowIcon />
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink href="/#contact" variant="outline" size="lg">
                Let&apos;s Build Something
              </ButtonLink>
            </Magnetic>
          </div>

          <p
            className="animate-fade mt-7 flex max-w-xl flex-wrap items-center gap-x-2 gap-y-1 text-[0.72rem] leading-relaxed text-white/40"
            style={{ animationDelay: "620ms" }}
          >
            <span>Project showcase — not the official V3i Technology website.</span>
            <a
              href={site.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit the official V3i Technology website (opens in a new tab)"
              className="inline-flex items-center gap-1 text-white/80 underline decoration-white/25 underline-offset-4 transition hover:text-white hover:decoration-white"
            >
              Visit the official website
              <ExternalArrow />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </p>

          <dl
            className="animate-fade mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-white/8 pt-6"
            style={{ animationDelay: "700ms" }}
          >
            <div>
              <dt className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-white/35">Shipped</dt>
              <dd className="mt-1.5 text-lg text-white">{projectsCount} platforms</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-white/35">Building since</dt>
              <dd className="mt-1.5 text-lg text-white">{site.founded}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-white/35">Observed stack</dt>
              <dd className="mt-1.5 text-lg text-white">
                {verifiedTechnologies.length > 0 ? `${verifiedTechnologies.length} verified` : "Reported"}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="shell relative mt-10 flex items-center justify-between gap-6 sm:mt-14">
        <Link
          href="/#about"
          className="group inline-flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-white/45 transition hover:text-white"
        >
          <span className="relative flex h-9 w-5 items-start justify-center overflow-hidden rounded-full border border-white/15">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan motion-safe:animate-[drift_2.4s_ease-in-out_infinite]" />
          </span>
          Scroll to explore
        </Link>
        <p className="hidden font-mono text-[0.55rem] uppercase tracking-[0.2em] text-white/25 sm:block">
          Real-time WebGL scene · responsive to cursor
        </p>
      </div>
    </section>
  );
}

function ExternalArrow() {
  return (
    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden="true">
      <path
        d="M3 9 9 3M4 3h5v5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
      aria-hidden="true"
    >
      <path
        d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
