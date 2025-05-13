import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans'; // Corrected import for Geist Sans
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const geistSans = GeistSans({ // Corrected font object usage for Geist Sans
  variable: '--font-geist-sans',
  // removed subsets: ['latin'] as it's not applicable here
});

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
    <html lang="en" className={geistSans.variable}>
      <body className="antialiased font-sans"> {/* Use font variable for sans-serif */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
