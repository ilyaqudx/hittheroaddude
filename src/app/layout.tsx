import type { Metadata, Viewport } from 'next';
import { siteConfig } from '../../site.config';
import { generateSchema } from '../lib/schema';
import { domTranslationGuardScript } from '../lib/dom-guard';
import { AuthProvider } from '../lib/auth-context';
import { Toaster } from 'sonner';
import './globals.css';

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
};

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  metadataBase: new URL(`https://${siteConfig.domain}`),
  alternates: {
    canonical: `https://${siteConfig.domain}`,
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: `https://${siteConfig.domain}`,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { websiteSchema, softwareSchema, faqSchema } = generateSchema();

  return (
    <html lang="en" className="dark">
      <head>
        {/* DOM translation guard to prevent Google Translate React crash */}
        <script dangerouslySetInnerHTML={{ __html: domTranslationGuardScript }} />
        {/* Google Identity Services for Google Login */}
        <script src="https://accounts.google.com/gsi/client" async defer></script>
        {/* Schema.org JSON-LD Injections for Google SERP Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="min-h-screen bg-[#090b0c] text-white flex flex-col antialiased">
        <AuthProvider>
          <Toaster richColors position="top-center" theme="dark" closeButton />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
