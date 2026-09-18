"use client";
import { motion } from "framer-motion";
import { EASE, useReducedMotion } from "@/components/Motion";

/** Transição suave entre rotas (fade + leve deslocamento). */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
