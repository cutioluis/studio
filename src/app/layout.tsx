import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002'; // Fallback for local dev

export const metadata: Metadata = {
  title: 'Curso Integral de Belleza: Uñas, Pestañas y Automaquillaje | Landing Spark',
  description: 'Conviértete en una experta en uñas, extensiones de pestañas y automaquillaje con nuestro curso certificado. Domina las técnicas más demandadas y emprende. ¡Inscríbete ya!',
  keywords: ['curso de uñas', 'curso de pestañas', 'curso de lashista', 'curso de automaquillaje', 'belleza profesional', 'nail art', 'extensiones de pestañas', 'maquillaje', 'certificación de belleza', 'Landing Spark', 'curso online belleza'],
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
    title: 'Curso Integral de Belleza: Uñas, Pestañas y Automaquillaje | Landing Spark',
    description: 'Domina las técnicas de uñas, pestañas y automaquillaje. ¡Conviértete en una profesional certificada!',
    url: siteUrl,
    siteName: 'Ceci Glam',
    images: [
      {
        url: `${siteUrl}/og-image-beauty-course.jpg`, // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: 'Promoción del Curso Integral de Belleza de Landing Spark',
      },
    ],
    locale: 'es_ES', // Assuming Spanish content
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Curso Integral de Belleza: Uñas, Pestañas y Automaquillaje | Landing Spark',
    description: 'Aprende uñas, pestañas y automaquillaje con nuestro curso certificado. ¡Inscríbete hoy!',
    // site: '@YourTwitterHandle', // Replace with your Twitter handle
    // creator: '@YourTwitterHandle', // Replace with your Twitter handle
    images: [`${siteUrl}/twitter-image-beauty-course.jpg`], // Replace with your actual Twitter image URL
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
