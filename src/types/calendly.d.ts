interface CalendlyApi {
  initPopupWidget(options: { url: string }): void;
  initBadgeWidget(options: {
    url: string;
    text: string;
    color: string;
    textColor: string;
    branding: boolean;
  }): void;
}

interface Window {
  Calendly?: CalendlyApi;
}
