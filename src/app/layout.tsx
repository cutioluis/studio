import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans'; // GeistSans is an object, not a function
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

// The GeistSans object from 'geist/font/sans' directly provides `variable` and `className` properties.
// It should not be called as a function like `GeistSans(...)`.

export const metadata: Metadata = {
  title: 'Landing Spark | Ignite Your Ideas',
  description: 'Beautifully crafted landing pages, designed to convert. Launch your next project with style and speed.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.variable}> {/* Use GeistSans.variable directly */}
      <body className="antialiased font-sans"> {/* Tailwind's font-sans will use the --font-geist-sans CSS variable */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
