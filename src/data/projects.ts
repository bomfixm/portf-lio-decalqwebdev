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
  /* ---------------------------------------------------------------------
     Sites publicados (Vercel). Textos derivados do conteúdo real de cada site;
     campos como `results` ficam de fora até existirem números medidos.
     Cases com `iframe` abrem embutidos na página; os demais só por link
     (o site bloqueia embed via X-Frame-Options).
     --------------------------------------------------------------------- */
  {
    id: "01",
    slug: "helios-solar-beige",
    title: "Helios Energia Solar",
    label: "Solar",
    shortDescription: "Energia solar de alto padrão com simulador de projeto.",
    fullDescription:
      "Site da HELIOS, engenharia solar fotovoltaica para residências, comércios, indústrias e usinas no Rio Grande do Sul e em Santa Catarina: soluções por segmento, tecnologia, simulador de projeto, vitrine de projetos e contato com orçamento rápido.",
    category: "Web",
    tags: ["React", "Web"],
    year: 2026,
    featured: true,
    demo: false,
    technologies: ["Next.js", "React", "Tailwind"],
    ...media("helios-solar-beige", "Helios Energia Solar"),
    accent: "#3fd68f",
    liveUrl: "https://helios-solar-beige.vercel.app/",
    iframe: "https://helios-solar-beige.vercel.app/",
    challenge:
      "Vender engenharia de alto padrão exige transmitir confiança técnica e, ao mesmo tempo, facilitar o primeiro contato de quem ainda está avaliando a decisão.",
    analysis:
      "A narrativa parte da promessa (independência energética, redução na conta), passa pela prova técnica — módulos e inversores Tier 1, monitoramento 24/7 em app, homologação inclusa — e oferece duas portas: simular o projeto ou falar com um engenheiro.",
    solution:
      "Aplicação Next.js com intro cinematográfica, seções guiadas por scroll, simulador de projeto, vitrine de projetos e canais de contato sempre visíveis (WhatsApp e orçamento rápido).",
    workflow: [
      {
        title: "Entender",
        description:
          "Soluções apresentadas por segmento, do residencial às usinas.",
      },
      {
        title: "Simular",
        description:
          "O visitante estima o próprio projeto antes de falar com alguém.",
      },
      {
        title: "Contatar",
        description:
          "Orçamento rápido e WhatsApp a um clique em qualquer ponto da página.",
      },
    ],
    features: [
      "Simulador de projeto solar",
      "Soluções por segmento (residencial, comercial, industrial, usinas)",
      "Indicadores técnicos em destaque",
      "Vitrine de projetos",
      "Orçamento rápido e WhatsApp",
      "Intro animada e reveals por scroll",
    ],
  },
  {
    id: "02",
    slug: "nativa-arquitetura",
    title: "Nativa Arquitetura & Paisagismo",
    label: "Studio",
    shortDescription:
      "Estúdio de arquitetura biofílica com portfólio editorial.",
    fullDescription:
      "Site do estúdio Nativa, de São Paulo: manifesto, projetos em destaque, filosofia, serviços, depoimentos e agendamento de reunião, com linguagem editorial e fotografias em grande escala.",
    category: "Web",
    tags: ["React", "Web"],
    year: 2026,
    featured: true,
    demo: false,
    technologies: ["Next.js", "React", "Framer Motion", "Lenis"],
    ...media("nativa-arquitetura", "Nativa Arquitetura & Paisagismo"),
    accent: "#d9c9a8",
    liveUrl: "https://nativa-arquitetura.vercel.app/",
    iframe: "https://nativa-arquitetura.vercel.app/",
    challenge:
      "Um estúdio de arquitetura precisa que o site transmita a mesma sensibilidade dos projetos: espaço, luz e ritmo — sem parecer um catálogo.",
    analysis:
      "Tipografia serifada, imagens grandes e uma faixa de valores (biofilia, sustentabilidade, luz natural, materiais vivos) estabelecem o tom antes de qualquer lista de serviços.",
    solution:
      "Next.js com Framer Motion e scroll suave (Lenis): projeto em destaque logo na abertura, portfólio, manifesto, serviços, depoimentos e um convite claro para agendar reunião.",
    workflow: [
      {
        title: "Conhecer",
        description:
          "Manifesto e filosofia apresentam a forma de projetar do estúdio.",
      },
      {
        title: "Explorar",
        description:
          "Projetos residenciais, comerciais e de paisagismo em grande formato.",
      },
      {
        title: "Agendar",
        description: "Reunião marcada direto pelo site.",
      },
    ],
    features: [
      "Projeto em destaque na abertura",
      "Portfólio de projetos",
      "Manifesto e filosofia do estúdio",
      "Seção de serviços",
      "Depoimentos",
      "Agendamento de reunião",
    ],
  },
  {
    id: "03",
    slug: "reis-lazer",
    title: "Reis Lazer & Cia",
    label: "Showroom",
    shortDescription: "Churrasqueiras sob medida em Itatiba, desde 2003.",
    fullDescription:
      "Site da Reis Lazer & Cia, loja de churrasqueiras em Itatiba (SP): churrasqueiras de tijolinho à vista, fornos caipiras, fogões a lenha, lareiras, coifas e projetos de espaço gourmet, com obras, galeria, avaliações, localização e orçamento pelo WhatsApp.",
    category: "Web",
    tags: ["React", "Web"],
    year: 2026,
    featured: true,
    demo: false,
    technologies: ["Next.js", "React", "Tailwind"],
    ...media("reis-lazer", "Reis Lazer & Cia"),
    accent: "#d8b25a",
    liveUrl: "https://reis-lazer.vercel.app/",
    iframe: "https://reis-lazer.vercel.app/",
    challenge:
      "Um negócio com mais de vinte anos de mercado e showroom físico precisava de uma presença digital à altura do produto — e que transformasse visitas em pedidos de orçamento.",
    analysis:
      "A estrutura segue a jornada do cliente: inspirar (obras e galeria), comprovar (avaliações e tempo de mercado) e facilitar (localização, WhatsApp e orçamento).",
    solution:
      "Next.js com identidade escura e dourada, tipografia serifada, seções de modelos, obras, galeria e avaliações, menu com âncoras numeradas e CTA de orçamento sempre visível.",
    workflow: [
      {
        title: "Inspirar",
        description: "Obras realizadas e galeria mostram o resultado final.",
      },
      {
        title: "Escolher",
        description:
          "Churrasqueiras, fornos, fogões, lareiras e coifas por tipo.",
      },
      {
        title: "Orçar",
        description: "Pedido de orçamento direto pelo WhatsApp.",
      },
    ],
    features: [
      "Catálogo de churrasqueiras e modelos",
      "Galeria de obras realizadas",
      "Avaliações de clientes",
      "Localização do showroom",
      "Orçamento pelo WhatsApp",
      "Menu com âncoras numeradas",
    ],
  },
  {
    id: "04",
    slug: "prospectlife",
    title: "ProspectLife",
    label: "App",
    shortDescription: "Ferramenta gratuita de prospecção de clientes com IA.",
    fullDescription:
      "Aplicação web que encontra empresas sem site por cidade e nicho, entrega nome, WhatsApp e Instagram, audita sites fracos e organiza a conversa em um funil escrito pelo próprio usuário. Gratuita, sem cadastro, para o Brasil e mais de 60 países.",
    category: "IA",
    tags: ["IA", "React", "Web"],
    year: 2026,
    featured: true,
    demo: false,
    technologies: ["Next.js", "React", "IA"],
    ...media("prospectlife", "ProspectLife"),
    accent: "#7cc4ff",
    liveUrl: "https://prospectlife.vercel.app/",
    iframe: "https://prospectlife.vercel.app/",
    challenge:
      "Prospecção manual é lenta: encontrar empresas, descobrir contatos e organizar o acompanhamento consome horas antes da primeira conversa.",
    analysis:
      "O fluxo foi desenhado em etapas numeradas: escolher país, cidades e nichos; receber os leads com contatos; auditar os sites existentes; conduzir a conversa por um funil próprio.",
    solution:
      "Aplicação Next.js com busca por cidade + nicho (várias combinações de uma vez), contatos prontos, auditoria de sites, funil de vendas por etapas e exportação em CSV.",
    workflow: [
      {
        title: "Buscar",
        description: "País, cidades e nichos definem a lista de empresas.",
      },
      {
        title: "Auditar",
        description:
          "Sites fracos ou inexistentes viram oportunidade de abordagem.",
      },
      {
        title: "Conversar",
        description:
          "WhatsApp e Instagram prontos, com etapas de funil escritas pelo usuário.",
      },
    ],
    features: [
      "Busca por cidade e nicho, em lote",
      "Contatos prontos: WhatsApp e Instagram",
      "Auditoria de sites",
      "Funil de vendas com etapas personalizadas",
      "Exportação em CSV",
      "Sem cadastro; Brasil e mais de 60 países",
    ],
  },
  {
    id: "05",
    slug: "vai-de-smash",
    title: "Vai de Smash",
    label: "Delivery",
    shortDescription: "Hamburgueria artesanal com cardápio e pedido online.",
    fullDescription:
      "Site da Vai de Smash, hamburgueria artesanal em Louveira (SP): apresentação da marca, cardápio, história, localização, contato e botão de pedido sempre à mão.",
    category: "Web",
    tags: ["React", "Web"],
    year: 2026,
    featured: true,
    demo: false,
    technologies: ["React", "Vite", "Tailwind", "Framer Motion"],
    ...media("vai-de-smash", "Vai de Smash"),
    accent: "#ef4444",
    liveUrl: "https://vai-de-smash.vercel.app/",
    challenge:
      "Uma hamburgueria com delivery precisa levar o visitante do primeiro contato ao pedido em poucos toques, sem perder a personalidade da marca.",
    analysis:
      "Velocidade e clareza: headline forte, foto do produto em destaque e as chamadas 'Pedir agora' e 'Ver cardápio' sempre acessíveis, inclusive no menu fixo.",
    solution:
      "Single-page em React com navegação por âncoras (Início, Cardápio, Sobre, Localização, Contato), identidade escura com vermelho e laranja, animações de entrada e layout pensado primeiro para o celular.",
    workflow: [
      {
        title: "Descobrir",
        description: "Marca e proposta na primeira dobra.",
      },
      {
        title: "Escolher",
        description: "Cardápio organizado por seções.",
      },
      {
        title: "Pedir",
        description: "Botão de pedido fixo no topo e no herói.",
      },
    ],
    features: [
      "Cardápio online",
      "Botão de pedido fixo no topo",
      "Seção sobre a marca",
      "Localização e contato",
      "Layout mobile-first",
      "Animações de entrada",
    ],
  },
  {
    id: "06",
    slug: "the-one-bistro",
    title: "The One Bistrô",
    label: "Bistrô",
    shortDescription:
      "Cafeteria e bistrô em Jundiaí, com cardápio e avaliações.",
    fullDescription:
      "Site do The One Bistrô, cafeteria e bistrô no The One Office Tower, em Jundiaí (SP): destaques, cardápio, avaliações do Google, horários, formas de atendimento (no local, drive-thru e delivery) e contato.",
    category: "Web",
    tags: ["React", "Web"],
    year: 2026,
    featured: true,
    demo: false,
    technologies: ["React", "Vite", "Tailwind", "Framer Motion"],
    ...media("the-one-bistro", "The One Bistrô"),
    accent: "#d4a95a",
    liveUrl: "https://the-one-bistro.vercel.app/",
    challenge:
      "Um bistrô em prédio corporativo atende públicos diferentes ao longo do dia: o site precisa responder rápido a 'está aberto?', 'o que tem?' e 'como chego?'.",
    analysis:
      "Status de aberto/fechado com horário de abertura, nota do Google com avaliações e as três formas de atendimento aparecem já na primeira dobra.",
    solution:
      "Single-page em React com hero fotográfico, cartão de avaliações, cardápio, destaques, horários e rota, em identidade quente com dourado.",
    workflow: [
      {
        title: "Conferir",
        description: "Aberto ou fechado, horário e avaliações na abertura.",
      },
      {
        title: "Escolher",
        description: "Destaques e cardápio completo.",
      },
      {
        title: "Chegar",
        description: "Rota, drive-thru ou delivery.",
      },
    ],
    features: [
      "Status de aberto/fechado em tempo real",
      "Avaliações do Google em destaque",
      "Cardápio e destaques",
      "Formas de atendimento: local, drive-thru e delivery",
      "Rota e contato",
      "Layout responsivo",
    ],
  },
  {
    id: "07",
    slug: "aps-engenharia",
    title: "APS Engenharia e Construção",
    label: "Engenharia",
    shortDescription: "Obras, reformas, projetos e laudos técnicos.",
    fullDescription:
      "Site da APS Engenharia e Construção, do Eng. Anderson Paiva: execução de obras e reformas, projetos e laudos técnicos, gerenciamento e acompanhamento de obras, com método, depoimentos e pedido de orçamento.",
    category: "Web",
    tags: ["React", "Web"],
    year: 2026,
    featured: true,
    demo: false,
    technologies: ["React", "Vite", "Tailwind", "Framer Motion"],
    ...media("aps-engenharia", "APS Engenharia e Construção"),
    accent: "#e2c48a",
    liveUrl: "https://aps-engenharia.vercel.app/",
    challenge:
      "Serviços de engenharia são contratados com base em confiança: o site precisa apresentar responsabilidade técnica e caminhos claros de contato.",
    analysis:
      "Organização por frentes de serviço (obras, reformas, projetos, laudos, gerenciamento), com o engenheiro responsável e o método de trabalho em evidência.",
    solution:
      "Single-page em React com tipografia serifada, seções de serviços, método, depoimentos e orçamento pelo WhatsApp fixo na tela.",
    workflow: [
      {
        title: "Apresentar",
        description: "Frentes de serviço e método de trabalho.",
      },
      {
        title: "Comprovar",
        description: "Responsável técnico, obras e depoimentos.",
      },
      {
        title: "Contatar",
        description: "Solicitação de orçamento e WhatsApp.",
      },
    ],
    features: [
      "Frentes de serviço detalhadas",
      "Apresentação do engenheiro responsável",
      "Método de trabalho",
      "Obras e depoimentos",
      "Orçamento pelo WhatsApp",
      "Layout responsivo",
    ],
  },
];
