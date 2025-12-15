export type ConsentState = {
  v: number;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  ts: string;
};

export const CONSENT_COOKIE = 'invest_consent';
export const CONSENT_VERSION = 1;

export function defaultConsent(): ConsentState {
  return {
    v: CONSENT_VERSION,
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
    ts: new Date().toISOString(),
  };
}