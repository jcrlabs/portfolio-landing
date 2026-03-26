"use client"

import { motion } from "framer-motion"
import type { Project, ProjectStatus } from "@/lib/projects"

const STATUS_STYLES: Record<ProjectStatus, { dot: string; label: string; color: string }> = {
  live:    { dot: "bg-green-400",  label: "live",    color: "text-green-400" },
  wip:     { dot: "bg-yellow-400", label: "dev",     color: "text-yellow-400" },
  planned: { dot: "bg-zinc-500",   label: "planned", color: "text-zinc-500" },
}

interface Props {
  project: Project
  online: boolean
  index: number
}

export function ProjectCard({ project, online, index }: Props) {
  const st = STATUS_STYLES[project.status]

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35 }}
      whileHover={{ scale: 1.015 }}
      className="block rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 hover:border-zinc-600 transition-colors"
    >
      <div className="flex items-start justify-between mb-2.5">
        <h2 className="text-sm font-semibold text-white">{project.name}</h2>
        <span className={`flex items-center gap-1.5 text-xs ${st.color}`}>
          <span
            className={`w-1.5 h-1.5 rounded-full ${st.dot} ${
              project.status === "live" && online ? "animate-pulse" : ""
            }`}
          />
          {project.status === "live" ? (online ? "live" : "degraded") : st.label}
        </span>
      </div>
      <p className="text-xs text-zinc-400 mb-3.5 leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 text-xs rounded-md bg-zinc-800 text-zinc-300 font-mono"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.a>
  )
}
