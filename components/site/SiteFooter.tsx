import Link from "next/link";
import { navLinks, site } from "@/lib/site";
import { projects } from "@/lib/projects";
import Logo from "@/components/ui/Logo";

const featured = projects.slice(0, 4);

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

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-ink">
      <div className="pointer-events-none absolute inset-0">
        <div className="grid-bg opacity-40" />
        <div className="glow-orb bottom-[-18rem] left-1/2 h-[26rem] w-[42rem] -translate-x-1/2 bg-violet/25" />
      </div>

      <div className="shell relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="V3i Technology project showcase — home">
              <Logo />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-mist">
              A project showcase by V3i Technology — thirteen live websites, platforms and products engineered in
              Kanpur.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 px-3.5 py-1.5 text-[0.7rem] text-mist transition hover:border-white/30 hover:text-white"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-white/40">Navigate</h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-mist transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-white/40">Selected work</h2>
            <ul className="mt-5 space-y-3">
              {featured.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-sm text-mist transition hover:text-white"
                  >
                    {project.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/projects" className="text-sm text-white/70 underline decoration-white/20 underline-offset-4 hover:text-white">
                  All {projects.length} projects
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-white/40">Contact</h2>
            <ul className="mt-5 space-y-3 text-sm text-mist">
              <li>
                <a href={`mailto:${site.email}`} className="transition hover:text-white">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="transition hover:text-white">
                  {site.phone}
                </a>
              </li>
              <li className="leading-relaxed">{site.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-cyan/70">Project showcase</p>
            <p className="mt-2 max-w-xl text-[0.8rem] leading-relaxed text-mist">
              {site.disclaimer} The official site is where you will find the company&apos;s services, pricing and
              enquiry channels.
            </p>
          </div>
          <a
            href={site.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit the official V3i Technology website (opens in a new tab)"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-[0.8rem] text-white transition hover:border-white/35 hover:bg-white/[0.08]"
          >
            Visit the official website
            <ExternalIcon />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/35">
            © 2026 {site.legalName}. Project showcase.
          </p>
          <p className="text-[0.7rem] text-white/35">
            Project details reflect public sites as audited on {site.auditDate}.
          </p>
        </div>
      </div>
    </footer>
  );
}
