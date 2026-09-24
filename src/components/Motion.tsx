"use client";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type TargetAndTransition,
  type Variants,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

/**
 * useMediaQuery sem divergência de hidratação: o servidor e a primeira
 * renderização do cliente usam `fallback`; o valor real entra em seguida
 * via useSyncExternalStore.
 */
const noopSubscribe = () => () => {};

export function useMediaQuery(query: string, fallback = false): boolean {
  const subscribe = useCallback(
    (cb: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => fallback,
  );
}

/** `true` só depois da hidratação — para portais e APIs de DOM. */
export function useMounted(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/* Tokens de movimento compartilhados por todos os componentes. */
export const EASE = [0.16, 1, 0.3, 1] as const;
const DUR = { fast: 0.35, base: 0.6, slow: 0.9 };

type RevealVariant =
  "up" | "fade" | "scale" | "blur" | "left" | "right" | "clip" | "mask";

const hidden: Record<RevealVariant, TargetAndTransition> = {
  up: { opacity: 0, y: 28 },
  fade: { opacity: 0 },
  scale: { opacity: 0, scale: 0.94 },
  blur: { opacity: 0, filter: "blur(10px)", y: 12 },
  left: { opacity: 0, x: -32 },
  right: { opacity: 0, x: 32 },
  clip: { clipPath: "inset(0 0 100% 0)", y: 24 },
  mask: { clipPath: "inset(0 100% 0 0)" },
};
const visible: Record<RevealVariant, TargetAndTransition> = {
  up: { opacity: 1, y: 0 },
  fade: { opacity: 1 },
  scale: { opacity: 1, scale: 1 },
  blur: { opacity: 1, filter: "blur(0px)", y: 0 },
  left: { opacity: 1, x: 0 },
  right: { opacity: 1, x: 0 },
  clip: { clipPath: "inset(0 0 0% 0)", y: 0 },
  mask: { clipPath: "inset(0 0% 0 0)" },
};

function revealVariants(
  variant: RevealVariant = "up",
  duration = DUR.base,
  delay = 0,
): Variants {
  return {
    hidden: hidden[variant],
    visible: {
      ...visible[variant],
      transition: { duration, delay, ease: EASE },
    },
  };
}

/**
 * Reveal — entrada única ativada pelo scroll.
 * Cada seção pode escolher sua própria "assinatura" de entrada via `variant`.
 */
export function Reveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
  duration = DUR.base,
  amount = 0.2,
  once = true,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
  style?: React.CSSProperties;
}) {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      className={className}
      style={style}
      variants={revealVariants(variant, duration, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger + StaggerItem — cards/listas aparecendo progressivamente.
 */
type MotionTagName = "div" | "ul" | "li" | "section" | "article";

export function Stagger({
  children,
  className = "",
  stagger = 0.08,
  delay = 0,
  amount = 0.15,
  style,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
  style?: React.CSSProperties;
  as?: MotionTagName;
}) {
  const reduced = useReducedMotion();
  const Tag = as;
  const MotionTag = motion[as];
  if (reduced) {
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }
  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount, margin: "0px 0px -8% 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className = "",
  variant = "up",
  duration = DUR.base,
  style,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  duration?: number;
  style?: React.CSSProperties;
  as?: MotionTagName;
}) {
  const reduced = useReducedMotion();
  const Tag = as;
  const MotionTag = motion[as];
  if (reduced) {
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }
  return (
    <MotionTag
      className={className}
      style={style}
      variants={revealVariants(variant, duration)}
    >
      {children}
    </MotionTag>
  );
}

/**
 * LineReveal — cada linha entra deslizando de baixo dentro de uma máscara.
 * Ideal para headlines (funciona com spans de gradiente dentro das linhas).
 */
export function LineReveal({
  lines,
  as: Tag = "h2",
  className = "",
  delay = 0,
  stagger = 0.1,
  inView = true,
}: {
  lines: React.ReactNode[];
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  delay?: number;
  stagger?: number;
  inView?: boolean;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[Tag];
  if (reduced) {
    return (
      <Tag className={className}>
        {lines.map((l, i) => (
          <span key={i} style={{ display: "block" }}>
            {l}
          </span>
        ))}
      </Tag>
    );
  }
  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...(inView
        ? { whileInView: "visible", viewport: { once: true, amount: 0.5 } }
        : { animate: "visible" })}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {lines.map((l, i) => (
        <span
          key={i}
          style={{
            display: "block",
            overflow: "hidden",
            paddingBottom: "0.08em",
            marginBottom: "-0.08em",
          }}
        >
          <motion.span
            style={{ display: "block" }}
            variants={{
              hidden: { y: "110%", rotate: 1.5 },
              visible: {
                y: "0%",
                rotate: 0,
                transition: { duration: 0.9, ease: EASE },
              },
            }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/**
 * Parallax — deslocamento leve de elementos decorativos ligado ao scroll.
 * Use só em camadas decorativas (nunca em texto corrido).
 */
export function Parallax({
  children,
  className = "",
  speed = 0.15,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * -120, speed * 120]);
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, y: reduced ? 0 : y }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Counter — número que "conta" quando entra na tela.
 */
export function Counter({
  to,
  prefix = "",
  suffix = "",
  duration = 1.4,
  pad = 2,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  pad?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? to : 0);
  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduced]);
  const text = String(reduced ? to : value).padStart(pad, "0");
  return (
    <span ref={ref}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}

/**
 * ScrollFill — expõe o progresso (0 → 1) da seção-alvo como a variável CSS
 * `--fill`, que o CSS usa em scaleX (desktop) ou scaleY (mobile).
 */
export function ScrollFill({
  targetRef,
  className = "",
}: {
  targetRef: React.RefObject<HTMLElement | null>;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 80%", "end 60%"],
  });
  const eased = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  return (
    <motion.div
      className={className}
      aria-hidden="true"
      style={
        reduced
          ? ({ "--fill": 1 } as React.CSSProperties)
          : ({ "--fill": eased } as unknown as React.CSSProperties)
      }
    />
  );
}

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const eased = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      aria-hidden="true"
      className="reading-progress"
      style={{ scaleX: eased }}
    />
  );
}

/**
 * useMouseTilt — tilt 3D quase imperceptível seguindo o mouse (desktop).
 */
export function useMouseTilt(max = 4) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 60, damping: 18 });
  const sry = useSpring(ry, { stiffness: 60, damping: 18 });
  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine) and (hover: hover)").matches)
      return;
    const el = ref.current;
    if (!el) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ry.set(px * max * 2);
      rx.set(-py * max * 2);
    };
    const leave = () => {
      rx.set(0);
      ry.set(0);
    };
    const parent = el.parentElement ?? el;
    parent.addEventListener("pointermove", move);
    parent.addEventListener("pointerleave", leave);
    return () => {
      parent.removeEventListener("pointermove", move);
      parent.removeEventListener("pointerleave", leave);
    };
  }, [max, reduced, rx, ry]);
  return { ref, rotateX: srx, rotateY: sry };
}
