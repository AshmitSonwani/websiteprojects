import { projects, projectsCount } from "@/lib/projects";
import { ButtonLink } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectsExplorer from "@/components/project/ProjectsExplorer";

export default function ProjectsSection() {
  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-void to-transparent" />

      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="02"
            eyebrow="Selected work"
            title={
              <>
                {projectsCount} platforms,
                <span className="text-white/35"> running in production.</span>
              </>
            }
          />

          <Reveal delay={140}>
            <div className="max-w-sm lg:text-right">
              <p className="text-[0.85rem] leading-relaxed text-mist">
                Filter by discipline, search by name, or narrow by the technology in the reported stack. Every project
                opens a full case study.
              </p>
              <p className="mt-3 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-white/30">
                All links open the live site
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-12">
          <ProjectsExplorer projects={projects} />
        </div>

        <Reveal delay={80}>
          <div className="mt-18 flex flex-col items-start justify-between gap-5 border-t border-white/8 pt-8 sm:flex-row sm:items-center">
            <p className="max-w-lg text-[0.8rem] leading-relaxed text-white/40">
              Case studies state what was observed on the live site, what the studio reports, and what could not be
              verified. Nothing is padded with invented metrics.
            </p>
            <ButtonLink href="/projects" variant="outline">
              View the full index
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                <path
                  d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
