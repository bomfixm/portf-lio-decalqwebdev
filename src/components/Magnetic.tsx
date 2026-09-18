"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./Motion";

/**
 * Magnetic hover quase imperceptível: o conteúdo acompanha o ponteiro
 * alguns pixels quando ele está por perto e volta com mola ao sair.
 * Só em dispositivos com mouse; nunca desloca o layout.
 */
export function Magnetic({
  children,
  strength = 0.18,
  max = 7,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 });

  useEffect(() => {
    if (reduced) return;
    const mq = window.matchMedia("(pointer: fine) and (hover: hover)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduced]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const clamp = (v: number) => Math.max(-max, Math.min(max, v));
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x.set(clamp((e.clientX - (r.left + r.width / 2)) * strength));
      y.set(clamp((e.clientY - (r.top + r.height / 2)) * strength));
    };
    const leave = () => {
      x.set(0);
      y.set(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [enabled, max, strength, x, y]);

  return (
    <div ref={ref} className={`magnetic ${className}`}>
      <motion.div style={enabled ? { x: sx, y: sy } : undefined}>
        {children}
      </motion.div>
    </div>
  );
}
