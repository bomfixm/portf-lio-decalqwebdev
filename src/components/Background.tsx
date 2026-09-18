"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { EASE, useReducedMotion } from "./Motion";

/**
 * Camada ambiente fixa: gradiente base + luzes difusas que deslizam
 * levemente com o scroll + grid sutil + grain. Tudo decorativo.
 *
 * Storytelling de fundo: seções com `data-tone` mudam, ao entrar no centro
 * da tela, qual luz domina (CSS lê `html[data-tone]`). Um único observer,
 * recriado a cada rota.
 */
export function Background() {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 3000], [0, 260]);
  const y2 = useTransform(scrollY, [0, 3000], [0, -180]);
  const y3 = useTransform(scrollY, [0, 3000], [0, 120]);

  useEffect(() => {
    const root = document.documentElement;
    const sections = document.querySelectorAll<HTMLElement>("[data-tone]");
    if (!sections.length) {
      delete root.dataset.tone;
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find(
          (e): e is IntersectionObserverEntry & { target: HTMLElement } =>
            e.isIntersecting && e.target instanceof HTMLElement,
        );
        if (hit) root.dataset.tone = hit.target.dataset.tone;
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => {
      io.disconnect();
      delete root.dataset.tone;
    };
  }, [pathname]);

  return (
    <motion.div
      className="ambient"
      aria-hidden="true"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: EASE }}
    >
      <motion.div
        className="ambient-glow primary"
        style={{ y: reduced ? 0 : y1 }}
      />
      <motion.div
        className="ambient-glow secondary"
        style={{ y: reduced ? 0 : y2 }}
      />
      <motion.div
        className="ambient-glow tertiary"
        style={{ y: reduced ? 0 : y3 }}
      />
      <div className="ambient-grid" />
      <div className="ambient-noise" />
    </motion.div>
  );
}
