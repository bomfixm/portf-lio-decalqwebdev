"use client";
import { motion } from "framer-motion";
import { EASE, useReducedMotion } from "./Motion";

/**
 * Imagem que "assenta" ao entrar: scale 1.08 → 1 enquanto o container
 * (um Reveal/Stagger acima na árvore) revela o card. Herda os estados
 * hidden/visible do ancestral via propagação de variants do Framer.
 */
export function RevealImage({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced)
    return <div className={`reveal-image ${className}`}>{children}</div>;
  return (
    <motion.div
      className={`reveal-image ${className}`}
      variants={{
        hidden: { scale: 1.08 },
        visible: { scale: 1, transition: { duration: 1.4, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
