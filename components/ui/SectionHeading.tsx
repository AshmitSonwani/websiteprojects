import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <Reveal>
        <div
          className={cn(
            "flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-mist",
            align === "center" && "justify-center",
          )}
        >
          {index ? <span className="text-cyan/80">{index}</span> : null}
          <span className="h-px w-8 bg-white/20" aria-hidden="true" />
          <span>{eyebrow}</span>
        </div>
      </Reveal>
      <Reveal delay={90}>
        <h2 className="display mt-6 text-[clamp(2rem,4.6vw,3.9rem)] text-white">{title}</h2>
      </Reveal>
      {description ? (
        <Reveal delay={160}>
          <p className="mt-6 max-w-2xl text-[0.95rem] leading-relaxed text-mist sm:text-base">{description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
