import type { ReactNode } from "react";
import { services, type ServiceIcon } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

function Icon({ name }: { name: ServiceIcon }) {
  const paths: Record<ServiceIcon, ReactNode> = {
    code: <path d="M9 7 5 11l4 4M15 7l4 4-4 4M13 5l-2 12" />,
    layers: <path d="M11 3 3 7.5 11 12l8-4.5L11 3ZM3 12l8 4.5 8-4.5M3 16.5 11 21l8-4.5" />,
    app: (
      <>
        <rect x="3.5" y="4" width="15" height="14" rx="2.5" />
        <path d="M3.5 8h15M7 6.2h.01M9.5 6.2h.01M7.5 12h3M7.5 15h6" />
      </>
    ),
    edu: <path d="M3 8.5 11 4l8 4.5-8 4.5-8-4.5ZM6.5 10.5V15c0 1.4 2 2.6 4.5 2.6s4.5-1.2 4.5-2.6v-4.5M19 8.5v5" />,
    cart: (
      <>
        <path d="M3 4h2l2.2 10.5h9.4L19 7H6" />
        <circle cx="9" cy="18" r="1.4" />
        <circle cx="16.5" cy="18" r="1.4" />
      </>
    ),
    design: (
      <>
        <rect x="3.5" y="4" width="15" height="14" rx="2" />
        <path d="M3.5 15.5 8 11l3 3 3.5-4 4 4.5" />
        <circle cx="8" cy="8" r="1.2" />
      </>
    ),
    api: <path d="M7 7H5.5A2.5 2.5 0 0 0 3 9.5v1A2.5 2.5 0 0 1 .5 13 2.5 2.5 0 0 1 3 15.5v1A2.5 2.5 0 0 0 5.5 19H7M15 7h1.5A2.5 2.5 0 0 1 19 9.5v1a2.5 2.5 0 0 0 0 5v1a2.5 2.5 0 0 1-2.5 2.5H15M8.5 11h5M8.5 14.5h5" />,
    transform: <path d="M4 7h7a4 4 0 0 1 0 8H4m4-4-3 3 3 3M20 7h-4m0-3-3 3 3 3" />,
  };

  return (
    <svg viewBox="0 0 22 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export default function Services() {
  return (
    <section id="expertise" className="relative py-24 sm:py-32">
      <div className="shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="04"
            eyebrow="Services & expertise"
            title={
              <>
                What we take
                <span className="text-white/35"> responsibility for.</span>
              </>
            }
          />
          <Reveal delay={120}>
            <p className="max-w-sm text-[0.85rem] leading-relaxed text-mist">
              Eight disciplines, one delivery team. Engagements usually start with a single page and end with a system
              the client&apos;s staff operate themselves.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/[0.06] md:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 60}>
              <article className="group relative h-full bg-void/95 p-6 transition-colors duration-500 hover:bg-panel sm:p-8">
                <div className="flex items-start justify-between gap-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-white/70 transition-colors duration-500 group-hover:border-violet/40 group-hover:text-cyan">
                    <Icon name={service.icon} />
                  </span>
                  <span className="font-mono text-[0.55rem] tracking-[0.16em] text-white/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-medium tracking-[-0.02em] text-white">{service.title}</h3>
                <p className="mt-2.5 text-[0.82rem] leading-relaxed text-mist">{service.description}</p>

                <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-white/35">
                      <span className="h-0.5 w-2 bg-white/20" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
