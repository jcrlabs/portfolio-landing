# CLAUDE.md — portfolio-landing

> Extiende: `SHARED-CLAUDE.md`
> Dominio: `jcrlabs.net` | Namespace K8s: `portfolio`

## Qué es esto

Landing principal del portfolio. Muestra todos los proyectos con status en tiempo real,
sección About y links. Next.js 16.2 con App Router, ISR cada 60 s, Framer Motion.

## Stack

- **Framework**: Next.js 16.2 (App Router, standalone output)
- **Runtime**: Node.js 22 LTS
- **Estilos**: Tailwind CSS v4 — sin `tailwind.config.js`
- **Animaciones**: Framer Motion v11
- **Build**: Turbopack (`next dev --turbopack`)
- **Deploy**: Namespace `portfolio`, `jcrlabs.net`

## Estructura (mínima)

```
app/
├── page.tsx          # Server component: ISR fetch + grid
├── layout.tsx        # Root layout + metadata
└── globals.css       # @import "tailwindcss"
components/
├── Hero.tsx          # Hero con nombre, bio, links GitHub/LinkedIn
├── ProjectCard.tsx   # Card con status badge + Framer Motion
└── About.tsx         # Skills grid + descripción
lib/
└── projects.ts       # Config estática de todos los proyectos
next.config.ts        # output: standalone
```

## Data fetching

```typescript
export const revalidate = 60   // ISR — regenera cada 60s

// Cada proyecto expone /api/health via el API Gateway
await fetch(apiUrl, { next: { revalidate: 60 }, signal: AbortSignal.timeout(3000) })
```

## Qué NO hacer

- No Zustand/Redux — no hay estado global
- No tRPC — fetch nativo es suficiente
- No `tailwind.config.js` — Tailwind v4 no lo necesita
- No tests de UI — el landing es mostly estático
