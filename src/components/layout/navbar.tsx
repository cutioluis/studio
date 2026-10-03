
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Home, BookOpen, Sparkles, CalendarDays, MapPinIcon, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { usePathname } from 'next/navigation';

// Define icons for main page scroll links for mobile view
const mainPageScrollLinks = [
  { href: "#features", label: "Cursos-Carreras", type: "scroll" as const, icon: BookOpen },
  { href: "#instructor", label: "Tu equipo", type: "scroll" as const, icon: Sparkles },
  { href: "#schedule", label: "Horarios", type: "scroll" as const, icon: CalendarDays },
  { href: "#location", label: "Ubicación", type: "scroll" as const, icon: MapPinIcon },
];

const blogLink = { href: "/blog", label: "Blog", type: "link" as const, icon: BookOpen };
const homeLink = { href: "/", label: "Inicio", type: "link" as const, icon: Home };


export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const pathname = usePathname();
  const isOnHomePage = pathname === '/';
  const isOnBlogPage = pathname.startsWith('/blog');

  const handleSmoothScroll = (targetId: string) => {
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  let currentNavLinks: Array<{ href: string; label: string; type: 'scroll' | 'link'; icon?: LucideIcon }> = [];

  if (isOnHomePage) {
    currentNavLinks = [...mainPageScrollLinks, blogLink];
  } else if (isOnBlogPage) {
    currentNavLinks = [homeLink];
    if (pathname !== '/blog') { 
      currentNavLinks.push(blogLink);
    }
  } else {
    // Fallback for any other future pages
    currentNavLinks = [homeLink, blogLink];
  }

  const renderLink = (link: typeof currentNavLinks[0], isMobile = false) => {
    const baseClasses = isMobile
      ? "text-lg font-medium text-foreground transition-colors hover:text-accent flex items-center gap-3 py-2" // Added py-2 for better spacing
      : "text-sm font-medium text-foreground/80 transition-colors hover:text-accent";
    const isActive = link.type === "scroll" ? activeHref === link.href : pathname === link.href;
    // Pink underline under the selected option
    const underlineClasses = `relative w-fit after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:rounded-full after:bg-primary after:transition-transform after:duration-300 after:origin-left ${
      isActive ? "after:scale-x-100 text-accent" : "after:scale-x-0"
    }`;
    const linkClasses = `${baseClasses} ${underlineClasses}`;

    const IconComponent = link.icon;

    if (link.type === "scroll" && isOnHomePage) {
      return (
        <a
          key={link.label}
          href={link.href}
          onClick={(e) => {
            e.preventDefault();
            setActiveHref(link.href);
            if (isMobile) setIsMobileMenuOpen(false);
            handleSmoothScroll(link.href);
          }}
          className={linkClasses}
        >
          {isMobile && IconComponent && <IconComponent className="h-5 w-5 text-accent" />}
          {link.label}
        </a>
      );
    }
    return (
      <Link
        key={link.label}
        href={link.href}
        onClick={() => { if (isMobile) setIsMobileMenuOpen(false);}}
        className={linkClasses}
        aria-current={pathname === link.href ? "page" : undefined}
      >
        {isMobile && IconComponent && <IconComponent className="h-5 w-5 text-accent" />}
        {link.label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex max-w-screen-2xl items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
        <Logo />
        
        <nav className="hidden md:flex items-center space-x-6">
          {currentNavLinks.map(link => renderLink(link))}
          <Button asChild size="sm" variant="default">
            <Link href="/inscripcion">Inscríbete</Link>
          </Button>
        </nav>

        <div className="flex shrink-0 items-center gap-1 md:hidden">
          <Button asChild size="sm" variant="default" className="text-xs px-3">
            <Link href="/inscripcion">Inscríbete</Link>
          </Button>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
              <div className="flex flex-col space-y-6">
                <div className="mb-4">
                  <Logo />
                </div>
                <nav className="flex flex-col space-y-1"> {/* Reduced space-y for denser mobile nav links */}
                  {currentNavLinks.map(link => renderLink(link, true))}
                </nav>
                <Button asChild variant="default" className="w-full mt-auto">
                  <Link href="/inscripcion" onClick={() => setIsMobileMenuOpen(false)}>
                    Inscríbete Ahora
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
