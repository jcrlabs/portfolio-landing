import { Nav } from "@/components/Nav"
import { Hero } from "@/components/Hero"
import { LivePreview } from "@/components/LivePreview"
import { ProjectGrid } from "@/components/ProjectGrid"
import { About } from "@/components/About"
import { Footer } from "@/components/Footer"
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
    <div className="grain relative">
      <Nav />
      <Hero />
      <LivePreview />
      <ProjectGrid projects={PROJECTS} statuses={statuses} />
      <About />
      <Footer />
    </div>
  )
}
