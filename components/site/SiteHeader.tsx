"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import Magnetic from "@/components/ui/Magnetic";
import Logo from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";

const sectionIds = ["home", "about", "work", "expertise", "process", "contact"];

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      setActive("");
      return;
    }

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!sections.length) return;

    const onScroll = () => {
      const marker = window.scrollY + window.innerHeight * 0.32;
      let current = sections[0].id;
      for (const section of sections) {
        if (section.offsetTop <= marker) current = section.id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => {
    const target = href.split("#")[1];
    if (!target) return false;
    if (target === "work") return pathname.startsWith("/projects") || (pathname === "/" && active === "work");
    return pathname === "/" && active === target;
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled ? "pt-2 sm:pt-3" : "pt-4 sm:pt-6",
        )}
      >
        <div className="shell">
          <div
            className={cn(
              "flex items-center justify-between gap-4 rounded-2xl px-3.5 transition-all duration-500 sm:px-5",
              scrolled
                ? "glass h-[3.6rem] shadow-[0_24px_60px_-40px_rgba(0,0,0,0.9)]"
                : "h-[4rem] border border-transparent bg-transparent",
            )}
          >
            <Link href="/" aria-label="V3i Technology project showcase — home" className="shrink-0">
              <Logo />
            </Link>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-0.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive(link.href) ? "true" : undefined}
                      className={cn(
                        "relative rounded-full px-3.5 py-2 text-[0.8rem] transition-colors duration-300",
                        isActive(link.href) ? "text-white" : "text-mist hover:text-white",
                      )}
                    >
                      {isActive(link.href) ? (
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.06]"
                        />
                      ) : null}
                      <span className="relative">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={site.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit the official V3i Technology website (opens in a new tab)"
                className="hidden items-center gap-1.5 rounded-full px-2.5 py-2 text-[0.68rem] text-mist transition-colors hover:text-white xl:inline-flex"
              >
                Official website
                <ExternalIcon />
                <span className="sr-only">(opens in a new tab)</span>
              </a>

              <Magnetic className="hidden sm:block">
                <ButtonLink href="/#contact" size="md" className="whitespace-nowrap">
                  Let&apos;s Talk
                  <ArrowIcon />
                </ButtonLink>
              </Magnetic>

              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-white transition hover:border-white/30 lg:hidden"
              >
                <span className="relative block h-3 w-4">
                  <span
                    className={cn(
                      "absolute left-0 top-0 h-px w-full bg-current transition-all duration-300",
                      open && "top-1.5 rotate-45",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 top-1.5 h-px w-full bg-current transition-all duration-300",
                      open && "opacity-0",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 top-3 h-px w-full bg-current transition-all duration-300",
                      open && "top-1.5 -rotate-45",
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-void/85 backdrop-blur-xl transition-opacity duration-500",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute inset-x-0 top-[4.75rem] mx-4 origin-top rounded-3xl border border-white/10 bg-ink/95 p-6 shadow-[0_40px_120px_-40px_rgba(0,0,0,1)] transition-all duration-500",
            open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
          )}
        >
          <nav aria-label="Mobile primary">
            <ul className="flex flex-col">
              {navLinks.map((link, index) => (
                <li key={link.href} className="border-b border-white/[0.06] last:border-0">
                  <Link
                    href={link.href}
                    tabIndex={open ? 0 : -1}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between gap-4 py-3.5 text-[1.6rem] font-medium tracking-[-0.03em] text-white"
                  >
                    <span>{link.label}</span>
                    <span className="font-mono text-[0.6rem] text-mist/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-6 flex flex-col gap-3">
            <ButtonLink href="/#contact" size="lg" className="w-full" external={false}>
              Start a project
              <ArrowIcon />
            </ButtonLink>
            <a
              href={site.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit the official V3i Technology website (opens in a new tab)"
              tabIndex={open ? 0 : -1}
              className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-[0.8rem] text-white/70 transition hover:border-white/25 hover:text-white"
            >
              <span>
                <span className="block font-mono text-[0.5rem] uppercase tracking-[0.16em] text-white/35">
                  Official website
                </span>
                <span className="mt-0.5 block">{site.officialDomain}</span>
              </span>
              <ExternalIcon />
            </a>
            <p className="px-1 text-[0.65rem] leading-relaxed text-white/35">{site.disclaimer}</p>
            <div className="flex items-center justify-between gap-4 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3 text-[0.75rem] text-mist">
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
              <a href={site.phoneHref} className="hover:text-white">
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden="true">
      <path
        d="M3 9 9 3M4 3h5v5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">
      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
