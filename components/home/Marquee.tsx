const items = [
  "Website development",
  "Custom web applications",
  "Educational platforms",
  "E-commerce systems",
  "School management",
  "Classifieds platforms",
  "UI/UX design",
  "API integration",
  "Digital transformation",
];

export default function Marquee() {
  return (
    <div className="relative border-y border-white/8 bg-ink/60 py-4">
      <div className="marquee-mask flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8">
          {[...items, ...items].map((item, index) => (
            <span key={`${item}-${index}`} className="flex shrink-0 items-center gap-8">
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.24em] text-white/40">{item}</span>
              <span className="h-1 w-1 rounded-full bg-violet/60" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
