import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-foreground/70">
            &copy; {currentYear} Landing Spark. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link href="#" aria-label="Twitter" className="text-foreground/70 transition-colors hover:text-accent">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="GitHub" className="text-foreground/70 transition-colors hover:text-accent">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="text-foreground/70 transition-colors hover:text-accent">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
