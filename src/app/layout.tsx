import type { Metadata } from 'next';
import { Geist_Sans } from 'next/font/google'; // Corrected import
import './globals.css';
import { Toaster } from '@/components/ui/toaster'; // Added Toaster import

const geistSans = Geist_Sans({ // Corrected font object usage
  variable: '--font-geist-sans',
  subsets: ['latin'],
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
