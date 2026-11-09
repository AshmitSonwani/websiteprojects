import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full text-[0.8125rem] font-medium tracking-[0.01em] transition duration-300 disabled:cursor-not-allowed disabled:opacity-60";

const sizes = {
  md: "h-11 px-5",
  lg: "h-[3.25rem] px-7",
} as const;

const variants: Record<Variant, string> = {
  primary:
    "bg-white text-void hover:bg-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_18px_40px_-18px_rgba(123,97,255,0.9)]",
  outline:
    "border border-white/15 bg-white/[0.03] text-white hover:border-white/35 hover:bg-white/[0.07] backdrop-blur",
  ghost: "text-mist hover:text-white",
};

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external,
  ariaLabel,
}: CommonProps & { href: string; external?: boolean; ariaLabel?: string }) {
  const classes = cn(base, sizes[size], variants[variant], className);

  if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    const isHttp = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, sizes[size], variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
