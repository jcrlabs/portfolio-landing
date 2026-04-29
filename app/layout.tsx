import type { Metadata, Viewport } from "next"
import "./globals.css"

export const viewport: Viewport = {
  themeColor: "#09090b",
}

export const metadata: Metadata = {
  title: "Jonathan Caamano — Portfolio",
  description: "Backend Engineer · Platform · Kubernetes · Go · jcrlabs.net",
  metadataBase: new URL("https://home.jcrlabs.net"),
  openGraph: {
    title: "Jonathan Caamano — Portfolio",
    description: "Backend Engineer · Platform · Kubernetes · Go",
    url: "https://home.jcrlabs.net",
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
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:wght@100..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
