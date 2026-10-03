import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { EnrollmentCheckout } from "@/features/enrollment/components/enrollment-checkout";
import type { BankAccount, Career } from "@/features/enrollment/domain/types";
import { getActiveBankAccounts, getEnrollmentCatalog } from "@/features/enrollment/infrastructure/enrollment-repository";
import { safeError } from "@/lib/log-error";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const DESCRIPTION = `Inscríbete en ${siteConfig.name}: elige tu carrera y horario, completa tus datos y reserva tu cupo con una transferencia.`;

export const metadata: Metadata = {
  title: "Inscripción",
  description: DESCRIPTION,
  alternates: { canonical: "/inscripcion" },
  robots: { index: false, follow: true },
};

type Props = { searchParams: Promise<{ modalidad?: string | string[]; carrera?: string | string[] }> };

async function loadData(): Promise<{ careers: Career[]; accounts: BankAccount[] } | null> {
  if (!isSupabaseConfigured()) {
    console.error("[enrollment] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set; enrollment is unavailable.");
    return null;
  }
  try {
    const [careers, accounts] = await Promise.all([getEnrollmentCatalog(), getActiveBankAccounts()]);
    return careers.length > 0 && accounts.length > 0 ? { careers, accounts } : null;
  } catch (error) {
    console.error("[enrollment] could not load the enrollment catalog", safeError(error));
    return null;
  }
}

export default async function EnrollmentPage({ searchParams }: Props) {
  const params = await searchParams;
  const first = (value?: string | string[]) => (Array.isArray(value) ? value[0] : value);
  const data = await loadData();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 md:py-14">
          <header className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold tracking-tight text-white">Inscripción</h1>
            <p className="text-sm text-muted-foreground">Reserva tu cupo en 4 pasos.</p>
          </header>

          {data ? (
            <EnrollmentCheckout
              careers={data.careers}
              accounts={data.accounts}
              initialModalityId={first(params.modalidad)}
              initialCareerSlug={first(params.carrera)}
            />
          ) : (
            <section className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
              <h2 className="text-balance text-2xl font-bold text-white">Las inscripciones no están disponibles por ahora</h2>
              <p className="max-w-[65ch] leading-relaxed text-muted-foreground">
                No pudimos cargar el formulario de inscripción. Inténtalo de nuevo en unos minutos o escríbenos por WhatsApp y
                te ayudamos a reservar tu cupo.
              </p>
              <div>
                <Button asChild size="lg">
                  <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                    Escribir por WhatsApp
                  </a>
                </Button>
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
