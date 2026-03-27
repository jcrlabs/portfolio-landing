# CLAUDE.md — portfolio-landing

> Extiende: `SHARED-CLAUDE.md`
> Dominio prod: `home.jcrlabs.net` | test: `home-test.jcrlabs.net`
> Namespace K8s: `portfolio` (prod) / `portfolio-test` (test)

## Qué es esto

Landing principal del portfolio. Muestra todos los proyectos con status en tiempo real
vía ISR (revalidate: 60s). Next.js 16.2 con App Router, Framer Motion, Tailwind v4.

## Stack

- Next.js 16.2 (App Router, `output: "standalone"`)
- React 19 · TypeScript · Tailwind CSS v4 · Framer Motion v11
- Node.js 22 LTS

## Estructura (mínima)

```
app/
├── page.tsx           # Server component: ISR + bento grid
├── layout.tsx         # Root layout, Inter + JetBrains Mono fonts
└── globals.css        # Tailwind v4, noise grain, orbs, card-glow
components/
├── Nav.tsx            # Floating nav con blur scroll
├── Hero.tsx           # Full-height hero, gradient heading, CTAs, stats
├── ProjectGrid.tsx    # Bento grid (col-span-2 para featured)
├── ProjectCard.tsx    # Glassmorphism card con mouse-tracking glow
├── About.tsx          # Stack agrupado + bio
└── Footer.tsx         # Minimal footer
lib/
└── projects.ts        # PROJECTS array, apiUrl via GATEWAY_URL env
```

## Variable de entorno

| Var | Descripción | Prod | Test |
|-----|-------------|------|------|
| `GATEWAY_URL` | Base del API Gateway | `https://portfolio-api.jcrlabs.net` | `https://portfolio-api-test.jcrlabs.net` |

Inyectada vía Helm `values-prod.yaml` / `values-test.yaml`.

## Dominios

| Entorno | URL |
|---------|-----|
| Prod    | `home.jcrlabs.net` |
| Test    | `home-test.jcrlabs.net` |

## CI local

Ejecutar **antes de cada commit** para evitar que lleguen errores a GitHub Actions:

```bash
npm run lint
npm run build
```

## Git

- Ramas: `feature/`, `bugfix/`, `hotfix/`, `release/` — sin prefijos adicionales
- Commits: convencional (`feat:`, `fix:`, `chore:`, etc.) — sin mencionar herramientas externas ni agentes en el mensaje
- PRs: título y descripción propios del cambio — sin mencionar herramientas externas ni agentes
- Comentarios y documentación: redactar en primera persona del equipo — sin atribuir autoría a herramientas

## Qué NO hacer

- No `tailwind.config.js` — Tailwind v4 no lo necesita
- No Zustand/Redux — no hay estado global
- No tests de UI — mostly estático
