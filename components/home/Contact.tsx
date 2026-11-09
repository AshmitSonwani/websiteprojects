import { site } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "./ContactForm";

const details = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: (
      <>
        <rect x="2.5" y="5" width="15" height="10.5" rx="2" />
        <path d="m3.5 6.5 6.5 5 6.5-5" />
      </>
    ),
  },
  {
    label: "Phone",
    value: site.phone,
    href: site.phoneHref,
    icon: <path d="M6 3.5h2l1.2 3-1.6 1.2a10 10 0 0 0 4.7 4.7l1.2-1.6 3 1.2v2a2 2 0 0 1-2.2 2A14.5 14.5 0 0 1 4 5.7 2 2 0 0 1 6 3.5Z" />,
  },
  {
    label: "Studio",
    value: site.address,
    href: undefined,
    icon: (
      <>
        <path d="M10 17s5.5-4.6 5.5-8.2A5.5 5.5 0 0 0 10 3.5a5.5 5.5 0 0 0-5.5 5.3C4.5 12.4 10 17 10 17Z" />
        <circle cx="10" cy="8.7" r="1.8" />
      </>
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="glow-orb -left-32 bottom-0 h-[28rem] w-[28rem] bg-violet/18" />
        <div className="glow-orb right-0 top-10 h-[22rem] w-[22rem] bg-azure/12" />
        <div className="grid-bg opacity-40" />
      </div>

      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <div className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-mist">
              <span className="text-cyan/80">06</span>
              <span className="h-px w-8 bg-white/20" aria-hidden="true" />
              <span>Start a project</span>
            </div>

            <Reveal delay={80}>
              <h2 className="display mt-6 text-[clamp(2.1rem,4.8vw,3.9rem)] text-white">
                Tell us what
                <span className="text-white/35"> has to work.</span>
              </h2>
            </Reveal>

            <Reveal delay={150}>
              <p className="mt-6 max-w-md text-[0.92rem] leading-relaxed text-mist">
                A sentence about the problem is enough to start. We will reply with questions, an honest scope, and
                whether we are the right studio for it.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <ul className="mt-10 divide-y divide-white/8 border-y border-white/8">
                {details.map((detail) => (
                  <li key={detail.label} className="flex items-start gap-4 py-4">
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-white/55">
                      <svg
                        viewBox="0 0 20 20"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        {detail.icon}
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-[0.52rem] uppercase tracking-[0.18em] text-white/30">{detail.label}</p>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="mt-1 inline-block break-words text-[0.9rem] text-white/85 underline decoration-transparent underline-offset-4 transition hover:decoration-white/40"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="mt-1 break-words text-[0.9rem] leading-relaxed text-white/70">{detail.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={260}>
              <p className="mt-8 max-w-md rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3 text-[0.74rem] leading-relaxed text-white/45">
                {site.disclaimer}{" "}
                <a
                  href={site.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit the official V3i Technology website (opens in a new tab)"
                  className="text-white/80 underline decoration-white/25 underline-offset-4 transition hover:text-white hover:decoration-white"
                >
                  Visit the official website
                </a>{" "}
                for the company&apos;s services, pricing and enquiries.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                {site.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-[0.75rem] text-white/45 transition hover:text-white"
                  >
                    {social.label}
                    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true">
                      <path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                ))}
                <span className="h-3 w-px bg-white/15" aria-hidden="true" />
                <span className="flex items-center gap-2 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-white/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan/80" aria-hidden="true" />
                  Mon–Sat · Kanpur, IN
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} variant="scale">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
