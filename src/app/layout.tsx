import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

/**
 * Space Grotesk - modern geometric sans-serif for headings
 * JetBrains Mono - monospace font for tech aesthetic
 */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Site metadata for SEO and social sharing
 * 
 * Validates: Requirements 12.2, 12.3
 */
export const metadata: Metadata = {
  title: "Diska Digital | Web. IT. Design. Print.",
  description:
    "Diska Digital est une entreprise technologique premium basée au Mali offrant développement web, branding, services IT, communication print et vente d'équipements informatiques.",
  keywords: [
    "développement web",
    "services IT",
    "branding",
    "communication print",
    "Mali",
    "agence digitale",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Diska Digital | Web. IT. Design. Print.",
    description:
      "Entreprise technologique premium basée au Mali offrant développement web, branding, services IT, communication print et vente d'équipements informatiques.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diska Digital | Web. IT. Design. Print.",
    description:
      "Entreprise technologique premium basée au Mali offrant développement web, branding, services IT, communication print et vente d'équipements informatiques.",
  },
};

/**
 * RootLayout - Provides global font loading, metadata, and base styling
 * 
 * Validates: Requirements 12.2, 12.3, 13.4
 * - 12.2: Loading screen fades out to reveal Hero when assets loaded
 * - 12.3: Loading screen completes within 3 seconds max
 * - 13.4: Large, bold typography for headings, clean sans-serif fonts
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={cn("h-full", "antialiased", spaceGrotesk.variable, jetbrainsMono.variable)}>
      <body className="min-h-full flex flex-col bg-white text-foreground font-mono">
        {children}
      </body>
    </html>
  );
}
