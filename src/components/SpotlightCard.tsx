"use client";
import { useCallback, useRef } from "react";

/**
 * Wrapper que grava a posição do mouse em --mx/--my para o spotlight e a
 * borda em gradiente dos cards (CSS faz o resto). Sem efeito no toque.
 */
export function SpotlightCard({
  as: Tag = "article",
  className = "",
  style,
  children,
}: {
  as?: "article" | "div" | "li";
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // As tags aceitas compartilham a mesma API de HTMLElement usada aqui.
  const Element = Tag as "div";
  const onMove = useCallback((e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);
  return (
    <Element
      ref={ref}
      className={className}
      style={style}
      onPointerMove={onMove}
    >
      {children}
    </Element>
  );
}
