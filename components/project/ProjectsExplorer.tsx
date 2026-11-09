"use client";

import { useMemo, useState } from "react";
import { categories as categoryList, technologies, type Category, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";
import ProjectCard from "./ProjectCard";

type CategoryFilter = Category | "All";

export default function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [technology, setTechnology] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory = category === "All" || project.categories.includes(category);
      const matchesTech =
        technology === "All" || project.stack.some((item) => item.name === technology);
      const haystack = [
        project.name,
        project.summary,
        project.industry,
        project.tagline,
        ...project.categories,
        ...project.stack.map((item) => item.name),
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = needle.length === 0 || haystack.includes(needle);
      return matchesCategory && matchesTech && matchesQuery;
    });
  }, [projects, category, technology, query]);

  const reset = () => {
    setCategory("All");
    setTechnology("All");
    setQuery("");
  };

  const filtersActive = category !== "All" || technology !== "All" || query.trim().length > 0;

  return (
    <div>
      <div className="lg:sticky lg:top-[5.4rem] lg:z-30">
        <div className="glass rounded-2xl p-3 sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <label htmlFor="project-search" className="sr-only">
                Search projects
              </label>
              <svg
                viewBox="0 0 16 16"
                className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/35"
                aria-hidden="true"
              >
                <circle cx="7" cy="7" r="4.4" fill="none" stroke="currentColor" strokeWidth="1.3" />
                <path d="m10.3 10.3 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <input
                id="project-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name, industry or technology"
                autoComplete="off"
                className="h-10 w-full rounded-full border border-white/10 bg-black/30 pl-9 pr-9 text-[0.8rem] text-white placeholder:text-white/30 focus:border-violet/60 focus:outline-none focus:ring-4 focus:ring-violet/15"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-white"
                >
                  <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden="true">
                    <path d="m3 3 6 6M9 3 3 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </button>
              ) : null}
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="stack-filter" className="sr-only">
                Filter by technology
              </label>
              <select
                id="stack-filter"
                value={technology}
                onChange={(event) => setTechnology(event.target.value)}
                className="h-10 appearance-none rounded-full border border-white/10 bg-black/30 bg-[length:0] px-4 pr-8 text-[0.78rem] text-white/80 focus:border-violet/60 focus:outline-none focus:ring-4 focus:ring-violet/15"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='%238b93a7' stroke-width='1.2'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.85rem center",
                }}
              >
                <option value="All">All technologies</option>
                {technologies.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <span className="hidden whitespace-nowrap rounded-full border border-white/10 px-3 py-2 font-mono text-[0.65rem] text-mist sm:inline-block">
                {filtered.length}/{projects.length}
              </span>
            </div>
          </div>

          <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              onClick={() => setCategory("All")}
              aria-pressed={category === "All"}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-[0.72rem] transition",
                category === "All"
                  ? "border-white/25 bg-white text-void"
                  : "border-white/10 bg-white/[0.03] text-mist hover:border-white/25 hover:text-white",
              )}
            >
              All work <span className={category === "All" ? "text-void/50" : "text-white/30"}>{projects.length}</span>
            </button>
            {categoryList.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setCategory(item.name)}
                aria-pressed={category === item.name}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-[0.72rem] transition",
                  category === item.name
                    ? "border-white/25 bg-white text-void"
                    : "border-white/10 bg-white/[0.03] text-mist hover:border-white/25 hover:text-white",
                )}
              >
                {item.name} <span className={category === item.name ? "text-void/50" : "text-white/30"}>{item.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p aria-live="polite" className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
          Showing {filtered.length} of {projects.length} projects
        </p>
        {filtersActive ? (
          <button
            type="button"
            onClick={reset}
            className="text-[0.7rem] text-mist underline decoration-white/20 underline-offset-4 transition hover:text-white"
          >
            Reset filters
          </button>
        ) : null}
      </div>

      {filtered.length > 0 ? (
        <div key={`${category}-${technology}`} className="mt-7 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {filtered.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              className={cn("animate-card-in", index % 2 === 1 && "md:mt-16")}
            />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/12 bg-white/[0.015] px-6 py-16 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/[0.03] font-mono text-lg text-white/40">
            0
          </span>
          <p className="mt-5 text-lg font-medium tracking-[-0.02em] text-white">No projects match that filter</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-mist">
            Try a broader category, clear the stack filter, or search for a different term.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-full bg-white px-5 py-2.5 text-[0.8rem] font-medium text-void transition hover:bg-white/90"
          >
            Show all {projects.length} projects
          </button>
        </div>
      )}
    </div>
  );
}
