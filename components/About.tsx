"use client"

import { motion } from "framer-motion"

const SKILLS = [
  "Go", "TypeScript", "React", "Next.js",
  "Kubernetes", "Docker", "Helm", "ArgoCD",
  "PostgreSQL", "Redis", "MongoDB", "MinIO",
  "Prometheus", "Grafana", "GitHub Actions", "Terraform",
]

export function About() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.55, duration: 0.5 }}
      className="mt-16 pt-12 border-t border-zinc-800"
    >
      <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-6">About</h2>
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="space-y-3">
          <p className="text-sm text-zinc-400 leading-relaxed">
            Enfocado en infraestructura, plataformas backend y DevOps.
            Diseño sistemas distribuidos con Go, los despliego en Kubernetes
            y los observo con el stack CNCF (Prometheus, Grafana, OpenTelemetry).
          </p>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Todos los proyectos de este portfolio corren en producción,
            con CI/CD completo vía GitHub Actions + ArgoCD y monitorización activa.
          </p>
        </div>
        <div>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 text-xs rounded-lg bg-zinc-800/80 text-zinc-300 border border-zinc-700/50 font-mono"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
