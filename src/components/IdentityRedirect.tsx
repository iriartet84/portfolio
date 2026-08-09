"use client";

import Script from "next/script";

// Netlify sends invite/confirmation emails linking to "/#invite_token=..." on
// the site root. This forwards that token into the CMS admin panel so the
// login/signup flow completes correctly.
export default function IdentityRedirect() {
  return (
    <Script
      src="https://identity.netlify.com/v1/netlify-identity-widget.js"
      strategy="afterInteractive"
      onLoad={() => {
        const w = window as unknown as {
          netlifyIdentity?: { on: (event: string, cb: (user?: unknown) => void) => void };
        };
        if (w.netlifyIdentity) {
          w.netlifyIdentity.on("init", (user) => {
            if (!user && window.location.hash.includes("token")) {
              window.location.href = "/admin/" + window.location.hash;
            }
          });
        }
      }}
    />
  );
}
