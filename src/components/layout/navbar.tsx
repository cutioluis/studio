
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";

const navLinks = [
  { href: "#features", label: "Temario" },
  { href: "#instructor", label: "Instructora" },
  { href: "#pricing", label: "Precios" },
  { href: "#schedule", label: "Horarios" }, // Added Schedule link
  { href: "#location", label: "Ubicación" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSmoothScroll = (targetId: string) => {
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll(link.href);
              }}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <Button size="sm" variant="default" onClick={() => handleSmoothScroll('#cta')}>
            Inscríbete
          </Button>
        </nav>

        {/* Mobile Navigation & CTA */}
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
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-lg font-medium text-foreground transition-colors hover:text-accent"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        handleSmoothScroll(link.href);
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
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
