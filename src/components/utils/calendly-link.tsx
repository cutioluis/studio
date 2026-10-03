"use client";

import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";

export function CalendlyLink({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() =>
        window.Calendly?.initPopupWidget({
          url: `${siteConfig.calendlyUrl}?background_color=000000&text_color=f6b5e9`,
        })
      }
    >
      {children}
    </button>
  );
}
