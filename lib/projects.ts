export type Category =
  | "Web Application"
  | "Educational Platform"
  | "Business Website"
  | "E-commerce"
  | "Travel & Transportation"
  | "Classifieds"
  | "Creative & Media";

export type PreviewVariant =
  | "dashboard"
  | "platform"
  | "helpdesk"
  | "store"
  | "school"
  | "classifieds"
  | "courses"
  | "travel"
  | "campus"
  | "agency"
  | "logistics"
  | "college";

export interface StackItem {
  name: string;
  /** true only when the technology could be observed on the live property */
  verified: boolean;
}

export interface PreviewItem {
  primary: string;
  secondary: string;
  tag?: string;
}

export interface PreviewSpec {
  variant: PreviewVariant;
  brand: string;
  menu: string[];
  headline: string;
  sub: string;
  chips: string[];
  items: PreviewItem[];
  status?: string;
}

export interface Project {
  slug: string;
  name: string;
  url: string;
  domain: string;
  tagline: string;
  summary: string;
  industry: string;
  categories: Category[];
  accent: { from: string; to: string; soft: string };
  monogram: string;
  audited: boolean;
  auditNote: string;
  stack: StackItem[];
  overview: string;
  problem: string;
  objectives: string[];
  audience: string[];
  features: string[];
  modules: { name: string; detail: string }[];
  design: string[];
  ux: string[];
  responsive: string[];
  businessValue: string[];
  services: string[];
  preview: PreviewSpec;
}

const t = (name: string, verified = false): StackItem => ({ name, verified });

export const projects: Project[] = [
  {
    slug: "linksteno",
    name: "LinkSteno",
    url: "https://linksteno.com/",
    domain: "linksteno.com",
    tagline: "Stenography practice, timed and measured.",
    summary:
      "A practice environment for shorthand and typing aspirants, with dictation libraries in English and Hindi, timed test interfaces, results and plans.",
    industry: "Test preparation & skill assessment",
    categories: ["Educational Platform", "Web Application"],
    accent: { from: "#6366f1", to: "#22d3ee", soft: "#818cf8" },
    monogram: "LS",
    audited: true,
    auditNote:
      "Audited from publicly visible content on the live homepage: test libraries, leaderboard, results, plans and practice-set messaging.",
    stack: [t("Next.js"), t("React"), t("TypeScript"), t("Tailwind CSS"), t("Node.js"), t("MongoDB")],
    overview:
      "LinkSteno is a browser-based practice platform for stenography and typing candidates. The live site presents separate steno and typing test libraries across English, Hindi (Mangal) and Hindi (Krutidev) tracks, each with all-speed dictation sets and a shared typing interface. Around the test engine sit a leaderboard, published results and subscription plans.",
    problem:
      "Shorthand and typing aspirants usually practise with a stopwatch, a PDF and no comparable feedback. Speed, accuracy and progress stay private, so candidates cannot benchmark themselves against the standards their exams actually apply.",
    objectives: [
      "Give candidates one place to practise steno and typing at exam-realistic speeds.",
      "Serve English and both Hindi keyboard layouts without a separate product per script.",
      "Turn every attempt into a comparable result that can be reviewed and ranked.",
      "Keep the catalogue sustainable through clear, tiered access plans.",
    ],
    audience: [
      "SSC, UPSSSC and other stenography aspirants",
      "Hindi and English typing test candidates",
      "Coaching institutes that need a common practice surface",
      "Candidates revising previous-year skill test matter",
    ],
    features: [
      "Separate steno and typing test libraries across speeds",
      "English, Hindi (Mangal) and Hindi (Krutidev) dictation tracks",
      "One shared typing interface across every test type",
      "Leaderboard and a results view for completed attempts",
      "Practice material for previous-year SSC steno skill tests",
      "Subscription plans layered over the practice library",
    ],
    modules: [
      { name: "Test engine", detail: "Timed dictation and typing sessions with a consistent interface across scripts." },
      { name: "Dictation library", detail: "Named sets (Dr. Bist, Progressive Dictation, Kailash Chandra, Ramdhari) organised by language and speed." },
      { name: "Results & leaderboard", detail: "Attempt history and a public ranking surface for completed tests." },
      { name: "Plans & access", detail: "Tiered access to the catalogue, presented alongside free entry points." },
      { name: "Content library", detail: "Shorthand outlines, dictation notes and downloadable PDF material." },
    ],
    design: [
      "Content-dense dashboard layout that stays calm: muted surfaces, one accent colour, no decorative chrome.",
      "Columnar test cards with language tags so a candidate can scan by script first, then by set.",
      "Mono numerals and compact labels for anything that is compared or timed.",
    ],
    ux: [
      "Test types are grouped by language, matching the way candidates think about their exam.",
      "Every card uses the same 'common typing interface' promise, so the choice is about content, not controls.",
      "Published results and a leaderboard create a natural return loop without gamifying the practice itself.",
    ],
    responsive: [
      "Test catalogue collapses from a multi-column grid into a single reading column.",
      "Sticky top navigation keeps the language sections reachable on small screens.",
      "Typography and tap targets sized for one-handed use between practice sessions.",
    ],
    businessValue: [
      "A repeat-use product rather than a one-off brochure site, with plans aligned to recurring practice.",
      "Content depth (previous-year matter, outlines, notes) makes the platform harder to replace.",
      "A single interface across three language tracks keeps maintenance and onboarding cost down.",
    ],
    services: ["Product design", "Full-stack development", "Subscription access", "Content architecture"],
    preview: {
      variant: "dashboard",
      brand: "LinkSteno",
      menu: ["Steno Tests", "Typing Tests", "Leaderboard", "Results"],
      headline: "Practice at exam speed.",
      sub: "SSC Steno · all speeds · English & Hindi",
      chips: ["English", "मंगल", "Krutidev"],
      items: [
        { primary: "Progressive Dictation", secondary: "English steno · all speeds", tag: "Set 02" },
        { primary: "रामधारी खंड 1", secondary: "Hindi (Mangal) · dictation", tag: "Hindi" },
        { primary: "DR. BIST", secondary: "English steno · all speeds", tag: "Set 01" },
      ],
      status: "SSC Steno practice set available",
    },
  },
  {
    slug: "steno-platform",
    name: "Steno Platform",
    url: "https://steno.v3itechnology.com/",
    domain: "steno.v3itechnology.com",
    tagline: "The practice engine behind the product.",
    summary:
      "A first-party V3i build for stenography and typing assessment: test delivery, language tracks and result handling, packaged as a deployable platform.",
    industry: "Assessment infrastructure",
    categories: ["Web Application", "Educational Platform"],
    accent: { from: "#8b5cf6", to: "#38bdf8", soft: "#a78bfa" },
    monogram: "SP",
    audited: false,
    auditNote:
      "Public content on this subdomain did not resolve into a readable page during the audit. Scope below is described from the V3i platform family and should be confirmed with the product owner before publication.",
    stack: [t("Next.js"), t("React"), t("Node.js"), t("MongoDB"), t("Tailwind CSS")],
    overview:
      "Steno Platform is a V3i-hosted environment for delivering shorthand and typing assessments. It is presented as a platform build rather than a single client site: the same test-delivery model, language handling and result storage can be configured for an institute or a public practice product.",
    problem:
      "Institutes that run shorthand and typing tests usually stitch together a dictation source, a timer and a spreadsheet. The result is inconsistent timing, manual marking and no dependable record of what a candidate actually attempted.",
    objectives: [
      "Standardise how a timed stenography or typing test is delivered.",
      "Keep language and keyboard layout as configuration, not custom code.",
      "Store attempts and results in a form that can be reviewed and reported on.",
      "Provide a reusable base for future client deployments.",
    ],
    audience: [
      "Coaching institutes running internal tests",
      "Training centres that need a shared practice surface",
      "In-house teams evaluating candidates",
    ],
    features: [
      "Configurable timed test sessions",
      "Language and keyboard-layout tracks",
      "Attempt capture and result storage",
      "Reusable deployment for multiple institutions",
    ],
    modules: [
      { name: "Session runner", detail: "Timed test delivery with a consistent interface." },
      { name: "Language profiles", detail: "English and Hindi tracks treated as configuration." },
      { name: "Attempt records", detail: "Stored attempts available for review and reporting." },
    ],
    design: [
      "Utility-first interface: the test surface is the product, so the surrounding chrome stays quiet.",
      "Consistent spacing and states across setup, attempt and review screens.",
    ],
    ux: [
      "A single flow from test selection to attempt to result, with no dead ends.",
      "Clear status messaging during timed sessions, where ambiguity costs a candidate a test.",
    ],
    responsive: [
      "Test surface adapts to laptop, tablet and phone without changing the timing model.",
    ],
    businessValue: [
      "Turns a bespoke service into a repeatable platform that can be deployed per institute.",
      "Centralises the assessment rules that would otherwise be re-implemented per client.",
    ],
    services: ["Platform architecture", "Test delivery UX", "Full-stack development"],
    preview: {
      variant: "platform",
      brand: "Steno Platform",
      menu: ["Dashboard", "Tests", "Candidates", "Reports"],
      headline: "Assessment infrastructure.",
      sub: "Timed delivery · language profiles · attempt records",
      chips: ["English", "Mangal", "Krutidev"],
      items: [
        { primary: "Session runner", secondary: "Timed test delivery", tag: "Live" },
        { primary: "Language profiles", secondary: "Configurable tracks", tag: "Config" },
        { primary: "Attempt records", secondary: "Review & report", tag: "Data" },
      ],
    },
  },
  {
    slug: "support-platform",
    name: "Support Platform",
    url: "https://support.v3itechnology.com/",
    domain: "support.v3itechnology.com",
    tagline: "A helpdesk that gets to the problem quickly.",
    summary:
      "A support portal built around problem reporting and a searchable FAQ, with a command palette for fast navigation.",
    industry: "Customer support & operations",
    categories: ["Web Application", "Business Website"],
    accent: { from: "#0ea5e9", to: "#22d3ee", soft: "#38bdf8" },
    monogram: "SU",
    audited: true,
    auditNote:
      "Audited from the live portal: command-palette entry point, 'Report Problem' action and FAQ access are publicly visible.",
    stack: [t("Next.js"), t("React"), t("Node.js"), t("MongoDB"), t("Tailwind CSS")],
    overview:
      "The V3i Support Platform is the support surface for the studio's products. The live portal opens on a focused landing view with a command palette (⌘K), a direct 'Report Problem' action and an FAQ section — a deliberately short path from 'something is wrong' to a recorded request.",
    problem:
      "Support usually starts with an email address and a long form. Users repeat information, issues arrive without context, and answers that already exist in documentation are asked again.",
    objectives: [
      "Make reporting a problem a first-class, obvious action.",
      "Answer common questions before a ticket is created.",
      "Reduce the number of clicks between landing and submitting an issue.",
    ],
    audience: [
      "Clients using V3i-built platforms",
      "Institute and business administrators",
      "End users who need a quick answer or a way to escalate",
    ],
    features: [
      "Command palette for keyboard-first navigation",
      "Dedicated 'Report Problem' entry point",
      "FAQ surface for self-service answers",
      "Minimal landing view that prioritises action over marketing",
    ],
    modules: [
      { name: "Report problem", detail: "The primary action, reachable from the first screen." },
      { name: "FAQ", detail: "Self-service answers surfaced next to the reporting flow." },
      { name: "Command palette", detail: "Keyboard-driven navigation across the portal." },
    ],
    design: [
      "One action dominates the page; everything else supports it.",
      "Keyboard affordances are visible rather than hidden, matching the tool's operational audience.",
    ],
    ux: [
      "Reporting is one click from the landing state, with no account wall in front of it.",
      "The FAQ and the form live together, so a user can escalate immediately after reading.",
    ],
    responsive: [
      "The palette and actions collapse into a compact mobile header without losing the primary button.",
    ],
    businessValue: [
      "Fewer incomplete support requests and less back-and-forth per issue.",
      "A support surface that can be extended per product without redesigning the entry point.",
    ],
    services: ["Support UX", "Full-stack development", "Design system"],
    preview: {
      variant: "helpdesk",
      brand: "V3i Support",
      menu: ["Home", "FAQ", "Report"],
      headline: "What do you need help with?",
      sub: "Search the knowledge base or raise a problem",
      chips: ["⌘ K", "Report Problem", "FAQ"],
      items: [
        { primary: "Report a problem", secondary: "Attach context and submit", tag: "Primary" },
        { primary: "Billing & plans", secondary: "FAQ · 12 articles", tag: "FAQ" },
        { primary: "Account access", secondary: "FAQ · 8 articles", tag: "FAQ" },
      ],
    },
  },
  {
    slug: "shopping-platform",
    name: "Shopping Platform",
    url: "https://shopping.v3itechnology.com/",
    domain: "shopping.v3itechnology.com",
    tagline: "A storefront tuned for discovery and offers.",
    summary:
      "PharmWeb, a multi-category commerce build with promotional banners, category shelves, product listings and discount-led pricing.",
    industry: "Multi-category e-commerce",
    categories: ["E-commerce", "Web Application"],
    accent: { from: "#14b8a6", to: "#60a5fa", soft: "#2dd4bf" },
    monogram: "PW",
    audited: true,
    auditNote:
      "Audited from the live catalogue: promotional banners, category shelves (Fashion, Blankets, Best Offers) and product listings with ratings and pricing are publicly visible.",
    stack: [t("Next.js"), t("React"), t("Node.js"), t("MongoDB"), t("Tailwind CSS")],
    overview:
      "The Shopping Platform is a V3i commerce build live under the PharmWeb brand. The homepage leads with rotating promotional banners, then moves into category shelves — fashion, blankets, best offers, electronics — with dense product listings carrying ratings, inclusive-of-tax pricing, strike-through pricing and EMI notes.",
    problem:
      "A catalogue with many categories and frequent promotions needs a homepage that can carry offers without turning into a wall of banners. Discovery has to stay legible while price and discount remain the strongest signals.",
    objectives: [
      "Lead with current offers while keeping category navigation intact.",
      "Present price, discount and rating consistently across every listing.",
      "Support dense product grids that still read comfortably on mobile.",
    ],
    audience: [
      "Retail shoppers browsing offers by category",
      "Price-sensitive buyers comparing discounted listings",
      "Store operators publishing promotions and price changes",
    ],
    features: [
      "Rotating promotional banner area for campaigns",
      "Category shelves with 'Explore more' entry points",
      "Product cards with ratings, MRP and discounted price",
      "EMI messaging on higher-value listings",
      "Dense multi-category catalogue layout",
    ],
    modules: [
      { name: "Merchandising", detail: "Banner slots and category shelves that drive the homepage rhythm." },
      { name: "Catalogue", detail: "Product listings grouped by category with price and rating metadata." },
      { name: "Offers", detail: "Discount-led presentation, including inclusive-of-tax and EMI notes." },
    ],
    design: [
      "Banners carry the campaign colour; the product grid stays neutral so prices remain readable.",
      "Listing typography is compact and consistent, built for scanning rather than storytelling.",
    ],
    ux: [
      "Category shelves reduce the catalogue to a few entry points instead of a single long list.",
      "Price and discount are always in the same position on a card, so comparison needs no re-reading.",
    ],
    responsive: [
      "Grid density steps down from four columns to two and one across breakpoints.",
      "Banner heights scale so promotional artwork never pushes the first product below the fold.",
    ],
    businessValue: [
      "A storefront operators can re-merchandise without a redesign.",
      "Consistent card anatomy makes price-led comparison fast, which supports conversion.",
    ],
    services: ["E-commerce development", "Catalogue UX", "Offer merchandising"],
    preview: {
      variant: "store",
      brand: "PharmWeb",
      menu: ["Fashion", "Blankets", "Electronics", "Best Offers"],
      headline: "Up to 60% off everyday items.",
      sub: "Free to browse · inclusive of all taxes",
      chips: ["Fashion", "Blankets", "Best Offers"],
      items: [
        { primary: "Cotton formal chinos", secondary: "₹1,598.98  ₹799.00", tag: "67 rated" },
        { primary: "Woolen single blanket", secondary: "₹998.98  ₹399.00", tag: "Winter" },
        { primary: "Memory foam pillow", secondary: "₹1,599.00  ₹597.00", tag: "EMI" },
      ],
      status: "60% off · everyday items",
    },
  },
  {
    slug: "scholax",
    name: "Scholax",
    url: "https://scholax.v3itechnology.com/",
    domain: "scholax.v3itechnology.com",
    tagline: "School administration, out of spreadsheets.",
    summary:
      "A school management system covering student records, fees, certificates, marksheets, ID cards and reporting in one platform.",
    industry: "Education administration",
    categories: ["Educational Platform", "Web Application"],
    accent: { from: "#3b82f6", to: "#a855f7", soft: "#60a5fa" },
    monogram: "SX",
    audited: true,
    auditNote:
      "Audited from the published product page: student data, fees, certificates, analytics, transfer certificates, marksheets, merged marksheets, ID cards and role-based access are all stated on the live site.",
    stack: [t("Next.js"), t("React"), t("TypeScript"), t("Node.js"), t("MongoDB"), t("Tailwind CSS")],
    overview:
      "Scholax is a cloud school management system. Its public product page organises the offer into four headline capabilities — student data, fees management, certificates and analytics — followed by the specific documents schools generate: transfer certificates, marksheets, merged marksheets and ID cards. Access is role-based, and the platform supports multiple classes and sessions.",
    problem:
      "School records live across registers, spreadsheets and individual teachers' machines. Producing a transfer certificate or a consolidated marksheet becomes a manual hunt, and leadership has no reliable, current view of fees or enrolment.",
    objectives: [
      "Hold student, fee and academic records in one secure, cloud-based system.",
      "Generate official documents — TC, marksheets, ID cards — from stored data.",
      "Restrict access by role so staff see only what their work requires.",
      "Give administrators current reporting instead of month-old summaries.",
    ],
    audience: [
      "School administrators and principals",
      "Accounts and fees staff",
      "Class teachers and academic coordinators",
      "Parents and students receiving documents",
    ],
    features: [
      "Student information management with attendance and performance tracking",
      "Fee tracking, invoice generation, receipts and collection reporting",
      "Transfer certificate generation and verification",
      "Marksheet and merged marksheet generation",
      "Student ID card design and printing",
      "Real-time reporting and analytics",
      "Role-based access control",
      "Multi-class and multi-session support",
    ],
    modules: [
      { name: "Students", detail: "Records, attendance and performance in one profile per student." },
      { name: "Fees", detail: "Collection, invoices, receipts and outstanding reporting." },
      { name: "Certificates", detail: "Transfer certificates with generation and verification." },
      { name: "Academics", detail: "Marksheets, merged marksheets across terms, and grade handling." },
      { name: "Identity", detail: "ID card layouts prepared for print." },
      { name: "Analytics", detail: "Operational reporting for administrators." },
    ],
    design: [
      "A capability grid on the marketing page mirrors the product's actual module structure.",
      "Calm blue-violet palette and generous card spacing keep a data-heavy product approachable.",
      "Icons pair with plain-language labels so staff can self-onboard with minimal training.",
    ],
    ux: [
      "The pitch is organised by job to be done — collect fees, issue a certificate — not by database table.",
      "Role-based access is stated as a usability feature for staff, not only as a security note.",
    ],
    responsive: [
      "Feature grid reflows from four columns to two, then a single column.",
      "Document-generation screens are designed for office desktops and tablets used on the move.",
    ],
    businessValue: [
      "Administrative documents that took hours are generated from existing records.",
      "One source of truth for fees reduces leakage and reconciliation work.",
      "Role-based access makes the platform viable for larger staff teams.",
    ],
    services: ["Product strategy", "Full-stack development", "UX design", "Document generation"],
    preview: {
      variant: "school",
      brand: "Scholax",
      menu: ["Students", "Fees", "Certificates", "Reports"],
      headline: "Complete school management. Simplified.",
      sub: "Students · fees · certificates · academics",
      chips: ["Student Data", "Fees", "Analytics"],
      items: [
        { primary: "Student records", secondary: "Attendance & performance", tag: "1,284" },
        { primary: "Fees collected", secondary: "Invoices & receipts", tag: "This term" },
        { primary: "Transfer certificate", secondary: "Generate & verify", tag: "Ready" },
      ],
      status: "Role-based access · multi-session",
    },
  },
  {
    slug: "24x7-helpline",
    name: "24x7 Helpline",
    url: "https://24x7helpline.com/",
    domain: "24x7helpline.com",
    tagline: "Free classifieds, built around local reach.",
    summary:
      "An online classified advertisement portal where users post free ads across categories, with featured listings, sorting and account access.",
    industry: "Classified advertising",
    categories: ["Classifieds", "Web Application"],
    accent: { from: "#f59e0b", to: "#ef4444", soft: "#fbbf24" },
    monogram: "24",
    audited: true,
    auditNote:
      "Audited from the live portal: free ad posting, login/register, featured listings, sub-categories and sort controls are publicly visible.",
    stack: [t("PHP"), t("MySQL"), t("JavaScript"), t("Tailwind CSS")],
    overview:
      "24x7 Helpline is a free classified advertisement portal. Listings are organised into categories and sub-categories, with featured placements, sort controls for recency, price and condition, and a login/register path for people posting ads. The brand positions itself as a local, always-open marketplace for buying, selling and advertising services.",
    problem:
      "Local sellers and service providers need a low-friction place to publish an ad, while buyers need to filter a noisy board down to something relevant. Generic social feeds provide neither structure nor searchability.",
    objectives: [
      "Let anyone publish a free ad without a lengthy onboarding flow.",
      "Organise listings by category, sub-category and condition.",
      "Give paid or promoted listings clear visibility without breaking the browsing experience.",
    ],
    audience: [
      "Local sellers and service providers",
      "Buyers searching by category and locality",
      "Small businesses advertising services",
    ],
    features: [
      "Free ad posting with account registration",
      "Category and sub-category organisation",
      "Featured listing placement",
      "Sorting by updated date, price, new/used and warranty",
      "Per-listing condition, brand, price and contact details",
    ],
    modules: [
      { name: "Listing board", detail: "Category-led product list with featured slots and sort controls." },
      { name: "Accounts", detail: "Registration and login for people posting ads." },
      { name: "Ad detail", detail: "Condition, price, description and dealer contact in one view." },
    ],
    design: [
      "Marketplace-native layout: dense listing rows, clear price hierarchy, minimal ornament.",
      "Featured items are distinguished by placement and label rather than heavy colour.",
    ],
    ux: [
      "Sorting is exposed at the top of the list, where a buyer decides what to look at next.",
      "Every listing carries condition and price in the same place, supporting quick comparison.",
    ],
    responsive: [
      "The listing grid collapses to a single column with the sort bar kept in reach.",
    ],
    businessValue: [
      "Low publishing friction keeps listing volume up, which is the product's core asset.",
      "Featured placement creates a revenue path without charging for basic access.",
    ],
    services: ["Classifieds platform", "Listing UX", "Account & posting flows"],
    preview: {
      variant: "classifieds",
      brand: "24x7 Helpline",
      menu: ["About", "FAQs", "Login", "Register"],
      headline: "Free ads. Local reach. Always open.",
      sub: "Post an ad in minutes · classifieds across categories",
      chips: ["Featured", "Free Ads Post", "Kanpur"],
      items: [
        { primary: "Website design & development", secondary: "Services · Barra, Kanpur", tag: "₹500" },
        { primary: "Home appliance repair", secondary: "Services · local", tag: "Featured" },
        { primary: "Coaching & tuition", secondary: "Education · local", tag: "New" },
      ],
      status: "Sort by updated · price · condition",
    },
  },
  {
    slug: "gyan-jyoti-shorthand-classes",
    name: "Gyan Jyoti Shorthand Classes",
    url: "https://gjsc.in/",
    domain: "gjsc.in",
    tagline: "Course discovery for a shorthand institute.",
    summary:
      "A training institute website presenting shorthand, Hindi and English typing, computer and mock-test courses with online application and event listings.",
    industry: "Vocational training & education",
    categories: ["Educational Platform", "Business Website"],
    accent: { from: "#16a34a", to: "#84cc16", soft: "#4ade80" },
    monogram: "GJ",
    audited: true,
    auditNote:
      "Audited from the live site and public listings: course catalogue with durations, 'Online Apply' actions, upcoming events, teachers and FAQ sections are visible.",
    stack: [t("PHP"), t("WordPress"), t("JavaScript"), t("Tailwind CSS")],
    overview:
      "Gyan Jyoti Shorthand Classes is a Kanpur training institute site. The homepage opens on the institute's promise — 'Your career path begins here' — then lists courses with durations: shorthand training, Hindi and English typing, computer basics and advanced, online training, plus a one-week mock test. Each course carries an 'Online Apply' action, and the site adds upcoming events, teacher profiles, services and FAQs.",
    problem:
      "A local institute competes on trust and clarity. Prospective students need to know what is taught, how long it takes and how to enrol — without calling the office to ask three questions first.",
    objectives: [
      "Present every course with its duration and an obvious way to apply.",
      "Establish credibility through teachers, events and institutional detail.",
      "Keep fee expectations explicit and reduce support calls.",
    ],
    audience: [
      "Students preparing for shorthand and typing exams",
      "Job seekers adding a typing qualification",
      "Parents evaluating a local institute",
    ],
    features: [
      "Course catalogue with durations and outcome labels",
      "Online apply actions per course",
      "Upcoming events and training listings",
      "Teacher profiles and institute information",
      "FAQ section and clear fee-policy notice",
    ],
    modules: [
      { name: "Courses", detail: "Short shorthand training, typing, computer and mock-test offerings with duration." },
      { name: "Apply", detail: "Per-course online application entry point." },
      { name: "Events", detail: "Upcoming classes and training scheduled by place and date." },
      { name: "Trust", detail: "Teachers, services, FAQs and contact details." },
    ],
    design: [
      "Course cards lead with the skill, then the duration, then the action — the order a prospective student needs.",
      "A single green accent over a light, editorial layout keeps the institute approachable rather than corporate.",
    ],
    ux: [
      "'Online Apply' repeats on every course card, removing the need to search for an enrolment page.",
      "Fee non-refundable notice is surfaced early, before payment, rather than buried in terms.",
    ],
    responsive: [
      "Course grid steps from four columns to one; durations and apply buttons remain full-width and tappable.",
    ],
    businessValue: [
      "A clear catalogue converts enquiries that would otherwise depend on a phone call.",
      "Event and teacher content keeps the site current without a full redesign.",
    ],
    services: ["Institute website", "Course catalogue", "Enquiry flows"],
    preview: {
      variant: "courses",
      brand: "GJSC",
      menu: ["Courses", "Events", "Teachers", "FAQs"],
      headline: "Your career path begins here.",
      sub: "Shorthand · Hindi & English typing · computer training",
      chips: ["Shorthand", "Typing", "Mock Test"],
      items: [
        { primary: "Applied shorthand training", secondary: "6 months · certification", tag: "Apply" },
        { primary: "Typing — English", secondary: "6 months · all speeds", tag: "Apply" },
        { primary: "Computer basic & advanced", secondary: "1 year · practical", tag: "Apply" },
      ],
      status: "Admissions open · Barra, Kanpur",
    },
  },
  {
    slug: "esha-travels",
    name: "Esha Travels",
    url: "https://eshatravels.in/",
    domain: "eshatravels.in",
    tagline: "Tour packages and a fleet, presented clearly.",
    summary:
      "A Kanpur travel agency site with tour packages, vehicle-wise pricing, pilgrimage itineraries, customer reviews and enquiry paths.",
    industry: "Travel & tourism",
    categories: ["Travel & Transportation", "Business Website"],
    accent: { from: "#f97316", to: "#facc15", soft: "#fb923c" },
    monogram: "ET",
    audited: true,
    auditNote:
      "Audited from the live site and public listings: package tables by vehicle and seater, Char Dham pricing, Mahakumbh 2025 messaging, spiritual itineraries, reviews and contact details are visible.",
    stack: [t("PHP"), t("WordPress"), t("JavaScript"), t("Tailwind CSS")],
    overview:
      "Esha Travels is a Kanpur travel agency operating tours, vehicle hire and pilgrimage packages. The site publishes package pricing as a vehicle-and-seater table — Dzire through Tempo Traveller — alongside named itineraries such as Char Dham and a Mathura–Ayodhya–Kashi spiritual circuit, plus seasonal campaigns like Mahakumbh 2025. Reviews, service promises and direct contact details sit alongside the packages.",
    problem:
      "Travel pricing is usually a phone call. Groups need to compare vehicle capacity against cost before they can decide, and pilgrimage itineraries need enough detail to build confidence in the operator.",
    objectives: [
      "Publish transparent package pricing by vehicle and group size.",
      "Present named itineraries with enough detail to support a booking decision.",
      "Make contacting the agency immediate on any device.",
    ],
    audience: [
      "Families and groups planning pilgrimage travel",
      "Travellers comparing vehicle hire by capacity",
      "Seasonal visitors looking for event-specific packages",
    ],
    features: [
      "Vehicle-wise package pricing table with seater counts",
      "Named pilgrimage and heritage itineraries",
      "Seasonal campaign highlights",
      "Customer reviews and service promises",
      "Direct phone and address contact block",
    ],
    modules: [
      { name: "Packages", detail: "Vehicle and seater pricing for multi-day tours." },
      { name: "Itineraries", detail: "Destination-by-destination detail for spiritual and heritage tours." },
      { name: "Reviews", detail: "Traveller feedback placed next to the packages." },
      { name: "Contact", detail: "Phone, office address and enquiry entry points." },
    ],
    design: [
      "Warm travel palette: amber and deep orange over photography, with price tables kept deliberately plain.",
      "Headline sections stay short so the pricing table is never more than a scroll away.",
    ],
    ux: [
      "Capacity and cost appear in the same row, matching how a group actually books a vehicle.",
      "Campaign messaging is separated from evergreen packages so seasonal offers can change without touching the core catalogue.",
    ],
    responsive: [
      "The pricing table is rebuilt as stacked rows on mobile rather than shrinking to illegible text.",
      "Click-to-call is available from every package section.",
    ],
    businessValue: [
      "Transparent pricing reduces enquiry calls that end at 'what does it cost?'.",
      "Seasonal campaign slots let the agency promote without rebuilding the site.",
    ],
    services: ["Business website", "Package information architecture", "Enquiry flows"],
    preview: {
      variant: "travel",
      brand: "Esha Travels",
      menu: ["Packages", "Fleet", "Reviews", "Contact"],
      headline: "Travel further. Plan lighter.",
      sub: "Char Dham · Mahakumbh 2025 · spiritual heritage tours",
      chips: ["Char Dham", "Fleet", "Kanpur"],
      items: [
        { primary: "Char Dham · 10 days", secondary: "Innova Crysta · 7 seats", tag: "₹90,000" },
        { primary: "Tempo Traveller · 15 seats", secondary: "Multi-day tour package", tag: "₹1,35,000" },
        { primary: "Mathura · Ayodhya · Kashi", secondary: "Spiritual heritage circuit", tag: "New" },
      ],
      status: "Trusted since 2000 · Kanpur",
    },
  },
  {
    slug: "24x7-helpline-india",
    name: "24x7 Helpline India",
    url: "https://24x7helpline.in/",
    domain: "24x7helpline.in",
    tagline: "The India-facing side of the classifieds network.",
    summary:
      "A local-services classifieds portal for India, where users post and browse ads across multiple categories including education.",
    industry: "Classified advertising",
    categories: ["Classifieds", "Web Application"],
    accent: { from: "#ef4444", to: "#f97316", soft: "#f87171" },
    monogram: "IN",
    audited: false,
    auditNote:
      "The .in property could not be read during the audit. Company-directory data describes it as an online classified advertisement portal for local services. Confirm current content with the owner before publishing specifics.",
    stack: [t("PHP"), t("MySQL"), t("JavaScript"), t("Tailwind CSS")],
    overview:
      "24x7 Helpline India is the India-facing classifieds property in the same network as 24x7helpline.com. Directory records describe it as an online classified advertisement portal for local services, with ads posted across multiple categories, education among them. It is presented here as a sibling deployment with its own brand and audience rather than a duplicate of the .com site.",
    problem:
      "Local service discovery fragments across messaging groups and social feeds. A dedicated classifieds board gives advertisers a persistent listing and buyers a category structure to search within.",
    objectives: [
      "Offer a national-facing entry point alongside the original local portal.",
      "Keep category coverage broad enough for services and education listings.",
      "Preserve the same posting model so advertisers can move between properties.",
    ],
    audience: [
      "Local service providers advertising nationally",
      "Buyers searching classifieds by category",
      "Education and coaching listings",
    ],
    features: [
      "Category-based classified listings",
      "Free ad posting model",
      "Local services and education categories",
      "Shared account and posting conventions with the network",
    ],
    modules: [
      { name: "Listings", detail: "Category-organised ads for services and education." },
      { name: "Posting", detail: "Account-based ad submission." },
    ],
    design: [
      "Inherits the network's marketplace layout with a distinct accent so the two properties are never confused.",
    ],
    ux: [
      "Category-first browsing keeps a broad national board navigable.",
    ],
    responsive: [
      "Listing rows stack cleanly on mobile, with contact actions kept prominent.",
    ],
    businessValue: [
      "Extends the classifieds brand to a national domain without a second product build.",
      "Broad category coverage increases the inventory available to every visitor.",
    ],
    services: ["Classifieds platform", "Brand adaptation", "Listing UX"],
    preview: {
      variant: "classifieds",
      brand: "24x7 Helpline India",
      menu: ["Categories", "Post an Ad", "Login", "FAQs"],
      headline: "Local services, listed across India.",
      sub: "Post free ads · browse by category",
      chips: ["Services", "Education", "India"],
      items: [
        { primary: "Home services", secondary: "Repairs · maintenance", tag: "Local" },
        { primary: "Education & coaching", secondary: "Classes · institutes", tag: "Popular" },
        { primary: "Business services", secondary: "Marketing · design", tag: "New" },
      ],
      status: "Free ads · multiple categories",
    },
  },
  {
    slug: "rksss",
    name: "RKSSS",
    url: "https://rksss.com/",
    domain: "rksss.com",
    tagline: "A CBSE school's public information layer.",
    summary:
      "A senior secondary school website covering academics, admissions, fee structure, transfer certificates, news, alumni and enquiry.",
    industry: "K–12 education",
    categories: ["Business Website", "Educational Platform"],
    accent: { from: "#0d9488", to: "#22d3ee", soft: "#2dd4bf" },
    monogram: "RK",
    audited: false,
    auditNote:
      "The .com domain did not resolve during the audit. The information architecture below follows R.K. Senior Secondary School's published public pages; confirm the live domain's current structure with the school before publishing.",
    stack: [t("PHP"), t("WordPress"), t("JavaScript"), t("Tailwind CSS")],
    overview:
      "RKSSS presents a CBSE-affiliated senior secondary school to parents, students and alumni. The public information architecture covers the school's history and leadership, curriculum by division, admissions and fee structure, results, transfer certificate requests, enquiry, campus life, sports and an alumni corner, alongside a mandatory-disclosure section.",
    problem:
      "Parents need definitive answers about affiliation, fees, admissions and documents. When those live only in PDFs or at the front office, the school absorbs repetitive enquiries and families lose confidence.",
    objectives: [
      "Publish affiliation, streams and academic structure unambiguously.",
      "Make admission and transfer-certificate requests self-service.",
      "Keep news, events and achievements current.",
      "Serve alumni as a distinct audience with its own section.",
    ],
    audience: [
      "Prospective parents and students",
      "Current families checking notices and results",
      "Alumni and staff",
    ],
    features: [
      "Academic divisions from primary to senior secondary",
      "Admissions overview and fee structure",
      "Transfer certificate request entry point",
      "Results and school news sections",
      "Alumni corner and campus-life pages",
      "Mandatory disclosure and enquiry",
    ],
    modules: [
      { name: "Academics", detail: "Curriculum and divisions from classes 1 to 12." },
      { name: "Admissions", detail: "Process, fee structure and enquiry." },
      { name: "Documents", detail: "Transfer certificate requests handled online." },
      { name: "Community", detail: "News, sports, houses and alumni." },
    ],
    design: [
      "Institutional and calm: structured navigation, restrained accent colour, readable body type.",
      "Announcements are visually separated from evergreen academic content.",
    ],
    ux: [
      "The navigation mirrors how parents search for information: academics, admissions, fees, documents.",
      "Key documents are one click from the header rather than buried in a downloads page.",
    ],
    responsive: [
      "Deep navigation collapses into an accordion menu; fee tables reflow to stacked rows.",
    ],
    businessValue: [
      "Fewer routine enquiries for the front office.",
      "A credible public record of affiliation and disclosure that supports admissions.",
    ],
    services: ["School website", "Information architecture", "Enquiry & document flows"],
    preview: {
      variant: "campus",
      brand: "RKSSS",
      menu: ["Academics", "Admissions", "Results", "Alumni"],
      headline: "Excellence in education.",
      sub: "CBSE affiliated · science, commerce & humanities",
      chips: ["Admissions", "Fee Structure", "Transfer Certificate"],
      items: [
        { primary: "Senior secondary", secondary: "Science · Commerce · Arts", tag: "Classes 11–12" },
        { primary: "Admission enquiry", secondary: "Process & fee structure", tag: "Open" },
        { primary: "Campus life", secondary: "Sports · houses · clubs", tag: "New" },
      ],
      status: "Announcements · results · alumni",
    },
  },
  {
    slug: "mv-express-cargo",
    name: "MV Express Cargo",
    url: "https://mvexpresscargo.com/",
    domain: "mvexpresscargo.com",
    tagline: "A freight brand's digital front door.",
    summary:
      "A cargo and logistics business website presenting services, coverage and a direct enquiry path for shippers.",
    industry: "Logistics & freight",
    categories: ["Business Website", "Travel & Transportation"],
    accent: { from: "#eab308", to: "#f97316", soft: "#facc15" },
    monogram: "MV",
    audited: false,
    auditNote:
      "No readable public content could be retrieved from this domain during the audit. Service scope below is stated generically for a cargo business and must be confirmed with the owner — no shipment volumes, lanes or performance claims are made.",
    stack: [t("PHP"), t("WordPress"), t("JavaScript"), t("Tailwind CSS")],
    overview:
      "MV Express Cargo is a freight and cargo business site built to give shippers a clear picture of what the company moves and how to reach it. The build is structured around service explanation, coverage and enquiry rather than a catalogue, which suits a relationship-led logistics business.",
    problem:
      "Freight buyers shortlist on credibility. Without a site that states services, coverage and contact routes, a cargo business depends entirely on referrals and loses the buyers who check online first.",
    objectives: [
      "State the service offering in plain, scannable terms.",
      "Make enquiry a single, obvious action.",
      "Present the business credibly on mobile, where most first checks happen.",
    ],
    audience: [
      "Businesses sourcing freight and cargo movement",
      "Repeat shippers checking contact routes",
      "Procurement teams doing initial due diligence",
    ],
    features: [
      "Service overview sections",
      "Coverage and capability messaging",
      "Direct enquiry and contact paths",
      "Mobile-first presentation for on-the-go checks",
    ],
    modules: [
      { name: "Services", detail: "Cargo offering described for a non-technical buyer." },
      { name: "Enquiry", detail: "Contact routes surfaced throughout the page." },
    ],
    design: [
      "Industrial palette with a single warm accent, heavy headings and a straightforward reading order.",
    ],
    ux: [
      "Service and contact information are never more than one scroll apart.",
    ],
    responsive: [
      "Sections reflow to a single column with contact actions kept visible.",
    ],
    businessValue: [
      "Converts referral interest into a direct enquiry instead of a dead end.",
      "A single page a sales team can send ahead of a call.",
    ],
    services: ["Business website", "Service presentation", "Enquiry flows"],
    preview: {
      variant: "logistics",
      brand: "MV Express Cargo",
      menu: ["Services", "Network", "About", "Contact"],
      headline: "Freight, moved with certainty.",
      sub: "Cargo services · coverage · direct enquiry",
      chips: ["Cargo", "Coverage", "Enquiry"],
      items: [
        { primary: "Cargo movement", secondary: "Business freight solutions", tag: "Service" },
        { primary: "Coverage", secondary: "Route and network detail", tag: "Network" },
        { primary: "Enquiry", secondary: "Talk to the operations team", tag: "Contact" },
      ],
      status: "Service scope pending confirmation",
    },
  },
  {
    slug: "rajmata-inter-college",
    name: "Rajmata Inter College",
    url: "https://rajmataintercollege.com/",
    domain: "rajmataintercollege.com",
    tagline: "A college site with its own admin layer.",
    summary:
      "An inter college website for a Kanpur institution, with course and news sections, faculty profiles, multilingual navigation and an admin panel.",
    industry: "Higher secondary education",
    categories: ["Educational Platform", "Business Website"],
    accent: { from: "#a855f7", to: "#ec4899", soft: "#c084fc" },
    monogram: "RI",
    audited: true,
    auditNote:
      "Audited from the live site: course, news, event and contact sections, faculty profiles, an admin panel link and V3i Technology build credit are publicly visible.",
    stack: [t("PHP"), t("MySQL"), t("JavaScript"), t("Bootstrap"), t("Tailwind CSS")],
    overview:
      "Rajmata Inter College is an inter college in Hardev Nagar, Kanpur, established in 1995. Its site introduces the institution and its academic offer, then publishes news, events, courses and faculty profiles. An admin panel link and V3i Technology build credit appear in the public footer, and the interface offers English and Hindi navigation.",
    problem:
      "An institution's site goes stale the moment news and courses live in the developer's code. The college needed content it could maintain itself, in the languages its families actually read.",
    objectives: [
      "Publish courses, news and events that staff can update.",
      "Serve both English and Hindi readers.",
      "Present faculty and institutional history credibly.",
      "Keep an admin layer behind a separate, controlled entry point.",
    ],
    audience: [
      "Prospective students and parents",
      "Current students checking notices",
      "Faculty and administration",
    ],
    features: [
      "Course, news and event sections",
      "Faculty and staff profiles",
      "English and Hindi language navigation",
      "Admin panel for content updates",
      "Institutional history and contact information",
    ],
    modules: [
      { name: "Content", detail: "News, events and courses published by staff." },
      { name: "Faculty", detail: "Department and staff profiles with roles." },
      { name: "Admin", detail: "Separate authenticated area for content maintenance." },
      { name: "Languages", detail: "English and Hindi navigation paths." },
    ],
    design: [
      "Institutional layout with a deep violet accent, wide hero statements and clearly separated notice areas.",
      "Course and news blocks use repeated card structures so staff can add content without design work.",
    ],
    ux: [
      "Language switching is exposed in the header, not hidden in a settings menu.",
      "Admin access is kept visually separate from the public journey.",
    ],
    responsive: [
      "Header navigation condenses on mobile while keeping news and contact reachable.",
    ],
    businessValue: [
      "The college maintains its own news and courses, so the site stays current between rebuilds.",
      "Bilingual presentation broadens the audience the site can serve.",
    ],
    services: ["Institutional website", "Admin panel", "Bilingual content structure"],
    preview: {
      variant: "college",
      brand: "Rajmata Inter College",
      menu: ["Home", "Courses", "News", "Contact"],
      headline: "Opening a new world of education.",
      sub: "Hardev Nagar, Kanpur · established 1995",
      chips: ["Courses", "Faculty", "Admin"],
      items: [
        { primary: "New courses", secondary: "Updated curriculum", tag: "Academics" },
        { primary: "News & events", secondary: "Campus announcements", tag: "Latest" },
        { primary: "Our faculty", secondary: "Departments & roles", tag: "Staff" },
      ],
      status: "English · हिंदी",
    },
  },
  {
    slug: "the-pryzm-world",
    name: "The Pryzm World",
    url: "https://thepryzmworld.com/",
    domain: "thepryzmworld.com",
    tagline: "A creative house with many fronts.",
    summary:
      "A creative media and production house site: services, subsidiary ventures, founder story and a brand-led visual identity.",
    industry: "Creative media & production",
    categories: ["Creative & Media", "Business Website"],
    accent: { from: "#d946ef", to: "#6366f1", soft: "#e879f9" },
    monogram: "PZ",
    audited: true,
    auditNote:
      "Audited from the live site: service list, subsidiary ventures, founder story, production and marketing positioning are publicly visible.",
    stack: [t("Next.js"), t("React"), t("Tailwind CSS"), t("JavaScript")],
    overview:
      "The Pryzm World is a full-service creative media and production house. The site lists its capabilities — social media marketing, reel and video production, product photography, podcast services, brand identity, Meta ads, influencer collaborations and web design — then introduces its ventures: Pryzm Creations, Pryzm Digital Marketing, Mic on Pryzm, Pryzm Stories and Pryzm Union. A founder narrative anchors the brand.",
    problem:
      "A multi-venture studio risks looking like several unrelated businesses. It needed one identity that could present a broad service list without diluting the brand or burying the founder-led story.",
    objectives: [
      "Present the full service range without a wall of bullet points.",
      "Give each subsidiary venture its own recognisable identity within one house.",
      "Lead with a story rather than a service menu.",
    ],
    audience: [
      "Brands and startups sourcing creative production",
      "Creators seeking a studio partner",
      "Prospective partners and collaborators",
    ],
    features: [
      "Capability list across production, marketing and design",
      "Subsidiary venture directory",
      "Founder story section",
      "Brand-led visual identity",
      "Contact and enquiry paths",
    ],
    modules: [
      { name: "Services", detail: "Production, marketing, design and growth offers in one list." },
      { name: "Ventures", detail: "Sub-brands presented as a family of studios." },
      { name: "Story", detail: "Founder narrative establishing the house's positioning." },
    ],
    design: [
      "Expressive display type and a vivid gradient accent make the site feel like a production reel rather than a consultancy page.",
      "Venture cards reuse one structure so the family reads as a system.",
    ],
    ux: [
      "The service list doubles as navigation, letting a visitor self-identify quickly.",
      "The founder section sits after capability, so credibility follows evidence.",
    ],
    responsive: [
      "Long service lists collapse into grouped blocks; venture cards stack without losing hierarchy.",
    ],
    businessValue: [
      "One brand can sell several kinds of work without fragmenting its identity.",
      "A founder-led narrative differentiates the studio from a generic agency listing.",
    ],
    services: ["Brand website", "Editorial direction", "Front-end development"],
    preview: {
      variant: "agency",
      brand: "Pryzm World",
      menu: ["Work", "Services", "Ventures", "About"],
      headline: "We create impact.",
      sub: "Creative media & production house",
      chips: ["Video", "Podcast", "Brand Identity"],
      items: [
        { primary: "Pryzm Creations", secondary: "Content & production", tag: "Studio" },
        { primary: "Mic on Pryzm", secondary: "Podcast production", tag: "Studio" },
        { primary: "Pryzm Union", secondary: "Event management", tag: "Studio" },
      ],
      status: "Full-service creative house",
    },
  },
];

export const projectsCount = projects.length;

export const categories: { name: Category; count: number }[] = (
  [
    "Web Application",
    "Educational Platform",
    "Business Website",
    "E-commerce",
    "Travel & Transportation",
    "Classifieds",
    "Creative & Media",
  ] as Category[]
).map((name) => ({ name, count: projects.filter((project) => project.categories.includes(name)).length }));

export const technologies: string[] = Array.from(
  new Set(projects.flatMap((project) => project.stack.map((item) => item.name))),
).sort((a, b) => a.localeCompare(b));

export const verifiedTechnologies: string[] = Array.from(
  new Set(
    projects.flatMap((project) => project.stack.filter((item) => item.verified).map((item) => item.name)),
  ),
).sort((a, b) => a.localeCompare(b));

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectIndex(slug: string): number {
  return projects.findIndex((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string): { previous: Project; next: Project } {
  const index = getProjectIndex(slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return { previous, next };
}
