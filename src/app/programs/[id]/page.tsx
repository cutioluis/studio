import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ModuleExplorer } from "@/components/programs/module-explorer";
import { siteConfig } from "@/config/site";
import { getCareerBySlug, getCareers } from "@/features/catalog/infrastructure/catalog-repository";
import { JsonLd } from "@/components/utils/json-ld";
import { breadcrumbJsonLd, courseJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

const ROSE_GRADIENT = "bg-gradient-to-r from-primary to-primary-deep";
const BENEFICIOS = ["Acceso de por vida", "Certificado incluido", "Garantía de satisfacción"];

type Props = { params: Promise<{ id: string }> };

// Hourly ISR. Slugs that were not prerendered are generated on demand; unknown ones 404 through notFound().
export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getCareers()).map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const programa = await getCareerBySlug((await params).id);
  if (!programa) return {};

  return {
    title: `${programa.nombre} en Quito`,
    description: `${programa.descripcion} Duración: ${programa.duracion}.`,
    alternates: { canonical: `/programs/${programa.id}` },
    openGraph: {
      title: `${programa.nombre} en Quito | ${siteConfig.name}`,
      description: programa.descripcion,
      url: `/programs/${programa.id}`,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [{ url: siteConfig.ogImage, alt: programa.nombre }],
    },
  };
}

export default async function ProgramPage({ params }: Props) {
  const programa = await getCareerBySlug((await params).id);
  if (!programa) notFound();

  return (
    <>
      <JsonLd
        data={[
          courseJsonLd(programa),
          breadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: programa.nombre, path: `/programs/${programa.id}` },
          ]),
        ]}
      />
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-white/[0.08] bg-card">
          <div className="container mx-auto max-w-screen-xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
            <Link
              href="/#features"
              className="mb-6 inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/[0.05] hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Link>
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">{programa.nombre}</h1>
              <p className="text-lg text-muted-foreground">Duración: {programa.duracion}</p>
              <div className={cn("h-px w-24", ROSE_GRADIENT)} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-screen-xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            <ModuleExplorer modulos={programa.modulos}>
              {programa.areas && programa.areas.length > 0 && (
                <div className="mt-8 border-t border-white/[0.08] pt-8">
                  <h3 className="mb-4 text-base font-bold text-white">Áreas Cubiertas</h3>
                  <div className="flex flex-wrap gap-2">
                    {programa.areas.map((area) => (
                      <span
                        key={area}
                        className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </ModuleExplorer>

            {/* Inscripción */}
            <div className="lg:col-span-1">
              <Card className="overflow-hidden border border-primary-deep/30 bg-card">
                <div className={cn("h-px w-full", ROSE_GRADIENT)} />
                <CardContent className="space-y-6 p-6">
                  <div>
                    <h3 className="text-lg font-semibold leading-snug text-white">{programa.nombre}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Acceso completo al programa</p>
                  </div>

                  <div className="space-y-3 border-t border-white/[0.08] pt-5 text-sm">
                    <div>
                      <p className="text-muted-foreground">Cupos limitados</p>
                      <p className="font-semibold text-white">Disponibles</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duración</p>
                      <p className="font-semibold text-white">{programa.duracion}</p>
                    </div>
                  </div>

                  <Link
                    href={`/inscripcion?carrera=${programa.id}`}
                    className={cn(
                      "block w-full rounded-lg px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90",
                      ROSE_GRADIENT
                    )}
                  >
                    Inscribirse Ahora
                  </Link>

                  <ul className="space-y-2 border-t border-white/[0.08] pt-5 text-xs text-muted-foreground">
                    {BENEFICIOS.map((beneficio) => (
                      <li key={beneficio} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
                        {beneficio}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
