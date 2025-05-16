import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002'; // Fallback for local dev

export const metadata: Metadata = {
  title: 'Curso de Uñas, Pestañas y Automaquillaje en Quito | Ceci Glam',
  description: 'Aprende técnicas profesionales de uñas, pestañas y automaquillaje en Quito, Ecuador. Curso certificado por Ceci Glam. ¡Inscríbete y emprende!',
  keywords: [
    'curso de uñas Quito', 
    'curso de pestañas Quito', 
    'curso de lashista Quito', 
    'curso de automaquillaje Quito', 
    'academia de belleza Quito', 
    'uñas acrílicas Quito', 
    'extensiones de pestañas Ecuador', 
    'maquillaje profesional Quito', 
    'Ceci Glam Ecuador', 
    'cursos de belleza en Quito', 
    'certificación belleza Quito',
    'aprender uñas Quito',
    'aprender pestañas Quito',
    'aprender automaquillaje Quito',
  ],
  authors: [{ name: 'Ceci Glam' }],
  creator: 'Ceci Glam',
  publisher: 'Ceci Glam',
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
    title: 'Curso Profesional de Uñas, Pestañas y Automaquillaje en Quito | Ceci Glam',
    description: '¡Conviértete en experta! Aprende uñas, pestañas y automaquillaje con Ceci Glam en Quito. Certificación incluida.',
    url: siteUrl,
    siteName: 'Ceci Glam',
    images: [
      {
        url: `${siteUrl}/og-image-beauty-course-quito.jpg`, // Consider creating a Quito-specific OG image
        width: 1200,
        height: 630,
        alt: 'Curso Integral de Belleza Ceci Glam en Quito: Uñas, Pestañas, Automaquillaje',
      },
    ],
    locale: 'es_EC', 
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ceci Glam: Curso de Belleza en Quito (Uñas, Pestañas, Automaquillaje)',
    description: 'Fórmate como profesional de la belleza en Quito con Ceci Glam. Cursos de uñas, pestañas y automaquillaje. ¡Inscríbete!',
    // site: '@CeciGlamQuito', // Example, replace with your actual Twitter handle
    // creator: '@CeciGlamQuito', // Example
    images: [`${siteUrl}/twitter-image-beauty-course-quito.jpg`], // Consider creating a Quito-specific Twitter image
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
    <html lang="es" className={GeistSans.variable}> {/* Corrected: GeistSans.variable */}
      <body className="antialiased font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
