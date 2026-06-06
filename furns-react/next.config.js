/** @type {import('next').NextConfig} */
const allowInsecureKeycloak = process.env.NEXT_PUBLIC_ALLOW_INSECURE_KEYCLOAK === "true";

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: https:${allowInsecureKeycloak ? " http:" : ""}`,
  "font-src 'self' data:",
  `connect-src 'self' https:${allowInsecureKeycloak ? " http:" : ""}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(!allowInsecureKeycloak ? ["upgrade-insecure-requests"] : []),
].join("; ");

const nextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
    },
  },
  async headers() {
    const headers = [
      {
        key: "Content-Security-Policy",
        value: contentSecurityPolicy,
      },
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "X-Frame-Options",
        value: "DENY",
      },
      {
        key: "Permissions-Policy",
        value:
          "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()",
      },
      {
        key: "Cross-Origin-Embedder-Policy",
        value: "credentialless",
      },
      {
        key: "Cross-Origin-Opener-Policy",
        value: "same-origin",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
    ];

    if (!allowInsecureKeycloak) {
      headers.push({
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      });
    }

    return [
      {
        source: "/:path*",
        headers,
      },
    ];
  },
};

module.exports = nextConfig;
