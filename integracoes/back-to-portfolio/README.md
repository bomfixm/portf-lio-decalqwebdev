# Botão "Voltar ao portfólio" — instalação nos sites dos clientes

Widget autocontido: sem dependências, isolado em Shadow DOM (o CSS do site não o
afeta e ele não afeta o site). Só aparece para quem chegou pelo portfólio; o
clique usa `history.back()`, devolvendo o visitante à posição exata de onde saiu.

Esta pasta **não é publicada** — é o material para colar nos outros projetos.
O mesmo arquivo já está servido pelo portfólio em `/embed/back-to-portfolio.js`.

---

## Antes de começar: defina a URL do portfólio

O arquivo tem um padrão no topo:

```js
var PORTFOLIO = (data.portfolio || "https://portf-lio-decalqwebdev.vercel.app")
```

Se o domínio final for outro, faça **uma** das duas coisas:

- passe `data-portfolio="https://seu-dominio.com"` na tag `<script>` (recomendado), ou
- edite essa string no arquivo antes de copiar.

---

## Opção A — copiar o arquivo para cada site (recomendado)

Sem dependência da nossa hospedagem: se o portfólio sair do ar, o botão continua
funcionando (o fallback só é usado no clique).

### Sites em Vite + React
`vai-de-smash` · `aps-engenharia` · `the-one-bistro`

1. Copie `back-to-portfolio.js` para a pasta `public/` do projeto.
2. Em `index.html`, antes de `</body>`:

```html
<script
  defer
  src="/back-to-portfolio.js"
  data-portfolio="https://SEU-PORTFOLIO"
></script>
```

### Sites em Next.js (App Router)
`helios-solar-beige` · `nativa-arquitetura` · `reis-lazer` · `prospectlife`

1. Copie `back-to-portfolio.js` para a pasta `public/` do projeto.
2. Em `app/layout.tsx`, dentro de `<body>` (no fim):

```tsx
import Script from "next/script";

// ...
      <body>
        {children}
        <Script
          src="/back-to-portfolio.js"
          strategy="afterInteractive"
          data-portfolio="https://SEU-PORTFOLIO"
        />
      </body>
```

> O widget encontra a própria tag mesmo quando o `next/script` a injeta
> dinamicamente (`document.currentScript` é `null` nesse caso), então os
> `data-*` continuam valendo.

---

## Opção B — uma linha, servido pelo portfólio

Sem copiar arquivo; atualizações passam a valer em todos os sites de uma vez.
Em troca, cria uma dependência da nossa hospedagem.

```html
<script
  defer
  src="https://SEU-PORTFOLIO/embed/back-to-portfolio.js"
></script>
```

---

## Opções (data-attributes)

| Atributo | Padrão | Para quê |
| --- | --- | --- |
| `data-portfolio` | URL do portfólio | destino do fallback e detecção de origem |
| `data-position` | `left` | `left` ou `right` — use `left` onde já existe botão de WhatsApp à direita |
| `data-label` | `Voltar ao portfólio` | texto do botão (em telas estreitas vira "Portfólio") |
| `data-always` | — | `"true"` mostra o botão mesmo para quem entrou direto no site |

---

## Como ele decide aparecer

Só aparece para quem veio do portfólio, detectado por (qualquer um):

1. `?from=decalq` na URL — o botão "Visitar o site" do portfólio já acrescenta;
2. `document.referrer` apontando para o domínio do portfólio;
3. `sessionStorage` — grava na chegada, para o botão sobreviver à navegação
   interna do site visitado.

O `?from=decalq` é removido da barra de endereços logo após a leitura, sem
recarregar a página nem sujar o histórico.

No clique: `history.back()` quando há histórico válido (volta à posição exata do
scroll no portfólio); caso contrário navega para `<portfolio>/projetos/`. Se o
`back()` não sair do lugar em 600 ms, cai para o mesmo destino.

Não é renderizado dentro de iframes — o preview embutido nos cases do portfólio
não mostra o botão.

---

## Comportamento por dispositivo

- **Desktop** (`hover: hover` e `pointer: fine`): magnetic sutil (máx. 5 px, via
  `requestAnimationFrame`), luz acompanhando o ponteiro, seta avançando no hover.
- **Toque**: nenhum listener de mouse é registrado — apenas `:active` com
  `scale(.97)`.
- **`prefers-reduced-motion: reduce`**: sem magnetic e sem animação de entrada.

---

## Checklist de teste (por site)

1. Abra o site **direto** (sem vir do portfólio): o botão **não** deve aparecer.
2. Abra o portfólio, role até os projetos, entre no case e clique em
   "Visitar o site": o botão aparece no canto inferior esquerdo.
3. Navegue para outra página interna do site: o botão continua lá.
4. Clique no botão: deve voltar ao case **na mesma posição de scroll**, sem
   repetir a intro do portfólio.
5. No celular: botão compacto ("Portfólio"), sem efeito magnético.
6. Console sem erros.
