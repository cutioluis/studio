"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import WhatsAppIcon from "@/components/icons/whatsapp-icon";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

// One background per career line: nails, hair/colorimetry and makeup. Photos from Unsplash (free license).
const coverImages = ["/images/hero/unas.jpg", "/images/hero/colorimetria.jpg", "/images/hero/maquillaje.jpg"];
const ROTATION_MS = 5000;

export function CoverSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % coverImages.length);
    }, ROTATION_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-primary/20 via-primary/5 to-background/80">
      {coverImages.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          sizes="100vw"
          priority={index === 0}
          className={cn(
            "object-cover transition-opacity duration-1000 ease-in-out",
            index === current ? "opacity-100" : "opacity-0"
          )}
        />
      ))}
      {/* Mobile: uniform overlay so the centered text stays readable */}
      <div className="absolute inset-0 bg-black/50 md:hidden" />
      {/* Desktop: solid black for the first 4cm, then fades to a clear image */}
      <div className="absolute inset-0 hidden md:block bg-[linear-gradient(to_right,#000_0,#000_4cm,rgba(0,0,0,0.6)_calc(4cm+15%),transparent_calc(4cm+35%))]" />
      <div className="container relative z-10 mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <p className="mb-6 rounded-full border border-primary/40 bg-black/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur-sm">
              +100 Alumnas Certificadas
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Tu Carrera Profesional en el Mundo de la <span className="text-primary">Belleza</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85 sm:text-xl">
              Uñas, pestañas, maquillaje, cabello y colorimetría con práctica real desde el primer día. Certifícate y emprende.
            </p>
            <div className="mt-10 flex w-full flex-wrap justify-center gap-4 md:justify-start">
              <Button
                asChild
                size="lg"
                className="h-auto w-full whitespace-normal py-4 text-base sm:w-auto sm:px-8 sm:text-lg bg-primary text-primary-foreground hover:bg-primary-deep shadow-lg transform transition-transform hover:scale-105"
              >
                <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="h-4 w-4" />
                  Contáctanos por WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
