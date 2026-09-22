import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Brand } from "./Header";
import { LineReveal, Reveal } from "./Motion";
import { BackToTop } from "./BackToTop";
import { SpotlightCard } from "./SpotlightCard";
import { CursorCta } from "./CursorCta";

export function CTA() {
  return (
    <section
      className="cta-wrap container"
      aria-labelledby="cta-title"
      data-tone="cta"
    >
      <Reveal variant="scale" duration={0.9} amount={0.3}>
        <SpotlightCard as="div" className="cta">
          <div className="cta-ring r1" aria-hidden="true" />
          <div className="cta-ring r2" aria-hidden="true" />
          <div className="cta-ring r3" aria-hidden="true" />
          <div className="eyebrow">Seu próximo projeto começa aqui</div>
          <LineReveal
            as="h2"
            className="cta-title"
            delay={0.15}
            lines={[
              "Vamos construir",
              <span className="gradient-text" key="g">
                algo juntos?
              </span>,
            ]}
          />
          <span id="cta-title" className="visually-hidden">
            Vamos construir algo juntos?
          </span>
          <Reveal variant="up" delay={0.35}>
            <p>
              Se você possui uma ideia, processo ou problema que poderia ser
              resolvido com tecnologia, queremos conhecê-lo.
            </p>
          </Reveal>
          {/* CTA única: selo que segue o cursor (desktop) / botão estático (toque) */}
          <CursorCta href="/contato" label={"Falar\nconosco"} />
        </SpotlightCard>
      </Reveal>
    </section>
  );
}

export function Footer() {
  const social = [
    ["GitHub", siteConfig.github],
    ["LinkedIn", siteConfig.linkedin],
    ["Instagram", siteConfig.instagram],
    ["E-mail", siteConfig.email ? `mailto:${siteConfig.email}` : ""],
  ].filter(([, url]) => url);
  const nav = [
    ["Projetos", "/projetos"],
    ["Serviços", "/servicos"],
    ["Sobre", "/sobre"],
    ["Contato", "/contato"],
  ];
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-col">
            <Brand />
            <p>{siteConfig.slogan}</p>
          </div>
          <div className="footer-col">
            <h4>Navegação</h4>
            <nav aria-label="Navegação do rodapé">
              {nav.map(([text, url]) => (
                <Link key={url} href={url}>
                  <ArrowRight size={14} />
                  {text}
                </Link>
              ))}
            </nav>
          </div>
          <div className="footer-col">
            <h4>Contato</h4>
            <nav aria-label="Canais de contato">
              {social.length > 0 ? (
                social.map(([text, url]) => (
                  <a
                    key={text}
                    href={url}
                    target={url.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                  >
                    <ArrowRight size={14} />
                    {text}
                  </a>
                ))
              ) : (
                <Link href="/contato">
                  <ArrowRight size={14} />
                  Formulário de contato
                </Link>
              )}
            </nav>
          </div>
        </div>
        <Reveal variant="mask" duration={1.2} amount={0.4}>
          <div className="footer-wordmark" aria-hidden="true">
            {siteConfig.name}
          </div>
        </Reveal>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos
            reservados.
          </span>
          <span>Feito com intenção. Construído com tecnologia.</span>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
