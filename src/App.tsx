import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const pages = ["Home", "Projects", "Skills", "Education", "Contact"];
type ThemeMode = "dark" | "light";

const glass =
  "surface-card border border-white/10 bg-[#0b0d12]/80 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.45)]";
const glassStrong =
  "surface-card surface-card-strong border border-white/10 bg-[#0d1017]/90 backdrop-blur-xl shadow-[0_22px_80px_rgba(0,0,0,0.55)]";

const navGlass =
  "site-nav border-b border-white/[0.06] bg-[#030817]/42 backdrop-blur-md supports-[backdrop-filter]:bg-[#030817]/34";
const navPanel =
  "surface-pill rounded-full border border-white/[0.07] bg-white/[0.018] px-1.5 py-1 backdrop-blur-sm";
const navItemBase =
  "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-300";
const navItemActive = "bg-white/[0.055] text-cyan-300";
const navItemIdle =
  "text-zinc-500 hover:bg-white/[0.035] hover:text-zinc-200";

const navHeightClass = "pt-[64px]";
const projectGlass =
  "surface-card border border-white/10 bg-white/[0.045] backdrop-blur-2xl shadow-[0_18px_55px_rgba(0,0,0,0.32)]";
const projectGlassSoft =
  "surface-subtle border border-white/10 bg-white/[0.032] backdrop-blur-xl";
const projectChipGlass =
  "surface-chip border border-white/10 bg-white/[0.035] backdrop-blur-md";
const hiddenScrollbar =
  "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

const whatsappNumber = "94762334979";
const githubUrl = "https://github.com/Mohamed-Ruzaik";

const bodyFont =
  "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const headingFont =
  "'Space Grotesk', Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const accentPalette = {
  "AI Tools": "text-violet-300 border-violet-300/20 bg-violet-300/[0.055]",
  "Developer Tools": "text-cyan-300 border-cyan-300/20 bg-cyan-300/[0.055]",
  "Health Tech": "text-emerald-300 border-emerald-300/20 bg-emerald-300/[0.055]",
  Hardware: "text-amber-300 border-amber-300/20 bg-amber-300/[0.055]",
  "System Tools": "text-sky-300 border-sky-300/20 bg-sky-300/[0.055]",
  "Game Dev": "text-rose-300 border-rose-300/20 bg-rose-300/[0.055]",
  "Design Concept": "text-fuchsia-300 border-fuchsia-300/20 bg-fuchsia-300/[0.055]",
  "Business Systems": "text-lime-300 border-lime-300/20 bg-lime-300/[0.055]",
  "Browser Concept": "text-indigo-300 border-indigo-300/20 bg-indigo-300/[0.055]",
} as const;

const softProjectGlow = {
  "AI Tools": "rgba(167,139,250,0.05)",
  "Developer Tools": "rgba(34,211,238,0.055)",
  "Health Tech": "rgba(110,231,183,0.045)",
  Hardware: "rgba(252,211,77,0.045)",
  "System Tools": "rgba(125,211,252,0.045)",
  "Game Dev": "rgba(251,113,133,0.045)",
  "Design Concept": "rgba(232,121,249,0.045)",
  "Business Systems": "rgba(190,242,100,0.045)",
  "Browser Concept": "rgba(129,140,248,0.045)",
} as const;

const projects = [
  {
    title: "Pixel Forge Studio",
    type: "AI Design Platform",
    status: "Active / Productionizing",
    impact:
      "Hybrid design tool combining Canva, Draw.io, PlantUML, and AI-assisted editing.",
    description:
      "A desktop-first creative system for generating diagrams, covers, slides, SVG layouts, project assets, and document visuals with AI-assisted editing workflows.",
    stack: ["Electron", "React", "Supabase", "PlantUML", "AI", "SVG"],
    icon: "layers",
    category: "AI Tools",
    scale: "Signature Build",
    highlight: "Design automation + visual editor ecosystem",
  },
  {
    title: "Volt IDE",
    type: "AI-Core Code Editor",
    status: "Near Usable",
    impact:
      "A Tauri-based IDE with terminal, command runner, live preview direction, and AI-assisted coding flow.",
    description:
      "An experimental Cursor-like desktop IDE focused on AI command execution, project navigation, terminal output, and developer workflow speed.",
    stack: ["Tauri", "Rust", "React", "xterm", "PowerShell", "AI"],
    icon: "terminal",
    category: "Developer Tools",
    scale: "Core System",
    highlight: "Real developer tooling, not just UI mockups",
  },
  {
    title: "Neurofit / Calforge",
    type: "AI Fitness Coach",
    status: "50% Built",
    impact:
      "Mobile + desktop companion that routes user prompts through a local AI-powered Windows client.",
    description:
      "A personal fitness and health logging system for food, water, medicine, workouts, reminders, and AI coaching synced through Supabase.",
    stack: ["Mobile", "Desktop", "Supabase", "Codex CLI", "Gemini", "AI Coach"],
    icon: "dumbbell",
    category: "Health Tech",
    scale: "Major System",
    highlight: "Cross-device AI agent architecture",
  },
  {
    title: "Mediconnect",
    type: "Hospital Digitization System",
    status: "Prototype / University Project",
    impact:
      "Digital workflow concept for hospitals, pharmacies, appointments, billing, doctors, and admin operations.",
    description:
      "A healthcare management system concept designed to modernize hospital workflows with structured database design and admin dashboards.",
    stack: ["React", "FastAPI", "Supabase", "SQL", "Admin Dashboard"],
    icon: "medical",
    category: "Health Tech",
    scale: "Academic + Practical",
    highlight: "Government hospital workflow thinking",
  },
  {
    title: "Telescope Automation System",
    type: "Hardware / Optical System Concept",
    status: "Under Design",
    impact:
      "A telescope rebuild concept focused on mechanical design, image capture direction, and future auto-focus planning.",
    description:
      "A personal hardware-software project currently in the design stage, exploring telescope structure, control flow, image capture workflow, and future automation possibilities.",
    stack: [
      "Hardware",
      "Optics",
      "Automation Planning",
      "Control System",
      "Image Capture",
    ],
    icon: "telescope",
    category: "Hardware",
    scale: "Design Stage",
    highlight: "Hardware design first, automation later",
  },
  {
    title: "Net Warden",
    type: "Network Monitor / Controller",
    status: "MVP Planning",
    impact:
      "Desktop tool for process-level network monitoring, blocking, taskbar speed display, and future throttling support.",
    description:
      "A Windows utility concept for tracking network usage by app, controlling access rules, showing speed indicators, and managing startup behavior.",
    stack: ["Rust", "Electron", "React", "Windows APIs", "Networking"],
    icon: "shield",
    category: "System Tools",
    scale: "Utility",
    highlight: "Built because commercial tools are expensive",
  },
  {
    title: "ShadowRun: Signal Collapse",
    type: "2D Side-Scroller Game",
    status: "Playable Prototype",
    impact:
      "Unity action platformer with combat, projectile shooting, dash strike, enemies, menus, and final objective gameplay.",
    description:
      "A cinematic 2D side-scrolling game prototype about a prince fighting through corrupted lands to destroy a Signal Tower.",
    stack: ["Unity", "C#", "2D Platformer", "Game Design", "Animation"],
    icon: "game",
    category: "Game Dev",
    scale: "Academic + Creative",
    highlight: "Gameplay systems beyond basic coursework",
  },
  {
    title: "Mesh Forge 3D",
    type: "3D / CAD Tool Concept",
    status: "Under Design",
    impact:
      "A 3D modeling and CAD-style creative tool concept currently being shaped at the product design level.",
    description:
      "A future-facing creative tool idea for 3D scene creation, object editing, export workflows, and design-focused modeling experiments. The project is currently under design, not yet implemented as a working AI system.",
    stack: ["3D", "CAD", "FBX", "Scene Graph", "Creative Tools", "Product Design"],
    icon: "boxes",
    category: "Design Concept",
    scale: "Design Stage",
    highlight: "3D product concept under design",
  },
  {
    title: "Operation Signal Blackout",
    type: "Unity Mission-Based Game Project",
    status: "Custom Unity Project",
    impact:
      "A more original Unity game project with its own solution, compiled assemblies, and environment tooling.",
    description:
      "A custom Unity project with a stronger game identity than a tutorial clone. The project direction suggests mission-based action, stealth, survival, or tactical gameplay, supported by environment presentation and vegetation tooling.",
    stack: [
      "Unity",
      "C#",
      "Game Systems",
      "Environment Tooling",
      "Vegetation Spawner",
    ],
    icon: "game",
    category: "Game Dev",
    scale: "Custom Project",
    highlight: "Mission-based game identity with environment tooling",
  },
  {
    title: "Admin Wallet / Marketplace System",
    type: "Digital Services Marketplace",
    status: "MVP Architecture Planned",
    impact:
      "Admin-controlled wallet ledger, manual topups, products, projects, subscriptions, orders, and user access control.",
    description:
      "A business platform concept for selling digital services and project access using an LKR wallet system. Online payment is disabled for now, so users submit topup requests and the admin approves, rejects, credits, debits, grants access, and manages subscriptions manually.",
    stack: ["React", "Vite", "TypeScript", "Tailwind", "Supabase", "LKR Wallet"],
    icon: "wallet",
    category: "Business Systems",
    scale: "MVP System",
    highlight: "Manual wallet + subscription marketplace engine",
  },
  {
    title: "Velocity Browser",
    type: "Desktop Browser Product Concept",
    status: "Phased Build Plan",
    impact:
      "A Chromium-style desktop browser concept with tabs, omnibar, history, bookmarks, downloads, settings, private mode, adblock, AI sidebar, and live translate roadmap.",
    description:
      "A browser product concept planned around Rust native services, an Electron shell, and a React + TypeScript UI. The roadmap is split into controlled V1, V2, and V3 phases so the app stays runnable after each step instead of becoming a giant half-built prototype.",
    stack: ["Rust", "Electron", "React", "TypeScript", "Browser UI", "AI Sidebar"],
    icon: "search",
    category: "Browser Concept",
    scale: "Concept Plan",
    highlight: "Rust + Electron browser roadmap with AI sidebar",
  },
] as const;

const projectFilterOptions = [
  { label: "All", categories: ["All"] },
  {
    label: "AI + Tools",
    categories: ["AI Tools", "Developer Tools", "System Tools", "Browser Concept"],
  },
  { label: "Health", categories: ["Health Tech"] },
  { label: "Games", categories: ["Game Dev"] },
  { label: "Hardware", categories: ["Hardware", "Design Concept"] },
  { label: "Systems", categories: ["Business Systems"] },
];

const education = [
  {
    title: "Bachelor of Computer Science (Software Engineering)",
    institution: "Edith Cowan University",
    period: "Expected 2026",
    details: [
      "Focused on software engineering, system design, application development, and practical project-based implementation.",
    ],
    level: "Degree",
  },
  {
    title: "G.C.E Advanced Level (A/L)",
    institution: "St. Servatius College",
    period: "2023",
    details: ["Physics - C", "Combined Mathematics - C", "Chemistry - C"],
    level: "School",
  },
  {
    title: "G.C.E Ordinary Level (O/L)",
    institution: "St. Servatius College",
    period: "2019",
    details: [
      "Mathematics - A",
      "Science - A",
      "English - A",
      "ICT - A",
      "Accounting and Business Studies - A",
      "History - A",
      "Arts - A",
      "Islam - B",
      "Sinhala - B",
    ],
    level: "School",
  },
] as const;

const skills = [
  "React",
  "Electron",
  "Tauri",
  "Rust",
  "Supabase",
  "SQL",
  "FastAPI",
  "Unity",
  "C#",
  "Tailwind",
  "AI Workflows",
  "System Design",
  "Product Thinking",
  "UI/UX",
  "Prompt Engineering",
  "Desktop Apps",
  "Wallet Systems",
  "Game Systems",
];

const quickStats = [
  { label: "Projects", value: "10+" },
  { label: "Core", value: "AI Tools" },
  { label: "Base", value: "Sri Lanka" },
] as const;

type IconName = keyof typeof iconFactories;

function Icon({ name, className = "h-5 w-5" }: { name: IconName | string; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": "true",
  };

  const icons = iconFactories(common);
  return icons[(name as IconName) ?? "rocket"] || icons.rocket;
}

const iconFactories = (common: Record<string, unknown>) => ({
  arrow: (
    <svg {...common}>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  ),
  github: (
    <svg {...common}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.5 2-5-2-7-2" />
    </svg>
  ),
  mail: (
    <svg {...common}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  ),
  pin: (
    <svg {...common}>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  terminal: (
    <svg {...common}>
      <path d="m4 17 6-6-6-6" />
      <path d="M12 19h8" />
    </svg>
  ),
  layers: (
    <svg {...common}>
      <path d="m12 2 9 5-9 5-9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </svg>
  ),
  shield: (
    <svg {...common}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    </svg>
  ),
  telescope: (
    <svg {...common}>
      <path d="m10.5 6.5 7 3" />
      <path d="m9 10 8 3.5" />
      <path d="M17 5 6 9.5l2 5L19 10Z" />
      <path d="M12 15v7" />
      <path d="m8 22 4-7 4 7" />
    </svg>
  ),
  medical: (
    <svg {...common}>
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <path d="M3 10h18" />
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M10 16h4" />
      <path d="M12 14v4" />
    </svg>
  ),
  dumbbell: (
    <svg {...common}>
      <path d="m6.5 6.5 11 11" />
      <path d="m21 21-3-3" />
      <path d="m3 3 3 3" />
      <path d="m18 22 4-4" />
      <path d="m2 6 4-4" />
    </svg>
  ),
  game: (
    <svg {...common}>
      <path d="M6 12h4" />
      <path d="M8 10v4" />
      <path d="M15 13h.01" />
      <path d="M18 11h.01" />
      <rect x="2" y="7" width="20" height="10" rx="5" />
    </svg>
  ),
  boxes: (
    <svg {...common}>
      <path d="m7.5 4.3 4.5-2.3 4.5 2.3v5.4L12 12 7.5 9.7Z" />
      <path d="m3 14.3 4.5-2.3 4.5 2.3v5.4L7.5 22 3 19.7Z" />
      <path d="m12 14.3 4.5-2.3 4.5 2.3v5.4L16.5 22 12 19.7Z" />
    </svg>
  ),
  search: (
    <svg {...common}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  filter: (
    <svg {...common}>
      <path d="M22 3H2l8 9.5V20l4 2v-9.5Z" />
    </svg>
  ),
  rocket: (
    <svg {...common}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" />
    </svg>
  ),
  code: (
    <svg {...common}>
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </svg>
  ),
  briefcase: (
    <svg {...common}>
      <path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1" />
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M3 12h18" />
    </svg>
  ),
  check: (
    <svg {...common}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  ),
  zap: (
    <svg {...common}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9Z" />
    </svg>
  ),
  external: (
    <svg {...common}>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  ),
  wallet: (
    <svg {...common}>
      <path d="M19 7V6a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V7" />
      <path d="M16 14h.01" />
    </svg>
  ),
  education: (
    <svg {...common}>
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c3 2 9 2 12 0v-5" />
      <path d="M22 10v6" />
    </svg>
  ),
  whatsapp: (
    <svg {...common}>
      <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-5.2A8.5 8.5 0 1 1 21 11.5Z" />
      <path d="M8 8.5c.4 3.5 3 6 6.5 7.5l1.5-1.8" />
    </svg>
  ),
});

export function getProjectCategories(projectList = [...projects]) {
  return ["All", ...Array.from(new Set(projectList.map((project) => project.category)))];
}

export function getProjectFilterLabels() {
  return projectFilterOptions.map((option) => option.label);
}

export function filterProjects(
  projectList: ReadonlyArray<(typeof projects)[number]>,
  query: string,
  category: string,
) {
  const q = String(query || "").toLowerCase().trim();
  const selectedGroup = projectFilterOptions.find((option) => option.label === category);

  return projectList.filter((project) => {
    const matchesFilter =
      category === "All" ||
      project.category === category ||
      Boolean(selectedGroup && selectedGroup.categories.includes(project.category));

    const haystack = [
      project.title,
      project.type,
      project.description,
      project.category,
      ...project.stack,
    ]
      .join(" ")
      .toLowerCase();

    return matchesFilter && (!q || haystack.includes(q));
  });
}

export function getEducationByLevel(items: ReadonlyArray<(typeof education)[number]>, level: string) {
  return items.filter((item) => item.level === level);
}

export function getPageNames() {
  return pages.slice();
}

function runSelfTests() {
  if (typeof console === "undefined") return;

  const categories = getProjectCategories([...projects]);
  console.assert(getPageNames().includes("Education"), "Self-test failed: pages must include Education.");
  console.assert(getPageNames().includes("Projects"), "Self-test failed: pages must include Projects.");
  console.assert(categories.includes("Browser Concept"), "Self-test failed: categories must include Browser Concept.");
  console.assert(getProjectFilterLabels().length === 6, "Self-test failed: filter labels must stay compact.");
  console.assert(filterProjects(projects, "rust", "All").some((p) => p.title === "Volt IDE"), "Self-test failed: Rust search should find Volt IDE.");
  console.assert(filterProjects(projects, "volt", "AI + Tools").some((p) => p.title === "Volt IDE"), "Self-test failed: grouped filter should include Volt IDE.");
  console.assert(filterProjects(projects, "signal", "Games").length === 2, "Self-test failed: Games group should include both game projects.");
  console.assert(filterProjects(projects, "wallet", "Systems").some((p) => p.title === "Admin Wallet / Marketplace System"), "Self-test failed: Systems group should include wallet project.");
  console.assert(getEducationByLevel(education, "Degree").length === 1, "Self-test failed: Degree education should have one item.");
  console.assert(getEducationByLevel(education, "School").length === 2, "Self-test failed: School education should have two items.");
  console.assert(quickStats.length === 3, "Self-test failed: Home quick stats should have three items.");
  console.assert(whatsappNumber === "94762334979", "Self-test failed: WhatsApp number must be configured.");
  console.assert(hiddenScrollbar.includes("scrollbar-width"), "Self-test failed: hidden scrollbar utility must be configured.");
}

runSelfTests();

function AnimatedBackground() {
  return (
    <div className="animated-bg fixed inset-0 -z-10 overflow-hidden bg-[#020611]">
      <div className="animated-bg__aurora absolute inset-0 bg-[radial-gradient(circle_at_10%_4%,rgba(0,180,255,0.10),transparent_22%),radial-gradient(circle_at_26%_12%,rgba(167,139,250,0.07),transparent_18%),radial-gradient(circle_at_72%_2%,rgba(110,231,183,0.045),transparent_18%),radial-gradient(circle_at_88%_18%,rgba(251,113,133,0.035),transparent_20%)]" />
      <div className="animated-bg__grid absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.13]" />
      <div className="animated-bg__dots absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.09)_0.8px,transparent_0.8px)] bg-[size:26px_26px] opacity-[0.07]" />
      <div className="animated-bg__vignette absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.42)_100%)]" />
      <div className="animated-bg__line absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent" />
    </div>
  );
}

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300 backdrop-blur-xl ${className}`}>
      {children}
    </span>
  );
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mx-auto mb-10 max-w-3xl text-center"
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300/90">
        {eyebrow}
      </p>
      <h2 style={{ fontFamily: headingFont }} className="text-3xl font-black tracking-tight text-white md:text-5xl">
        {title}
      </h2>
      {text ? <p className="mt-4 text-base leading-7 text-zinc-400">{text}</p> : null}
    </motion.div>
  );
}

function Page({ children }: { children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mx-auto min-h-[calc(100vh-78px)] max-w-7xl px-5 py-12 md:py-16"
    >
      {children}
    </motion.section>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const accentClass = accentPalette[project.category] || accentPalette["Developer Tools"];
  const glow = softProjectGlow[project.category] || softProjectGlow["Developer Tools"];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.32, delay: index * 0.035 }}
      className={`group relative overflow-hidden rounded-3xl p-6 ${projectGlass}`}
    >
      <div
        className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${glow}, transparent 50%, rgba(255,255,255,0.045))`,
        }}
      />
      <div className="relative mb-5 flex items-start justify-between gap-4">
        <div className={`rounded-2xl border p-3 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.18)] ${accentClass}`}>
          <Icon name={project.icon} className="h-7 w-7" />
        </div>
        <Badge>{project.scale}</Badge>
      </div>
      <div className="relative mb-3 flex flex-wrap items-center gap-2">
        <Badge className={accentClass}>{project.category}</Badge>
        <Badge>{project.status}</Badge>
      </div>
      <h3 style={{ fontFamily: headingFont }} className="relative text-2xl font-black text-white">
        {project.title}
      </h3>
      <p className={`relative mt-1 text-sm font-semibold ${accentClass.split(" ")[0]}`}>
        {project.type}
      </p>
      <p className="relative mt-4 text-sm leading-7 text-zinc-400">
        {project.description}
      </p>
      <div className={`relative mt-5 rounded-2xl p-4 ${projectGlassSoft}`}>
        <p className="text-sm font-bold text-zinc-100">{project.highlight}</p>
        <p className="mt-2 text-sm leading-6 text-zinc-400">{project.impact}</p>
      </div>
      <div className="relative mt-5 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span key={item} className={`rounded-full px-3 py-1 text-xs text-zinc-300 ${projectChipGlass}`}>
            {item}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

function HomePage({ setActivePage }: { setActivePage: (page: string) => void }) {
  return (
    <Page>
      <div className="flex min-h-[68vh] items-center">
        <div className="max-w-3xl pl-5 md:pl-10 lg:pl-16 xl:pl-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-300/10 bg-violet-300/[0.035] px-3.5 py-2 text-xs font-semibold text-zinc-400 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300" />
            Software Engineering Student
          </motion.div>

          <h1 style={{ fontFamily: headingFont }} className="max-w-3xl text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">
            Building useful <span className="bg-gradient-to-r from-white via-cyan-100 to-violet-200 bg-clip-text text-transparent">software systems.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">
            I’m Mohamed Ruzaik - a Sri Lankan builder working on AI tools, desktop apps, health-tech systems, game projects, wallet systems, and hardware concepts.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setActivePage("Projects")}
              className="rounded-2xl bg-white px-4 py-2.5 text-xs font-black text-black transition hover:bg-zinc-200"
            >
              View Projects
            </button>
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-2.5 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white/[0.07]"
            >
              <Icon name="github" className="h-4 w-4" /> GitHub
            </a>
          </div>
        </div>
      </div>
    </Page>
  );
}

function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const categories = useMemo(() => getProjectFilterLabels(), []);
  const filteredProjects = useMemo(() => filterProjects(projects, query, filter), [query, filter]);

  return (
    <Page>
      <SectionTitle
        eyebrow="Selected Work"
        title="Project Ecosystem"
        text="These projects show practical systems across AI tools, desktop software, healthcare, games, hardware concepts, and product infrastructure."
      />

      <div className={`mb-8 rounded-[1.75rem] p-3 ${projectGlass}`}>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className={`flex min-w-0 flex-1 items-center gap-3 rounded-2xl px-4 py-3 ${projectGlassSoft}`}>
            <Icon name="search" className="h-4 w-4 shrink-0 text-zinc-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
            />
          </label>

          <div className={`flex flex-wrap items-center gap-2 rounded-2xl px-2 py-2 ${projectGlassSoft} ${hiddenScrollbar}`}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`rounded-full border px-3.5 py-2 text-xs font-bold transition-all duration-300 ${
                  filter === cat
                    ? "border-cyan-300/25 bg-cyan-300/[0.10] text-cyan-200"
                    : "border-white/10 bg-white/[0.025] text-zinc-500 hover:bg-white/[0.055] hover:text-zinc-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </Page>
  );
}

function SkillsPage() {
  const proofItems = [
    "Can move from idea to prototype quickly.",
    "Has experience across AI tools, desktop software, health systems, wallet systems, game development, hardware concepts, and product design.",
    "Understands product flows, not only code files.",
    "Builds with modern tools and can explain architecture clearly.",
  ];

  return (
    <Page>
      <SectionTitle
        eyebrow="Capability"
        title="What I Actually Do"
        text="I design product architecture, generate working systems with AI-assisted coding, debug logic, polish interfaces, and connect ideas into usable software."
      />

      <div className="grid gap-6 md:grid-cols-3">
        <motion.div whileHover={{ y: -8 }} className={`rounded-3xl p-6 ${glass}`}>
          <Icon name="code" className="mb-5 h-8 w-8 text-cyan-300" />
          <h3 style={{ fontFamily: headingFont }} className="text-xl font-black text-white">
            Build Systems
          </h3>
          <p className="mt-3 text-sm leading-7 text-zinc-400">
            Desktop apps, web apps, admin dashboards, tools, workflow engines, and prototypes that can be extended into products.
          </p>
        </motion.div>
        <motion.div whileHover={{ y: -8 }} className={`rounded-3xl p-6 ${glass}`}>
          <Icon name="terminal" className="mb-5 h-8 w-8 text-cyan-300" />
          <h3 style={{ fontFamily: headingFont }} className="text-xl font-black text-white">
            AI-First Workflow
          </h3>
          <p className="mt-3 text-sm leading-7 text-zinc-400">
            Uses AI tools as coding engines while owning the product idea, architecture, debugging direction, and final experience.
          </p>
        </motion.div>
        <motion.div whileHover={{ y: -8 }} className={`rounded-3xl p-6 ${glass}`}>
          <Icon name="briefcase" className="mb-5 h-8 w-8 text-cyan-300" />
          <h3 style={{ fontFamily: headingFont }} className="text-xl font-black text-white">
            Product Thinking
          </h3>
          <p className="mt-3 text-sm leading-7 text-zinc-400">
            Focuses on what becomes usable: wallet systems, dashboards, admin flows, auth, subscriptions, orders, access control, sync, local-first tools, and launchable MVPs.
          </p>
        </motion.div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {skills.map((skill) => (
          <motion.span
            key={skill}
            whileHover={{ y: -3, scale: 1.03 }}
            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300 backdrop-blur-xl"
          >
            {skill}
          </motion.span>
        ))}
      </div>

      <div className={`mt-12 rounded-[2rem] p-8 md:p-12 ${glassStrong}`}>
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Why this portfolio matters
            </p>
            <h2 style={{ fontFamily: headingFont }} className="mt-4 text-3xl font-black text-white md:text-5xl">
              This is proof of range.
            </h2>
          </div>
          <div className="space-y-4 text-sm leading-7 text-zinc-300">
            {proofItems.map((item) => (
              <div key={item} className="flex gap-3">
                <Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}

function EducationPage() {
  return (
    <Page>
      <SectionTitle
        eyebrow="Academic Background"
        title="Education"
        text="Formal academic background paired with heavy practical software and product-building work."
      />

      <div className="mx-auto max-w-4xl space-y-5">
        {education.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            className={`rounded-3xl p-6 ${glass}`}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-300">
                  <Icon name="education" />
                </div>
                <div>
                  <h3 style={{ fontFamily: headingFont }} className="text-2xl font-black text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-cyan-200">
                    {item.institution}
                  </p>
                </div>
              </div>
              <Badge>{item.period}</Badge>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {item.details.map((detail) => (
                <span
                  key={detail}
                  className="rounded-full bg-white/[0.04] px-3 py-1 text-xs text-zinc-300 ring-1 ring-white/10 backdrop-blur-xl"
                >
                  {detail}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </Page>
  );
}

function ContactPage() {
  const contactButtonBase =
    "inline-flex min-w-[150px] items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition-colors";

  return (
    <Page>
      <div className={`mx-auto max-w-4xl rounded-[2rem] p-8 text-center md:p-12 ${glassStrong}`}>
        <Icon name="zap" className="mx-auto mb-5 h-10 w-10 text-cyan-300" />
        <h2 style={{ fontFamily: headingFont }} className="text-3xl font-black text-white md:text-5xl">
          Let’s build something useful.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
          Open to software engineering roles, startup collaboration, AI tooling projects, and practical product-building opportunities.
        </p>
        <p className="mt-3 text-sm font-semibold text-zinc-500">
          WhatsApp: +94 76 233 4979
        </p>
        <div className="mt-8 flex flex-wrap items-stretch justify-center gap-3">
          <a
            href="mailto:mohamedruzaik9@gmail.com"
            className={`${contactButtonBase} border border-white/10 bg-white text-black hover:bg-zinc-200 [&_svg]:text-black`}
          >
            <Icon name="mail" className="h-4 w-4" /> Email Me
          </a>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className={`${contactButtonBase} border border-emerald-300/20 bg-emerald-300/[0.06] text-emerald-200 hover:bg-emerald-300/[0.10]`}
          >
            <Icon name="whatsapp" className="h-4 w-4" /> WhatsApp
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open GitHub profile"
            className={`${contactButtonBase} group border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-100 shadow-[0_10px_30px_rgba(34,211,238,0.12)] hover:bg-cyan-300/[0.14]`}
          >
            <Icon name="github" className="h-4 w-4" />
            GitHub
            <Icon name="external" className="h-3.5 w-3.5 opacity-80 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </Page>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState("Home");
  const [theme, setTheme] = useState<ThemeMode>("dark");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("ruzaik-theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("ruzaik-theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  const renderPage = () => {
    switch (activePage) {
      case "Projects":
        return <ProjectsPage />;
      case "Skills":
        return <SkillsPage />;
      case "Education":
        return <EducationPage />;
      case "Contact":
        return <ContactPage />;
      case "Home":
      default:
        return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <main
      style={{ fontFamily: bodyFont }}
      className={`min-h-screen overflow-x-hidden bg-[#020611] text-zinc-100 ${theme === "light" ? "theme-light" : "theme-dark"}`}
    >
      <AnimatedBackground />

      <nav className={`fixed left-0 right-0 top-0 z-50 ${navGlass}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-2.5">
          <button
            type="button"
            onClick={() => setActivePage("Home")}
            className="flex shrink-0 items-center gap-2 text-left"
          >
            <span className="text-lg font-black leading-none text-white/90">›_</span>
            <span style={{ fontFamily: headingFont }} className="text-base font-black tracking-tight text-white sm:text-lg">
              Ruzaik<span className="text-cyan-300">.Dev</span>
            </span>
          </button>

          <div className="flex items-center gap-3">
            <div className={`hidden items-center gap-1 md:flex ${navPanel}`}>
              {pages.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setActivePage(page)}
                  className={`${navItemBase} ${
                    activePage === page ? navItemActive : navItemIdle
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <div className={`flex max-w-[52vw] items-center gap-1 overflow-x-auto md:hidden ${navPanel} ${hiddenScrollbar}`}>
              {pages.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setActivePage(page)}
                  className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-bold transition-all duration-300 ${
                    activePage === page ? navItemActive : navItemIdle
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              type="button"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              aria-pressed={theme === "light"}
              onClick={toggleTheme}
              className="theme-toggle grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/[0.07] bg-white/[0.018] text-zinc-500 backdrop-blur-sm transition hover:bg-white/[0.04] hover:text-zinc-200"
            >
              <Icon
                name={theme === "dark" ? "check" : "zap"}
                className="h-3.5 w-3.5"
              />
            </button>
          </div>
        </div>
      </nav>

      <div className={navHeightClass}>
        <AnimatePresence mode="wait">
          <div key={activePage}>{renderPage()}</div>
        </AnimatePresence>
      </div>
    </main>
  );
}
