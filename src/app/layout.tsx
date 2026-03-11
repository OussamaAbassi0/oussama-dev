import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oussama Abassi — Full-Stack Dev & Expert IA/Automatisation",
  description:
    "Pas un portfolio. Un laboratoire interactif. Testez mes automatisations IA en temps réel : Lead Hunter, Audit Machine, Workflow Pipeline.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
