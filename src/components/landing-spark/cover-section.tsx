"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import WhatsAppIcon from "@/components/icons/whatsapp-icon"; // Import consolidated icon
import Image from "next/image";

const coverImages = [
  "/images/1-rs.webp",
  "/images/5-rs.webp",
  "/images/lobyCeciGlam.jpg",
];

export function CoverSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % coverImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-primary/20 via-primary/5 to-background/80"
      data-ai-hint="beauty salon background"
    >
      {coverImages.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url('${src}')` }}
          aria-hidden="true"
        />
      ))}
      {/* Mobile: uniform overlay so the centered text stays readable */}
      <div className="absolute inset-0 bg-black/50 md:hidden"></div>
      {/* Desktop: solid black for the first 4cm, then fades to a clear image */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 0, #000 4cm, rgba(0,0,0,0.6) calc(4cm + 15%), transparent calc(4cm + 35%))",
        }}
      ></div>
      <div className="container relative z-10 mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-6 w-full">
              <p className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                +100 Alumnas Certificadas
              </p>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Domina Uñas, Pestañas y Automaquillaje <span className="text-[#EEC7C1]">Profesional</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/90 sm:text-xl md:text-2xl">
              Conviértete en una experta integral de la belleza. ¡Certifícate y emprende!
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Button 
                asChild
                size="lg" 
                className="text-lg px-8 py-4 bg-[#EEC7C1] text-[#0F0F12] hover:bg-[#D4A4A4] shadow-lg transform transition-transform hover:scale-105"
              >
                <a href="https://walink.co/bd3d37" target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="h-4 w-4" />
                  Contáctanos por WhatsApp
                </a>
              </Button>
            </div>
          </div>
           <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
            <Image
                src="https://placehold.co/1200x900.png" 
                alt="Profesional de belleza aplicando técnicas de uñas, pestañas o maquillaje aprendidas en el curso de Landing Spark"
                layout="fill"
                objectFit="cover"
                data-ai-hint="beauty techniques application"
                className="transform transition-transform duration-500 hover:scale-105"
                priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
