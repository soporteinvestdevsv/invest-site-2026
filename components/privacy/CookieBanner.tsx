'use client';

import { useEffect, useState } from 'react';
import { CONSENT_COOKIE, defaultConsent } from '@/lib/privacy/consent';

function getCookie(name: string) {
  const m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return m ? decodeURIComponent(m[2]) : null;
}

function setCookie(name: string, value: string, maxAgeSeconds = 60 * 60 * 24 * 180) {
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${secure}`;
}

export default function CookieBanner({ locale }: { locale: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const existing = getCookie(CONSENT_COOKIE);
    setShow(!existing);
  }, []);

  if (!show) return null;

  const acceptAll = () => {
    const c = { ...defaultConsent(), analytics: true, marketing: true, preferences: true };
    setCookie(CONSENT_COOKIE, JSON.stringify(c));
    setShow(false);
  };

  const rejectAll = () => {
    const c = defaultConsent();
    setCookie(CONSENT_COOKIE, JSON.stringify(c));
    setShow(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        left: 16,
        right: 16,
        bottom: 16,
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        background: '#fff',
        padding: 16,
        maxWidth: 720,
        margin: '0 auto',
        boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
        zIndex: 50,
      }}
    >
      <strong>Cookies</strong>
      <p style={{ marginTop: 8 }}>
        We use cookies to improve the site experience. Manage preferences anytime.
        <span style={{ opacity: 0.7 }}> ({locale})</span>
      </p>
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button onClick={rejectAll}>Reject</button>
        <button onClick={acceptAll}>Accept</button>
      </div>
      {/* TODO: Replace buttons with shadcn Dialog + Buttons and add granular preferences */}
    </div>
  );
}
