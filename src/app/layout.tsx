import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Oussama Abassi — Expert IA & Automatisation B2B",
    template: "%s | Oussama Abassi",
  },
  description:
    "Développeur spécialisé IA et automatisation. Je transforme vos processus manuels en workflows automatisés. Lead Hunter, ROI Calculator, Workflow Builder — testez en direct.",
  keywords: [
    "automatisation B2B", "expert IA", "n8n", "développeur freelance",
    "lead generation automatique", "workflow automatisé", "OpenAI",
    "Make", "Python automatisation", "Oussama Abassi",
  ],
  authors: [{ name: "Oussama Abassi", url: "https://oussama.dev" }],
  creator: "Oussama Abassi",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website", locale: "fr_FR",
    url: "https://oussama-hq.vercel.app", siteName: "Oussama HQ",
    title: "Oussama Abassi — Expert IA & Automatisation B2B",
    description: "Testez mes outils IA en direct : Lead Hunter, ROI Calculator, Workflow Builder. Pas un portfolio — un laboratoire.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Oussama HQ — Expert IA & Automatisation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oussama Abassi — Expert IA & Automatisation B2B",
    description: "Testez mes outils IA en direct. Lead Hunter, ROI Calculator, Workflow Builder.",
    images: ["/og-image.png"],
  },
};

/* ── Viewport séparé (Next.js 14+) ──────────────────────── */
export const viewport: Viewport = {
  width:        "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor:   "#00ffc8",
};

import { LangProvider } from "@/lib/LangContext";
import GlobalUI from "@/components/ui/GlobalUI";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          defer
          data-domain="oussama-hq.vercel.app"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body>
        <LangProvider>
          {children}
          <GlobalUI />
        </LangProvider>
      </body>
    </html>
  );
}
