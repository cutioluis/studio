'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';

const CALENDLY_CSS = 'https://assets.calendly.com/assets/external/widget.css';

// The checkout form needs the whole viewport, so the floating badge is hidden there.
const HIDDEN_PATH_PREFIX = '/inscripcion';
const HIDE_ATTRIBUTE = 'data-hide-calendly-badge';

// Loads Calendly (script + styles) after the page is idle so it never blocks first render.
// The badge is initialized once and only hidden with CSS: Calendly keeps references to its DOM,
// so removing or re-initializing it on client navigation throws inside its script.
export default function CalendlyWidget() {
  const pathname = usePathname();
  const hidden = pathname.startsWith(HIDDEN_PATH_PREFIX);

  useEffect(() => {
    document.body.toggleAttribute(HIDE_ATTRIBUTE, hidden);
  }, [hidden]);

  const handleLoad = () => {
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = CALENDLY_CSS;
    document.head.appendChild(stylesheet);

    window.Calendly?.initBadgeWidget({
      url: siteConfig.calendlyUrl,
      text: '💅 Agendar sesión gratuita ahora',
      color: '#ffbdfb',
      textColor: '#1a1a1a',
      branding: true,
    });
  };

  return <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" onLoad={handleLoad} />;
}
