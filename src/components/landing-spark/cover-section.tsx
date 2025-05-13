import { Button } from "@/components/ui/button";
import Image from "next/image";

export function CoverSection() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-accent/20 via-background to-background">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="md:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Ignite Your Ideas with <span className="text-accent">Landing Spark</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-foreground/80 sm:text-xl md:text-2xl md:mx-0 mx-auto">
              Beautifully crafted landing pages, designed to convert. Launch your next project with style and speed.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row sm:justify-center md:justify-start gap-4">
              <Button size="lg" className="text-lg px-8 py-4">
                Get Started Now
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-accent text-accent hover:bg-accent/10">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="https://picsum.photos/1200/900?random=hero"
              alt="Landing Spark illustrative image"
              layout="fill"
              objectFit="cover"
              data-ai-hint="modern abstract design"
              className="transform transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
