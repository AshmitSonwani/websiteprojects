"use client";

import Link from "next/link";
import { useRef, type PointerEvent } from "react";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";
import SiteShot from "./SiteShot";

export default function ProjectCard({ project, className }: { project: Project; className?: string }) {
  const tiltRef = useRef<HTMLDivElement | null>(null);

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = tiltRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.transform = `perspective(1200px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translate3d(0, -4px, 0)`;
  };

  const reset = () => {
    const node = tiltRef.current;
    if (node) node.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0)";
  };

  return (
    <article className={cn("group relative flex h-full flex-col", className)}>
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-4 rounded-[2rem] opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-60"
          style={{ background: `radial-gradient(circle at 50% 0%, ${project.accent.from}33, transparent 65%)` }}
        />
        <div
          onPointerMove={handleMove}
          onPointerLeave={reset}
          className="relative transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
          style={{ transform: "perspective(1200px)" }}
        >
          <SiteShot project={project} />
        </div>
      </div>

      <div className="mt-5 flex flex-1 flex-col px-0.5">
        <div className="flex items-center justify-between gap-3 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-white/35">
          <span className="truncate">{project.industry}</span>
          <span className="flex shrink-0 items-center gap-1.5">
            <span
              className={cn("h-1 w-1 rounded-full", project.audited ? "bg-cyan" : "bg-gold")}
              aria-hidden="true"
            />
            {project.audited ? "Site audited" : "Audit pending"}
          </span>
        </div>

        <div className="mt-3 flex items-start justify-between gap-4">
          <h3 className="text-[1.35rem] font-medium leading-tight tracking-[-0.03em] text-white">
            <Link href={`/projects/${project.slug}`} className="transition hover:text-white/75">
              {project.name}
            </Link>
          </h3>
          <span
            className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-white/10 font-mono text-[0.55rem] text-white/50"
            style={{ background: `linear-gradient(140deg, ${project.accent.from}30, transparent)` }}
            aria-hidden="true"
          >
            {project.monogram}
          </span>
        </div>

        <p className="mt-2.5 text-[0.85rem] leading-relaxed text-mist">{project.summary}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[0.62rem] text-white/60"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="mt-3.5 flex flex-wrap gap-x-2 gap-y-1">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech.name}
              title={tech.verified ? "Observed on the live site" : "Reported stack — not publicly verified"}
              className={cn(
                "font-mono text-[0.58rem] tracking-[0.04em] text-white/40",
                tech.verified ? "underline decoration-cyan/60 decoration-dotted underline-offset-4" : "decoration-dotted",
              )}
            >
              {tech.name}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/8 pt-4">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-white transition hover:text-cyan"
          >
            Live Project
            <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden="true">
              <path d="M3.5 2.5H9.5V8.5M9.5 2.5 2.5 9.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <Link
            href={`/projects/${project.slug}`}
            className="group/link inline-flex items-center gap-1.5 text-[0.75rem] text-mist transition hover:text-white"
          >
            View Case Study
            <svg
              viewBox="0 0 12 12"
              className="h-2.5 w-2.5 transition-transform duration-300 group-hover/link:translate-x-0.5"
              aria-hidden="true"
            >
              <path d="M2 6h7M6.5 3.5 9 6l-2.5 2.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
