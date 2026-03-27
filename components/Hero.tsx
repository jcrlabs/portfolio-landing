"use client"

import { motion } from "framer-motion"

const STATS = [
  { value: "5", label: "Production projects" },
  { value: "400+", label: "GitHub commits" },
  { value: "99.9%", label: "Cluster uptime" },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-14 overflow-hidden">
      {/* Background gradient orbs */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div className="orb w-[700px] h-[700px] -top-60 -left-40 bg-violet-600/10" />
        <div className="orb w-[600px] h-[600px] top-1/3 -right-60 bg-blue-600/8" />
        <div className="orb w-[400px] h-[400px] bottom-20 left-1/3 bg-indigo-600/6" />
      </div>

      {/* Subtle grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 py-24 w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-mono text-zinc-400 border border-zinc-800 rounded-full bg-zinc-950/60 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Open to opportunities
          </span>
        </motion.div>

        {/* Main heading */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3.5rem,10vw,7rem)] font-bold tracking-tighter text-white leading-[0.92]"
          >
            Jonathan
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3.5rem,10vw,7rem)] font-bold tracking-tighter leading-[0.92] text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600"
          >
            Caamano
          </motion.h1>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base text-zinc-400 max-w-lg leading-relaxed mb-10"
        >
          Backend Engineer focused on Go, Kubernetes and distributed systems.
          Building infrastructure that ships to production with full observability
          and zero-downtime deployments.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42 }}
          className="flex flex-wrap items-center gap-3 mb-20"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-zinc-950 text-sm font-medium rounded-xl hover:bg-zinc-100 transition-colors"
          >
            View projects
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="mailto:hi@jcrlabs.net"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-zinc-300 border border-zinc-800 text-sm font-medium rounded-xl hover:border-zinc-600 hover:text-white transition-all"
          >
            Get in touch
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap gap-10"
        >
          {STATS.map((s) => (
            <div key={s.label} className="border-l-2 border-zinc-800 pl-4">
              <div className="text-xl font-bold text-white font-mono">{s.value}</div>
              <div className="text-xs text-zinc-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
