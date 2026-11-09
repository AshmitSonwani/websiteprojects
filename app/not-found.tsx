import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden pb-20 pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg grid-bg--center opacity-60" />
        <div className="glow-orb left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 bg-violet/20" />
      </div>

      <div className="shell">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-cyan/80">Error 404</p>

        <h1 className="display mt-6 text-[clamp(3rem,10vw,8rem)] text-white">
          This page
          <br />
          <span className="text-white/30">does not exist.</span>
        </h1>

        <p className="mt-8 max-w-md text-[0.92rem] leading-relaxed text-mist">
          The link may be outdated, or the address may have been mistyped. The live work and the case studies are still
          one click away.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/" size="lg">
            Back to the homepage
          </ButtonLink>
          <ButtonLink href="/projects" variant="outline" size="lg">
            Browse all projects
          </ButtonLink>
        </div>

        <nav aria-label="Useful pages" className="mt-14 border-t border-white/8 pt-6">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/35">
            <li>
              <Link href="/#about" className="transition hover:text-white">
                About the studio
              </Link>
            </li>
            <li>
              <Link href="/#expertise" className="transition hover:text-white">
                Expertise
              </Link>
            </li>
            <li>
              <Link href="/#process" className="transition hover:text-white">
                Process
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="transition hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
