"use client"

import { useRef } from "react"
import type { FC } from "react"
import { motion } from "framer-motion"
import type { Project, ProjectStatus } from "@/lib/projects"

type IconFC = FC<{ className?: string }>

const STATUS: Record<ProjectStatus, { color: string; label: string; pulse: boolean }> = {
  live:    { color: "text-emerald-400", label: "live",      pulse: true },
  wip:     { color: "text-blue-400",    label: "wip",       pulse: false },
  planned: { color: "text-zinc-600",    label: "planned",   pulse: false },
}

// ── Per-project SVG icons ────────────────────────────────
function ElectrotecaIcon({ className }: { className?: string }) {
  return (
    <img
      src="/electroteca-logo.svg"
      alt="Electroteca"
      aria-hidden
      className={className}
      style={{ objectFit: "contain" }}
    />
  )
}

function BlogIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.4" stroke="currentColor" className={className} aria-hidden>
      <path d="M4 4h16v3H4z" strokeLinejoin="round"/>
      <path d="M4 9h16" strokeLinecap="round"/>
      <path d="M4 12h10" strokeLinecap="round"/>
      <path d="M4 15h7" strokeLinecap="round"/>
      <circle cx="18" cy="17" r="3"/>
      <circle cx="18" cy="17" r="1" fill="currentColor" opacity="0.6"/>
    </svg>
  )
}

function DashboardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.4" stroke="currentColor" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9"/>
      <circle cx="12" cy="12" r="2.5" fill="currentColor" fillOpacity="0.2"/>
      <circle cx="12" cy="4"  r="1.2" fill="currentColor"/>
      <circle cx="20" cy="12" r="1.2" fill="currentColor"/>
      <circle cx="4"  cy="12" r="1.2" fill="currentColor"/>
      <circle cx="12" cy="20" r="1.2" fill="currentColor"/>
      <line x1="12" y1="6.5" x2="12" y2="9.5"/>
      <line x1="17.5" y1="12" x2="14.5" y2="12"/>
      <line x1="6.5" y1="12" x2="9.5" y2="12"/>
    </svg>
  )
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.4" stroke="currentColor" className={className} aria-hidden>
      <rect x="4" y="5" width="16" height="10" rx="2"/>
      <path d="M8 19l4-4h8" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="8" y1="9" x2="16" y2="9" strokeLinecap="round"/>
      <line x1="8" y1="12" x2="13" y2="12" strokeLinecap="round"/>
    </svg>
  )
}

function FinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.4" stroke="currentColor" className={className} aria-hidden>
      <polyline points="4,16 8,10 12,13 16,7 20,9" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="4" y1="19" x2="20" y2="19" strokeLinecap="round"/>
      <circle cx="20" cy="9" r="1.5" fill="currentColor" opacity="0.7"/>
    </svg>
  )
}

const PROJECT_ICONS: Record<string, IconFC> = {
  inventory:   ElectrotecaIcon,
  blog:        BlogIcon,
  dashboard:   DashboardIcon,
  chat:        ChatIcon,
  fincontrol:  FinIcon,
}

// ── Per-project visual identity ──────────────────────────
const IDENTITY: Record<string, {
  accent: string
  border: string
  glow: string
  iconBg: string
  iconColor: string
  topLine: string
  glowClass: string
}> = {
  inventory: {
    accent:    "from-amber-600/15 via-amber-600/5 to-transparent",
    border:    "hover:border-amber-700/50",
    glow:      "hover:shadow-amber-900/20",
    iconBg:    "bg-amber-900/30 border-amber-700/30",
    iconColor: "text-amber-400",
    topLine:   "via-amber-500/70",
    glowClass: "card-glow-amber",
  },
  blog: {
    accent:    "from-blue-600/12 via-blue-600/4 to-transparent",
    border:    "hover:border-blue-700/50",
    glow:      "hover:shadow-blue-900/20",
    iconBg:    "bg-blue-900/30 border-blue-700/30",
    iconColor: "text-blue-400",
    topLine:   "via-blue-500/60",
    glowClass: "card-glow-blue",
  },
  dashboard: {
    accent:    "from-cyan-600/12 via-cyan-600/4 to-transparent",
    border:    "hover:border-cyan-700/50",
    glow:      "hover:shadow-cyan-900/20",
    iconBg:    "bg-cyan-900/30 border-cyan-700/30",
    iconColor: "text-cyan-400",
    topLine:   "via-cyan-500/60",
    glowClass: "card-glow-cyan",
  },
  chat: {
    accent:    "from-emerald-600/12 via-emerald-600/4 to-transparent",
    border:    "hover:border-emerald-700/50",
    glow:      "hover:shadow-emerald-900/20",
    iconBg:    "bg-emerald-900/30 border-emerald-700/30",
    iconColor: "text-emerald-400",
    topLine:   "via-emerald-500/60",
    glowClass: "card-glow-emerald",
  },
  fincontrol: {
    accent:    "from-violet-600/12 via-violet-600/4 to-transparent",
    border:    "hover:border-violet-700/50",
    glow:      "hover:shadow-violet-900/20",
    iconBg:    "bg-violet-900/30 border-violet-700/30",
    iconColor: "text-violet-400",
    topLine:   "via-violet-500/60",
    glowClass: "card-glow",
  },
}

const DEFAULT_IDENTITY = {
  accent:    "from-zinc-700/12 to-transparent",
  border:    "hover:border-zinc-600/50",
  glow:      "hover:shadow-zinc-900/20",
  iconBg:    "bg-zinc-800/60 border-zinc-700/30",
  iconColor: "text-zinc-400",
  topLine:   "via-zinc-500/40",
  glowClass: "card-glow",
}

interface Props {
  project: Project
  online: boolean
  index: number
  gridSpan: string
}

export function ProjectCard({ project, online, index, gridSpan }: Props) {
  const st = STATUS[project.status]
  const isLive = project.status === "live"
  const id = IDENTITY[project.id] ?? DEFAULT_IDENTITY
  const cardRef = useRef<HTMLAnchorElement>(null)
  const isFeatured = gridSpan.includes("col-span-2") && gridSpan.includes("row-span-2")

  const statusLabel = isLive ? (online ? "live" : "available") : st.label
  const isPulsing = isLive && online && st.pulse

  const Icon = PROJECT_ICONS[project.id] ?? (() => <span className="text-xs text-zinc-500">○</span>)

  function onMouseMove(e: React.MouseEvent) {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`)
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`)
  }

  return (
    <motion.a
      ref={cardRef}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={[
        "card-glow card-shimmer beam-container",
        id.glowClass,
        "group relative flex flex-col rounded-2xl border border-zinc-800/80",
        "bg-zinc-900/50 backdrop-blur-sm overflow-hidden transition-all duration-300 shadow-lg",
        id.border,
        id.glow,
        "hover:shadow-xl",
        isFeatured ? "featured-amber-glow" : "",
        gridSpan,
      ].filter(Boolean).join(" ")}
    >
      {/* Accent gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${id.accent} pointer-events-none`} />

      {/* Top accent line */}
      <div className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent ${id.topLine} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Beam sweep (featured only) */}
      {isFeatured && <div className="beam-sweep pointer-events-none" />}

      {/* Featured badge */}
      {isFeatured && (
        <div className="absolute top-4 right-4 z-20">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest text-amber-400/80 border border-amber-700/30 rounded-full bg-amber-950/50 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            featured
          </span>
        </div>
      )}

      {/* Content */}
      <div className={`relative z-10 flex flex-col h-full ${isFeatured ? "p-6 sm:p-7" : "p-5 sm:p-6"}`}>
        {/* Icon + status row */}
        <div className="flex items-start justify-between mb-4">
          <div className={[
            "rounded-xl flex items-center justify-center ring-1 ring-white/5 group-hover:scale-110 transition-transform duration-300",
            id.iconBg,
            id.iconColor,
            "border",
            isFeatured ? "w-12 h-12" : "w-10 h-10",
          ].join(" ")}>
            <Icon className={isFeatured ? "w-6 h-6" : "w-5 h-5"} />
          </div>

          {!isFeatured && (
            <span className={`flex items-center gap-1.5 text-[11px] font-mono ${st.color} shrink-0`}>
              <span className={`w-1.5 h-1.5 rounded-full bg-current shrink-0 ${isPulsing ? "animate-pulse" : ""}`} />
              {statusLabel}
            </span>
          )}
        </div>

        {/* Name + ID */}
        <div className={isFeatured ? "mb-3" : "mb-auto"}>
          <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-1">
            {project.id}
          </p>
          <h3 className={`font-semibold text-white leading-snug group-hover:text-zinc-100 transition-colors ${isFeatured ? "text-xl sm:text-2xl" : "text-base"}`}>
            {project.name}
          </h3>
        </div>

        {/* Description */}
        <p className={`text-zinc-500 leading-relaxed ${isFeatured ? "text-sm my-4 line-clamp-4" : "text-xs my-4 line-clamp-3"}`}>
          {project.description}
        </p>

        {/* Featured: status + url */}
        {isFeatured && (
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`flex items-center gap-1.5 text-[11px] font-mono ${st.color}`}>
              <span className={`w-1.5 h-1.5 rounded-full bg-current ${isPulsing ? "animate-pulse" : ""}`} />
              {statusLabel}
            </span>
            <span className="text-zinc-700 text-[11px]">·</span>
            <span className="text-[11px] font-mono text-zinc-600 truncate">{project.url.replace("https://", "")}</span>
          </div>
        )}

        {/* Stack chips */}
        <div className={`flex flex-wrap gap-1.5 ${isFeatured ? "" : "mt-auto"}`}>
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-zinc-800/80 text-zinc-400 border border-zinc-700/40 group-hover:border-zinc-600/60 group-hover:text-zinc-300 transition-all"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Featured: CTA */}
        {isFeatured && (
          <div className="mt-auto pt-5">
            <span className={`inline-flex items-center gap-2 text-xs font-medium ${id.iconColor} group-hover:opacity-100 opacity-70 transition-opacity`}>
              Open app
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        )}
      </div>

      {/* External link icon — non-featured */}
      {!isFeatured && (
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0">
          <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </div>
      )}
    </motion.a>
  )
}
