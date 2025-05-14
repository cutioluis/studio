import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002'; // Fallback for local dev

export const metadata: Metadata = {
  title: 'Curso de Técnico en Uñas Profesional | Landing Spark',
  description: 'Conviértete en técnico de uñas profesional con nuestro curso certificado. Aprende las últimas técnicas y tendencias del nail art. ¡Inscríbete ya!',
  keywords: ['curso de uñas', 'técnico en uñas', 'uñas acrílicas', 'nail art', 'manicura profesional', 'certificación de uñas', 'Landing Spark', 'curso online uñas', 'aprender uñas'],
  authors: [{ name: 'Landing Spark' }],
  creator: 'Landing Spark',
  publisher: 'Landing Spark',
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
    title: 'Curso de Técnico en Uñas Profesional | Landing Spark',
    description: 'Conviértete en técnico de uñas profesional con nuestro curso certificado. Aprende las últimas técnicas y tendencias del nail art. ¡Inscríbete ya!',
    url: siteUrl,
    siteName: 'Ceci Glaom',
    images: [
      {
        url: `${siteUrl}/og-image-nail-course.jpg`, // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: 'Promoción del Curso de Técnico en Uñas Profesional de Landing Spark',
      },
    ],
    locale: 'es_ES', // Assuming Spanish content
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Curso de Técnico en Uñas Profesional | Landing Spark',
    description: 'Conviértete en técnico de uñas profesional con nuestro curso certificado. Aprende las últimas técnicas y tendencias del nail art. ¡Inscríbete ya!',
    // site: '@YourTwitterHandle', // Replace with your Twitter handle
    // creator: '@YourTwitterHandle', // Replace with your Twitter handle
    images: [`${siteUrl}/twitter-image-nail-course.jpg`], // Replace with your actual Twitter image URL
  },
  icons: {
    // icon: '/favicon.ico', // Example, ensure favicon exists in public
    // apple: '/apple-touch-icon.png', // Example
  },
  manifest: `${siteUrl}/site.webmanifest`, // Example, ensure manifest exists
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={GeistSans.variable}> {/* Set language to Spanish */}
      <body className="antialiased font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
