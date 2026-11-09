import type { Metadata } from "next";
import Link from "next/link";
import { categories, projects, projectsCount } from "@/lib/projects";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import ProjectsExplorer from "@/components/project/ProjectsExplorer";

export const metadata: Metadata = {
  title: "Projects",
  description: `A project showcase by ${site.name}: all ${projectsCount} live platforms across education, commerce, travel, logistics, classifieds and support. Filter by discipline or technology.`,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects — ${site.name}`,
    description: `${projectsCount} live platforms across education, commerce, travel, logistics, classifieds and support.`,
    url: `${site.url}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden pb-16 pt-36 sm:pb-20 sm:pt-44">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="grid-bg" />
          <div className="glow-orb left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 bg-violet/20" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-void" />
        </div>

        <div className="shell">
          <nav aria-label="Breadcrumb" className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/35">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white/70" aria-current="page">
                Projects
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <Reveal>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-cyan/80">The full index</p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="display mt-5 text-[clamp(2.7rem,7vw,5.6rem)] text-white">
                  Work that
                  <br />
                  <span className="text-gradient">runs live.</span>
                </h1>
              </Reveal>
            </div>

            <Reveal delay={150}>
              <div className="lg:pb-3">
                <p className="max-w-md text-[0.92rem] leading-relaxed text-mist">
                  A project showcase by {site.name}: {projectsCount} platforms across {categories.length} disciplines.
                  Every entry links to the production site and to a case study that separates observed detail from
                  reported stack.
                </p>
                <p className="mt-6 text-[0.72rem] leading-relaxed text-white/40">
                  {site.disclaimer}{" "}
                  <a
                    href={site.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit the official V3i Technology website (opens in a new tab)"
                    className="text-white/75 underline decoration-white/25 underline-offset-4 transition hover:text-white hover:decoration-white"
                  >
                    Visit the official website
                  </a>
                </p>
                <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-white/8 pt-5">
                  <div>
                    <dt className="font-mono text-[0.5rem] uppercase tracking-[0.16em] text-white/30">Platforms</dt>
                    <dd className="mt-1.5 text-lg text-white">{projectsCount}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.5rem] uppercase tracking-[0.16em] text-white/30">Disciplines</dt>
                    <dd className="mt-1.5 text-lg text-white">{categories.length}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.5rem] uppercase tracking-[0.16em] text-white/30">Since</dt>
                    <dd className="mt-1.5 text-lg text-white">{site.founded}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative pb-24 sm:pb-32" aria-label="Project index">
        <div className="shell">
          <ProjectsExplorer projects={projects} />
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/8 py-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="glow-orb left-1/4 top-0 h-[20rem] w-[20rem] bg-azure/12" />
        </div>
        <div className="shell flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-white/35">Next</p>
            <h2 className="mt-3 max-w-lg text-2xl font-medium tracking-[-0.03em] text-white sm:text-3xl">
              Have a platform that needs to exist?
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/#contact" size="lg">
              Start a project
            </ButtonLink>
            <ButtonLink href="/#process" variant="outline" size="lg">
              See how we work
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
