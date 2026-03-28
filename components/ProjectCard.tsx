"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import type { Project, ProjectStatus } from "@/lib/projects"

const STATUS: Record<ProjectStatus, { color: string; dot: string; label: string; pulse: boolean }> = {
  live:    { color: "text-emerald-400", dot: "bg-emerald-400", label: "live",    pulse: true },
  wip:     { color: "text-blue-400",    dot: "bg-blue-400",    label: "wip",     pulse: false },
  planned: { color: "text-zinc-600",    dot: "bg-zinc-600",    label: "planned", pulse: false },
}

// Per-project visual identity
const IDENTITY: Record<string, {
  icon: string
  accent: string
  border: string
  glow: string
  label: string
}> = {
  inventory: {
    icon: "⬡",
    accent: "from-violet-600/20 via-violet-600/5 to-transparent",
    border: "hover:border-violet-700/60",
    glow: "hover:shadow-violet-900/30",
    label: "bg-violet-900/40 text-violet-300",
  },
  blog: {
    icon: "◈",
    accent: "from-blue-600/15 via-blue-600/4 to-transparent",
    border: "hover:border-blue-700/60",
    glow: "hover:shadow-blue-900/30",
    label: "bg-blue-900/40 text-blue-300",
  },
  dashboard: {
    icon: "◎",
    accent: "from-cyan-600/15 via-cyan-600/4 to-transparent",
    border: "hover:border-cyan-700/60",
    glow: "hover:shadow-cyan-900/30",
    label: "bg-cyan-900/40 text-cyan-300",
  },
  chat: {
    icon: "◬",
    accent: "from-emerald-600/15 via-emerald-600/4 to-transparent",
    border: "hover:border-emerald-700/60",
    glow: "hover:shadow-emerald-900/30",
    label: "bg-emerald-900/40 text-emerald-300",
  },
  fincontrol: {
    icon: "◇",
    accent: "from-amber-600/15 via-amber-600/4 to-transparent",
    border: "hover:border-amber-700/60",
    glow: "hover:shadow-amber-900/30",
    label: "bg-amber-900/40 text-amber-300",
  },
}

const DEFAULT_IDENTITY = {
  icon: "○",
  accent: "from-zinc-700/15 to-transparent",
  border: "hover:border-zinc-600/60",
  glow: "hover:shadow-zinc-900/20",
  label: "bg-zinc-800/60 text-zinc-400",
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
      className={`card-glow card-shimmer group relative flex flex-col rounded-2xl border border-zinc-800/80 bg-zinc-900/60 overflow-hidden transition-all duration-300 shadow-lg ${id.border} ${id.glow} hover:shadow-xl ${gridSpan}`}
    >
      {/* Accent gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${id.accent} pointer-events-none`} />

      {/* Top accent line with project color */}
      <div className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${st.color}`} />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-5 sm:p-6">
        {/* Icon + status row */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold ${id.label} ring-1 ring-white/5 group-hover:scale-110 transition-transform duration-300`}>
            {id.icon}
          </div>
          <span className={`flex items-center gap-1.5 text-[11px] font-mono ${st.color} shrink-0`}>
            <span
              className={`w-1.5 h-1.5 rounded-full bg-current shrink-0 ${
                st.pulse && isLive && online ? "animate-pulse" : ""
              }`}
            />
            {isLive ? (online ? "live" : "degraded") : st.label}
          </span>
        </div>

        {/* Name + ID */}
        <div className="mb-auto">
          <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-1">
            {project.id}
          </p>
          <h3 className="text-base font-semibold text-white leading-snug group-hover:text-zinc-100 transition-colors">
            {project.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-xs text-zinc-500 leading-relaxed my-4 line-clamp-3">
          {project.description}
        </p>

        {/* Stack chips */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-zinc-800/80 text-zinc-400 border border-zinc-700/40 group-hover:border-zinc-600/60 group-hover:text-zinc-300 transition-all"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* External link icon */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0">
        <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
      </div>
    </motion.a>
  )
}
