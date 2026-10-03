
import WhatsAppIcon from "@/components/icons/whatsapp-icon";
import { siteConfig } from "@/config/site";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { IconSwap, ShineSweep } from "@/components/ui/button-effects";

export function CallToActionSection() {
  return (
    <section id="cta" className="py-16 md:py-24 bg-primary text-primary-foreground transition-all duration-500 ease-in-out">
      <RevealGroup className="container mx-auto max-w-screen-md px-4 sm:px-6 lg:px-8 text-center">
        <RevealItem variant="text">
          <h2 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
            ¿Lista para Transformar tu Pasión por la Belleza en tu Profesión?
          </h2>
        </RevealItem>
        <RevealItem variant="text">
          <p className="mt-6 max-w-xl mx-auto text-lg sm:text-xl opacity-90">
            No esperes más para convertir tu amor por las uñas, pestañas y el maquillaje en una carrera lucrativa. ¡Inscríbete hoy mismo y da el primer paso hacia tu futuro como experta en belleza certificada!
          </p>
        </RevealItem>
        <RevealItem variant="text" className="mt-10">
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-background py-2 pl-7 pr-2 text-base font-semibold text-foreground shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_50px_-12px_rgba(0,0,0,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:text-lg"
          >
            <ShineSweep className="via-white/15" />
            <span className="relative">Inscríbete por WhatsApp</span>
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors duration-500 group-hover/btn:bg-primary-deep">
              <IconSwap icon={<WhatsAppIcon className="h-full w-full" />} className="h-5 w-5" />
            </span>
          </a>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
