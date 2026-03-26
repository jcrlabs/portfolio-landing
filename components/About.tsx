"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const STACK = [
  { category: "Languages",    items: ["Go", "TypeScript", "Python", "Bash"] },
  { category: "Backend",      items: ["Gin", "NestJS", "gRPC", "REST", "WebSockets"] },
  { category: "Data",         items: ["PostgreSQL", "Redis", "MongoDB", "MinIO"] },
  { category: "Platform",     items: ["Kubernetes", "Docker", "Helm", "ArgoCD", "Terraform"] },
  { category: "Observability",items: ["Prometheus", "Grafana", "OpenTelemetry", "Loki"] },
  { category: "CI/CD",        items: ["GitHub Actions", "GHCR", "Sealed Secrets"] },
]

export function About() {
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section
      id="about"
      ref={ref}
      className="max-w-5xl mx-auto px-6 py-24 border-t border-zinc-900"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-5 gap-16"
      >
        {/* Bio */}
        <div className="lg:col-span-2">
          <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-8">
            About
          </h2>

          <div className="space-y-4 text-[15px] text-zinc-400 leading-relaxed">
            <p>
              Focused on backend infrastructure, distributed systems and DevOps.
              I design services in Go, orchestrate them with Kubernetes, and
              observe everything with the CNCF observability stack.
            </p>
            <p>
              Every project here runs in production with full CI/CD via GitHub
              Actions + ArgoCD, active Prometheus alerting and zero-downtime
              rolling deployments.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-2">
            {[
              { label: "GitHub", href: "https://github.com/jonathanCaamano" },
              { label: "LinkedIn", href: "https://linkedin.com/in/jonathancaamano" },
              { label: "Email", href: "mailto:hi@jcrlabs.net" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors w-fit"
              >
                <span className="w-4 h-px bg-zinc-700 group-hover:w-6 group-hover:bg-white transition-all" />
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Stack */}
        <div className="lg:col-span-3">
          <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-8">
            Stack
          </h2>
          <div className="space-y-5">
            {STACK.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, x: 10 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + gi * 0.06, duration: 0.4 }}
              >
                <p className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest mb-2">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-600 hover:text-white transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
