"use client";

import { useState, type ElementType } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Palette, Smartphone, Settings2, Zap } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  icon: ElementType;
}

const galleryItems: GalleryItem[] = [
  { 
    id: "1", 
    title: "Sleek Design", 
    description: "Modern and visually appealing templates that captivate your audience.", 
    imageUrl: "https://picsum.photos/800/600?random=1",
    imageHint: "minimalist architecture",
    icon: Palette,
  },
  { 
    id: "2", 
    title: "Fully Responsive", 
    description: "Perfect display on all devices, from desktops to smartphones.", 
    imageUrl: "https://picsum.photos/800/600?random=2",
    imageHint: "devices responsive",
    icon: Smartphone,
  },
  { 
    id: "3", 
    title: "Easy Customization", 
    description: "Tailor every element to match your brand and vision effortlessly.", 
    imageUrl: "https://picsum.photos/800/600?random=3",
    imageHint: "color palette tools",
    icon: Settings2,
  },
  { 
    id: "4", 
    title: "Optimized for Speed", 
    description: "Fast-loading pages to ensure a smooth user experience and better SEO.", 
    imageUrl: "https://picsum.photos/800/600?random=4",
    imageHint: "speedometer abstract",
    icon: Zap,
  },
];

export function InteractiveGallery() {
  const [activeItem, setActiveItem] = useState<GalleryItem>(galleryItems[0]);

  return (
    <section id="features" className="py-16 md:py-24 bg-theme-pink">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">
            Discover What <span className="text-accent">Landing Spark</span> Offers
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70 sm:text-xl">
            Explore the powerful features that make creating stunning landing pages a breeze.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 space-y-4">
            {galleryItems.map((item) => (
              <Card
                key={item.id}
                onMouseEnter={() => setActiveItem(item)}
                className={cn(
                  "cursor-pointer transition-all duration-300 ease-in-out shadow-md",
                  activeItem.id === item.id 
                    ? "bg-accent text-accent-foreground ring-2 ring-accent" 
                    : "bg-card opacity-70 hover:shadow-xl" // Non-active items are dimmed
                )}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <item.icon className={cn(
                        "h-7 w-7 mr-3", 
                        activeItem.id === item.id ? "text-accent-foreground" : "text-accent"
                      )} 
                    />
                    <h3 className={cn(
                      "text-xl font-semibold flex items-center justify-between flex-grow",
                       activeItem.id === item.id ? "text-accent-foreground" : "text-foreground"
                    )}>
                      {item.title}
                      {activeItem.id === item.id && <ArrowRight className="h-5 w-5 transition-transform duration-300 transform" />}
                    </h3>
                  </div>
                  <p className={cn(
                     "text-sm",
                     activeItem.id === item.id ? "text-accent-foreground/80" : "text-foreground/70"
                  )}>
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="md:col-span-8 sticky top-24">
            <Card className="overflow-hidden shadow-xl">
              <div className="aspect-w-16 aspect-h-9 relative w-full h-[450px] md:h-[550px]">
                {galleryItems.map((item) => (
                  <Image
                    key={item.id}
                    src={item.imageUrl}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={item.imageHint}
                    className={cn(
                      "transition-opacity duration-500 ease-in-out",
                      activeItem.id === item.id ? "opacity-100" : "opacity-0"
                    )}
                    priority={item.id === galleryItems[0].id} // Prioritize loading the first image
                  />
                ))}
              </div>
            </Card>
             <p className="mt-2 text-sm text-center text-foreground/60">
                Currently viewing: <span className="font-semibold text-accent">{activeItem.title}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
