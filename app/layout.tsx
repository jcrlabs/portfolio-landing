import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Jonathan Caamano — Portfolio",
  description: "Backend Engineer · Platform · jcrlabs.net",
  openGraph: {
    title: "Jonathan Caamano — Portfolio",
    description: "Backend Engineer · Platform · jcrlabs.net",
    url: "https://jcrlabs.net",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  )
}
