"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ProjectCard } from "./ProjectCard"
import type { Project } from "@/lib/projects"

interface Props {
  projects: Project[]
  statuses: ("online" | "offline")[]
}

// lg: bento layout (3-col); sm: 2-col equal; xs: 1-col
const GRID_SPANS = [
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-1 lg:row-span-1",
  "lg:col-span-1 lg:row-span-1",
  "lg:col-span-1 lg:row-span-1",
  "lg:col-span-1 lg:row-span-1",
]

export function ProjectGrid({ projects, statuses }: Props) {
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref, { once: true, margin: "-80px" })

  const liveCount = statuses.filter((s) => s === "online").length

  return (
    <section id="projects" ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-10"
      >
        <div className="flex items-center gap-4">
          <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            Selected Projects
          </h2>
          {/* Live services indicator */}
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono text-emerald-400/80 border border-emerald-800/40 rounded-full bg-emerald-950/30">
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            {liveCount} online
          </span>
        </div>
        <span className="text-xs font-mono text-zinc-700">{projects.length} total</span>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[240px] sm:auto-rows-[220px] gap-3">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            online={statuses[i] === "online"}
            index={i}
            gridSpan={GRID_SPANS[i] ?? ""}
          />
        ))}
      </div>
    </section>
  )
}
