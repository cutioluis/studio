
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";

const navLinks = [
  { href: "#features", label: "Temario", type: "scroll" },
  { href: "#instructor", label: "Instructora", type: "scroll" },
  { href: "#pricing", label: "Precios", type: "scroll" },
  { href: "#schedule", label: "Horarios", type: "scroll" },
  { href: "#location", label: "Ubicación", type: "scroll" },
  { href: "/blog", label: "Blog", type: "link" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSmoothScroll = (targetId: string) => {
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderLink = (link: typeof navLinks[0], isMobile = false) => {
    const className = isMobile 
      ? "text-lg font-medium text-foreground transition-colors hover:text-accent"
      : "text-sm font-medium text-foreground/80 transition-colors hover:text-accent";

    if (link.type === "scroll") {
      return (
        <a
          key={link.label}
          href={link.href}
          onClick={(e) => {
            e.preventDefault();
            if (isMobile) setIsMobileMenuOpen(false);
            handleSmoothScroll(link.href);
          }}
          className={className}
        >
          {link.label}
        </a>
      );
    }
    return (
      <Link
        key={link.label}
        href={link.href}
        onClick={() => { if (isMobile) setIsMobileMenuOpen(false);}}
        className={className}
      >
        {link.label}
      </Link>
    );
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(link => renderLink(link))}
          <Button size="sm" variant="default" onClick={() => handleSmoothScroll('#cta')}>
            Inscríbete
          </Button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Button 
            size="sm" 
            variant="default" 
            className="text-xs px-3"
            onClick={() => handleSmoothScroll('#cta')}
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
                <div className="flex items-center justify-between mb-4">
                  <Logo />
                </div>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map(link => renderLink(link, true))}
                </nav>
                <Button variant="default" className="w-full" onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleSmoothScroll('#cta');
                }}>
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
