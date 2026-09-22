# Portfólio de tecnologia

Projeto completo em português brasileiro, com Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion e Lucide React. Design principal escuro, responsivo e orientado a cases de desenvolvimento.

## Executar

Requisito: Node.js 20.9 ou superior (recomendado: versão LTS suportada) e npm.

```bash
npm install
npm run dev
```

Abra http://localhost:3000. Para validar:

```bash
npm run lint
npm run typecheck
npm run build
```

O projeto usa exportação estática. O build gera `out/`, pronto para uma hospedagem estática. `npm start` é destinado ao modo servidor do Next.js: para usá-lo, remova `output: 'export'` de `next.config.ts` e execute um novo build. Para visualizar a exportação, sirva a pasta `out/` com qualquer servidor HTTP estático que resolva diretórios para `index.html`.

## Personalizar a identidade

Edite `src/config/site.ts`:

- `name`, `slogan`, `description`: identidade e metadados gerais.
- `logo`: caminho de um arquivo em `public/` (atual: `/brand/logo.png`, 36px de altura no header). Vazio usa o símbolo tipográfico inicial. O favicon é `src/app/icon.png`.
- `accent`: cor de destaque. Os demais tokens estão no início de `src/app/globals.css`.
- `email`, `whatsapp`, `instagram`, `linkedin`, `github`: canais reais. Canais vazios não aparecem. No WhatsApp, use código do país + DDD + número.
- `url`: domínio canônico. Pode ser definido em `NEXT_PUBLIC_SITE_URL` no ambiente de build.

`accent` alimenta `--accent` e `--accent-rgb` (convertido em `src/app/layout.tsx`); todos os glows, gradientes e bordas derivam dessas variáveis.

## Design system

Os tokens ficam no início de `src/app/globals.css` e são a única fonte de cor, tipografia, raio e movimento:

- Cores: `--background*`, `--surface*`, `--primary*` (azul), `--secondary` (ciano), `--tertiary` (lavanda), `--text-*`, `--border*`, `--glow*` e os gradientes `--gradient-primary`, `--gradient-text`, `--gradient-border`, `--gradient-background`.
- Tipografia (via `next/font`, self-hosted): Space Grotesk para títulos (`--font-display`), DM Sans para texto (`--font-sans`) e JetBrains Mono para eyebrows e rótulos (`--font-mono`). Classes utilitárias: `.eyebrow`, `.gradient-text`, `.muted`.
- Forma e ritmo: `--radius-*`, `--section-y`, `--gutter`, `--container`.
- Movimento: `--ease-out`, `--dur-*` no CSS e `EASE`/`DUR` em `src/components/Motion.tsx`.

Movimento usa Framer Motion como estratégia única (sem GSAP) e Lenis apenas para smooth scroll (`src/components/SmoothScroll.tsx`: uma instância global, âncoras com compensação do header, desligado com `prefers-reduced-motion`; como o Lenis rola a janela nativa, `useScroll` e observers leem o scroll real). Sistema de motion: micro 150–250ms, componente 250–450ms, reveal de seção 600–900ms, storytelling ligado ao progresso do scroll; easing único `--ease-out` / `EASE`.

As primitivas em `src/components/Motion.tsx`:

- `Reveal` (variantes `up`, `fade`, `scale`, `blur`, `left`, `right`, `clip`, `mask`) e `Stagger`/`StaggerItem` para entradas por scroll;
- `LineReveal` para headlines linha a linha;
- `Parallax`, `Counter`, `ScrollFill`, `ReadingProgress` e `useMouseTilt`;
- `useReducedMotion`, versão sem divergência de hidratação: com `prefers-reduced-motion` tudo renderiza estático.

Camadas decorativas: `Background` (luzes, grid e grain fixos; seções com `data-tone` mudam qual luz domina ao entrar no centro da tela), `CursorGlow` (só com mouse), `Ticker` (faixa de capacidades gerada dos dados) e `SpotlightCard` (spotlight e borda em gradiente seguindo o mouse nos cards).

Componentes de experiência: `Button` (`PrimaryButton`/`SecondaryButton`/`TextButton`, com luz que segue o ponteiro via `--mx/--my`), `Magnetic` (hover magnético sutil, só desktop), `CursorCta` (CTA final: selo que segue o cursor no desktop, botão estático único no toque), `RevealImage` (imagem assenta de 1.08 → 1 ao revelar), `HorizontalGallery` (desktop: seção presa e cases atravessando a tela com o scroll; toque/telas menores/reduced motion: carrossel com swipe e snap) e `FeaturedProjects` (case 01 em largura total, 02 invertido).

Tipos compartilhados ficam em `src/types/` (`Project`, `Service`, `ProcessStep`, `TechnologyGroup`, `NavigationItem`, `Principle`); os dados usam `satisfies` para manter os literais.

Uma futura variante clara pode substituir esses tokens e `color-scheme`; ainda não há seletor de tema.

## Conteúdo

- `src/data/projects.ts`: projetos, cases, imagens, demonstrações e links.
- `src/data/services.ts`: serviços e etapas do processo.
- `src/data/technologies.ts`: tecnologias agrupadas.
- `src/data/content.ts`: apresentação, filosofia, princípios e equipe.
- `src/config/site.ts`: identidade e contatos.

Os títulos estruturais de cada seção ficam nos componentes correspondentes. Alterações de projetos, serviços, tecnologias, contatos e equipe não exigem editar componentes React.

## Adicionar um projeto

1. Crie uma pasta em `public/projects/seu-projeto/`.
2. Coloque capa e screenshots nessa pasta.
3. Adicione um registro ao array `projects`, respeitando `Project` em `src/types/project.ts`.
4. Use um `id` e `slug` únicos. O slug gera `/projetos/seu-projeto/` automaticamente.
5. Marque `featured: true` para mostrar o case na Home.
6. Informe `category` e `tags` para os filtros. A busca consulta título, rótulo e tecnologias, ignorando acentos.
7. Preencha desafio, análise, solução, fluxo, funcionalidades e resultados.
8. Execute lint, typecheck e build.

Exemplo de mídia:

```ts
cover: '/projects/seu-projeto/cover.webp',
gallery: [
  { src: '/projects/seu-projeto/screenshot-01.webp', alt: 'Painel de processos', width: 1200, height: 780 },
  { src: '/projects/seu-projeto/mobile.webp', alt: 'Tela móvel de processos', width: 430, height: 820 },
],
```

Use dimensões reais e textos alternativos descritivos. A galeria oferece ampliação, navegação por botões e setas, fechamento por Escape e retorno de foco. Imagens verticais são suportadas.

### Honestidade dos exemplos

Os seis projetos iniciais são **demonstrativos**. As imagens são interfaces conceituais produzidas para este portfólio. Não representam aplicações entregues, empresas reais ou métricas verificadas. As funcionalidades descritas são propostas; o portfólio não contém os sistemas apresentados nos cases.

Ao substituir por projetos reais, atualize o conteúdo, as imagens, os rótulos e `demo`. Registre apenas resultados comprovados. Os rótulos de exemplo são derivados de `demo` e desaparecem quando o catálogo passa a conter apenas projetos reais.

### Vídeo, GIF, iframe e links

Todos são opcionais:

```ts
video: '/projects/seu-projeto/demo.mp4',
gif: '/projects/seu-projeto/demo.gif',
iframe: 'https://origem-confiavel.com/embed/demo',
demoUrl: 'https://demo.seudominio.com',
liveUrl: 'https://seudominio.com',
github: 'https://github.com/sua-organizacao/seu-projeto',
```

Sem mídia ou links, o case explica que não há demonstração publicada; nenhum botão usa `#` ou URL inventada. Use iframes apenas de origens confiáveis, revisando suas permissões. Para vídeos com fala, adicione legendas VTT pelo elemento `track` no componente `Demonstration` e disponibilize transcrição. Em ambiente de exportação estática, Next/Image usa as imagens locais sem otimizador de servidor; por isso as capas já são WebP. Caso migre para o modo servidor, remova `images.unoptimized` para habilitar a otimização do Next.js.

## Tecnologias, serviços e equipe

Adicione tecnologias ao grupo correspondente em `src/data/technologies.ts`. Os badges e filtros dos cases usam o array `technologies` de cada projeto.

Em `src/data/services.ts`, cada serviço recebe título, resumo, texto detalhado e uma chave de ícone suportada pelo componente `Sections`.

A seção de equipe está pronta, mas vazia para não inventar pessoas. Em `src/data/content.ts`, adicione registros:

```ts
{ name: 'Nome real', role: 'Função', description: 'Breve apresentação',
  photo: '/team/pessoa.webp', linkedin: 'https://...', github: 'https://...' }
```

## Formulário de contato

Sem `NEXT_PUBLIC_CONTACT_ENDPOINT`, o formulário apenas valida os campos e mostra explicitamente que a mensagem **não foi enviada nem armazenada**. Não salva dados no navegador.

Para integrar, copie `.env.example` para `.env.local` e configure uma URL HTTPS pública que aceite `POST` JSON e retorne HTTP 2xx somente após aceitar a mensagem. O adaptador fica em `src/lib/contact.ts` e recebe:

```json
{
  "name": "Nome",
  "company": "Empresa",
  "email": "voce@empresa.com",
  "whatsapp": "",
  "projectType": "Site",
  "message": "Descrição do projeto"
}
```

- **Formspree:** use o endpoint do formulário, habilite o domínio e teste o envio real.
- **API própria / Resend:** mantenha a chave de e-mail no servidor. Faça a validação novamente no servidor, configure CORS para o domínio permitido, limites de requisição e proteção contra spam.
- O cliente limita o tempo de resposta a 15 segundos, mostra estado de envio e preserva os campos em caso de erro.
- Campos públicos `NEXT_PUBLIC_*` são incorporados ao navegador: nunca coloque segredos neles.
- Ao coletar dados de verdade, apresente informações de privacidade compatíveis com a operação.

## Rotas

- `/`: apresentação, seis projetos selecionados, serviços, tecnologias, processo e CTA.
- `/projetos`: busca e filtros instantâneos, inclusive estado vazio.
- `/projetos/[slug]`: case completo com galeria e navegação anterior/próximo.
- `/servicos`: detalhes dos serviços.
- `/sobre`: filosofia, princípios e equipe configurável.
- `/contato`: formulário validado e contatos configuráveis.
- Rota inexistente: página 404 personalizada.
- `/sitemap.xml` e `/robots.txt`: gerados no build.

## Estrutura

```text
src/
  app/                 Rotas, metadata, layout e estilos globais
  components/          Header, Hero, Motion (primitivas), Background, cards, bento, catálogo, formulário e seções
  config/site.ts       Identidade, cor, domínio e links
  data/                Conteúdo editável
  lib/contact.ts       Validação e adaptador de envio
  types/project.ts     Contrato dos projetos
public/projects/       Capas WebP e screenshots locais
.openai/hosting.json    Identificação da hospedagem Sites
```

## Publicar na Vercel

1. Envie a pasta do projeto a um repositório Git próprio, sem `node_modules`, `out` ou arquivos `.env`.
2. Importe o repositório na Vercel e selecione o preset Next.js.
3. Configure `NEXT_PUBLIC_SITE_URL` com o domínio final e, se existir, `NEXT_PUBLIC_CONTACT_ENDPOINT`.
4. Mantenha o build `npm run build`. A exportação estática é compatível com este projeto.
5. Faça o deploy e confira formulário, domínio, sitemap e cases. Mudanças em variáveis públicas exigem novo build.

Também é possível publicar `out/` em qualquer hospedagem estática que suporte caminhos com `index.html` e a página `404.html`. O arquivo `.openai/hosting.json` é específico do Sites e não é necessário na Vercel.

## Acessibilidade e manutenção

Navegação semântica com indicação da seção atual, link para pular conteúdo, foco visível, menu móvel com Escape, labels de formulário, erros associados aos campos, feedback em região viva, diálogo nativo com controle de foco e respeito a `prefers-reduced-motion` (animações, ticker e luz do cursor são desativados). Animações usam apenas `transform`, `opacity` e `clip-path`, sem layout shift.

Revise contraste caso altere a cor de destaque. Antes de apresentar a clientes, substitua a identidade provisória, configure os contatos reais e publique seus cases reais. Mantenha dependências atualizadas e valide novamente após mudanças.
