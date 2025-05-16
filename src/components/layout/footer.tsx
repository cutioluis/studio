import Link from "next/link";

// Facebook Icon SVG
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0" // Facebook icon is usually solid fill
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

// Instagram Icon SVG
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// TikTok Icon SVG
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0" // TikTok icon is usually solid fill
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.1.03-4.15-.5-5.72-1.84A7.53 7.53 0 0 1 3 18.7c.01-2.18.01-4.36.01-6.54C3 11.66 3.01 11.2 3.12 10.72c.14-.64.42-1.24.8-1.77.4-.52.9-.96 1.46-1.32.59-.38 1.23-.69 1.9-.9.02-1.54.01-3.08.01-4.63.45-.26.9-.49 1.38-.69.45-.19.93-.32 1.4-.41.03-.98.03-1.96.02-2.94z" />
  </svg>
);


export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-foreground/70">
            &copy; {currentYear} Design and Develop in Ecuador - Quito 💖.
          </p>
          <div className="flex space-x-4">
            <Link href="#" aria-label="Facebook" className="text-foreground/70 transition-colors hover:text-accent">
              <FacebookIcon className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Instagram" className="text-foreground/70 transition-colors hover:text-accent">
              <InstagramIcon className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="TikTok" className="text-foreground/70 transition-colors hover:text-accent">
              <TikTokIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
