import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "João Baran",
};

// Roda antes da hidratação para marcar <html> sem piscar o título do hero:
// sem isto, as letras apareceriam prontas e só depois seriam escondidas para digitar.
const HERO_TYPING_INIT_SCRIPT = `
(function () {
  try {
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    document.documentElement.classList.add("jb-js");
    if (sessionStorage.getItem("jb-hero-typed") === "1") {
      document.documentElement.classList.add("jb-js-played");
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <body>
        <Script id="jb-hero-typing-init" strategy="beforeInteractive">
          {HERO_TYPING_INIT_SCRIPT}
        </Script>
        <a className="skip-link" href="#main-content">
          Pular para o conteúdo
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
