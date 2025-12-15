'use client';

import { useEffect } from 'react';
import { CONSENT_COOKIE } from '@/lib/privacy/consent';

function getConsent(): any | null {
  const m = document.cookie.match(new RegExp('(^| )' + CONSENT_COOKIE + '=([^;]+)'));
  if (!m) return null;
  try { return JSON.parse(decodeURIComponent(m[2])); } catch { return null; }
}

export default function ConsentScripts() {
  useEffect(() => {
    const consent = getConsent();
    // TODO:
    // - If consent?.analytics === true, load analytics scripts (GA/GTM/etc.)
    // - If consent?.preferences === true, allow embeds (YouTube/Maps/etc.)
  }, []);

  return null;
}