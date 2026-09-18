import { Suspense } from "react";
import type { Metadata } from "next";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { LineReveal, Reveal } from "@/components/Motion";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Conte sobre sua ideia ou problema. Vamos conversar sobre como transformá-lo em uma solução.",
};

export default function ContactPage() {
  const whatsapp = siteConfig.whatsapp.replace(/\D/g, "");
  return (
    <div className="container contact-page">
      <div className="page-glow" aria-hidden="true" />
      <section className="contact-intro">
        <Reveal variant="fade">
          <div className="eyebrow">Contato / O primeiro passo</div>
        </Reveal>
        <LineReveal
          as="h1"
          inView={false}
          delay={0.1}
          lines={[
            "Tem uma ideia",
            "ou problema",
            <span className="gradient-text" key="g">
              para resolver?
            </span>,
          ]}
        />
        <Reveal variant="up" delay={0.4}>
          <p>
            Conte um pouco sobre o projeto e podemos conversar sobre como
            transformá-lo em uma solução.
          </p>
        </Reveal>
        {(siteConfig.email || siteConfig.whatsapp) && (
          <Reveal variant="up" delay={0.5}>
            <div className="contact-methods">
              {siteConfig.email && (
                <a href={`mailto:${siteConfig.email}`}>
                  <Mail size={20} />
                  <span>{siteConfig.email}</span>
                  <ArrowUpRight size={16} />
                </a>
              )}
              {siteConfig.whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={20} />
                  <span>Conversar pelo WhatsApp</span>
                  <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </Reveal>
        )}
        <Reveal variant="up" delay={0.6}>
          <div className="contact-tip">
            <span className="eyebrow">Não precisa ter tudo definido.</span>
            <p>
              Uma boa conversa já é um começo. Compartilhe o contexto, as
              dificuldades e o que você gostaria de mudar.
            </p>
          </div>
        </Reveal>
      </section>
      <Reveal variant="right" delay={0.3} duration={0.9}>
        <Suspense fallback={<p role="status">Carregando formulário…</p>}>
          <ContactForm />
        </Suspense>
      </Reveal>
    </div>
  );
}
