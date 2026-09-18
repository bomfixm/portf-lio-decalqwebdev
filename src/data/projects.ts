import type { Project } from "@/types/project";
const media = (slug: string, title: string) => ({
  cover: `/projects/${slug}/cover.webp`,
  gallery: [
    {
      src: `/projects/${slug}/cover.webp`,
      alt: `${title}: visão geral da interface conceitual`,
      width: 1200,
      height: 780,
    },
    {
      src: `/projects/${slug}/screenshot-01.webp`,
      alt: `${title}: tela de detalhes ilustrativa`,
      width: 1200,
      height: 780,
    },
    {
      src: `/projects/${slug}/mobile.webp`,
      alt: `${title}: composição de interface móvel`,
      width: 430,
      height: 820,
    },
  ],
});
export const projects: Project[] = [
  {
    id: "01",
    slug: "sistema-web",
    title: "Sistema Web",
    label: "Workspace",
    shortDescription: "Processos organizados. Equipes conectadas.",
    fullDescription:
      "Conceito de um sistema corporativo que reúne processos, responsáveis e tarefas em um único ambiente. Este case demonstra uma abordagem de desenvolvimento e uma interface de referência; não representa um produto entregue a um cliente.",
    category: "Web",
    tags: ["React", "Python", "Back-end"],
    year: 2026,
    featured: true,
    demo: true,
    technologies: ["React", "JavaScript", "Python", "Flask", "SQLite"],
    ...media("sistema-web", "Sistema Web"),
    accent: "#b6d79c",
    challenge:
      "Informações espalhadas entre planilhas e mensagens dificultam o acompanhamento das atividades e tornam a passagem de tarefas pouco clara.",
    analysis:
      "O cenário de referência pede uma visão comum dos processos, com responsáveis definidos e histórico acessível. A proposta prioriza a clareza do fluxo antes de adicionar novas funcionalidades.",
    solution:
      "Uma área de trabalho centralizada com etapas, responsáveis e registros de movimentação. A arquitetura proposta separa a interface React da API Flask e da persistência em SQLite.",
    workflow: [
      {
        title: "Organizar",
        description: "Cadastre um processo, suas etapas e responsáveis.",
      },
      {
        title: "Acompanhar",
        description: "Atualize o andamento e consulte as tarefas da equipe.",
      },
      {
        title: "Consultar",
        description: "Use filtros e histórico para encontrar informações.",
      },
    ],
    features: [
      "Cadastro de processos",
      "Distribuição de responsabilidades",
      "Filtros por etapa",
      "Histórico de atividades",
      "Autenticação prevista na arquitetura",
      "Interface responsiva",
    ],
    results: [
      "A proposta concentra o acompanhamento em uma única interface.",
      "O fluxo torna responsabilidades e próximos passos mais visíveis.",
      "Os benefícios ainda precisam ser validados em uma implementação real.",
    ],
  },
  {
    id: "02",
    slug: "automacao-python",
    title: "Automação Python",
    label: "Flow",
    shortDescription: "Menos repetição. Mais tempo para o que importa.",
    fullDescription:
      "Proposta de automação para coletar, validar e organizar informações recorrentes. A interface conceitual apresenta o fluxo de execução de uma rotina Python.",
    category: "Automação",
    tags: ["Python", "Dados"],
    year: 2026,
    featured: true,
    demo: true,
    technologies: ["Python", "Pandas", "Selenium"],
    ...media("automacao-python", "Automação Python"),
    accent: "#b5a2ec",
    challenge:
      "Copiar informações entre arquivos e sistemas exige atenção constante e expõe o processo a inconsistências e retrabalho.",
    analysis:
      "A primeira etapa é identificar entradas, regras de validação e pontos em que uma decisão humana continua necessária. A automação deve tornar erros visíveis, não escondê-los.",
    solution:
      "Um fluxo modular de coleta, tratamento e exportação, com logs por etapa. Pandas organiza os dados e Selenium pode conectar sistemas que dependem de interação pelo navegador.",
    workflow: [
      {
        title: "Coletar",
        description: "Leia arquivos de uma origem previamente definida.",
      },
      {
        title: "Validar",
        description: "Confira campos obrigatórios e sinalize inconsistências.",
      },
      {
        title: "Exportar",
        description: "Gere a saída padronizada e registre a execução.",
      },
    ],
    features: [
      "Processamento em lote",
      "Validação de arquivos",
      "Padronização de campos",
      "Logs de execução",
      "Exportação de relatórios",
      "Tratamento de exceções",
    ],
    results: [
      "A proposta reduz a necessidade de copiar informações manualmente.",
      "As validações tornam problemas de entrada mais fáceis de localizar.",
      "Não há métricas de tempo ou produtividade aferidas neste exemplo.",
    ],
  },
  {
    id: "03",
    slug: "dashboard",
    title: "Dashboard",
    label: "Clarity",
    shortDescription: "Da informação dispersa à visão que orienta.",
    fullDescription:
      "Conceito de painel para reunir indicadores e explorar informações por período e categoria. Os gráficos são ilustrativos e não retratam dados de uma empresa.",
    category: "Dashboard",
    tags: ["Dados", "Python"],
    year: 2026,
    featured: true,
    demo: true,
    technologies: ["Excel", "Power Query", "Python"],
    ...media("dashboard", "Dashboard"),
    accent: "#9bbfc9",
    challenge:
      "Fontes com formatos diferentes dificultam análises consistentes e exigem preparação manual antes de cada acompanhamento.",
    analysis:
      "Um painel útil começa pela definição dos indicadores e de sua origem. A proposta considera consistência das bases, periodicidade de atualização e contexto de leitura.",
    solution:
      "Uma camada de tratamento de dados prepara as fontes para um painel com filtros e comparativos. Power Query e Python apoiam o processo de consolidação antes da visualização.",
    workflow: [
      {
        title: "Consolidar",
        description: "Reúna as fontes e padronize os campos.",
      },
      {
        title: "Explorar",
        description: "Escolha período e dimensão de análise.",
      },
      {
        title: "Interpretar",
        description: "Compare informações com o contexto da operação.",
      },
    ],
    features: [
      "Consolidação de fontes",
      "Filtros por período",
      "Comparativos por categoria",
      "Tratamento de dados",
      "Visualização de indicadores",
      "Exportação de análises",
    ],
    results: [
      "A proposta facilita a leitura conjunta das informações.",
      "O tratamento padronizado favorece análises consistentes.",
      "Os indicadores e seus valores devem ser definidos com dados reais.",
    ],
  },
  {
    id: "04",
    slug: "landing-page",
    title: "Landing Page",
    label: "Forma",
    shortDescription: "Uma presença digital com clareza e personalidade.",
    fullDescription:
      "Estudo de um site institucional para apresentar uma proposta de valor, um conjunto de serviços e um caminho de contato. Forma é uma identidade fictícia criada exclusivamente para este exemplo.",
    category: "Web",
    tags: ["React"],
    year: 2026,
    featured: true,
    demo: true,
    technologies: ["React", "Next.js", "Tailwind"],
    ...media("landing-page", "Landing Page"),
    accent: "#c8bb9b",
    challenge:
      "Uma apresentação pouco objetiva dificulta a compreensão do serviço e deixa o visitante sem um próximo passo claro.",
    analysis:
      "A estrutura de referência organiza a narrativa em proposta, contexto e contato. A experiência móvel recebe a mesma atenção que a versão desktop.",
    solution:
      "Uma página com hierarquia tipográfica, conteúdo direto e navegação simples. A implementação proposta combina Next.js, componentes React e estilos responsivos.",
    workflow: [
      {
        title: "Conhecer",
        description: "Entenda a proposta logo na primeira seção.",
      },
      {
        title: "Explorar",
        description: "Navegue pelos serviços e pela abordagem.",
      },
      {
        title: "Conversar",
        description: "Acesse o contato ao decidir avançar.",
      },
    ],
    features: [
      "Layout responsivo",
      "SEO por página",
      "Navegação acessível",
      "Componentes reutilizáveis",
      "Imagens otimizadas",
      "Chamadas de contato",
    ],
    results: [
      "A proposta apresenta o serviço com uma narrativa mais clara.",
      "O visitante encontra um caminho direto para iniciar uma conversa.",
      "Não foram aferidas métricas de conversão neste estudo.",
    ],
  },
  {
    id: "05",
    slug: "sistema-feedback",
    title: "Sistema de Feedback",
    label: "Loop",
    shortDescription: "Escutar, organizar e transformar opiniões em ação.",
    fullDescription:
      "Estudo de uma aplicação para receber avaliações, armazenar registros e organizar sua análise. Os comentários e estados exibidos são apenas exemplos de interface.",
    category: "Web",
    tags: ["Python", "Back-end", "Dados"],
    year: 2026,
    featured: true,
    demo: true,
    technologies: ["HTML", "CSS", "JavaScript", "Python", "Flask", "SQLite"],
    ...media("sistema-feedback", "Sistema de Feedback"),
    accent: "#c1c79d",
    challenge:
      "Comentários recebidos em canais diferentes podem se perder e dificultar a identificação de necessidades recorrentes.",
    analysis:
      "A proposta distingue a coleta da análise. O formulário deve ser simples para quem responde, enquanto a equipe precisa de categorias e estados para acompanhar cada registro.",
    solution:
      "Um formulário conectado a uma API Flask com armazenamento em SQLite e um painel de consulta. A arquitetura prevê validação e controle de acesso à área administrativa.",
    workflow: [
      {
        title: "Receber",
        description: "Colete uma avaliação em um formulário objetivo.",
      },
      {
        title: "Classificar",
        description: "Organize os registros por tema e situação.",
      },
      {
        title: "Acompanhar",
        description: "Registre o andamento da análise de cada opinião.",
      },
    ],
    features: [
      "Formulário de avaliação",
      "Validação de campos",
      "Armazenamento estruturado",
      "Filtros por tema",
      "Estados de acompanhamento",
      "Painel administrativo previsto",
    ],
    results: [
      "A proposta reúne opiniões em um lugar consultável.",
      "A organização facilita a priorização da análise.",
      "A utilidade do fluxo precisa ser validada com participantes reais.",
    ],
  },
  {
    id: "06",
    slug: "plataforma-web",
    title: "Plataforma Web",
    label: "Calc Studio",
    shortDescription: "Explore cenários. Tome decisões com contexto.",
    fullDescription:
      "Conceito de plataforma para receber parâmetros, realizar cálculos e apresentar cenários. As regras de negócio dependem da aplicação real e não constituem orientação financeira.",
    category: "React",
    tags: ["Web", "Back-end"],
    year: 2026,
    featured: true,
    demo: true,
    technologies: ["React", "TypeScript", "API"],
    ...media("plataforma-web", "Plataforma Web"),
    accent: "#99b6e4",
    challenge:
      "Cálculos distribuídos em arquivos diferentes dificultam a conferência de parâmetros e a comparação entre cenários.",
    analysis:
      "Antes de implementar, é necessário documentar fórmulas, unidades, limites e critérios de arredondamento. Os resultados devem mostrar de onde vieram.",
    solution:
      "Um fluxo de entrada validada, cálculo em uma camada isolada e apresentação de resultados. TypeScript ajuda a explicitar contratos entre interface e API.",
    workflow: [
      { title: "Definir", description: "Informe os parâmetros de um cenário." },
      {
        title: "Calcular",
        description: "Aplique as regras documentadas e validadas.",
      },
      {
        title: "Comparar",
        description: "Consulte resultados e revise suas premissas.",
      },
    ],
    features: [
      "Validação de parâmetros",
      "Cálculos dinâmicos",
      "Comparação de cenários",
      "Contratos de API",
      "Tratamento de erros",
      "Layout responsivo",
    ],
    results: [
      "A proposta explicita parâmetros e resultados no mesmo fluxo.",
      "A separação das regras facilita revisão e manutenção.",
      "Não há resultados de uso medidos neste conceito.",
    ],
  },
];
