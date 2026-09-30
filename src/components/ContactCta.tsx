"use client";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { linkWhatsApp, mensagemWhatsApp, numeroDaVez } from "@/lib/contact";
import { useOrigem } from "@/lib/origem";
import { Button } from "./Button";

/**
 * Convite direto à conversa, sem backend: o visitante sai daqui com o
 * WhatsApp aberto e a primeira mensagem já escrita — ele ainda envia.
 */
export function ContactCta() {
  const params = useSearchParams();
  const continuando = useOrigem() === "whatsapp";
  const tipo = params.get("tipo");

  const numero = numeroDaVez(continuando);
  const href = linkWhatsApp(numero, mensagemWhatsApp(tipo, continuando));
  const email = siteConfig.email;

  return (
    <aside className="contact-card" aria-labelledby="contato-conversa">
      <div className="eyebrow">Conversa direta</div>
      <h2 id="contato-conversa">
        Sem formulário. <span className="gradient-text">Só conversa.</span>
      </h2>
      <p>
        {continuando
          ? "Seguimos por onde paramos: a mensagem já vai escrita, é só enviar."
          : "A mensagem já aparece escrita no seu WhatsApp. Você revisa, ajusta se quiser e envia."}
      </p>

      {href ? (
        <Button href={href} external large className="contact-card-cta">
          {continuando
            ? "Continuar nossa conversa no WhatsApp"
            : "Conversar sobre meu projeto"}
        </Button>
      ) : (
        /* Sem número configurado não existe botão: melhor faltar do que levar
           a lugar nenhum. Defina `whatsapp` em src/config/site.ts. */
        <p className="contact-card-vazio" role="status">
          O WhatsApp ainda não está configurado neste site.
        </p>
      )}

      {email && (
        <a className="contact-card-alt" href={`mailto:${email}`}>
          <Mail size={17} aria-hidden="true" />
          <span>Prefere e-mail? {email}</span>
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      )}

    </aside>
  );
}
