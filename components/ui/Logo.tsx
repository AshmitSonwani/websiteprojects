import { cn } from "@/lib/utils";

export default function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-[0.7rem] border border-white/15 bg-white/[0.04]">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(123,97,255,0.7),transparent_65%)] opacity-80" />
        <svg viewBox="0 0 24 24" className="relative h-5 w-5" aria-hidden="true">
          <defs>
            <linearGradient id="v3i-mark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="55%" stopColor="#b8a9ff" />
              <stop offset="100%" stopColor="#5df2d6" />
            </linearGradient>
          </defs>
          <path d="M4 5.5h4.6L12 14l3.4-8.5H20L13.9 19h-3.8L4 5.5Z" fill="url(#v3i-mark)" />
          <circle cx="19" cy="5.6" r="1.6" fill="#5df2d6" />
        </svg>
      </span>
      {compact ? null : (
        <span className="flex flex-col leading-none">
          <span className="text-[1.05rem] font-semibold tracking-[-0.03em] text-white">
            V3i<span className="text-white/45"> Technology</span>
          </span>
          <span className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.32em] text-mist">
            Project showcase
          </span>
        </span>
      )}
    </span>
  );
}
