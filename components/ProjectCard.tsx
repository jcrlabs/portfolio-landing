"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import type { Project, ProjectStatus } from "@/lib/projects"

const STATUS: Record<ProjectStatus, { color: string; label: string; pulse: boolean }> = {
  live:    { color: "text-emerald-400", label: "live",    pulse: true },
  wip:     { color: "text-blue-400",    label: "wip",     pulse: false },
  planned: { color: "text-zinc-600",    label: "planned", pulse: false },
}

// Map each project id to a subtle accent gradient for the card bg
const ACCENT: Record<string, string> = {
  inventory: "from-violet-600/10 to-transparent",
  blog:      "from-blue-600/8 to-transparent",
  dashboard: "from-cyan-600/8 to-transparent",
  chat:      "from-emerald-600/8 to-transparent",
  fincontrol:"from-amber-600/8 to-transparent",
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
  const accent = ACCENT[project.id] ?? "from-zinc-800/20 to-transparent"
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`card-glow card-shimmer group relative flex flex-col rounded-2xl border border-zinc-800/80 bg-zinc-900/50 overflow-hidden ${gridSpan}`}
    >
      {/* Per-card accent gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-60 pointer-events-none`} />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-6">
        {/* Header row */}
        <div className="flex items-start justify-between mb-auto">
          <div>
            <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-1.5">
              {project.id}
            </p>
            <h3 className="text-base font-semibold text-white leading-snug">
              {project.name}
            </h3>
          </div>
          <span className={`flex items-center gap-1.5 text-[11px] font-mono ${st.color}`}>
            <span
              className={`w-1.5 h-1.5 rounded-full bg-current shrink-0 ${
                st.pulse && isLive && online ? "animate-pulse" : ""
              }`}
            />
            {isLive ? (online ? "live" : "degraded") : st.label}
          </span>
        </div>

        {/* Description — only shows when card has enough space */}
        <p className="text-xs text-zinc-500 leading-relaxed my-3 line-clamp-3">
          {project.description}
        </p>

        {/* Stack chips */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[11px] font-mono rounded-md bg-zinc-800/90 text-zinc-400 border border-zinc-700/50 group-hover:border-zinc-600/70 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom link hint */}
      <div className="absolute bottom-4 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
      </div>
    </motion.a>
  )
}
