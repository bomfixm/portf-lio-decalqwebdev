"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "./Motion";
import { useEffect, useState } from "react";

/**
 * Luz suave que segue o ponteiro. Só em dispositivos com mouse (pointer: fine)
 * e sem prefers-reduced-motion. Não é um cursor customizado.
 */
export function CursorGlow() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 50, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 50, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (reduced) return;
    const mq = window.matchMedia("(pointer: fine) and (hover: hover)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const leave = () => {
      x.set(-1000);
      y.set(-1000);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      className="cursor-glow"
      aria-hidden="true"
      style={{ x: sx, y: sy }}
    />
  );
}
