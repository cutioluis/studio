import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { formatMoney } from "../domain/format";

export function SuccessPanel({ code, amount }: { code: string; amount: number }) {
  return (
    <section
      aria-labelledby="success-heading"
      className="flex flex-col gap-6 rounded-2xl border border-primary-deep/30 bg-card p-6"
    >
      <div className="flex flex-col gap-2">
        <CheckCircle2 aria-hidden className="h-8 w-8 text-primary" />
        <h2 id="success-heading" className="text-balance text-2xl font-bold tracking-tight text-white">
          Recibimos tu comprobante
        </h2>
        <p className="max-w-[65ch] leading-relaxed text-muted-foreground">
          Lo revisaremos y te confirmaremos tu cupo por WhatsApp.
        </p>
      </div>

      <dl className="flex flex-wrap gap-x-10 gap-y-4">
        <div className="flex flex-col gap-1">
          <dt className="text-sm text-muted-foreground">Código de inscripción</dt>
          <dd className="text-3xl font-bold tabular-nums tracking-wide text-primary">{code}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-sm text-muted-foreground">Monto transferido</dt>
          <dd className="text-3xl font-bold tabular-nums text-white">{formatMoney(amount)}</dd>
        </div>
      </dl>

      <div className="flex flex-wrap gap-3">
        <Button asChild size="lg">
          <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
            Escribir por WhatsApp
          </a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </section>
  );
}
