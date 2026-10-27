import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
const heading = localFont({
  src: '../../public/fonts/space-grotesk-latin.woff2',
  variable: '--font-heading',
  weight: '300 700',
  display: 'swap'
});
const mono = localFont({
  src: '../../public/fonts/jetbrains-mono-latin.woff2',
  variable: '--font-mono',
  weight: '100 800',
  display: 'swap'
});
const title = 'Diska Digital — Vos idées. En grand.';
const description = 'À Bamako, Diska Digital mêle design, développement web, solutions IT et communication print pour donner une nouvelle dimension à votre entreprise.';
export const metadata: Metadata = {
  title,
  description,
  keywords: ['agence digitale', 'Bamako', 'Mali', 'développement web', 'design', 'services IT', 'communication print'],
  icons: {
    icon: '/favicon.ico'
  },
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'fr_FR'
  },
  twitter: {
    card: 'summary',
    title,
    description
  }
};
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="fr" className={`${heading.variable} ${mono.variable}`}>
    <body>
      {children}
    </body>
  </html>;
}
