import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Cryptographic Escape Game",
  description: "An immersive blockchain-powered escape room experience combining cryptographic puzzles with cutting-edge technology.",
  keywords: ["cryptography", "blockchain", "escape room", "puzzles", "Sui", "Web3"],
  authors: [{ name: "Cryptographic Escape Game Team" }],
  openGraph: {
    title: "Cryptographic Escape Game",
    description: "Solve cryptographic puzzles, unlock rooms, and prove your mastery in this blockchain-powered escape game.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cryptographic Escape Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cryptographic Escape Game",
    description: "Solve cryptographic puzzles, unlock rooms, and prove your mastery in this blockchain-powered escape game.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#dc2626" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="antialiased bg-black text-white min-h-screen escape-particles">
        <Providers>
          <div className="relative min-h-screen">
            <Navbar />
            <main className="pt-navbar">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
} 