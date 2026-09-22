"use client";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PrimaryButton } from "./Button";
import { useMediaQuery } from "./Motion";

/**
 * CTA única da seção final.
 *
 * Desktop (hover: hover + pointer: fine): um selo circular — link real —
 * acompanha o cursor dentro da seção pai com inércia (MotionValues + spring,
 * sem state React por mousemove), aparece ao entrar e some ao sair.
 *
 * Toque / sem hover preciso: um único botão estático centralizado, com a
 * mesma identidade. A troca é feita por CSS (@media hover/pointer), então não
 * há flash na hidratação; no desktop o botão estático continua acessível ao
 * teclado (fica visível ao receber foco).
 */
export function CursorCta({
  href = "/contato",
  label = "Falar\nconosco",
}: {
  href?: string;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [active, setActive] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 90, damping: 16, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 90, damping: 16, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;
    const area = ref.current?.parentElement;
    if (!area) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = area.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
    };
    const enter = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = area.getBoundingClientRect();
      // Nasce onde o cursor entrou, sem "voar" desde o canto.
      x.jump(e.clientX - r.left);
      y.jump(e.clientY - r.top);
      setActive(true);
    };
    const leave = () => setActive(false);
    area.addEventListener("pointerenter", enter);
    area.addEventListener("pointermove", move);
    area.addEventListener("pointerleave", leave);
    return () => {
      area.removeEventListener("pointerenter", enter);
      area.removeEventListener("pointermove", move);
      area.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  const lines = label.split("\n");
  return (
    <>
      <div ref={ref} className="cursor-cta-layer">
        {enabled && (
          <motion.div
            className="cursor-cta-follow"
            style={{ x: sx, y: sy }}
            initial={false}
            animate={{
              opacity: active ? 1 : 0,
              scale: active ? 1 : 0.6,
              rotate: active ? 0 : -12,
            }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={href}
              className="cursor-cta"
              tabIndex={-1}
              aria-hidden="true"
            >
              <span className="cursor-cta-inner">
                {lines.map((line, i) => (
                  <span key={i}>{line}</span>
                ))}
                <ArrowUpRight size={16} />
              </span>
            </Link>
          </motion.div>
        )}
      </div>
      {/* Fora da camada absoluta: fica no fluxo, abaixo do texto. */}
      <div className="cta-fallback">
        <PrimaryButton href={href} large>
          {lines.join(" ")}
        </PrimaryButton>
      </div>
    </>
  );
}
