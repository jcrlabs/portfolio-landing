import { About } from "@/components/About"
import { Hero } from "@/components/Hero"
import { ProjectCard } from "@/components/ProjectCard"
import { PROJECTS } from "@/lib/projects"

export const revalidate = 60

async function fetchStatus(apiUrl: string): Promise<"online" | "offline"> {
  try {
    const res = await fetch(apiUrl, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(3000),
    })
    return res.ok ? "online" : "offline"
  } catch {
    return "offline"
  }
}

export default async function Home() {
  const statuses = await Promise.all(PROJECTS.map((p) => fetchStatus(p.apiUrl)))

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Hero />
        <section>
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-6">
            Proyectos
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {PROJECTS.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                online={statuses[i] === "online"}
                index={i}
              />
            ))}
          </div>
        </section>
        <About />
      </div>
    </main>
  )
}
