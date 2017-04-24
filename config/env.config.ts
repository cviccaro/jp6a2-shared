export interface EnvConfig {
  API: string;
  desktopWidth: number;
  GoogleMapsAPIKey: string;
  GoogleAnalyticsAPIKey?: string;
  GoogleRecaptchaAPIKey?: string;
  ENV?: string;
  division?: string;
  siteTitle?: string;
}

export const Config: EnvConfig = JSON.parse('<%= ENV_CONFIG %>');
