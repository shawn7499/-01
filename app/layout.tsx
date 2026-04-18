import './globals.css'
import type { Metadata } from 'next'
import { IBM_Plex_Mono, Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Shawn Wick',
    template: '%s | Shawn Wick',
  },
  metadataBase: new URL('https://www.shawnwick.com'),
  description:
    'Founder-operator site for Shawn Wick, exploring AI products, market intelligence, onchain tools, and incubating infrastructure ideas.',
  openGraph: {
    title: 'Shawn Wick',
    description:
      'AI systems, market intelligence, onchain tools, and independent product experiments.',
    url: 'https://www.shawnwick.com',
    siteName: 'Shawn Wick',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shawn Wick',
    description:
      'AI systems, market intelligence, onchain tools, and independent product experiments.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
