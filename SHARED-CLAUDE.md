# CLAUDE.md — 00 Shared Principles (jcrlabs)

> Base para todos los proyectos de jcrlabs.

## Principio #1: CÓDIGO SIMPLE

La solución más simple que funcione correctamente es siempre la correcta.

- `fetch` nativo > axios
- In-memory > Redis (si los datos caben)
- `slog` stdlib > librerías externas

## Principio #2: Código mínimo

Cada proyecto tiene la estructura mínima necesaria. Nada más.

## Dominios

| Proyecto | Dominio prod | Dominio test |
|----------|-------------|---------------|
| Landing | jcrlabs.net | test.jcrlabs.net |
| Gateway | api.jcrlabs.net | api-test.jcrlabs.net |
| Inventory | invent-back.jcrlabs.net | invent-back-test.jcrlabs.net |

## Versiones

| Tech | Versión |
|------|---------|
| Go | 1.24 |
| Next.js | 16.2 |
| React | 19 |
| Node.js | 22 LTS |
| Tailwind CSS | 4 |

## K8s (todos los proyectos)

```
Namespace prod: portfolio   | test: portfolio-test
Docker: multi-stage → distroless (Go) / node:22-alpine (Node)
Ingress: nginx + cert-manager TLS
```

## Health check

```
GET /api/health → { status: "ok", version: "x.y.z", uptime: 12345 }
```
