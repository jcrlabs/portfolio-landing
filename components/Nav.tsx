"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, useScroll } from "framer-motion"

const NAV_LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.on("change", (y) => setScrolled(y > 40))
  }, [scrollY])

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 sm:px-6 h-14 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] backdrop-blur-xl bg-[#09090b]/80"
          : "bg-transparent"
      }`}
    >
      <Link href="/" className="flex items-baseline gap-2 group">
        <span className="font-semibold text-sm text-white group-hover:text-zinc-200 transition-colors truncate max-w-[160px] sm:max-w-none">
          Jonathan Caamaño Riveiro
        </span>
        <span className="font-mono text-[10px] text-zinc-600 group-hover:text-zinc-500 transition-colors hidden sm:inline">
          · jcrlabs.net
        </span>
      </Link>

      <nav className="flex items-center gap-1">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="px-3 py-1.5 text-xs text-zinc-500 hover:text-white transition-colors rounded-md hover:bg-white/5"
          >
            {link.label}
          </a>
        ))}
        <a
          href="https://github.com/jonathanCaamano"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 px-3 py-1.5 text-xs text-zinc-300 border border-zinc-800 hover:border-zinc-600 hover:text-white rounded-md transition-all hidden sm:inline-flex"
        >
          GitHub
        </a>
      </nav>
    </motion.header>
  )
}
