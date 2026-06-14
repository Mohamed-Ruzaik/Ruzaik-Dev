import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const pages = ["Home", "Projects", "Skills", "About", "Contact"];
type ThemeMode = "dark" | "light";
type PageName = (typeof pages)[number];
type ViewState = { page: PageName; projectSlug?: string };
type Project = {
  title: string;
  slug?: string;
  type: string;
  status: string;
  impact: string;
  description: string;
  stack: readonly string[];
  icon: IconName | string;
  category: keyof typeof accentPalette;
  scale: string;
  highlight: string;
  whatItIs?: string;
  features?: readonly string[];
  screenshots?: readonly string[];
  learned?: readonly string[];
  liveDemoUrl?: string;
  githubUrl?: string;
};

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
const linkedinUrl = "https://www.linkedin.com/in/mohamedruzaik/";
const cvUrl = "/Mohamed-Ruzaik-CV.pdf";
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

const projects: readonly Project[] = [
  {
    title: "Pixel Forge Studio",
    slug: "pixel-forge-studio",
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
    slug: "volt-ide",
    type: "AI-Core Code Editor",
    status: "Near Usable",
    impact:
      "Built around the loop between files, terminal, tasks, source control, feedback, and AI-assisted iteration.",
    description:
      "A Cursor-like desktop IDE focused on AI command execution, project navigation, terminal output, and developer workflow speed.",
    stack: [
      "Tauri",
      "Rust",
      "React",
      "TypeScript",
      "Vite",
      "Monaco",
      "PowerShell",
      "Node API",
      "pnpm workspaces",
    ],
    icon: "terminal",
    category: "Developer Tools",
    scale: "Core System",
    highlight: "Real developer workspace, not just an editor screen",
    whatItIs:
      "Volt IDE is a Tauri + React based IDE monorepo. It is built like a real developer workspace, with a shared IDE shell, file explorer, editor area, command palette, source control panel, terminal panel, and task runner direction.",
    features: [
      "Project workspace navigation with desktop-app thinking.",
      "Monaco editor tabs, split editor direction, dirty state, autosave, and persisted sessions.",
      "Command palette and quick-open workflow.",
      "Global search with grouped results and click-to-jump behavior.",
      "Desktop source control panel with status, stage/unstage, diff, commit, and Git command direction.",
      "Integrated terminal/task runner that can detect package.json scripts and run commands.",
    ],
    screenshots: [
      "Workspace shell",
      "Explorer tree",
      "Editor tabs",
      "Source control panel",
      "Terminal output",
      "Task runner",
      "Problems/output panels",
    ],
    learned: [
      "Developer tools need reliability before visual polish.",
      "A real IDE is not just an editor screen; it is the loop between files, terminal, tasks, source control, and feedback.",
      "Tauri/Rust boundaries force cleaner thinking about what belongs in the frontend and what belongs in the host layer.",
      "AI features become useful only when they connect to real workflow state, commands, output, and iteration.",
    ],
    liveDemoUrl: "#",
    githubUrl: "https://github.com/Mohamed-Ruzaik",
  },
  {
    title: "Neurofit / Calforge",
    slug: "neurofit-calforge",
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
    slug: "mediconnect",
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
    slug: "telescope-automation-system",
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
    slug: "net-warden",
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
    slug: "shadowrun-signal-collapse",
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
    slug: "mesh-forge-3d",
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
    slug: "operation-signal-blackout",
    type: "Unity Mission-Based Game Project",
    status: "Custom Unity Project",
    impact: "Custom Unity project focused on mission-based gameplay direction.",
    description: "A Unity game project built around mission-style action and environment presentation.",
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
    highlight: "Mission-based Unity gameplay direction",
  },
  {
    title: "Velocity Browser",
    slug: "velocity-browser",
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

const featuredProjectSlugs = [
  "volt-ide",
] as const;

const projectFilterOptions = [
  { label: "All", categories: ["All"] },
  { label: "Applications", categories: ["Health Tech", "System Tools", "Browser Concept"] },
  { label: "Developer Tools", categories: ["Developer Tools"] },
  { label: "AI Tools", categories: ["AI Tools"] },
  { label: "Games", categories: ["Game Dev"] },
  { label: "Hardware", categories: ["Hardware", "Design Concept"] },
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

const skillGroups = [
  {
    title: "Engineering",
    icon: "code",
    items: [
      "Software Engineering",
      "System Design",
      "Problem Solving",
      "Debugging",
      "API Design",
      "Database Design",
      "Technical Documentation",
    ],
  },
  {
    title: "Product Building",
    icon: "briefcase",
    items: [
      "Product Building",
      "MVP Planning",
      "Feature Breakdown",
      "Rapid Prototyping",
      "UI/UX Thinking",
      "Workflow Design",
      "AI Integration",
    ],
  },
  {
    title: "Software Development",
    icon: "terminal",
    items: [
      "Web Application Development",
      "Desktop App Development",
      "Mobile App Development",
      "Developer Tool Development",
      "Game Development",
    ],
  },
  {
    title: "Hardware & Creative",
    icon: "telescope",
    items: [
      "Hardware Prototyping",
      "Optical Systems",
      "Digital Design",
      "UI Design",
      "Visual Communication",
    ],
  },
  {
    title: "Personal Strengths",
    icon: "zap",
    items: [
      "Self Learning",
      "Curiosity",
      "Persistence",
      "Adaptability",
      "Independent Problem Solving",
    ],
  },
] as const;

const techGroups = [
  {
    title: "Frontend",
    icon: "code",
    items: ["React", "TypeScript", "Tailwind", "Vite"],
  },
  {
    title: "Backend",
    icon: "boxes",
    items: ["FastAPI", "Node.js", "PostgreSQL", "Supabase"],
  },
  {
    title: "Desktop",
    icon: "terminal",
    items: ["Tauri", "Electron", "Rust", "Visual Basic"],
  },
  {
    title: "Mobile",
    icon: "briefcase",
    items: ["Flutter", "React Native", "Android / Kotlin"],
  },
  {
    title: "Game Development",
    icon: "game",
    items: ["Unity", "C#", "Unreal Engine"],
  },
  {
    title: "Hardware",
    icon: "telescope",
    items: ["Optics", "Electronics"],
  },
] as const;

const quickStats = [
  { label: "Projects", value: "9+" },
  { label: "Core", value: "AI Tools" },
  { label: "Base", value: "Sri Lanka" },
] as const;

type IconName = keyof ReturnType<typeof iconFactories>;

const pageIcons: Record<PageName, IconName> = {
  Home: "home",
  Projects: "briefcase",
  Skills: "code",
  About: "user",
  Contact: "mail",
};

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
  home: (
    <svg {...common}>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </svg>
  ),
  user: (
    <svg {...common}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.7-4 4.4-6 8-6s6.3 2 8 6" />
    </svg>
  ),
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
  linkedin: (
    <svg {...common}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
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
  cube: (
    <svg {...common}>
      <path d="m12 2 8 4.5v9L12 20l-8-4.5v-9Z" />
      <path d="M12 11 4.5 6.7" />
      <path d="M12 11v9" />
      <path d="m12 11 7.5-4.3" />
    </svg>
  ),
  database: (
    <svg {...common}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </svg>
  ),
  diamond: (
    <svg {...common}>
      <path d="M6 3h12l4 6-10 12L2 9Z" />
      <path d="M11 3 8 9l4 12 4-12-3-6" />
      <path d="M2 9h20" />
    </svg>
  ),
  hexagon: (
    <svg {...common}>
      <path d="M21 16V8l-9-5-9 5v8l9 5Z" />
    </svg>
  ),
  smartphone: (
    <svg {...common}>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  ),
  wave: (
    <svg {...common}>
      <path d="M3 12c3-5 6 5 9 0s6-5 9 0" />
      <path d="M3 17c3-5 6 5 9 0s6-5 9 0" />
    </svg>
  ),
  window: (
    <svg {...common}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M8 4v16" />
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
  settings: (
    <svg {...common}>
      <path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.36.2.72.32 1.1.4H21a2 2 0 1 1 0 4h-.09A1.7 1.7 0 0 0 19.4 15Z" />
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
  sun: (
    <svg {...common}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  ),
  moon: (
    <svg {...common}>
      <path d="M12 3a6.8 6.8 0 0 0 8.8 8.8A8.5 8.5 0 1 1 12 3Z" />
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
  projectList: ReadonlyArray<Project>,
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

export function getProjectSlug(project: Project) {
  return project.slug || project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => getProjectSlug(project) === slug);
}

export function getFeaturedProjects() {
  return projects.filter((project) => featuredProjectSlugs.includes(getProjectSlug(project) as (typeof featuredProjectSlugs)[number]));
}

export function getPageNames() {
  return pages.slice();
}

function parseViewFromLocation(): ViewState {
  const pathname = window.location.pathname;
  const projectMatch = pathname.match(/^\/p\/([^/]+)\/?$/);
  if (projectMatch) {
    return { page: "Projects", projectSlug: decodeURIComponent(projectMatch[1]) };
  }

  return { page: "Home" };
}

function runSelfTests() {
  if (typeof console === "undefined") return;

  const categories = getProjectCategories([...projects]);
  console.assert(getPageNames().includes("About"), "Self-test failed: pages must include About.");
  console.assert(getPageNames().includes("Contact"), "Self-test failed: pages must include Contact.");
  console.assert(getPageNames().includes("Projects"), "Self-test failed: pages must include Projects.");
  console.assert(categories.includes("Browser Concept"), "Self-test failed: categories must include Browser Concept.");
  console.assert(getProjectFilterLabels().length === 6, "Self-test failed: filter labels must stay compact.");
  console.assert(filterProjects(projects, "rust", "All").some((p) => p.title === "Volt IDE"), "Self-test failed: Rust search should find Volt IDE.");
  console.assert(filterProjects(projects, "volt", "Developer Tools").some((p) => p.title === "Volt IDE"), "Self-test failed: Developer Tools filter should include Volt IDE.");
  console.assert(filterProjects(projects, "signal", "Games").length === 2, "Self-test failed: Games group should include both game projects.");
  console.assert(getProjectBySlug("volt-ide")?.title === "Volt IDE", "Self-test failed: Volt detail slug should resolve.");
  console.assert(getFeaturedProjects().length === 1, "Self-test failed: Projects page should show only Volt IDE for now.");
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

function StackIcon({ name }: { name: string }) {
  const normalized = name.toLowerCase();
  const baseClass = "h-4 w-4";

  if (normalized === "react") {
    return (
      <svg className={`${baseClass} text-cyan-300`} viewBox="-11.5 -10.23174 23 20.46348" fill="none" aria-hidden="true">
        <circle cx="0" cy="0" r="2.05" fill="currentColor" />
        <ellipse rx="11" ry="4.2" stroke="currentColor" strokeWidth="1.25" />
        <ellipse rx="11" ry="4.2" stroke="currentColor" strokeWidth="1.25" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" stroke="currentColor" strokeWidth="1.25" transform="rotate(120)" />
      </svg>
    );
  }

  if (normalized === "rust") {
    return <Icon name="settings" className={`${baseClass} text-orange-300`} />;
  }

  if (normalized === "tauri") {
    return <Icon name="boxes" className={`${baseClass} text-sky-300`} />;
  }

  if (normalized === "electron") {
    return <Icon name="layers" className={`${baseClass} text-cyan-300`} />;
  }

  if (normalized === "xterm") {
    return <Icon name="terminal" className={`${baseClass} text-emerald-300`} />;
  }

  if (normalized === "powershell") {
    return <Icon name="code" className={`${baseClass} text-blue-300`} />;
  }

  if (normalized === "typescript") {
    return <Icon name="code" className={`${baseClass} text-sky-400`} />;
  }

  if (normalized === "tailwind") {
    return <Icon name="wave" className={`${baseClass} text-cyan-300`} />;
  }

  if (normalized === "vite") {
    return <Icon name="zap" className={`${baseClass} text-yellow-300`} />;
  }

  if (normalized === "fastapi") {
    return <Icon name="zap" className={`${baseClass} text-emerald-300`} />;
  }

  if (normalized === "node.js") {
    return <Icon name="hexagon" className={`${baseClass} text-green-300`} />;
  }

  if (normalized === "postgresql") {
    return <Icon name="database" className={`${baseClass} text-sky-300`} />;
  }

  if (normalized === "supabase") {
    return <Icon name="database" className={`${baseClass} text-emerald-300`} />;
  }

  if (normalized === "monaco") {
    return <Icon name="briefcase" className={`${baseClass} text-indigo-300`} />;
  }

  if (normalized === "node api") {
    return <Icon name="boxes" className={`${baseClass} text-emerald-300`} />;
  }

  if (normalized === "pnpm workspaces") {
    return <Icon name="layers" className={`${baseClass} text-orange-300`} />;
  }

  if (normalized === "flutter") {
    return <Icon name="diamond" className={`${baseClass} text-sky-300`} />;
  }

  if (normalized === "react native") {
    return <Icon name="smartphone" className={`${baseClass} text-cyan-300`} />;
  }

  if (normalized === "unity") {
    return <Icon name="cube" className={`${baseClass} text-zinc-200`} />;
  }

  if (normalized === "unreal engine") {
    return <Icon name="game" className={`${baseClass} text-violet-300`} />;
  }

  if (normalized === "c#") {
    return <Icon name="hexagon" className={`${baseClass} text-violet-300`} />;
  }

  if (normalized === "visual basic") {
    return <Icon name="window" className={`${baseClass} text-indigo-300`} />;
  }

  if (normalized === "android / kotlin") {
    return <Icon name="smartphone" className={`${baseClass} text-green-300`} />;
  }

  if (normalized === "optics") {
    return <Icon name="telescope" className={`${baseClass} text-amber-300`} />;
  }

  if (normalized === "electronics") {
    return <Icon name="settings" className={`${baseClass} text-cyan-300`} />;
  }

  if (normalized === "ai" || normalized.includes("ai ")) {
    return <Icon name="zap" className={`${baseClass} text-violet-300`} />;
  }

  return <Icon name="code" className={`${baseClass} text-zinc-300`} />;
}

function StackItem({ item }: { item: string }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-[11px] font-bold text-zinc-200 sm:px-3 sm:py-2 sm:text-xs ${projectChipGlass}`}>
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.045] sm:h-7 sm:w-7">
        <StackIcon name={item} />
      </span>
      {item}
    </span>
  );
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mx-auto mb-7 max-w-3xl text-center sm:mb-10"
    >
      <p className="section-eyebrow mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300/90">
        {eyebrow}
      </p>
      <h2 style={{ fontFamily: headingFont }} className="text-2xl font-black tracking-tight text-white sm:text-3xl md:text-5xl">
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
      className="page-shell mx-auto min-h-[calc(100vh-78px)] w-full px-4 py-8 sm:px-5 sm:py-12 md:py-16"
    >
      {children}
    </motion.section>
  );
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: (slug: string) => void }) {
  const accentClass = accentPalette[project.category] || accentPalette["Developer Tools"];
  const glow = softProjectGlow[project.category] || softProjectGlow["Developer Tools"];
  const slug = getProjectSlug(project);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.32, delay: index * 0.035 }}
      className={`group relative overflow-hidden rounded-[1.5rem] p-4 sm:rounded-[1.75rem] sm:p-6 ${projectGlass}`}
    >
      <div
        className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${glow}, transparent 50%, rgba(255,255,255,0.045))`,
        }}
      />

      <div className="relative mb-5 flex min-h-[118px] items-end overflow-hidden rounded-[1.25rem] border border-white/10 bg-gradient-to-br from-cyan-300/[0.16] via-blue-500/[0.12] to-violet-400/[0.10] p-4 sm:mb-6 sm:min-h-[140px] sm:rounded-[1.5rem] sm:p-5">
        <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-[#07101d]/70 text-cyan-200 shadow-[0_18px_40px_rgba(0,0,0,0.28)] sm:h-16 sm:w-16">
          <Icon name={project.icon} className="h-8 w-8" />
        </div>
      </div>

      <h3 style={{ fontFamily: headingFont }} className="relative text-xl font-black text-white sm:text-2xl">
        {project.title}
      </h3>
      <p className={`relative mt-1 text-sm font-semibold ${accentClass.split(" ")[0]}`}>
        {project.type}
      </p>
      <p className="relative mt-4 text-sm leading-7 text-zinc-400">
        {project.description}
      </p>

      <div className="relative mt-5 flex flex-wrap gap-2 border-b border-white/10 pb-5">
        {project.stack.map((item) => (
          <StackItem key={item} item={item} />
        ))}
      </div>

      <div className="relative mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={() => onOpen(slug)}
          className="inline-flex w-full min-w-[118px] items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-black !text-black transition hover:bg-zinc-200 sm:w-auto [&_svg]:!text-black"
        >
          <Icon name="briefcase" className="h-3.5 w-3.5" />
          View Project
        </button>
        <a
          href={project.liveDemoUrl || "#"}
          target={project.liveDemoUrl && project.liveDemoUrl !== "#" ? "_blank" : undefined}
          rel="noreferrer"
          className="inline-flex w-full min-w-[118px] items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-4 py-2.5 text-xs font-black text-white transition hover:bg-white/[0.13] sm:w-auto"
        >
          <Icon name="external" className="h-3.5 w-3.5" />
          Live Demo
        </a>
      </div>
    </motion.article>
  );
}

function HomePage({ setActivePage }: { setActivePage: (page: PageName) => void }) {
  return (
    <Page>
      <div className="flex min-h-[68vh] items-center">
        <div className="max-w-3xl pl-5 md:pl-10 lg:pl-16 xl:pl-20">
          <p className="section-eyebrow mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Software Developer Portfolio
          </p>
          <h1 style={{ fontFamily: headingFont }} className="max-w-3xl text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">
            I build software that solves <span className="hero-gradient-text bg-gradient-to-r from-white via-cyan-100 to-violet-200 bg-clip-text text-transparent">real problems.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">
            I’m Mohamed Ruzaik - a software developer focused on developer tools, AI applications, desktop software, and practical systems.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setActivePage("Projects")}
              className="primary-action rounded-2xl bg-white px-4 py-2.5 text-xs font-black text-black transition hover:bg-zinc-200"
            >
              View Projects
            </button>
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="secondary-action inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-2.5 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white/[0.07]"
            >
              <Icon name="github" className="h-4 w-4" /> GitHub
            </a>
          </div>
        </div>
      </div>
    </Page>
  );
}

function ProjectsPage({ onOpenProject }: { onOpenProject: (slug: string) => void }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const categories = useMemo(() => getProjectFilterLabels(), []);
  const featuredProjects = useMemo(() => getFeaturedProjects(), []);
  const filteredProjects = useMemo(() => filterProjects(featuredProjects, query, filter), [featuredProjects, query, filter]);

  return (
    <Page>
      <SectionTitle
        eyebrow="Selected Work"
        title="Featured Build"
        text="A closer look at one active project for now. More projects will be added as they are cleaned up and documented."
      />

      <div className={`mb-6 rounded-[1.5rem] p-2 sm:mb-8 sm:rounded-[1.75rem] sm:p-3 ${projectGlass}`}>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className={`flex min-w-0 flex-1 items-center gap-3 rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 ${projectGlassSoft}`}>
            <Icon name="search" className="h-4 w-4 shrink-0 text-zinc-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
            />
          </label>

          <div className={`flex flex-nowrap items-center gap-2 overflow-x-auto rounded-2xl px-2 py-2 lg:flex-wrap ${projectGlassSoft} ${hiddenScrollbar}`}>
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

      <div className="single-project-grid mx-auto grid w-full gap-6">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} onOpen={onOpenProject} />
        ))}
      </div>
    </Page>
  );
}

function ProjectDetailPage({ slug, onBack }: { slug: string; onBack: () => void }) {
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <Page>
        <div className={`mx-auto max-w-3xl rounded-[2rem] p-8 text-center ${glassStrong}`}>
          <h2 style={{ fontFamily: headingFont }} className="text-3xl font-black text-white">
            Project not found
          </h2>
          <p className="mt-3 text-zinc-400">This case-study link does not match an available project yet.</p>
          <button
            type="button"
            onClick={onBack}
            className="mt-6 rounded-full bg-white px-5 py-3 text-sm font-black !text-black transition hover:bg-zinc-200"
          >
            Back to projects
          </button>
        </div>
      </Page>
    );
  }

  const accentClass = accentPalette[project.category] || accentPalette["Developer Tools"];
  const features = project.features || [project.highlight, project.impact];
  const screenshots = project.screenshots || ["Main view", "Workflow", "Detail state"];
  const learned = project.learned || [
    "Keep the first version focused enough to finish.",
    "Design the workflow before adding extra screens.",
    "Honest project documentation matters as much as polish.",
  ];

  return (
    <Page>
      <div className={`overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] ${glassStrong}`}>
        <div className="grid gap-6 p-5 md:grid-cols-[1fr_0.82fr] md:gap-8 md:p-10">
          <div className="flex flex-col justify-center">
            <h1 style={{ fontFamily: headingFont }} className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-6xl">
              {project.title}
            </h1>
            <p className={`mt-3 text-lg font-bold ${accentClass.split(" ")[0]}`}>{project.type}</p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400">{project.description}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={project.liveDemoUrl || "#"}
                target={project.liveDemoUrl && project.liveDemoUrl !== "#" ? "_blank" : undefined}
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black !text-black transition hover:bg-zinc-200 [&_svg]:!text-black"
              >
                Live demo <Icon name="external" className="h-4 w-4" />
              </a>
              <a
                href={project.githubUrl || githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-5 py-3 text-sm font-black text-cyan-100 transition hover:bg-cyan-300/[0.14]"
              >
                <Icon name="github" className="h-4 w-4" /> GitHub
              </a>
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-zinc-200 transition hover:bg-white/[0.08]"
              >
                Back to projects
              </button>
            </div>
          </div>

          <div className="relative min-h-[220px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-cyan-300/[0.18] via-blue-500/[0.12] to-violet-400/[0.10] p-5 sm:min-h-[280px] sm:p-6">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent,rgba(255,255,255,0.08))]" />
            <div className="relative flex h-full flex-col justify-end">
              <div className="grid h-20 w-20 place-items-center rounded-3xl border border-white/10 bg-[#07101d]/75 text-cyan-200 shadow-[0_18px_40px_rgba(0,0,0,0.3)]">
                <Icon name={project.icon} className="h-10 w-10" />
              </div>
              <p className="mt-8 max-w-sm text-sm font-bold leading-6 text-zinc-100">{project.highlight}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className={`rounded-[1.5rem] p-6 ${glass}`}>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">What it is</p>
          <p className="mt-4 text-sm leading-7 text-zinc-300">{project.whatItIs || project.description}</p>
        </section>

        <section className={`rounded-[1.5rem] p-6 ${glass}`}>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">Key features</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                <p className="text-sm leading-6 text-zinc-300">{feature}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className={`mt-6 rounded-[1.5rem] p-6 ${glass}`}>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">Tech stack</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <StackItem key={item} item={item} />
          ))}
        </div>
      </section>

      <section className={`mt-6 rounded-[1.5rem] p-6 ${glass}`}>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">Screenshots</p>
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          {screenshots.map((screen) => (
            <div key={screen} className="grid aspect-[4/3] place-items-center rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-center">
              <div>
                <Icon name={project.icon} className="mx-auto mb-3 h-6 w-6 text-cyan-300" />
                <p className="text-sm font-bold text-zinc-200">{screen}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={`mt-6 rounded-[1.5rem] p-6 ${glass}`}>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">What I learned / challenges</p>
        <div className="mt-4 space-y-3">
          {learned.map((item) => (
            <div key={item} className="flex gap-3">
              <Icon name="zap" className="mt-1 h-4 w-4 shrink-0 text-amber-300" />
              <p className="text-sm leading-7 text-zinc-300">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
}

function SkillsPage() {
  const proofItems = [
    "This portfolio shows range, not just isolated code samples.",
    "It shows that I can move from an idea to a working prototype, design product flows, work across different platforms, and explain how a system is built.",
    "I work across AI tools, desktop software, health systems, game projects, hardware concepts, and product design.",
  ];

  return (
    <Page>
      <SectionTitle
        eyebrow="Capability"
        title="Skills & Tools"
        text="A practical mix of software engineering, product thinking, developer tooling, creative design, and hands-on experimentation."
      />

      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group, index) => (
          <motion.section
            key={group.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.32, delay: index * 0.04 }}
            className={`rounded-[1.5rem] p-5 sm:p-6 ${glass}`}
          >
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200">
                <Icon name={group.icon} className="h-5 w-5" />
              </div>
              <h3 style={{ fontFamily: headingFont }} className="text-xl font-black text-white">
                {group.title}
              </h3>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className={`rounded-full px-3 py-1.5 text-xs font-bold text-zinc-300 ${projectChipGlass}`}>
                  {item}
                </span>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      <div className={`mt-8 rounded-[2rem] p-6 sm:p-8 ${glassStrong}`}>
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Tech Stack
          </p>
          <h2 style={{ fontFamily: headingFont }} className="mt-3 text-2xl font-black text-white md:text-4xl">
            Tools I build with
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {techGroups.map((group) => (
            <section
              key={group.title}
              className={`rounded-[1.25rem] p-5 ${projectGlassSoft}`}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-cyan-300">
                  <Icon name={group.icon} className="h-4 w-4" />
                </div>
                <h3 style={{ fontFamily: headingFont }} className="text-lg font-black text-white">
                  {group.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <StackItem key={item} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className={`mt-8 rounded-[2rem] p-6 sm:p-8 md:p-12 ${glassStrong}`}>
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Why this portfolio matters
            </p>
            <h2 style={{ fontFamily: headingFont }} className="mt-4 text-3xl font-black text-white md:text-5xl">
              This portfolio shows range.
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

function AboutPage() {
  const contactButtonBase =
    "inline-flex min-w-[150px] items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-colors";

  const buildingLikes = [
    "Developer tools and local desktop apps",
    "AI-assisted workflows that do real work",
    "Health-tech and personal tracking systems",
    "Game systems, prototypes, and interactive ideas",
    "Utility software that solves annoying daily problems",
  ];

  const workingStyle = [
    "Start with the user flow before the visual polish.",
    "Build small working versions, then improve the architecture.",
    "Use AI as a coding partner while keeping product direction human.",
    "Prefer honest progress notes over fake finished-project energy.",
  ];

  return (
    <Page>
      <div className={`wide-content mx-auto rounded-[2rem] p-8 md:p-12 ${glassStrong}`}>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">About</p>
            <h2 style={{ fontFamily: headingFont }} className="mt-4 text-3xl font-black text-white md:text-5xl">
              Mohamed Ruzaik
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-zinc-400">
              <p>I enjoy turning rough ideas into working software.</p>
              <p>My current focus is developer tools, AI-assisted applications, desktop software, and systems that solve practical problems.</p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={cvUrl}
                download
                className={`${contactButtonBase} border border-white/10 bg-white !text-black hover:bg-zinc-200 [&_svg]:!text-black`}
              >
                <Icon name="briefcase" className="h-4 w-4" /> Download CV
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className={`${contactButtonBase} border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-100 hover:bg-cyan-300/[0.14]`}
              >
                <Icon name="github" className="h-4 w-4" /> GitHub
              </a>
            </div>
          </div>

          <div className="grid gap-5">
            <section className={`rounded-[1.5rem] p-5 ${projectGlassSoft}`}>
              <h3 style={{ fontFamily: headingFont }} className="text-xl font-black text-white">What I like building</h3>
              <div className="mt-4 grid gap-3">
                {buildingLikes.map((item) => (
                  <div key={item} className="flex gap-3">
                    <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
                    <p className="text-sm leading-6 text-zinc-300">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className={`rounded-[1.5rem] p-5 ${projectGlassSoft}`}>
              <h3 style={{ fontFamily: headingFont }} className="text-xl font-black text-white">How I work</h3>
              <div className="mt-4 grid gap-3">
                {workingStyle.map((item) => (
                  <div key={item} className="flex gap-3">
                    <Icon name="zap" className="mt-1 h-4 w-4 shrink-0 text-amber-300" />
                    <p className="text-sm leading-6 text-zinc-300">{item}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8">
          <p className="section-eyebrow mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Contact</p>
          <div className="flex flex-wrap gap-3">
          <a href="mailto:contact@mohamedruzaik.com" className={`${contactButtonBase} border border-white/10 bg-white/[0.04] text-zinc-200 hover:bg-white/[0.08]`}>
            <Icon name="mail" className="h-4 w-4" /> Email
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
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className={`${contactButtonBase} border border-sky-300/20 bg-sky-300/[0.08] text-sky-100 hover:bg-sky-300/[0.14]`}
          >
            <Icon name="linkedin" className="h-4 w-4" /> LinkedIn
          </a>
          </div>
        </div>
      </div>
    </Page>
  );
}

function ContactPage() {
  const contactButtonBase =
    "inline-flex min-w-[150px] items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-colors";

  const contactMethods = [
    {
      label: "Email",
      value: "contact@mohamedruzaik.com",
      href: "mailto:contact@mohamedruzaik.com",
      icon: "mail",
      className: "border-white/10 bg-white !text-black hover:bg-zinc-200 [&_svg]:!text-black",
    },
    {
      label: "WhatsApp",
      value: "+94 76 233 4979",
      href: `https://wa.me/${whatsappNumber}`,
      icon: "whatsapp",
      className: "border-emerald-300/20 bg-emerald-300/[0.06] text-emerald-200 hover:bg-emerald-300/[0.10]",
    },
    {
      label: "GitHub",
      value: "Mohamed-Ruzaik",
      href: githubUrl,
      icon: "github",
      className: "border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-100 hover:bg-cyan-300/[0.14]",
    },
    {
      label: "LinkedIn",
      value: "mohamedruzaik",
      href: linkedinUrl,
      icon: "linkedin",
      className: "border-sky-300/20 bg-sky-300/[0.08] text-sky-100 hover:bg-sky-300/[0.14]",
    },
  ] as const;

  return (
    <Page>
      <div className={`wide-content mx-auto overflow-hidden rounded-[2rem] ${glassStrong}`}>
        <div className="grid gap-8 p-8 md:grid-cols-[0.95fr_1.05fr] md:p-12">
          <div className="flex flex-col justify-center">
            <p className="section-eyebrow text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Contact</p>
            <h2 style={{ fontFamily: headingFont }} className="mt-4 text-3xl font-black text-white md:text-5xl">
              Let’s build something useful.
            </h2>
            <p className="mt-5 text-base leading-8 text-zinc-400">
              Open to software engineering opportunities, practical product builds, AI tooling work, and collaborations where the goal is a real usable system.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noreferrer" : undefined}
                  className={`${contactButtonBase} border ${method.className}`}
                >
                  <Icon name={method.icon} className="h-4 w-4" />
                  {method.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid content-start gap-3 sm:gap-4">
            {contactMethods.map((method) => (
              <a
                key={method.value}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noreferrer" : undefined}
                className={`contact-card group rounded-[1.25rem] p-4 transition hover:-translate-y-1 sm:p-5 ${projectGlassSoft}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="contact-icon-box grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200 sm:h-12 sm:w-12">
                      <Icon name={method.icon} className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-black text-white">{method.label}</p>
                      <p className="mt-1 truncate text-sm text-zinc-400">{method.value}</p>
                    </div>
                  </div>
                  <Icon name="external" className="contact-external h-4 w-4 shrink-0 text-zinc-500 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-300" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}

function SiteFooter() {
  return (
    <footer className="page-shell mx-auto w-full px-4 pb-8 sm:px-5">
      <div className={`flex flex-col gap-4 rounded-[1.5rem] px-5 py-5 sm:flex-row sm:items-center sm:justify-between ${projectGlassSoft}`}>
        <div>
          <p className="text-sm font-black text-white">© 2026 Mohamed Ruzaik</p>
          <p className="mt-1 text-xs font-semibold text-zinc-500">Software Developer Portfolio</p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs font-bold text-zinc-400">
          <a href={githubUrl} target="_blank" rel="noreferrer" className="transition hover:text-cyan-300">GitHub</a>
          <a href={linkedinUrl} target="_blank" rel="noreferrer" className="transition hover:text-cyan-300">LinkedIn</a>
          <a href="mailto:contact@mohamedruzaik.com" className="transition hover:text-cyan-300">Email</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [view, setView] = useState<ViewState>(() => parseViewFromLocation());
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const activePage = view.page;

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

  useEffect(() => {
    const handlePopState = () => setView(parseViewFromLocation());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const setActivePage = (page: PageName) => {
    setView({ page });
    window.history.pushState({}, "", "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openProject = (slug: string) => {
    setView({ page: "Projects", projectSlug: slug });
    window.history.pushState({}, "", `/p/${slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const backToProjects = () => {
    setActivePage("Projects");
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  const renderPage = () => {
    if (view.projectSlug) {
      return <ProjectDetailPage slug={view.projectSlug} onBack={backToProjects} />;
    }

    switch (activePage) {
      case "Projects":
        return <ProjectsPage onOpenProject={openProject} />;
      case "Skills":
        return <SkillsPage />;
      case "About":
        return <AboutPage />;
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
        <div className="nav-shell mx-auto flex w-full items-center justify-between gap-2 px-2 py-2.5 sm:gap-5 sm:px-6">
          <button
            type="button"
            onClick={() => setActivePage("Home")}
            className="flex shrink-0 items-center gap-1.5 text-left sm:gap-2"
          >
            <span className="text-base font-black leading-none text-white/90 sm:text-lg">›_</span>
            <span style={{ fontFamily: headingFont }} className="text-sm font-black tracking-tight text-white sm:text-lg">
              Ruzaik<span className="text-cyan-300">.Dev</span>
            </span>
          </button>

          <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3">
            <div className={`hidden items-center gap-1 md:flex ${navPanel}`}>
              {pages.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setActivePage(page)}
                  className={`inline-flex items-center gap-2 ${navItemBase} ${
                    activePage === page && !view.projectSlug ? navItemActive : navItemIdle
                  }`}
                >
                  <Icon name={pageIcons[page]} className="h-3.5 w-3.5" />
                  {page}
                </button>
              ))}
            </div>

            <div className={`flex w-auto max-w-[calc(100vw-148px)] shrink-0 items-center gap-1 overflow-x-auto md:hidden ${navPanel} ${hiddenScrollbar}`}>
              {pages.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setActivePage(page)}
                  aria-label={page}
                  title={page}
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-bold transition-all duration-300 ${
                    activePage === page && !view.projectSlug ? navItemActive : navItemIdle
                  }`}
                >
                  <Icon name={pageIcons[page]} className="h-4 w-4" />
                  <span className="sr-only">{page}</span>
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
                name={theme === "dark" ? "sun" : "moon"}
                className="h-3.5 w-3.5"
              />
            </button>
          </div>
        </div>
      </nav>

      <div className={navHeightClass}>
        <AnimatePresence mode="wait">
          <div key={view.projectSlug || activePage}>{renderPage()}</div>
        </AnimatePresence>
      </div>
      <SiteFooter />
    </main>
  );
}
