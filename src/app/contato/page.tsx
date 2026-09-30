import { Suspense } from "react";
import type { Metadata } from "next";
import { ContactCta } from "@/components/ContactCta";
import { LineReveal, Reveal } from "@/components/Motion";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Conte sobre sua ideia ou problema. Vamos conversar sobre como transformá-lo em uma solução.",
};

export default function ContactPage() {
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
            transformá-lo em uma solução. Sem formulário e sem espera: a
            conversa começa direto no WhatsApp.
          </p>
        </Reveal>
      </section>
      <Reveal
        variant="right"
        delay={0.3}
        duration={0.9}
        className="contact-card-wrap"
      >
        <Suspense fallback={<div className="contact-card" aria-hidden="true" />}>
          <ContactCta />
        </Suspense>
      </Reveal>
      <Reveal variant="up" delay={0.6} className="contact-tip-wrap">
        <div className="contact-tip">
          <span className="eyebrow">Não precisa ter tudo definido.</span>
          <p>
            Uma boa conversa já é um começo. Compartilhe o contexto, as
            dificuldades e o que você gostaria de mudar.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
