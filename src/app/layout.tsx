import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Memory Math Match – Free Online Math Memory Game for Kids",
  description: "Play Memory Math Match, a free online educational game where you match math equations with answers. Improve memory, arithmetic, and problem-solving skills.",
  keywords: [
    "memory math game", "math memory game", "online math game", "educational memory game",
    "kids math game", "arithmetic game", "multiplication memory game", "brain training game",
    "learning math online", "free math games", "classroom math games", "memory card game",
    "math puzzle game", "educational games", "number matching game", "math learning game",
    "math practice game", "math challenge", "brain games for kids", "memory matching game"
  ],
  alternates: {
    canonical: "https://memory-math-match.vercel.app/"
  },
  verification: {
    google: "3HnqK-VdYSw0Gvki7SZizE2J_mdws5GCxxGC8AmkTgA",
    yandex: "86231a68707a6747",
    other: {
      "msvalidate.01": "09C7A42C92C510395B16F0393F057D6C"
    }
  },
  openGraph: {
    title: "Memory Math Match",
    description: "Improve your math skills with an interactive memory matching game.",
    type: "website",
    url: "https://memory-math-match.vercel.app",
    images: [
      {
        url: "/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "Memory Math Match",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Memory Math Match",
    description: "Improve your math skills with an interactive memory matching game.",
    images: ["/icon-512x512.png"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebApplication",
                  "@id": "https://memory-math-match.vercel.app/#webapp",
                  "url": "https://memory-math-match.vercel.app",
                  "name": "Memory Math Match",
                  "applicationCategory": "EducationalApplication",
                  "operatingSystem": "All",
                  "browserRequirements": "Requires JavaScript. Requires HTML5.",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                  }
                },
                {
                  "@type": "VideoGame",
                  "@id": "https://memory-math-match.vercel.app/#game",
                  "url": "https://memory-math-match.vercel.app",
                  "name": "Memory Math Match",
                  "description": "Play Memory Math Match, a free online educational game where you match math equations with answers. Improve memory, arithmetic, and problem-solving skills.",
                  "genre": ["Educational Game", "Puzzle Game"],
                  "playMode": "SinglePlayer",
                  "applicationCategory": "EducationalApplication",
                  "operatingSystem": "All",
                  "author": {
                    "@type": "Organization",
                    "name": "Memory Math Match",
                    "url": "https://memory-math-match.vercel.app"
                  }
                }
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
