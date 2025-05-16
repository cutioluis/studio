
import { MapPin } from "lucide-react";

export function LocationSection() {
  return (
    <section id="location" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <MapPin className="h-12 w-12 mx-auto text-accent mb-4" />
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">
            Visita Nuestro <span className="text-accent">Academia de Belleza</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70 sm:text-xl">
            Encuéntranos fácilmente y ven a conocer el lugar donde tu transformación y aprendizaje comienzan. ¡Te esperamos!
          </p>
        </div>
        <div className="aspect-w-16 aspect-h-9 md:aspect-w-4 md:aspect-h-3 rounded-xl overflow-hidden shadow-2xl mx-auto max-w-3xl border-2 border-primary/20">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d407.43816714918506!2d-78.49705003395705!3d-0.1236455400332018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d585bd9f5f1d97%3A0x77be16d3242c5687!2sCECIGLAMBEAUTHY!5e0!3m2!1ses!2sec!4v1747358437616!5m2!1ses!2sec"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de CECIGLAMBEAUTHY en Google Maps"
            className="absolute inset-0 w-full h-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
