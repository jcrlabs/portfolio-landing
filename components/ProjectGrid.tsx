"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ProjectCard } from "./ProjectCard"
import type { Project } from "@/lib/projects"

interface Props {
  projects: Project[]
  statuses: ("online" | "offline")[]
}

// Bento grid layout sizes for each card (0-indexed)
const GRID_SPANS = [
  "col-span-2 row-span-2",  // featured: inventory
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
]

export function ProjectGrid({ projects, statuses }: Props) {
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="projects" ref={ref} className="max-w-5xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-baseline justify-between mb-10"
      >
        <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
          Selected Projects
        </h2>
        <span className="text-xs font-mono text-zinc-700">{projects.length} total</span>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[220px] gap-3">
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
