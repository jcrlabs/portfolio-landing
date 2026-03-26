export type ProjectStatus = "live" | "wip" | "planned"

export interface Project {
  id: string
  name: string
  description: string
  url: string
  apiUrl: string
  stack: string[]
  status: ProjectStatus
  repo: string
}

// GATEWAY_URL is injected per environment via Helm values → K8s env var
// Falls back to prod for local development
const GATEWAY = process.env.GATEWAY_URL ?? "https://portfolio-api.jcrlabs.net"

export const PROJECTS: Project[] = [
  {
    id: "inventory",
    name: "Inventory System",
    description: "Gestión de inventario con JWT auth, RBAC y upload de imágenes en MinIO",
    url: "https://inventory.jcrlabs.net",
    apiUrl: `${GATEWAY}/api/inventory/api/health`,
    stack: ["Go", "React", "PostgreSQL", "MinIO"],
    status: "live",
    repo: "github.com/jonathanCaamano/inventory-back",
  },
  {
    id: "blog",
    name: "Blog CMS",
    description: "CMS con ingestión RSS automática de fuentes CNCF/K8s",
    url: "https://blog.jcrlabs.net",
    apiUrl: `${GATEWAY}/api/blog/api/health`,
    stack: ["NestJS", "MongoDB", "GraphQL", "Next.js"],
    status: "wip",
    repo: "github.com/jonathanCaamano/blog-cms-back",
  },
  {
    id: "dashboard",
    name: "K8s Dashboard",
    description: "Monitorización del cluster en tiempo real con client-go",
    url: "https://dashboard.jcrlabs.net",
    apiUrl: `${GATEWAY}/api/devops/api/health`,
    stack: ["Go", "client-go", "React", "Redis"],
    status: "planned",
    repo: "github.com/jonathanCaamano/k8s-dashboard",
  },
  {
    id: "chat",
    name: "Chat",
    description: "Chat en tiempo real con WebSockets y Redis pub/sub",
    url: "https://chat.jcrlabs.net",
    apiUrl: `${GATEWAY}/api/chat/api/health`,
    stack: ["Go", "WebSockets", "Redis", "React"],
    status: "wip",
    repo: "github.com/jonathanCaamano/chat-back",
  },
  {
    id: "fincontrol",
    name: "FinControl",
    description: "Control de finanzas personales con análisis y alertas",
    url: "https://fincontrol.jcrlabs.net",
    apiUrl: `${GATEWAY}/api/fin/api/health`,
    stack: ["NestJS", "PostgreSQL", "React"],
    status: "planned",
    repo: "github.com/jonathanCaamano/fincontrol-back",
  },
]
