
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { Great_Vibes, Instrument_Serif } from 'next/font/google';
import './globals.css';
import CalendlyWidget from '@/components/utils/calendly-widget';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/utils/json-ld';
import { organizationJsonLd } from '@/lib/seo';

// Regenerate static pages daily so date-based content (banner month, footer year) stays current.
export const revalidate = 86400;

// Calligraphic accent font for decorative headings (font-script).
const scriptFont = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-script',
});

// Editorial serif for italic accents in headings (font-serif).
const serifFont = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `Academia de Belleza en Quito | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'academia de belleza Quito',
    'cursos de belleza Quito',
    'carrera de belleza Ecuador',
    'curso de uñas Quito',
    'curso de pestañas Quito',
    'curso de maquillaje Quito',
    'curso de colorimetría Quito',
    'curso de barbería Quito',
    'escuela de cosmetología Quito',
    'uñas acrílicas Quito',
    'Ceciglam Quito',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: `Academia de Belleza en Quito | ${siteConfig.name}`,
    description: siteConfig.description,
    url: '/',
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, alt: `Instalaciones de ${siteConfig.name}, academia de belleza en Quito` }],
    locale: siteConfig.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Academia de Belleza en Quito | ${siteConfig.name}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION with the Google Search Console token.
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.language} className={`${GeistSans.variable} ${scriptFont.variable} ${serifFont.variable}`}>
      <body className="antialiased font-sans">
        <JsonLd data={organizationJsonLd()} />
        {children}
        <CalendlyWidget />
      </body>
    </html>
  );
}
