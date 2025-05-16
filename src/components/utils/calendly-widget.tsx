// src/components/utils/calendly-widget.tsx
'use client';

import Script from 'next/script';
import type { FC } from 'react';

const CalendlyWidget: FC = () => {
  return (
    <Script
      src="https://assets.calendly.com/assets/external/widget.js"
      strategy="lazyOnload"
      onLoad={() => {
        // @ts-ignore // Calendly is loaded globally
        if (typeof Calendly !== 'undefined') {
          // @ts-ignore
          Calendly.initBadgeWidget({
            url: 'https://calendly.com/cutioluis',
            text: '💅 Agendar sesión gratuita ahora',
            color: '#ffbdfb',
            textColor: '#1a1a1a',
            branding: true
          });
        }
      }}
    />
  );
};

export default CalendlyWidget;
