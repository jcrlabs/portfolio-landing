"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const STATS = [
  { value: 5,   suffix: "",   label: "Production projects" },
  { value: 400, suffix: "+",  label: "GitHub commits" },
  { value: 6,   suffix: "+",  label: "Services in cluster" },
]

const TERMINAL_LINES = [
  { type: "cmd",  text: "kubectl get pods -n portfolio" },
  { type: "out",  text: "NAME                      READY   STATUS" },
  { type: "live", text: "portfolio-landing-7k9x2   1/1     Running" },
  { type: "live", text: "portfolio-gateway-m2p4r   1/1     Running" },
  { type: "cmd",  text: "go version" },
  { type: "out",  text: "go version go1.24.2 linux/amd64" },
  { type: "cmd",  text: "argocd app list" },
  { type: "ok",   text: "electroteca   Synced   Healthy   ✓" },
  { type: "ok",   text: "chat-front    Synced   Healthy   ✓" },
  { type: "ok",   text: "fincontrol    Synced   Healthy   ✓" },
]

const PARTICLES = [
  { x: "12%",  y: "18%", size: 3, cls: "particle-1", opacity: "opacity-40" },
  { x: "82%",  y: "30%", size: 2, cls: "particle-2", opacity: "opacity-30" },
  { x: "55%",  y: "70%", size: 4, cls: "particle-3", opacity: "opacity-25" },
  { x: "25%",  y: "60%", size: 2, cls: "particle-4", opacity: "opacity-35" },
  { x: "88%",  y: "75%", size: 3, cls: "particle-5", opacity: "opacity-20" },
  { x: "68%",  y: "15%", size: 2, cls: "particle-6", opacity: "opacity-30" },
]

function useCounter(target: number, duration = 1600, decimals = 0) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const visible = useInView(ref, { once: true, margin: "-40px" })

  useEffect(() => {
    if (!visible) return
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(parseFloat((eased * target).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [visible, target, duration, decimals])

  return { value, ref }
}

function StatCounter({ stat }: { stat: typeof STATS[0] }) {
  const decimals = stat.value % 1 !== 0 ? 1 : 0
  const { value, ref } = useCounter(stat.value, 1400, decimals)
  return (
    <div className="border-l-2 border-zinc-800 pl-4 group cursor-default">
      <div className="text-xl font-bold text-white font-mono tabular-nums group-hover:text-amber-300 transition-colors duration-300">
        <span ref={ref}>{value.toFixed(decimals)}</span>{stat.suffix}
      </div>
      <div className="text-xs text-zinc-600 mt-0.5 group-hover:text-zinc-400 transition-colors duration-300">
        {stat.label}
      </div>
    </div>
  )
}

function TerminalWindow() {
  const [visibleLines, setVisibleLines] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })

  useEffect(() => {
    if (!inView) return
    let i = 0
    const tick = () => {
      i += 1
      setVisibleLines(i)
      if (i < TERMINAL_LINES.length) {
        setTimeout(tick, i === 0 ? 600 : 320)
      }
    }
    setTimeout(tick, 400)
  }, [inView])

  return (
    <div
      ref={ref}
      className="relative rounded-xl border border-zinc-800/80 bg-zinc-950/95 overflow-hidden terminal-glow"
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800/60 bg-zinc-900/50">
        <div className="w-3 h-3 rounded-full bg-zinc-700/80 hover:bg-red-500/80 transition-colors" />
        <div className="w-3 h-3 rounded-full bg-zinc-700/80 hover:bg-yellow-500/80 transition-colors" />
        <div className="w-3 h-3 rounded-full bg-zinc-700/80 hover:bg-green-500/80 transition-colors" />
        <span className="ml-3 text-[11px] font-mono text-zinc-600 tracking-wide select-none">
          jonathan@jcrlabs:~
        </span>
        <span className="ml-auto text-[10px] font-mono text-zinc-700 select-none">zsh</span>
      </div>

      {/* Terminal body */}
      <div className="p-4 min-h-[280px] font-mono text-[12.5px] leading-6 space-y-0.5 overflow-x-auto">
        {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18 }}
            className="flex items-start gap-2 whitespace-nowrap"
          >
            {line.type === "cmd" && (
              <>
                <span className="text-violet-400 shrink-0">❯</span>
                <span className="text-zinc-200">{line.text}</span>
              </>
            )}
            {line.type === "out" && (
              <span className="text-zinc-600 pl-4">{line.text}</span>
            )}
            {line.type === "live" && (
              <span className="text-emerald-400/80 pl-4">{line.text}</span>
            )}
            {line.type === "ok" && (
              <div className="pl-4 flex items-center gap-2">
                <span className="text-cyan-400/80">{line.text.slice(0, -2)}</span>
                <span className="text-emerald-400 text-[11px]">✓</span>
              </div>
            )}
          </motion.div>
        ))}
        {visibleLines >= TERMINAL_LINES.length && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-violet-400">❯</span>
            <span className="w-2 h-[14px] bg-violet-400/80 cursor-blink inline-block rounded-sm" />
          </div>
        )}
      </div>

      {/* Scan line overlay */}
      <div className="scan-line pointer-events-none absolute inset-0" />

      {/* Corner brackets */}
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-violet-500/20 rounded-tr-xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-violet-500/20 rounded-bl-xl pointer-events-none" />
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-14 overflow-hidden">
      {/* Dot grid background */}
      <div aria-hidden className="absolute inset-0 dot-grid opacity-100 pointer-events-none" />

      {/* Aurora orbs */}
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb aurora-float   w-[700px] h-[700px] -top-60 -left-40  bg-violet-600/10" />
        <div className="orb aurora-float-2 w-[600px] h-[600px]  top-1/3 -right-60 bg-blue-600/7" />
        <div className="orb aurora-float-3 w-[400px] h-[400px]  bottom-20 left-1/3 bg-amber-600/5" />
      </div>

      {/* Floating particles */}
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p) => (
          <div
            key={p.x}
            className={`particle ${p.cls} ${p.opacity}`}
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              backgroundColor: "rgba(245,158,11,0.8)",
              boxShadow: `0 0 ${p.size * 3}px rgba(245,158,11,0.5)`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <div>
            {/* Role badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-mono text-zinc-400 border border-zinc-800 rounded-full bg-zinc-950/60 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Backend · DevOps · Platform Engineering
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6"
            >
              <h1 className="text-[clamp(2.2rem,7vw,3.75rem)] font-bold tracking-tight text-white leading-[1.08]">
                Go · Kubernetes
              </h1>
              <h1 className="text-[clamp(2.2rem,7vw,3.75rem)] font-bold tracking-tight leading-[1.08] text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400">
                Distributed Systems
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-[15px] text-zinc-400 max-w-md leading-relaxed mb-8"
            >
              Backend engineer building infrastructure that ships to production
              with full observability, GitOps, and zero‑downtime deployments.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="flex flex-wrap items-center gap-3 mb-12"
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
                href="mailto:jonathanriveiro30@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-zinc-300 border border-zinc-800 text-sm font-medium rounded-xl hover:border-zinc-600 hover:text-white transition-all"
              >
                Get in touch
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap gap-8"
            >
              {STATS.map((s) => (
                <StatCounter key={s.label} stat={s} />
              ))}
            </motion.div>
          </div>

          {/* Right — terminal (lg+) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
          >
            <TerminalWindow />
          </motion.div>
        </div>

        {/* Mobile terminal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.6 }}
          className="block lg:hidden mt-10"
        >
          <TerminalWindow />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="font-mono text-[10px] text-zinc-700 uppercase tracking-widest">scroll</span>
        <div className="w-px h-6 bg-gradient-to-b from-zinc-700 to-transparent animate-float" />
      </motion.div>
    </section>
  )
}
