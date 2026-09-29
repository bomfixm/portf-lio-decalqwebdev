import type {
  ProcessStep,
  Service,
  SocialMediaContent,
} from "@/types/content";

export const services = [
  {
    id: "web",
    icon: "Globe",
    title: "Desenvolvimento Web",
    description:
      "Sites, sistemas e plataformas que conectam sua marca às pessoas.",
    details:
      "Da arquitetura da informação à interface final, criamos experiências responsivas, acessíveis e fáceis de manter.",
  },
  {
    id: "social",
    icon: "Clapperboard",
    title: "Social Media",
    description:
      "Vídeos e posts com a mesma identidade que sua marca tem no site.",
    details:
      "Edição de vídeos curtos, criação de posts e carrosséis e adaptação de formatos para cada rede, mantendo consistência visual entre as peças.",
  },
  {
    id: "automation",
    icon: "Workflow",
    title: "Automação",
    description:
      "Menos tarefas repetitivas. Mais espaço para o trabalho que importa.",
    details:
      "Mapeamos rotinas, tratamos informações e conectamos ferramentas com fluxos claros e rastreáveis.",
  },
  {
    id: "custom",
    icon: "Layers3",
    title: "Sistemas Personalizados",
    description:
      "Ferramentas que se adaptam à maneira como sua operação funciona.",
    details:
      "Transformamos regras de negócio em interfaces e processos pensados para o contexto da sua equipe.",
  },
  {
    id: "data",
    icon: "ChartNoAxesCombined",
    title: "Dados & Dashboards",
    description:
      "Informações organizadas para enxergar melhor e decidir com contexto.",
    details:
      "Consolidamos fontes, padronizamos bases e desenhamos painéis em torno das perguntas que precisam de resposta.",
  },
  {
    id: "api",
    icon: "Braces",
    title: "Back-end & APIs",
    description: "A estrutura que conecta sistemas e sustenta suas aplicações.",
    details:
      "Desenvolvemos APIs, modelos de dados e integrações com atenção à validação, segurança e manutenção.",
  },
  {
    id: "ai",
    icon: "Sparkles",
    title: "Soluções com IA",
    description: "Inteligência artificial aplicada a necessidades específicas.",
    details:
      "Avaliamos onde a IA pode ajudar e criamos fluxos com revisão humana, limites claros e proteção das informações.",
  },
] as const satisfies readonly Service[];

/** Conteúdo editável da vitrine de social media. */
export const socialMedia: SocialMediaContent = {
  eyebrow: "Social media",
  title: "Sua marca também precisa funcionar bem",
  highlight: "fora do site.",
  description:
    "A mesma atenção que colocamos em uma interface vale para o feed: formato certo para cada rede, ritmo de edição e peças que continuam parecendo da mesma marca.",
  formats: [
    {
      id: "reels",
      label: "Reels, TikTok e Shorts",
      ratio: "9:16",
      description:
        "Edição de vídeos curtos: cortes, legendas, ritmo e finalização prontos para publicar.",
    },
    {
      id: "carrossel",
      label: "Carrossel",
      ratio: "4:5",
      description:
        "Sequências que explicam uma ideia por partes, com hierarquia clara do primeiro ao último quadro.",
    },
    {
      id: "post",
      label: "Post único",
      ratio: "1:1",
      description:
        "Peças diretas para avisos, lançamentos e comunicação institucional.",
    },
  ],
  deliverables: [
    "Edição de vídeos curtos para Reels, TikTok e Shorts",
    "Criação de posts e carrosséis",
    "Adaptação de conteúdo e formatos para cada rede",
    "Identidade visual e consistência entre as peças",
  ],
  disclaimer:
    "Peças conceituais, criadas para demonstrar formatos e acabamento. Não representam clientes, campanhas ou resultados reais.",
};

export const processSteps = [
  {
    title: "Entendimento",
    description: "Entendemos o problema, o objetivo e o contexto.",
  },
  {
    title: "Planejamento",
    description: "Definimos arquitetura, tecnologias e experiência.",
  },
  {
    title: "Desenvolvimento",
    description: "Transformamos o planejamento em uma solução funcional.",
  },
  {
    title: "Entrega",
    description: "Testamos, otimizamos e disponibilizamos o produto.",
  },
] satisfies ProcessStep[];
