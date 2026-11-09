export const site = {
  name: "V3i Technology",
  legalName: "V3i Technology",
  tagline: "We engineer digital experiences.",
  showcaseName: "V3i Technology Project Showcase",
  showcaseLabel: "Project showcase by V3i Technology",
  description:
    "A project showcase by V3i Technology: thirteen live websites, platforms and digital products engineered in Kanpur. Not the official V3i Technology website.",
  disclaimer:
    "This is a project showcase by V3i Technology, not the official V3i Technology website.",
  officialUrl: "http://www.v3itechnology.com/",
  officialDomain: "v3itechnology.com",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://v3itechnology.com").replace(/\/$/, ""),
  email: "info@v3itechnology.com",
  phone: "+91 9956308445",
  phoneHref: "tel:+919956308445",
  address: "B-377, World Bank Barra, Kanpur 208027, India",
  city: "Kanpur, Uttar Pradesh",
  country: "India",
  founded: "2018",
  auditDate: "9 November 2026",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/v3itechnology" },
    { label: "Facebook", href: "https://www.facebook.com/v3itechnologyitsolution" },
  ],
} as const;

export const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#work" },
  { label: "Expertise", href: "/#expertise" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
] as const;

export const stats = [
  { value: "13", label: "Live platforms shipped" },
  { value: "2018", label: "Studio founded" },
  { value: "7", label: "Industries served" },
  { value: "IN", label: "Kanpur, India" },
] as const;

export type ServiceIcon =
  | "code"
  | "layers"
  | "app"
  | "edu"
  | "cart"
  | "design"
  | "api"
  | "transform";

export interface Service {
  title: string;
  description: string;
  icon: ServiceIcon;
  points: string[];
}

export const services: Service[] = [
  {
    title: "Website Development",
    description:
      "Fast, responsive, search-ready sites that carry a brand properly — from single-page launches to multi-section institutional platforms.",
    icon: "code",
    points: ["Design systems", "Performance budgets", "SEO foundations"],
  },
  {
    title: "Full-Stack Development",
    description:
      "Front-end and server work in one build: typed interfaces, authenticated areas, data models and the admin surfaces that keep them usable.",
    icon: "layers",
    points: ["Typed front ends", "Auth & roles", "Admin panels"],
  },
  {
    title: "Custom Web Applications",
    description:
      "Products built around a specific workflow — timed test engines, school administration, support desks and classified boards.",
    icon: "app",
    points: ["Product architecture", "Dashboards", "Workflow tooling"],
  },
  {
    title: "Educational Technology",
    description:
      "Practice platforms, school management systems and institutional sites where information has to be exact and documents have to be right.",
    icon: "edu",
    points: ["Assessment flows", "Record systems", "Document generation"],
  },
  {
    title: "E-commerce Development",
    description:
      "Catalogue-first storefronts with offer merchandising, category shelves and pricing that stays legible under heavy product density.",
    icon: "cart",
    points: ["Catalogue UX", "Offer merchandising", "Checkout-ready layouts"],
  },
  {
    title: "UI/UX Design",
    description:
      "Editorial layout, deliberate type and interaction detail — design that explains the product rather than decorating it.",
    icon: "design",
    points: ["Art direction", "Interaction design", "Design systems"],
  },
  {
    title: "API Integration",
    description:
      "Connecting a product to the services it depends on — payments, messaging, analytics, third-party data — with predictable failure states.",
    icon: "api",
    points: ["Third-party APIs", "Webhooks", "Data sync"],
  },
  {
    title: "Digital Transformation",
    description:
      "Moving paper registers, spreadsheets and manual workflows into a maintained product with a route for future changes.",
    icon: "transform",
    points: ["Process mapping", "Legacy migration", "Team enablement"],
  },
];

export interface ProcessStage {
  index: string;
  title: string;
  description: string;
  deliverables: string[];
}

export const processStages: ProcessStage[] = [
  {
    index: "01",
    title: "Research",
    description:
      "Understand the business, the audience and the constraints. We audit what exists, read the material the client already has, and record what is verified versus assumed.",
    deliverables: ["Discovery notes", "Audience map", "Content inventory"],
  },
  {
    index: "02",
    title: "Strategy",
    description:
      "Decide what the product has to do before deciding how it looks: scope, structure, success criteria and the order work will ship in.",
    deliverables: ["Scope agreement", "Information architecture", "Delivery sequence"],
  },
  {
    index: "03",
    title: "UI/UX Design",
    description:
      "Design the flows and the surfaces together. Layout, type and interaction are specified as a system so later pages are assembly, not invention.",
    deliverables: ["Wireframes", "Design system", "Prototype"],
  },
  {
    index: "04",
    title: "Development",
    description:
      "Build in typed, componentised layers with the heavy interactive work isolated. Client components only where the browser genuinely needs them.",
    deliverables: ["Component library", "Application build", "CMS or admin"],
  },
  {
    index: "05",
    title: "Testing",
    description:
      "Check the paths that carry consequences — form submission, timed sessions, document generation, pricing — on real devices and slow connections.",
    deliverables: ["Cross-device pass", "Accessibility pass", "Defect log"],
  },
  {
    index: "06",
    title: "Deployment",
    description:
      "Ship with metadata, sitemap, redirects and analytics in place. Performance and crawlability are part of the launch, not a later phase.",
    deliverables: ["Production release", "SEO setup", "Handover docs"],
  },
  {
    index: "07",
    title: "Maintenance",
    description:
      "Stay involved: content updates, dependency work and measured improvements, with a clear route for new requirements.",
    deliverables: ["Support window", "Content updates", "Iteration plan"],
  },
];

export interface Capability {
  name: string;
  detail: string;
  /** true when the technology appears in at least one shipped project stack */
  inPortfolio: boolean;
}

export const capabilities: Capability[] = [
  { name: "Next.js", detail: "App Router, server-first rendering", inPortfolio: false },
  { name: "React", detail: "Component architecture", inPortfolio: false },
  { name: "TypeScript", detail: "Typed application code", inPortfolio: false },
  { name: "JavaScript", detail: "Progressive enhancement", inPortfolio: true },
  { name: "Node.js", detail: "Server-side application logic", inPortfolio: false },
  { name: "MongoDB", detail: "Document data modelling", inPortfolio: false },
  { name: "PHP", detail: "Content-driven platforms", inPortfolio: true },
  { name: "WordPress", detail: "Editor-managed sites", inPortfolio: true },
  { name: "MySQL", detail: "Relational storage", inPortfolio: true },
  { name: "Tailwind CSS", detail: "Design-token styling", inPortfolio: false },
  { name: "Three.js", detail: "Real-time 3D scenes", inPortfolio: false },
  { name: "Python", detail: "Data and automation", inPortfolio: false },
];

export const capabilityNote =
  "Dotted items are broader studio capability. Solid items appear in at least one live project build. No per-project technology has been independently verified on the production server; see each case study for its reported stack.";
