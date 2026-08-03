'use client';

import React, { useState, useEffect } from 'react';

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else if (consent === 'accepted') {
      loadAnalytics();
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
    loadAnalytics();
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
  };

  const loadAnalytics = () => {
    // 1. Load Google Analytics
    if (!window.gtag) {
      const gaScript = document.createElement('script');
      gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-SEO_PLAY_M3';
      gaScript.async = true;
      document.head.appendChild(gaScript);

      window.dataLayer = window.dataLayer || [];
      const gtag = function (...args: unknown[]) {
        window.dataLayer?.push(args);
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.gtag = gtag;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      gtag('js', new Date());
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      gtag('config', 'G-SEO_PLAY_M3', { page_path: window.location.pathname });
    }

    // 2. Load Microsoft Clarity
    if (!window.clarity) {
      const clarityScript = document.createElement('script');
      clarityScript.type = 'text/javascript';
      clarityScript.async = true;
      clarityScript.innerHTML = `
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "clarity_seo_id");
      `;
      document.head.appendChild(clarityScript);
    }
  };

  if (!showBanner) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 md:left-auto md:max-w-md bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl z-50 space-y-4 animate-in slide-in-from-bottom duration-300"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      <div className="space-y-1">
        <h2 id="cookie-consent-title" className="text-base font-black text-slate-100">
          Cookie Consent
        </h2>
        <p id="cookie-consent-desc" className="text-xs text-slate-400 leading-relaxed">
          We use cookies to measure game progress, analyze math performance levels, and understand where our traffic comes from via Google Analytics & Microsoft Clarity.
        </p>
      </div>
      <div className="flex items-center justify-end gap-3 text-xs font-bold">
        <button
          onClick={declineCookies}
          className="text-slate-400 hover:text-slate-200 px-3 py-2 rounded-lg transition-colors"
        >
          Decline
        </button>
        <button
          onClick={acceptCookies}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Accept All
        </button>
      </div>
    </div>
  );
}
