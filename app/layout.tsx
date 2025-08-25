
import type { Metadata, Viewport } from "next"
import "./globals.css"
import "@coinbase/onchainkit/styles.css"
import { Providers } from "./providers"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Build & Bet",
  description: "Predict, Build, Win: Your ideas brought to life onchain.",
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: process.env.NEXT_PUBLIC_APP_HERO_IMAGE || "https://buildandbet.vercel.app/hero.png",
      button: {
        title: "Launch Build & Bet",
        action: {
          type: "launch_frame",
          name: "Build & Bet",
          url: process.env.NEXT_PUBLIC_URL || "https://buildandbet.vercel.app",
          splashImageUrl: process.env.NEXT_PUBLIC_SPLASH_IMAGE || "https://buildandbet.vercel.app/splash.png",
          splashBackgroundColor: process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR || "#e6efff",
        },
      },
    }),
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
