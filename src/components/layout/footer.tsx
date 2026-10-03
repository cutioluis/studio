import Link from "next/link";
import { CalendarDays, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";

import { Logo } from "@/components/logo";
import { siteConfig, socialLinks } from "@/config/site";

type IconComponent = (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;

const FacebookIcon: IconComponent = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon: IconComponent = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TikTokIcon: IconComponent = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.1.03-4.15-.5-5.72-1.84A7.53 7.53 0 0 1 3 18.7c.01-2.18.01-4.36.01-6.54C3 11.66 3.01 11.2 3.12 10.72c.14-.64.42-1.24.8-1.77.4-.52.9-.96 1.46-1.32.59-.38 1.23-.69 1.9-.9.02-1.54.01-3.08.01-4.63.45-.26.9-.49 1.38-.69.45-.19.93-.32 1.4-.41.03-.98.03-1.96.02-2.94z" />
  </svg>
);

const socialIcons: Record<string, IconComponent> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
};

const navLinks = [
  { href: "/#features", label: "Cursos y carreras" },
  { href: "/#instructor", label: "Tu equipo" },
  { href: "/#schedule", label: "Horarios" },
  { href: "/#location", label: "Ubicación" },
  { href: "/blog", label: "Blog" },
];

type ContactItem = {
  icon: LucideIcon;
  label: string;
  href?: string;
  external?: boolean;
};

// "+593979390630" -> "+593 97 939 0630"
const formatPhone = (phone: string) =>
  phone.replace(/^(\+\d{3})(\d{2})(\d{3})(\d{4})$/, "$1 $2 $3 $4");

const { address } = siteConfig;

const contactItems: ContactItem[] = [
  { icon: MessageCircle, label: "Escríbenos por WhatsApp", href: siteConfig.whatsappUrl, external: true },
  { icon: Phone, label: formatPhone(siteConfig.telephone), href: `tel:${siteConfig.telephone}` },
  { icon: CalendarDays, label: "Agenda una visita", href: siteConfig.calendlyUrl, external: true },
  { icon: MapPin, label: `${address.addressLocality}, ${address.addressRegion} · Ecuador` },
];

const linkClass =
  "rounded-sm text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <nav aria-label={title} className="flex min-w-0 grow basis-44 flex-col gap-4">
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{title}</h2>
      {children}
    </nav>
  );
}

function ContactEntry({ icon: Icon, label, href, external }: ContactItem) {
  const content = (
    <>
      <Icon className="h-4 w-4 shrink-0 text-primary/80" aria-hidden="true" />
      <span>{label}</span>
    </>
  );

  if (!href) {
    return <span className="flex items-center gap-3 text-sm text-muted-foreground">{content}</span>;
  }

  return (
    <a
      href={href}
      className={`flex items-center gap-3 ${linkClass}`}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {content}
    </a>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-card/40">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
      />

      <div className="container mx-auto flex max-w-screen-2xl flex-col gap-12 px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-x-16 gap-y-12">
          <section className="flex min-w-0 grow-[2] basis-72 flex-col gap-5">
            <Logo className="self-start" />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Academia de belleza en {address.addressLocality}. Uñas, pestañas, maquillaje, colorimetría,
              barbería y emprendimiento con práctica real y certificación.
            </p>

            {socialLinks.length > 0 && (
              <ul className="flex gap-3">
                {socialLinks.map(({ network, url }) => {
                  const Icon = socialIcons[network];
                  return (
                    <li key={network}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={network}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          <FooterColumn title="Explora">
            <ul className="flex flex-col gap-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Contacto">
            <ul className="flex flex-col gap-3">
              {contactItems.map((item) => (
                <li key={item.label}>
                  <ContactEntry {...item} />
                </li>
              ))}
            </ul>
          </FooterColumn>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border pt-6 text-xs text-muted-foreground">
          <p>
            &copy; {currentYear} {siteConfig.name}. Todos los derechos reservados.
          </p>
          <p>Hecho con dedicación en {address.addressLocality}, Ecuador.</p>
        </div>
      </div>
    </footer>
  );
}
