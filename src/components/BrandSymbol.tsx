"use client";
import { useCallback, useId, useRef, useState } from "react";
import { useReducedMotion } from "./Motion";

/**
 * O "decalqzinho" em SVG — redesenhado a partir de public/brand/logo.png para
 * que olhos e cursor possam ser animados separadamente. A geometria foi medida
 * no próprio arquivo original (janela girada -9°, olhos em arco de ~164°,
 * contorno do cursor traçado do PNG), então o desenho continua o mesmo.
 *
 * O recorte entre a janela e o cursor é feito por máscara, como no original:
 * o vão é transparente, não pintado com a cor do fundo.
 */
const CURSOR =
  "M151 76 L217 109 L215 117 L198 124 L211 141 L211 150 L200 157 L182 139 L171 158 L162 158 L148 90 L147 80 L150 77 Z";
const GIRO = "translate(86 77) rotate(-9)";

export function BrandSymbol({
  className = "",
  alt = false,
  clicking = false,
  onClickingEnd,
  wink = 0,
  blinkOnHover = true,
  width = 54,
  height = 36,
}: {
  className?: string;
  /** cor alternativa (verde-água) no lugar do azul original */
  alt?: boolean;
  /** cursor respondendo a um clique */
  clicking?: boolean;
  /** avisa quando a animação de clique terminou */
  onClickingEnd?: () => void;
  /** contador: cada incremento dispara uma piscadinha (um olho só) */
  wink?: number;
  /** piscada dos dois olhos ao passar o mouse (desliga na intro) */
  blinkOnHover?: boolean;
  width?: number;
  height?: number;
}) {
  const uid = useId().replace(/:/g, "");
  const grad = `decalq-grad-${uid}`;
  const mask = `decalq-mask-${uid}`;
  const reduced = useReducedMotion();
  const [piscando, setPiscando] = useState(false);
  const ultima = useRef(0);

  /* Um clique manda na expressão: se a piscada de hover (dois olhos) estiver
     em cena quando a piscadinha começa, ela é cancelada — senão pareceria que
     os dois olhos piscaram junto, e não uma piscadinha de um olho só.
     Ajuste de estado durante a renderização, sem efeito. */
  const [winkAnterior, setWinkAnterior] = useState(wink);
  if (wink !== winkAnterior) {
    setWinkAnterior(wink);
    if (piscando) setPiscando(false);
  }

  /* Pisca uma vez ao entrar com o mouse, com intervalo mínimo entre piscadas
     — nada de piscar a cada tremida do ponteiro. Toque não dispara. */
  const talvezPiscar = useCallback(
    (e: React.PointerEvent) => {
      if (!blinkOnHover || reduced || e.pointerType !== "mouse" || piscando)
        return;
      const agora = performance.now();
      if (agora - ultima.current < 1500) return;
      ultima.current = agora;
      setPiscando(true);
    },
    [blinkOnHover, reduced, piscando],
  );

  return (
    <svg
      className={`decalq ${alt ? "alt" : ""} ${className}`}
      viewBox="0 0 239 160"
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
      onPointerEnter={talvezPiscar}
    >
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" className="decalq-stop-a" />
          <stop offset="1" className="decalq-stop-b" />
        </linearGradient>
        {/* buracos da janela (corpo + três bolinhas) e o vão do cursor */}
        <mask
          id={mask}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="239"
          height="160"
        >
          <rect width="239" height="160" fill="#fff" />
          <g transform={GIRO} fill="#000">
            <rect x="-64.84" y="-31" width="138.61" height="84" rx="9" />
            <circle cx="-50.8" cy="-49.75" r="6.5" />
            <circle cx="-28.45" cy="-49.75" r="6.5" />
            <circle cx="-6.5" cy="-49.75" r="6.5" />
          </g>
          <path
            d={CURSOR}
            fill="#000"
            stroke="#000"
            strokeWidth="18"
            strokeLinejoin="round"
          />
        </mask>
      </defs>

      <g fill={`url(#${grad})`}>
        <g mask={`url(#${mask})`}>
          <g transform={GIRO}>
            <rect
              x="-79.65"
              y="-68.51"
              width="165.28"
              height="137.3"
              rx="16"
            />
          </g>
        </g>

        <g
          className={`decalq-olhos ${piscando ? "piscar" : ""}`}
          transform={GIRO}
          fill="none"
          stroke={`url(#${grad})`}
          strokeWidth="11"
          strokeLinecap="round"
          onAnimationEnd={() => setPiscando(false)}
        >
          <path className="decalq-olho" d="M-38.4 10.75 A 14 14 0 0 1 -10.68 10.75" />
          {/* Só este olho pisca no clique. A `key` muda a cada clique para que
              a animação recomece do zero mesmo se a anterior ainda estiver
              rodando — remontar o path é o jeito mais simples de reiniciá-la. */}
          <path
            key={wink}
            className={`decalq-olho ${wink > 0 ? "piscadinha" : ""}`}
            d="M17.6 9.95 A 14 14 0 0 1 45.32 9.95"
          />
        </g>

        <g
          className={`decalq-cursor ${clicking ? "clicou" : ""}`}
          onAnimationEnd={onClickingEnd}
        >
          <path d={CURSOR} stroke={`url(#${grad})`} strokeWidth="1.5" strokeLinejoin="round" />
          <g
            className="decalq-tracos"
            stroke={`url(#${grad})`}
            strokeWidth="13.5"
            strokeLinecap="round"
          >
            <path d="M200.25 40.75 L192.75 62.25" />
            <path d="M211.75 78.25 L231.25 65.75" />
          </g>
        </g>
      </g>
    </svg>
  );
}
