export function Footer() {
  return (
    <footer className="max-w-5xl mx-auto px-6 py-8 border-t border-zinc-900">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-zinc-600">jcrlabs.net</span>
          <span className="w-1 h-1 rounded-full bg-zinc-800" />
          <span className="font-mono text-xs text-zinc-700">© 2026</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] text-zinc-700 uppercase tracking-widest">
            Built with
          </span>
          {["Next.js", "Go", "Kubernetes"].map((t) => (
            <span key={t} className="font-mono text-[10px] text-zinc-600 border border-zinc-800 px-2 py-0.5 rounded">
              {t}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
