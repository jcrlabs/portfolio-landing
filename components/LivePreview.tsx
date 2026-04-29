"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"

type IframeState = "loading" | "ready" | "blocked"

// Electroteca PCB/circuit SVG logo
function ElectrotecaLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      {/* Outer PCB board */}
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.2"/>
      {/* Center chip */}
      <rect x="8" y="8" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.12"/>
      {/* Top pins */}
      <line x1="10" y1="3" x2="10" y2="8" stroke="currentColor" strokeWidth="0.9"/>
      <line x1="14" y1="3" x2="14" y2="8" stroke="currentColor" strokeWidth="0.9"/>
      {/* Bottom pins */}
      <line x1="10" y1="16" x2="10" y2="21" stroke="currentColor" strokeWidth="0.9"/>
      <line x1="14" y1="16" x2="14" y2="21" stroke="currentColor" strokeWidth="0.9"/>
      {/* Left pins */}
      <line x1="3" y1="10" x2="8" y2="10" stroke="currentColor" strokeWidth="0.9"/>
      <line x1="3" y1="14" x2="8" y2="14" stroke="currentColor" strokeWidth="0.9"/>
      {/* Right pins */}
      <line x1="16" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="0.9"/>
      <line x1="16" y1="14" x2="21" y2="14" stroke="currentColor" strokeWidth="0.9"/>
      {/* Center dot */}
      <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.8"/>
    </svg>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 text-emerald-400" aria-hidden>
      <path d="M4 7V5a4 4 0 018 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <rect x="2.5" y="7" width="11" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="8" cy="11" r="1" fill="currentColor"/>
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden>
      <path d="M6 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M9 2h5v5M14 2L7 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const APPS = [
  { id: "electroteca", label: "Electroteca", url: "https://electroteca.jcrlabs.net", color: "amber" },
  { id: "chat",        label: "Chat",         url: "https://chat.jcrlabs.net",         color: "emerald" },
]

const DEMO_API: Record<string, string> = {
  electroteca: (process.env.NEXT_PUBLIC_INVENTORY_API_URL ?? "https://api.electroteca.jcrlabs.net") + "/api/v1/auth/demo",
  chat:        (process.env.NEXT_PUBLIC_CHAT_API_URL      ?? "https://api.chat.jcrlabs.net")        + "/api/auth/demo",
}

const COLORS: Record<string, { tab: string; urlBar: string; dot: string }> = {
  amber:   { tab: "text-amber-400 border-amber-500", urlBar: "text-amber-400/70", dot: "bg-amber-400" },
  emerald: { tab: "text-emerald-400 border-emerald-500", urlBar: "text-emerald-400/70", dot: "bg-emerald-400" },
  blue:    { tab: "text-blue-400 border-blue-500", urlBar: "text-blue-400/70", dot: "bg-blue-400" },
}

export function LivePreview() {
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref, { once: true, margin: "-80px" })
  const [activeApp, setActiveApp] = useState(0)
  const [iframeState, setIframeState] = useState<IframeState>("loading")
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const loadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [demoTokens, setDemoTokens] = useState<Record<string, string>>({})

  const app = APPS[activeApp]
  const colors = COLORS[app.color]
  const appUrl = demoTokens[app.id]
    ? `${app.url}?demo_token=${demoTokens[app.id]}`
    : app.url

  // Fetch demo tokens on mount and refresh every 25 min
  useEffect(() => {
    async function fetchTokens() {
      const results = await Promise.allSettled(
        APPS.map((a) =>
          fetch(DEMO_API[a.id], { cache: "no-store" })
            .then((r) => r.ok ? r.json() : Promise.reject())
            .then((data) => ({ id: a.id, token: data.token as string }))
        )
      )
      const tokens: Record<string, string> = {}
      results.forEach((r) => { if (r.status === "fulfilled") tokens[r.value.id] = r.value.token })
      setDemoTokens(tokens)
    }
    fetchTokens()
    const interval = setInterval(fetchTokens, 25 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // Reset state when app or its demo URL changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIframeState("loading")
    if (loadTimerRef.current) clearTimeout(loadTimerRef.current)
    // After 8s fallback: if still loading, show blocked state
    loadTimerRef.current = setTimeout(() => {
      setIframeState((s) => (s === "loading" ? "blocked" : s))
    }, 8000)
    return () => { if (loadTimerRef.current) clearTimeout(loadTimerRef.current) }
  }, [activeApp, appUrl])

  function handleLoad() {
    if (loadTimerRef.current) clearTimeout(loadTimerRef.current)
    // Try to detect blocked iframe via contentDocument access
    try {
      const doc = iframeRef.current?.contentDocument
      // If doc exists and has no meaningful content, it might be an error page
      if (doc && doc.title.toLowerCase().includes("refused")) {
        setIframeState("blocked")
      } else {
        setIframeState("ready")
      }
    } catch {
      // Cross-origin access blocked = probably loaded fine (CORS restriction, not X-Frame)
      setIframeState("ready")
    }
  }

  function handleError() {
    if (loadTimerRef.current) clearTimeout(loadTimerRef.current)
    setIframeState("blocked")
  }

  return (
    <section ref={ref} className="hidden lg:block max-w-5xl mx-auto px-4 sm:px-6 pb-4">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-5"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Live Preview</span>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-amber-500/20 to-transparent" />
      </motion.div>

      {/* Mock browser window */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="browser-glow rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm"
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900/90 border-b border-zinc-800/80">
          {/* Window controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-3 h-3 rounded-full bg-zinc-700/80 hover:bg-red-500/70 transition-colors cursor-default" />
            <div className="w-3 h-3 rounded-full bg-zinc-700/80 hover:bg-yellow-500/70 transition-colors cursor-default" />
            <div className="w-3 h-3 rounded-full bg-zinc-700/80 hover:bg-green-500/70 transition-colors cursor-default" />
          </div>

          {/* App tabs */}
          <div className="flex items-center gap-1 ml-2">
            {APPS.map((a, i) => (
              <button
                key={a.id}
                onClick={() => setActiveApp(i)}
                className={`px-3 py-1 text-[11px] font-mono rounded-md transition-all duration-200 ${
                  activeApp === i
                    ? `${COLORS[a.color].tab} bg-zinc-800/80 border-b-2`
                    : "text-zinc-600 hover:text-zinc-400 border-b-2 border-transparent"
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>

          {/* URL bar */}
          <div className="hidden sm:flex flex-1 items-center gap-2 bg-zinc-800/50 rounded-lg px-3 py-1.5 mx-2 max-w-xs">
            <LockIcon />
            <span className={`font-mono text-[11px] truncate ${colors.urlBar}`}>
              {app.url.replace("https://", "")}
            </span>
          </div>

          {/* Status + open link */}
          <div className="flex items-center gap-2 ml-auto shrink-0">
            <span className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] text-zinc-600">
              <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} ${iframeState === "ready" ? "opacity-100" : "opacity-40"} transition-opacity`} />
              {iframeState === "ready" ? "live" : iframeState === "blocked" ? "preview unavailable" : "loading…"}
            </span>
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1 font-mono text-[11px] text-zinc-400 hover:text-white border border-zinc-700/60 hover:border-zinc-500 rounded-md transition-all"
            >
              <ExternalIcon />
              <span className="hidden sm:inline">Open</span>
            </a>
          </div>
        </div>

        {/* Iframe area */}
        <div className="relative bg-zinc-950" style={{ height: "460px" }}>
          {/* Loading skeleton */}
          {iframeState === "loading" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-zinc-700 border-t-amber-400 rounded-full animate-spin" />
                <span className="font-mono text-xs text-zinc-600">Connecting to {app.url.replace("https://", "")}…</span>
              </div>
              <div className="w-48 space-y-2 mt-2">
                <div className="h-2 skeleton-shine rounded" />
                <div className="h-2 skeleton-shine rounded w-3/4" />
                <div className="h-2 skeleton-shine rounded w-1/2" />
              </div>
            </div>
          )}

          {/* Blocked fallback */}
          {iframeState === "blocked" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 z-10 bg-zinc-950">
              <div className="text-amber-400/60 mb-1">
                <ElectrotecaLogo className="w-10 h-10" />
              </div>
              <div className="text-center space-y-1">
                <p className="font-mono text-sm text-zinc-400">Preview blocked by browser policy</p>
                <p className="font-mono text-xs text-zinc-600">The app disables embedding for security.</p>
              </div>
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-mono rounded-xl hover:bg-amber-500/15 hover:border-amber-500/50 transition-all"
              >
                Open {app.label} ↗
              </a>
            </div>
          )}

          {/* iframe */}
          <iframe
            ref={iframeRef}
            key={appUrl}
            src={appUrl}
            title={`${app.label} live preview`}
            className={`w-full h-full border-0 transition-opacity duration-500 ${iframeState === "ready" ? "opacity-100" : "opacity-0"}`}
            onLoad={handleLoad}
            onError={handleError}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />

          {/* CRT scanlines overlay */}
          <div className="scan-line absolute inset-0 pointer-events-none z-20" />
        </div>
      </motion.div>
    </section>
  )
}
