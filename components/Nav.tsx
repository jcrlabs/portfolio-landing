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
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 h-14 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] backdrop-blur-xl bg-[#09090b]/80"
          : "bg-transparent"
      }`}
    >
      <Link href="/" className="font-mono text-xs text-zinc-500 hover:text-white transition-colors tracking-widest uppercase">
        jcrlabs.net
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
          className="ml-2 px-3 py-1.5 text-xs text-zinc-300 border border-zinc-800 hover:border-zinc-600 hover:text-white rounded-md transition-all"
        >
          GitHub
        </a>
      </nav>
    </motion.header>
  )
}
