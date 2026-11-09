"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/lib/projects";
import { projectScreenshots } from "@/lib/shots";
import { cn } from "@/lib/utils";
import ProjectPreview, { BrowserBar } from "./ProjectPreview";

/**
 * Shows a real capture of the live site when one exists in the screenshot
 * manifest; otherwise — or if the image fails to load — it renders the
 * generated preview so the card never loses its visual.
 */
export default function SiteShot({
  project,
  hero = false,
  className,
}: {
  project: Project;
  hero?: boolean;
  className?: string;
}) {
  const src = projectScreenshots[project.slug];
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <ProjectPreview project={project} compact={!hero} className={className} />;
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#07080e] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]",
        hero ? "aspect-[16/11]" : "aspect-[16/10]",
        className,
      )}
    >
      <BrowserBar domain={project.domain} accent={project.accent} />

      <div className="absolute inset-x-0 bottom-0 top-[1.55rem] overflow-hidden bg-[#0a0c14] sm:top-[1.75rem]">
        <div
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center bg-[linear-gradient(140deg,#0c0e18,#07080e_70%)]"
        >
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.22em] text-white/20">
            {project.domain}
          </span>
        </div>

        <Image
          src={src}
          alt={`Screenshot of the ${project.name} homepage at ${project.domain}`}
          fill
          sizes={hero ? "(min-width: 1280px) 1100px, 100vw" : "(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"}
          loading={hero ? "eager" : "lazy"}
          onError={() => setFailed(true)}
          className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
        />
      </div>
    </div>
  );
}
