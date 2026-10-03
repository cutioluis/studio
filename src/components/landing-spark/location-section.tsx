
import { MapPin } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

export function LocationSection() {
  return (
    <section id="location" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
        <RevealGroup className="text-center mb-12 md:mb-16">
          <RevealItem variant="text">
            <MapPin className="h-12 w-12 mx-auto text-accent mb-4" />
          </RevealItem>
          <RevealItem variant="text">
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">
              Visita Nuestra <span className="text-accent">Academia de Belleza</span>
            </h2>
          </RevealItem>
          <RevealItem variant="text">
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70 sm:text-xl">
              Encuéntranos fácilmente y ven a conocer el lugar donde tu transformación y aprendizaje comienzan. ¡Te esperamos!
            </p>
          </RevealItem>
        </RevealGroup>
        <RevealGroup>
          <RevealItem className="relative aspect-square sm:aspect-[4/3] rounded-xl overflow-hidden shadow-2xl mx-auto max-w-3xl border-2 border-primary/20">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3989.805106055721!2d-78.49343192503541!3d-0.14746299985108308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMMKwMDgnNTAuOSJTIDc4wrAyOScyNy4xIlc!5e0!3m2!1ses!2sec!4v1789884167431!5m2!1ses!2sec"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              title="Ubicación de CECIGLAMBEAUTHY en Google Maps"
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
