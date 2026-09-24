// Next.js App Router: helios-solar-beige, nativa-arquitetura, reis-lazer, prospectlife
// 1) copie back-to-portfolio.js para public/
// 2) em app/layout.tsx, adicione o import e o <Script> no fim do <body>
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Script
          src="/back-to-portfolio.js"
          strategy="afterInteractive"
          data-portfolio="https://SEU-PORTFOLIO"
        />
      </body>
    </html>
  );
}
