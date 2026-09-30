/**
 * Métricas do portfólio.
 *
 * Nenhum número é inventado aqui. Enquanto não houver uma fonte de dados
 * conectada, `carregarMetricas()` devolve `null` e a interface mostra o
 * estado de "aguardando integração". Contador local não vira métrica: um
 * número guardado no navegador do visitante não mede audiência nenhuma.
 */

export interface Metrica {
  id: string;
  titulo: string;
  /** O que exatamente este número conta. */
  significado: string;
  /** O que ele NÃO prova — para não ler mais do que o dado permite. */
  limite?: string;
}

/** Período coberto pelos números, quando houver fonte conectada. */
export const PERIODO = "últimos 30 dias";

export const metricas: Metrica[] = [
  {
    id: "acessos",
    titulo: "Acessos",
    significado:
      "Visitas ao site no período, contadas por sessão e não por pessoa.",
  },
  {
    id: "cliques",
    titulo: "Cliques em links e ações",
    significado:
      "Cliques em botões e links do site, separados por destino.",
  },
  {
    id: "tempo",
    titulo: "Tempo médio na página",
    significado:
      "Quanto tempo a aba ficou aberta e ativa, em média, por visita.",
    limite: "Aba aberta não significa leitura.",
  },
  {
    id: "interesse",
    titulo: "Interesse nos projetos",
    significado:
      "Aberturas de páginas de case e cliques em “Visitar o site”.",
  },
  {
    id: "whatsapp_clique",
    titulo: "Cliques no botão de WhatsApp",
    significado: "Quantas vezes o botão de conversa foi acionado.",
    limite: "É um clique, não uma conversa iniciada.",
  },
  {
    id: "whatsapp_abertura",
    titulo: "Aberturas do WhatsApp",
    significado:
      "Cliques que chegaram a sair do site em direção ao WhatsApp.",
    limite:
      "O site não consegue confirmar se a mensagem foi enviada nem se virou contratação — isso acontece fora dele.",
  },
];

export type ValoresMetricas = Record<string, string>;

/**
 * Fonte de dados. Retorna `null` enquanto nenhuma integração estiver
 * configurada — é o que mantém o painel honesto.
 */
export async function carregarMetricas(): Promise<ValoresMetricas | null> {
  return null;
}

/**
 * Único ponto de instrumentação do site. Hoje não envia nada a lugar nenhum;
 * quando uma ferramenta de analytics for ligada, é só aqui que ela entra.
 */
export function registrarEvento(id: string, dados?: Record<string, string>) {
  /* Sem coleta ativa: nada sai daqui enquanto não houver integração.
     Os argumentos ficam na assinatura porque é este o contrato que a
     ferramenta de analytics vai receber quando for ligada. */
  void id;
  void dados;
}
