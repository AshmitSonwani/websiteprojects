import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdjacentProjects, getProject, projects, type Project } from "@/lib/projects";
import { processStages, site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SiteShot from "@/components/project/SiteShot";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  const path = `/projects/${project.slug}`;

  return {
    title: project.name,
    description: project.summary,
    keywords: [project.name, project.industry, ...project.categories],
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: `${project.name} — ${project.tagline}`,
      description: project.summary,
      url: `${site.url}${path}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — ${project.tagline}`,
      description: project.summary,
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(project.slug);
  const accentStyle = { "--a1": project.accent.from, "--a2": project.accent.to } as CSSProperties;

  return (
    <div className="relative" style={accentStyle}>
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[42rem] overflow-hidden">
        <div
          className="absolute -top-40 left-1/2 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
          style={{ background: `radial-gradient(circle, ${project.accent.from}, transparent 65%)` }}
        />
        <div className="grid-bg opacity-70" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-void" />
      </div>

      <section className="pb-14 pt-32 sm:pt-40">
        <div className="shell">
          <p className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.7rem] leading-relaxed text-white/35">
            <span>Project showcase by {site.name} — not the official company website.</span>
            <a
              href={site.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit the official V3i Technology website (opens in a new tab)"
              className="text-white/70 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white"
            >
              Visit the official website
            </a>
          </p>

          <nav aria-label="Breadcrumb" className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/35">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/projects" className="transition hover:text-white">
                  Projects
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white/70" aria-current="page">
                {project.name}
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
            <div>
              <Reveal>
                <ul className="flex flex-wrap gap-1.5">
                  {project.categories.map((category) => (
                    <li
                      key={category}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[0.52rem] uppercase tracking-[0.12em] text-white/55"
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={70}>
                <h1 className="display mt-5 text-[clamp(2.6rem,6.4vw,5.2rem)] text-white">{project.name}</h1>
              </Reveal>

              <Reveal delay={130}>
                <p className="mt-4 max-w-lg text-[1.05rem] leading-snug text-white/55">{project.tagline}</p>
              </Reveal>
            </div>

            <Reveal delay={180}>
              <div>
                <p className="max-w-md text-[0.9rem] leading-relaxed text-mist">{project.summary}</p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <ButtonLink href={project.url} external ariaLabel={`Open ${project.name} live site`}>
                    Live Project
                    <ExternalIcon />
                  </ButtonLink>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-white/45">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${project.audited ? "bg-cyan" : "bg-gold"}`}
                      aria-hidden="true"
                    />
                    {project.audited ? "Site audited" : "Audit pending"}
                  </span>
                </div>

                <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-white/8 pt-5">
                  <div>
                    <dt className="font-mono text-[0.5rem] uppercase tracking-[0.16em] text-white/30">Domain</dt>
                    <dd className="mt-1 truncate text-[0.82rem] text-white/75">{project.domain}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.5rem] uppercase tracking-[0.16em] text-white/30">Industry</dt>
                    <dd className="mt-1 text-[0.82rem] leading-snug text-white/75">{project.industry}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} variant="scale">
            <div className="mt-12 sm:mt-16">
              <SiteShot project={project} hero />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="shell grid gap-14 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-20">
          <article className="min-w-0 space-y-14">
            <Block index="01" id="overview" title="Overview">
              <p>{project.overview}</p>
              <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-white/8 bg-white/[0.06] sm:grid-cols-2">
                {project.services.map((service) => (
                  <div key={service} className="bg-void/90 px-4 py-3">
                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-white/45">{service}</p>
                  </div>
                ))}
              </div>
            </Block>

            <Block index="02" id="problem" title="The problem">
              <p>{project.problem}</p>
            </Block>

            <Block index="03" id="objectives" title="Objectives">
              <ul className="space-y-3">
                {project.objectives.map((objective, index) => (
                  <li key={objective} className="flex gap-4">
                    <span className="mt-0.5 font-mono text-[0.6rem] text-cyan/70">{String(index + 1).padStart(2, "0")}</span>
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block index="04" id="audience" title="Who it serves">
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {project.audience.map((audience) => (
                  <li key={audience} className="flex items-start gap-2.5 rounded-lg border border-white/8 bg-white/[0.02] px-3.5 py-3">
                    <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-white/40" aria-hidden="true" />
                    <span className="text-[0.82rem] leading-snug text-white/70">{audience}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block index="05" id="features" title="What the product does">
              <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <svg
                      viewBox="0 0 16 16"
                      className="mt-1 h-3 w-3 shrink-0 text-cyan"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path d="m2.5 8.5 3.5 3.5L13.5 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[0.86rem] leading-relaxed text-white/75">{feature}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block index="06" id="modules" title="Modules & surfaces">
              <div className="grid gap-3 sm:grid-cols-2">
                {project.modules.map((module) => (
                  <div key={module.name} className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
                    <p className="text-[0.85rem] font-medium text-white/90">{module.name}</p>
                    <p className="mt-1.5 text-[0.75rem] leading-relaxed text-mist">{module.detail}</p>
                  </div>
                ))}
              </div>
            </Block>

            <Block index="07" id="design" title="Design approach">
              <ul className="space-y-4">
                {project.design.map((item) => (
                  <li key={item} className="border-l border-white/12 pl-4 text-[0.875rem] leading-relaxed text-mist">
                    {item}
                  </li>
                ))}
              </ul>
            </Block>

            <Block index="08" id="experience" title="Experience & interaction">
              <ul className="space-y-4">
                {project.ux.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[0.55rem] h-px w-4 shrink-0 bg-white/25" aria-hidden="true" />
                    <span className="text-[0.875rem] leading-relaxed text-mist">{item}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block index="09" id="responsive" title="Responsive behaviour">
              <ul className="space-y-4">
                {project.responsive.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[0.55rem] h-px w-4 shrink-0 bg-white/25" aria-hidden="true" />
                    <span className="text-[0.875rem] leading-relaxed text-mist">{item}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block index="10" id="process" title="Process applied">
              <p className="text-[0.8rem] leading-relaxed text-white/45">
                The studio runs a standard seven-stage process. The sequence below is that framework, not a dated
                project timeline or a claim about the hours spent on this build.
              </p>
              <ol className="mt-6 grid gap-px overflow-hidden rounded-xl border border-white/8 bg-white/[0.06] sm:grid-cols-2">
                {processStages.map((stage) => (
                  <li key={stage.index} className="bg-void/90 p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[0.55rem] text-cyan/70">{stage.index}</span>
                      <span className="text-[0.82rem] font-medium text-white/90">{stage.title}</span>
                    </div>
                    <p className="mt-1.5 text-[0.72rem] leading-relaxed text-mist">{stage.description}</p>
                  </li>
                ))}
              </ol>
            </Block>

            <Block index="11" id="value" title="Business value">
              <ul className="space-y-4">
                {project.businessValue.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[0.55rem] h-px w-4 shrink-0 bg-cyan/50" aria-hidden="true" />
                    <span className="text-[0.875rem] leading-relaxed text-mist">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-lg border border-white/8 bg-white/[0.02] p-3.5 text-[0.72rem] leading-relaxed text-white/35">
                No performance figures, conversion rates or revenue outcomes are published for this project — none were
                measured by this audit, and inventing them would misrepresent the work.
              </p>
            </Block>
          </article>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl border border-white/10 bg-panel/50 p-5 backdrop-blur">
              <p className="font-mono text-[0.52rem] uppercase tracking-[0.16em] text-white/35">Reported stack</p>
              <ul className="mt-3 space-y-2">
                {project.stack.map((item) => (
                  <li key={item.name} className="flex items-center justify-between gap-3">
                    <span className="text-[0.8rem] text-white/80">{item.name}</span>
                    <span
                      className={`rounded-full border px-2 py-0.5 font-mono text-[0.45rem] uppercase tracking-[0.1em] ${
                        item.verified
                          ? "border-cyan/40 text-cyan/90"
                          : "border-white/10 text-white/30"
                      }`}
                    >
                      {item.verified ? "Verified" : "Reported"}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-white/8 pt-3 text-[0.65rem] leading-relaxed text-white/30">
                Verified means the technology was observable on the live property. Reported means the studio supplied
                the stack; it was not independently confirmed on the production server.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.025] p-5">
              <p className="font-mono text-[0.52rem] uppercase tracking-[0.16em] text-white/35">
                {project.audited ? "Audit note" : "Audit limitation"}
              </p>
              <p className="mt-2.5 text-[0.72rem] leading-relaxed text-mist">{project.auditNote}</p>
              <p className="mt-3 font-mono text-[0.48rem] uppercase tracking-[0.1em] text-white/25">
                Reviewed {site.auditDate}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.025] p-5">
              <p className="font-mono text-[0.52rem] uppercase tracking-[0.16em] text-white/35">On this page</p>
              <ul className="mt-3 space-y-1.5">
                {[
                  ["overview", "Overview"],
                  ["problem", "The problem"],
                  ["objectives", "Objectives"],
                  ["audience", "Audience"],
                  ["features", "Features"],
                  ["modules", "Modules"],
                  ["design", "Design"],
                  ["experience", "Experience"],
                  ["responsive", "Responsive"],
                  ["process", "Process"],
                  ["value", "Business value"],
                ].map(([id, label]) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="text-[0.72rem] text-white/45 transition hover:text-white"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.025] p-5">
              <p className="text-[0.8rem] leading-relaxed text-mist">
                Want the same level of detail applied to your product?
              </p>
              <ButtonLink href="/#contact" size="md" className="mt-4 w-full">
                Start a project
              </ButtonLink>
            </div>
          </aside>
        </div>
      </section>

      <section className="relative border-t border-white/8" aria-label="More projects">
        <div className="shell grid gap-px bg-white/8 sm:grid-cols-2">
          <AdjacentLink project={previous} direction="Previous" />
          <AdjacentLink project={next} direction="Next" />
        </div>
      </section>
    </div>
  );
}

function Block({
  index,
  id,
  title,
  children,
}: {
  index: string;
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[0.55rem] tracking-[0.18em] text-cyan/70">{index}</span>
        <h2 className="text-xl font-medium tracking-[-0.02em] text-white sm:text-2xl">{title}</h2>
      </div>
      <div className="mt-4 border-t border-white/8 pt-5 text-[0.9rem] leading-relaxed text-mist">{children}</div>
    </section>
  );
}

function AdjacentLink({ project, direction }: { project: Project; direction: "Previous" | "Next" }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative bg-void px-6 py-10 transition-colors duration-500 hover:bg-panel sm:px-10 sm:py-14"
    >
      <p className="font-mono text-[0.52rem] uppercase tracking-[0.2em] text-white/30">{direction}</p>
      <div className="mt-4 flex items-center justify-between gap-6">
        <div>
          <p className="text-2xl font-medium tracking-[-0.03em] text-white sm:text-3xl">{project.name}</p>
          <p className="mt-1.5 max-w-sm text-[0.78rem] leading-relaxed text-mist">{project.tagline}</p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/12 text-white/50 transition group-hover:border-white/30 group-hover:text-white">
          <svg
            viewBox="0 0 16 16"
            className={`h-3.5 w-3.5 ${direction === "Previous" ? "rotate-180" : ""}`}
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
        </span>
      </div>
    </Link>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M6 3.5h6.5V10M12 4 5 11"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
