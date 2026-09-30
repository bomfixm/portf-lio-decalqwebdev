import { siteConfig } from "@/config/site";

/**
 * Único lugar que monta o contato. Trocar o número é mexer em
 * `siteConfig.whatsapp` (e, se houver, `whatsappProspeccao`) — nada aqui.
 */
export const projectTypes = [
  "Site",
  "Sistema Web",
  "Automação",
  "Dashboard",
  "Social Media",
  "Aplicativo",
  "IA",
  "Outro",
] as const;

export type ProjectType = (typeof projectTypes)[number];

/** `?tipo=` só entra na mensagem se for um dos tipos conhecidos: uma URL
 *  montada à mão não escreve texto arbitrário na conversa do visitante. */
function tipoValido(tipo: string | null): tipo is ProjectType {
  return !!tipo && (projectTypes as readonly string[]).includes(tipo);
}

export function mensagemWhatsApp(
  tipo: string | null,
  continuando: boolean,
): string {
  const assunto = tipoValido(tipo) ? ` de ${tipo}` : "";
  return continuando
    ? `Olá! Voltei pelo portfólio da ${siteConfig.name} para continuar nossa conversa sobre um projeto${assunto}.`
    : `Olá! Vi o portfólio da ${siteConfig.name} e gostaria de conversar sobre um projeto${assunto}.`;
}

/**
 * Devolve `null` quando não há número utilizável — assim a interface nunca
 * publica um botão quebrado; ela simplesmente não mostra o botão.
 */
export function linkWhatsApp(numero: string, mensagem: string): string | null {
  const digitos = numero.replace(/\D/g, "");
  // país (2) + DDD (2) + número (8 ou 9)
  if (digitos.length < 12 || digitos.length > 15) return null;
  return `https://wa.me/${digitos}?text=${encodeURIComponent(mensagem)}`;
}

/** Número para o botão: o da prospecção quando o visitante veio por ela. */
export function numeroDaVez(continuando: boolean): string {
  return (
    (continuando && siteConfig.whatsappProspeccao) || siteConfig.whatsapp || ""
  );
}
