import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
})

export const viewport: Viewport = {
  themeColor: "#09090b",
}

export const metadata: Metadata = {
  title: "Jonathan Caamano — Portfolio",
  description: "Backend Engineer · Platform · Kubernetes · Go · jcrlabs.net",
  metadataBase: new URL("https://jcrlabs.net"),
  openGraph: {
    title: "Jonathan Caamano — Portfolio",
    description: "Backend Engineer · Platform · Kubernetes · Go",
    url: "https://jcrlabs.net",
    siteName: "jcrlabs",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jonathan Caamano — Portfolio",
    description: "Backend Engineer · Platform · Kubernetes · Go",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
