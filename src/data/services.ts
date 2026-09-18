import type { ProcessStep, Service } from "@/types/content";

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
