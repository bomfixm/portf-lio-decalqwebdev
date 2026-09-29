import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { DM_Sans, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { siteConfig } from "@/config/site";
import { hexToRgbChannels } from "@/lib/color";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Background } from "@/components/Background";
import { CursorGlow } from "@/components/CursorGlow";
import { SmoothScroll } from "@/components/SmoothScroll";
import { IntroProvider } from "@/components/Intro";
import { ScrollMemory } from "@/components/ScrollMemory";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Soluções digitais`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      style={
        {
          "--accent": siteConfig.accent,
          "--accent-rgb": hexToRgbChannels(siteConfig.accent),
        } as CSSProperties
      }
    >
      <body>
        {/* Decide a intro antes da hidratação: o fundo da marca já é pintado
            na primeira renderização, então o Hero não pisca antes da cortina.
            O timer interno devolve a página mesmo que o React nunca monte. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;
if(location.pathname!=="/")return;
if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
if(sessionStorage.getItem("decalq:intro")==="1")return;
d.dataset.intro="play";
setTimeout(function(){if(d.dataset.intro==="play")d.dataset.intro="done"},5000)}catch(e){}})()`,
          }}
        />
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <IntroProvider>
          <SmoothScroll />
          <ScrollMemory />
          <Background />
          <CursorGlow />
          <Header />
          <main id="conteudo">{children}</main>
          <Footer />
        </IntroProvider>
      </body>
    </html>
  );
}
