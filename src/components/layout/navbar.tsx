
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Home, BookOpen, ShoppingCart, Sparkles, Info, Tag, CalendarDays, MapPinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { usePathname } from 'next/navigation';

// Define icons for main page scroll links for mobile view
const mainPageScrollLinks = [
  { href: "#features", label: "Temario", type: "scroll" as const, icon: BookOpen },
  { href: "#instructor", label: "Instructora", type: "scroll" as const, icon: Sparkles }, // Using Sparkles as a placeholder for instructor
  { href: "#pricing", label: "Precios", type: "scroll" as const, icon: Tag },
  { href: "#schedule", label: "Horarios", type: "scroll" as const, icon: CalendarDays },
  { href: "#location", label: "Ubicación", type: "scroll" as const, icon: MapPinIcon },
];

const blogLink = { href: "/blog", label: "Blog", type: "link" as const, icon: BookOpen };
const homeLink = { href: "/", label: "Inicio", type: "link" as const, icon: Home };


export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isOnHomePage = pathname === '/';
  const isOnBlogPage = pathname.startsWith('/blog');

  const handleSmoothScroll = (targetId: string) => {
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  let currentNavLinks: Array<{ href: string; label: string; type: 'scroll' | 'link'; icon?: any }> = [];

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
    
    const IconComponent = link.icon;

    if (link.type === "scroll" && isOnHomePage) {
      return (
        <a
          key={link.label}
          href={link.href}
          onClick={(e) => {
            e.preventDefault();
            if (isMobile) setIsMobileMenuOpen(false);
            handleSmoothScroll(link.href);
          }}
          className={baseClasses}
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
        className={baseClasses}
        aria-current={pathname === link.href ? "page" : undefined}
      >
        {isMobile && IconComponent && <IconComponent className="h-5 w-5 text-accent" />}
        {link.label}
      </Link>
    );
  };

  const handleCtaClick = () => {
    if (isOnHomePage) {
      handleSmoothScroll('#cta');
    } else {
      window.open('https://walink.co/bd3d37', '_blank', 'noopener,noreferrer');
    }
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        
        <nav className="hidden md:flex items-center space-x-6">
          {currentNavLinks.map(link => renderLink(link))}
          <Button size="sm" variant="default" onClick={handleCtaClick}>
            Inscríbete
          </Button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Button 
            size="sm" 
            variant="default" 
            className="text-xs px-3"
            onClick={handleCtaClick}
          >
            Inscríbete
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
                <Button variant="default" className="w-full mt-auto" onClick={handleCtaClick}> {/* Added mt-auto to push to bottom */}
                  Inscríbete Ahora
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
