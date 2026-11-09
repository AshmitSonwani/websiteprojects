import type { CSSProperties, ReactNode } from "react";
import type { PreviewSpec, Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

type Accent = Project["accent"];

export default function ProjectPreview({
  project,
  className,
  compact = false,
}: {
  project: Project;
  className?: string;
  compact?: boolean;
}) {
  const { preview, accent } = project;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#07080e] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]",
        compact ? "aspect-[16/10]" : "aspect-[16/11]",
        className,
      )}
      style={{ "--a1": accent.from, "--a2": accent.to } as CSSProperties}
    >
      <BrowserBar domain={project.domain} accent={accent} />

      <div className="absolute inset-x-0 bottom-0 top-[1.55rem] overflow-hidden sm:top-[1.75rem]">
        <VariantBody project={project} />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
    </div>
  );
}

export function BrowserBar({ domain, accent }: { domain: string; accent: Accent }) {
  return (
    <div className="flex h-[1.55rem] items-center gap-1.5 border-b border-white/8 bg-white/[0.03] px-2.5 sm:h-[1.75rem]">
      <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
      <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
      <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
      <span className="ml-2 flex flex-1 items-center gap-1 rounded-[0.25rem] border border-white/8 bg-black/40 px-1.5 py-0.5">
        <svg viewBox="0 0 10 10" className="h-2 w-2" aria-hidden="true" style={{ color: accent.soft }}>
          <path d="M5 1.4a2 2 0 0 0-2 2v1H2.4v4h5.2v-4H7v-1a2 2 0 0 0-2-2Zm0 1a1 1 0 0 1 1 1v1H4v-1a1 1 0 0 1 1-1Z" fill="currentColor" />
        </svg>
        <span className="truncate font-mono text-[0.4rem] tracking-wide text-white/45">{domain}</span>
      </span>
      <span className="h-2 w-4 rounded-sm border border-white/10" />
    </div>
  );
}

function VariantBody({ project }: { project: Project }) {
  const { preview, accent } = project;
  switch (preview.variant) {
    case "dashboard":
      return <Dashboard p={preview} accent={accent} />;
    case "platform":
      return <Platform p={preview} accent={accent} />;
    case "helpdesk":
      return <Helpdesk p={preview} accent={accent} />;
    case "store":
      return <Store p={preview} accent={accent} />;
    case "school":
      return <School p={preview} accent={accent} />;
    case "classifieds":
      return <Classifieds p={preview} accent={accent} />;
    case "courses":
      return <Courses p={preview} accent={accent} />;
    case "travel":
      return <Travel p={preview} accent={accent} />;
    case "campus":
      return <Campus p={preview} accent={accent} />;
    case "agency":
      return <Agency p={preview} accent={accent} />;
    case "logistics":
      return <Logistics p={preview} accent={accent} />;
    case "college":
      return <College p={preview} accent={accent} />;
    default:
      return null;
  }
}

/* ------------------------------- shared ------------------------------- */

function Chip({ children, accent }: { children: ReactNode; accent?: Accent }) {
  if (accent) {
    return (
      <span
        className="rounded-full px-1.5 py-[0.15rem] text-[0.4rem] font-medium leading-none text-black/85"
        style={{ background: `linear-gradient(120deg, ${accent.soft}, ${accent.to})` }}
      >
        {children}
      </span>
    );
  }
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.05] px-1.5 py-[0.15rem] text-[0.4rem] leading-none text-white/60">
      {children}
    </span>
  );
}

function Line({ w = "100%", dim = false }: { w?: string; dim?: boolean }) {
  return <span className={cn("block h-[0.18rem] rounded-full", dim ? "bg-white/8" : "bg-white/15")} style={{ width: w }} />;
}

function Status({ children, accent }: { children: ReactNode; accent: Accent }) {
  return (
    <span className="flex items-center gap-1 font-mono text-[0.38rem] uppercase tracking-[0.12em] text-white/45">
      <span className="h-1 w-1 rounded-full" style={{ background: accent.soft }} />
      {children}
    </span>
  );
}

/* ------------------------------- dashboard ------------------------------- */

function Dashboard({ p, accent }: { p: PreviewSpec; accent: Accent }) {
  return (
    <div className="flex h-full">
      <aside className="hidden w-[13%] flex-col gap-1.5 border-r border-white/8 p-2 sm:flex">
        <span className="mb-1 grid h-4 w-4 place-items-center rounded-[0.25rem] text-[0.4rem] font-bold text-black" style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}>
          {p.brand.charAt(0)}
        </span>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className={cn("rounded-[0.25rem] px-1 py-1", i === 0 && "bg-white/[0.06]")}>
            <Line w={i === 0 ? "80%" : "65%"} dim={i !== 0} />
          </div>
        ))}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col p-2 sm:p-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[0.48rem] font-semibold tracking-tight text-white/85">{p.brand}</span>
          <div className="flex items-center gap-1">
            <Status accent={accent}>{p.status ?? "Live"}</Status>
          </div>
        </div>

        <div className="mt-1.5 flex flex-wrap gap-1">
          {p.chips.map((chip, index) => (
            <Chip key={chip} accent={index === 0 ? accent : undefined}>
              {chip}
            </Chip>
          ))}
        </div>

        <div className="relative mt-1.5 overflow-hidden rounded-[0.4rem] border border-white/10 bg-white/[0.03] p-2">
          <div
            className="pointer-events-none absolute -right-4 -top-6 h-16 w-16 rounded-full opacity-30 blur-xl"
            style={{ background: accent.from }}
          />
          <p className="text-[0.6rem] font-medium leading-tight tracking-[-0.02em] text-white">{p.headline}</p>
          <p className="mt-0.5 text-[0.4rem] text-white/45">{p.sub}</p>
          <span
            className="mt-1.5 inline-block rounded-full px-2 py-[0.15rem] text-[0.4rem] font-medium text-black"
            style={{ background: `linear-gradient(120deg, ${accent.soft}, ${accent.to})` }}
          >
            Start a test
          </span>
        </div>

        <div className="mt-1.5 flex min-h-0 flex-1 flex-col gap-1">
          {p.items.map((item) => (
            <div key={item.primary} className="flex items-center justify-between gap-2 rounded-[0.35rem] border border-white/[0.07] bg-white/[0.02] px-1.5 py-1">
              <div className="min-w-0">
                <p className="truncate text-[0.45rem] font-medium text-white/80">{item.primary}</p>
                <p className="truncate text-[0.38rem] text-white/35">{item.secondary}</p>
              </div>
              {item.tag ? <Chip>{item.tag}</Chip> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- platform ------------------------------- */

function Platform({ p, accent }: { p: PreviewSpec; accent: Accent }) {
  return (
    <div className="flex h-full flex-col p-2 sm:p-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[0.48rem] font-semibold text-white/85">{p.brand}</span>
        <div className="flex gap-1">
          {p.menu.slice(0, 3).map((item) => (
            <Chip key={item}>{item}</Chip>
          ))}
        </div>
      </div>

      <div className="mt-2 grid min-h-0 flex-1 grid-cols-[1.35fr_1fr] gap-1.5">
        <div className="flex flex-col gap-1">
          <p className="text-[0.58rem] font-medium leading-tight tracking-[-0.02em] text-white">{p.headline}</p>
          <p className="text-[0.4rem] text-white/40">{p.sub}</p>
          {p.items.slice(0, 2).map((item) => (
            <div key={item.primary} className="mt-1 rounded-[0.35rem] border border-white/[0.07] bg-white/[0.025] p-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[0.42rem] text-white/75">{item.primary}</span>
                {item.tag ? <Chip>{item.tag}</Chip> : null}
              </div>
              <div className="mt-1 flex items-center gap-1">
                <div className="h-[0.15rem] flex-1 overflow-hidden rounded-full bg-white/8">
                  <span className="block h-full w-2/3 rounded-full" style={{ background: `linear-gradient(90deg, ${accent.from}, ${accent.to})` }} />
                </div>
                <span className="text-[0.35rem] text-white/30">live</span>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[0.4rem] border border-white/10 bg-white/[0.03] p-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[0.38rem] uppercase tracking-[0.14em] text-white/35">session</span>
            <span className="h-1 w-1 rounded-full" style={{ background: accent.to }} />
          </div>
          <div className="relative mx-auto mt-2 h-12 w-12">
            <svg viewBox="0 0 40 40" className="h-full w-full -rotate-90" aria-hidden="true">
              <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="3" />
              <circle cx="20" cy="20" r="16" fill="none" stroke={accent.to} strokeWidth="3" strokeDasharray="72 100" strokeLinecap="round" />
            </svg>
            <span className="absolute inset-0 grid place-items-center font-mono text-[0.45rem] text-white/80">12:00</span>
          </div>
          <div className="mt-2 space-y-1">
            <Line w="90%" dim />
            <Line w="70%" dim />
            <Line w="80%" dim />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- helpdesk ------------------------------- */

function Helpdesk({ p, accent }: { p: PreviewSpec; accent: Accent }) {
  return (
    <div className="flex h-full flex-col p-2 sm:p-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[0.48rem] font-semibold text-white/85">{p.brand}</span>
        <div className="flex items-center gap-1">
          {p.chips.slice(0, 2).map((chip) => (
            <Chip key={chip}>{chip}</Chip>
          ))}
        </div>
      </div>

      <div className="mt-3 text-center">
        <p className="text-[0.62rem] font-medium tracking-[-0.02em] text-white">{p.headline}</p>
        <p className="mt-0.5 text-[0.4rem] text-white/40">{p.sub}</p>
      </div>

      <div className="mx-auto mt-2 flex w-[78%] items-center gap-1 rounded-[0.4rem] border border-white/12 bg-black/40 px-1.5 py-1">
        <svg viewBox="0 0 12 12" className="h-2 w-2 text-white/35" aria-hidden="true">
          <circle cx="5" cy="5" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="m7.4 7.4 2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <span className="text-[0.4rem] text-white/30">Search help articles…</span>
        <span className="ml-auto rounded border border-white/12 px-1 font-mono text-[0.35rem] text-white/40">⌘K</span>
      </div>

      <div className="mt-2 grid flex-1 grid-cols-3 gap-1">
        {p.items.map((item, index) => (
          <div key={item.primary} className="flex flex-col justify-between rounded-[0.35rem] border border-white/[0.07] bg-white/[0.025] p-1.5">
            <div
              className="grid h-4 w-4 place-items-center rounded-[0.25rem] text-[0.4rem] text-black"
              style={{ background: index === 0 ? accent.soft : "rgba(255,255,255,0.12)" }}
            >
              {index + 1}
            </div>
            <p className="mt-1 text-[0.42rem] leading-tight text-white/80">{item.primary}</p>
            <p className="mt-0.5 text-[0.35rem] text-white/35">{item.secondary}</p>
          </div>
        ))}
      </div>

      <div className="mt-1.5 flex items-center justify-between rounded-[0.35rem] border border-white/8 bg-white/[0.02] px-1.5 py-1">
        <span className="text-[0.38rem] text-white/40">Still stuck?</span>
        <Chip accent={accent}>Report problem</Chip>
      </div>
    </div>
  );
}

/* ------------------------------- store ------------------------------- */

function Store({ p, accent }: { p: PreviewSpec; accent: Accent }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-white/8 px-2 py-1">
        <span className="text-[0.45rem] font-semibold text-white/85">{p.brand}</span>
        <div className="hidden items-center gap-1 sm:flex">
          {p.menu.map((item) => (
            <span key={item} className="text-[0.35rem] text-white/40">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-2 mt-1.5 overflow-hidden rounded-[0.35rem] px-2 py-1.5" style={{ background: `linear-gradient(110deg, ${accent.from}33, ${accent.to}22)` }}>
        <p className="text-[0.5rem] font-medium leading-tight text-white">{p.headline}</p>
        <p className="text-[0.36rem] text-white/55">{p.sub}</p>
        <span className="absolute -right-2 -top-3 h-10 w-10 rounded-full opacity-40 blur-lg" style={{ background: accent.to }} />
      </div>

      <div className="mt-1.5 flex items-center gap-1 px-2">
        {p.chips.map((chip) => (
          <Chip key={chip}>{chip}</Chip>
        ))}
      </div>

      <div className="mt-1.5 grid min-h-0 flex-1 grid-cols-3 gap-1 px-2 pb-2">
        {p.items.map((item, index) => (
          <div key={item.primary} className="flex min-h-0 flex-col overflow-hidden rounded-[0.3rem] border border-white/[0.07] bg-white/[0.025]">
            <div
              className="relative h-[42%] w-full"
              style={{
                background: `linear-gradient(${140 + index * 20}deg, ${index === 1 ? accent.to : accent.from}44, rgba(255,255,255,0.03))`,
              }}
            >
              <span className="absolute inset-0 grid place-items-center text-[0.6rem] opacity-20">◈</span>
            </div>
            <div className="flex flex-1 flex-col justify-between p-1">
              <p className="line-clamp-2 text-[0.36rem] leading-tight text-white/75">{item.primary}</p>
              <div>
                <p className="mt-1 font-mono text-[0.36rem] text-white/80">{item.secondary.split("  ")[1] ?? item.secondary}</p>
                {item.tag ? <p className="text-[0.3rem] text-white/30">{item.tag}</p> : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------- school ------------------------------- */

function School({ p, accent }: { p: PreviewSpec; accent: Accent }) {
  return (
    <div className="flex h-full">
      <aside className="hidden w-[22%] flex-col gap-1 border-r border-white/8 p-1.5 sm:flex">
        <span className="text-[0.45rem] font-semibold text-white/85">{p.brand}</span>
        {p.menu.map((item, index) => (
          <div key={item} className={cn("rounded-[0.25rem] px-1 py-[0.2rem]", index === 0 && "bg-white/[0.06]")}>
            <span className={cn("text-[0.36rem]", index === 0 ? "text-white/80" : "text-white/40")}>{item}</span>
          </div>
        ))}
        <div className="mt-auto rounded-[0.3rem] p-1.5" style={{ background: `linear-gradient(140deg, ${accent.from}33, transparent)` }}>
          <p className="text-[0.34rem] leading-tight text-white/50">Cloud · role-based</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col p-2">
        <div className="flex items-center justify-between">
          <p className="text-[0.48rem] font-medium text-white">{p.headline}</p>
          <Chip accent={accent}>2026</Chip>
        </div>
        <p className="text-[0.36rem] text-white/35">{p.sub}</p>

        <div className="mt-1.5 grid grid-cols-4 gap-1">
          {p.items.map((item) => (
            <div key={item.primary} className="rounded-[0.3rem] border border-white/[0.07] bg-white/[0.025] p-1">
              <p className="truncate text-[0.32rem] text-white/35">{item.primary}</p>
              <p className="mt-0.5 truncate text-[0.42rem] font-medium text-white/80">{item.tag}</p>
            </div>
          ))}
          <div className="rounded-[0.3rem] border border-white/[0.07] bg-white/[0.025] p-1">
            <p className="truncate text-[0.32rem] text-white/35">Reports</p>
            <p className="mt-0.5 text-[0.42rem] font-medium" style={{ color: accent.soft }}>
              Live
            </p>
          </div>
        </div>

        <div className="mt-1.5 min-h-0 flex-1 overflow-hidden rounded-[0.3rem] border border-white/[0.07]">
          <div className="flex items-center gap-1 border-b border-white/8 bg-white/[0.03] px-1.5 py-1 text-[0.3rem] uppercase tracking-[0.1em] text-white/30">
            <span className="flex-1">student</span>
            <span className="w-8">class</span>
            <span className="w-8">status</span>
          </div>
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex items-center gap-1 border-b border-white/[0.04] px-1.5 py-1 last:border-0">
              <div className="flex-1 space-y-0.5">
                <Line w={`${55 + row * 12}%`} dim />
                <Line w="30%" dim />
              </div>
              <span className="w-8 font-mono text-[0.3rem] text-white/35">{`1${row + 8}-A`}</span>
              <span className="w-8 text-[0.3rem]" style={{ color: accent.soft }}>
                active
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- classifieds ------------------------------- */

function Classifieds({ p, accent }: { p: PreviewSpec; accent: Accent }) {
  return (
    <div className="flex h-full flex-col p-2">
      <div className="flex items-center justify-between">
        <span className="text-[0.48rem] font-semibold text-white/85">{p.brand}</span>
        <div className="flex items-center gap-1">
          {p.menu.slice(0, 2).map((item) => (
            <span key={item} className="text-[0.34rem] text-white/35">
              {item}
            </span>
          ))}
          <Chip accent={accent}>Post ad</Chip>
        </div>
      </div>

      <div className="mt-1.5 flex items-center justify-between rounded-[0.3rem] border border-white/8 bg-white/[0.025] px-1.5 py-1">
        <span className="text-[0.34rem] text-white/45">{p.status}</span>
        <span className="font-mono text-[0.3rem] text-white/30">sort ▾</span>
      </div>

      <div className="mt-1.5 flex min-h-0 flex-1 flex-col gap-1">
        {p.items.map((item, index) => (
          <div key={item.primary} className="flex flex-1 items-center gap-1.5 rounded-[0.3rem] border border-white/[0.07] bg-white/[0.02] p-1">
            <div
              className="h-full w-[18%] min-w-8 rounded-[0.2rem]"
              style={{ background: `linear-gradient(140deg, ${index === 0 ? accent.from : accent.to}55, rgba(255,255,255,0.03))` }}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.4rem] text-white/75">{item.primary}</p>
              <p className="truncate text-[0.33rem] text-white/30">{item.secondary}</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[0.36rem] text-white/70">{item.tag}</p>
              <p className="text-[0.3rem] text-white/25">featured</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------- courses ------------------------------- */

function Courses({ p, accent }: { p: PreviewSpec; accent: Accent }) {
  return (
    <div className="flex h-full flex-col p-2">
      <div className="flex items-center justify-between border-b border-white/8 pb-1">
        <span className="text-[0.48rem] font-semibold text-white/85">{p.brand}</span>
        <div className="hidden items-center gap-1.5 sm:flex">
          {p.menu.map((item) => (
            <span key={item} className="text-[0.34rem] text-white/40">
              {item}
            </span>
          ))}
        </div>
        <Chip accent={accent}>Apply</Chip>
      </div>

      <div className="mt-2">
        <p className="text-[0.56rem] font-medium leading-tight tracking-[-0.02em] text-white">{p.headline}</p>
        <p className="text-[0.36rem] text-white/40">{p.sub}</p>
      </div>

      <div className="mt-1.5 grid min-h-0 flex-1 grid-cols-2 gap-1">
        {p.items.map((item, index) => (
          <div key={item.primary} className="flex flex-col justify-between rounded-[0.3rem] border border-white/[0.07] bg-white/[0.025] p-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.3rem] uppercase tracking-[0.1em]" style={{ color: accent.soft }}>
                {`0${index + 1}`}
              </span>
              {item.tag ? <Chip>{item.tag}</Chip> : null}
            </div>
            <p className="mt-1 text-[0.4rem] leading-tight text-white/80">{item.primary}</p>
            <p className="text-[0.33rem] text-white/30">{item.secondary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------- travel ------------------------------- */

function Travel({ p, accent }: { p: PreviewSpec; accent: Accent }) {
  return (
    <div className="relative flex h-full flex-col">
      <div
        className="relative overflow-hidden px-2 pb-3 pt-2"
        style={{ background: `linear-gradient(160deg, ${accent.from}40, transparent 70%)` }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[0.48rem] font-semibold text-white/90">{p.brand}</span>
          <div className="hidden gap-1 sm:flex">
            {p.menu.slice(0, 3).map((item) => (
              <span key={item} className="text-[0.34rem] text-white/45">
                {item}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-2 text-[0.58rem] font-medium leading-tight tracking-[-0.02em] text-white">{p.headline}</p>
        <p className="text-[0.36rem] text-white/50">{p.sub}</p>
        <div className="mt-1 flex gap-1">
          {p.chips.map((chip, index) => (
            <Chip key={chip} accent={index === 0 ? accent : undefined}>
              {chip}
            </Chip>
          ))}
        </div>
        <span
          className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-30 blur-2xl"
          style={{ background: accent.to }}
        />
      </div>

      <div className="min-h-0 flex-1 px-2">
        <div className="rounded-[0.3rem] border border-white/[0.07] bg-white/[0.02]">
          <div className="flex items-center justify-between border-b border-white/8 px-1.5 py-[0.22rem] font-mono text-[0.28rem] uppercase tracking-[0.12em] text-white/30">
            <span>package</span>
            <span>cost</span>
          </div>
          {p.items.map((item) => (
            <div key={item.primary} className="flex items-center justify-between gap-1 border-b border-white/[0.04] px-1.5 py-[0.3rem] last:border-0">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.37rem] text-white/75">{item.primary}</p>
                <p className="truncate text-[0.3rem] text-white/30">{item.secondary}</p>
              </div>
              <span className="w-9 shrink-0 text-right font-mono text-[0.33rem]" style={{ color: accent.soft }}>
                {item.tag}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-1 font-mono text-[0.3rem] uppercase tracking-[0.12em] text-white/30">{p.status}</p>
      </div>
    </div>
  );
}

/* ------------------------------- campus ------------------------------- */

function Campus({ p, accent }: { p: PreviewSpec; accent: Accent }) {
  return (
    <div className="flex h-full flex-col p-2">
      <div className="flex items-center justify-between">
        <span className="text-[0.48rem] font-semibold text-white/85">{p.brand}</span>
        <div className="hidden gap-1 sm:flex">
          {p.menu.map((item) => (
            <span key={item} className="text-[0.34rem] text-white/40">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-2 flex items-end justify-between gap-2 border-b border-white/8 pb-2">
        <div>
          <p className="text-[0.56rem] font-medium leading-tight tracking-[-0.02em] text-white">{p.headline}</p>
          <p className="text-[0.34rem] text-white/40">{p.sub}</p>
        </div>
        <Chip accent={accent}>Admissions</Chip>
      </div>

      <div className="mt-1.5 grid min-h-0 flex-1 grid-cols-[1.2fr_1fr] gap-1.5">
        <div className="grid grid-cols-2 gap-1">
          {p.chips.map((chip, index) => (
            <div key={chip} className="rounded-[0.3rem] border border-white/[0.07] bg-white/[0.025] p-1.5">
              <span className="block h-1 w-1 rounded-full" style={{ background: index === 0 ? accent.to : "rgba(255,255,255,0.25)" }} />
              <p className="mt-1 text-[0.36rem] leading-tight text-white/70">{chip}</p>
              <Line w="60%" dim />
            </div>
          ))}
        </div>
        <div className="rounded-[0.3rem] border border-white/[0.07] bg-white/[0.025] p-1.5">
          <p className="font-mono text-[0.28rem] uppercase tracking-[0.12em] text-white/30">Notices</p>
          <div className="mt-1 space-y-1">
            {p.items.map((item) => (
              <div key={item.primary} className="flex items-center gap-1">
                <span className="h-[0.15rem] w-[0.15rem] rounded-full bg-white/30" />
                <p className="truncate text-[0.32rem] text-white/45">{item.primary}</p>
              </div>
            ))}
            <div className="flex items-center gap-1">
              <span className="h-[0.15rem] w-[0.15rem] rounded-full bg-white/30" />
              <p className="truncate text-[0.32rem] text-white/45">Fee structure published</p>
            </div>
          </div>
          <p className="mt-1.5 font-mono text-[0.28rem] text-white/25">{p.status}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- agency ------------------------------- */

function Agency({ p, accent }: { p: PreviewSpec; accent: Accent }) {
  return (
    <div className="relative flex h-full flex-col p-2">
      <div className="flex items-center justify-between">
        <span className="text-[0.48rem] font-semibold text-white/85">{p.brand}</span>
        <Chip accent={accent}>Let&apos;s talk</Chip>
      </div>

      <p className="mt-2 max-w-[80%] text-[0.78rem] font-medium leading-[0.95] tracking-[-0.04em] text-white">
        {p.headline}
      </p>
      <p className="mt-1 text-[0.36rem] text-white/40">{p.sub}</p>

      <div className="mt-2 grid min-h-0 flex-1 grid-cols-3 gap-1">
        {p.items.map((item, index) => (
          <div key={item.primary} className="flex flex-col overflow-hidden rounded-[0.3rem] border border-white/[0.07]">
            <div
              className="h-[45%] w-full"
              style={{ background: `linear-gradient(${120 + index * 30}deg, ${index % 2 === 0 ? accent.from : accent.to}55, rgba(255,255,255,0.03))` }}
            />
            <div className="flex flex-1 flex-col justify-between p-1">
              <p className="text-[0.36rem] leading-tight text-white/80">{item.primary}</p>
              <p className="text-[0.3rem] text-white/30">{item.secondary}</p>
            </div>
          </div>
        ))}
      </div>
      <span
        className="pointer-events-none absolute -bottom-8 -left-6 h-20 w-20 rounded-full opacity-25 blur-2xl"
        style={{ background: accent.from }}
      />
    </div>
  );
}

/* ------------------------------- logistics ------------------------------- */

function Logistics({ p, accent }: { p: PreviewSpec; accent: Accent }) {
  return (
    <div className="flex h-full flex-col p-2">
      <div className="flex items-center justify-between">
        <span className="text-[0.46rem] font-semibold uppercase tracking-[0.08em] text-white/85">{p.brand}</span>
        <div className="hidden gap-1.5 sm:flex">
          {p.menu.map((item) => (
            <span key={item} className="text-[0.32rem] text-white/40">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-2 grid min-h-0 flex-1 grid-cols-[1.1fr_1fr] gap-2">
        <div className="flex flex-col justify-center">
          <p className="text-[0.58rem] font-medium leading-tight tracking-[-0.02em] text-white">{p.headline}</p>
          <p className="mt-0.5 text-[0.34rem] text-white/40">{p.sub}</p>
          <div className="mt-1.5 flex gap-1">
            {p.chips.map((chip) => (
              <Chip key={chip}>{chip}</Chip>
            ))}
          </div>
          <span className="mt-1.5 inline-block w-fit rounded-full px-1.5 py-[0.15rem] text-[0.34rem] font-medium text-black" style={{ background: accent.soft }}>
            Request a quote
          </span>
        </div>

        <div className="relative overflow-hidden rounded-[0.3rem] border border-white/[0.07] bg-white/[0.02] p-1.5">
          <svg viewBox="0 0 100 70" className="h-full w-full" aria-hidden="true">
            <path d="M8 56 C 30 56, 28 26, 50 26 S 76 44, 92 14" fill="none" stroke={accent.to} strokeWidth="1.2" strokeDasharray="3 3" opacity="0.8" />
            <circle cx="8" cy="56" r="2.4" fill={accent.from} />
            <circle cx="50" cy="26" r="2.4" fill={accent.from} />
            <circle cx="92" cy="14" r="2.4" fill={accent.to} />
          </svg>
          <p className="absolute bottom-1 left-1.5 font-mono text-[0.28rem] uppercase tracking-[0.1em] text-white/30">
            {p.status}
          </p>
        </div>
      </div>

      <div className="mt-1.5 grid grid-cols-3 gap-1">
        {p.items.map((item) => (
          <div key={item.primary} className="rounded-[0.28rem] border border-white/[0.06] bg-white/[0.02] px-1 py-[0.3rem]">
            <p className="truncate text-[0.33rem] text-white/60">{item.primary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------- college ------------------------------- */

function College({ p, accent }: { p: PreviewSpec; accent: Accent }) {
  return (
    <div className="relative flex h-full flex-col p-2">
      <div className="flex items-center justify-between">
        <span className="text-[0.46rem] font-semibold text-white/85">{p.brand}</span>
        <div className="flex gap-1">
          <span className="rounded border border-white/10 px-1 text-[0.3rem] text-white/40">EN</span>
          <span className="rounded border border-white/10 px-1 text-[0.3rem] text-white/40">हिं</span>
        </div>
      </div>

      <div className="mt-2 rounded-[0.3rem] border border-white/[0.07] p-2" style={{ background: `linear-gradient(150deg, ${accent.from}22, transparent)` }}>
        <p className="text-[0.6rem] font-medium leading-tight tracking-[-0.02em] text-white">{p.headline}</p>
        <p className="mt-0.5 text-[0.34rem] text-white/40">{p.sub}</p>
      </div>

      <div className="mt-1.5 flex gap-1">
        {p.items.map((item) => (
          <div key={item.primary} className="flex-1 rounded-[0.28rem] border border-white/[0.06] bg-white/[0.02] p-1">
            <p className="text-[0.34rem] leading-tight text-white/70">{item.primary}</p>
            <p className="mt-0.5 text-[0.3rem] text-white/30">{item.tag}</p>
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-white/8 pt-1">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="grid h-3.5 w-3.5 place-items-center rounded-full text-[0.3rem] text-black/70"
              style={{ background: `linear-gradient(140deg, ${accent.soft}, ${accent.to})`, opacity: 1 - i * 0.22 }}
            >
              {String.fromCharCode(65 + i)}
            </span>
          ))}
          <span className="ml-0.5 text-[0.3rem] text-white/30">Faculty</span>
        </div>
        <span className="font-mono text-[0.28rem] text-white/25">{p.status}</span>
      </div>
    </div>
  );
}
