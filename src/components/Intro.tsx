"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { siteConfig } from "@/config/site";
import { EASE, useReducedMotion } from "./Motion";

/* Assinatura da marca antes do Hero. Uma timeline só: o Hero começa a entrar
   enquanto a intro ainda está saindo (ver HERO_DELAY vs. EXIT). */
const KEY = "decalq:intro";
const ENTER = 0.75; // logo surgindo do blur
const HOLD = 1.1; // quando a intro começa a sair
const EXIT = 0.5; // duração da saída
const HERO_DELAY = 1.05; // Hero entra antes de a intro terminar

const CALM = { hold: 0.35, exit: 0.25, heroDelay: 0.3 };

type IntroState = { ready: boolean; delay: number };
const IntroContext = createContext<IntroState>({ ready: true, delay: 0 });

/** Atraso que o Hero deve aplicar para continuar a timeline da intro. */
export const useIntro = () => useContext(IntroContext);

/**
 * Decide, uma única vez por aba, se a intro deve tocar. O valor fica em cache
 * no módulo: voltar de um projeto ou navegar entre rotas não repete a intro.
 * "idle" é o valor de servidor/hidratação — nada anima até a decisão chegar,
 * e por isso não existe divergência de hidratação.
 */
type Decision = "idle" | "play" | "skip";
let cached: Exclude<Decision, "idle"> | null = null;
const noopSubscribe = () => () => {};

function useDecision(pathname: string): Decision {
  return useSyncExternalStore<Decision>(
    noopSubscribe,
    () => {
      if (pathname !== "/") return "skip";
      if (cached === null) {
        try {
          cached = sessionStorage.getItem(KEY) === "1" ? "skip" : "play";
        } catch {
          cached = "play"; // sessionStorage bloqueado: toca uma vez
        }
      }
      return cached;
    },
    () => "idle",
  );
}

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const decision = useDecision(pathname);
  const [finished, setFinished] = useState(false);
  // Rede de segurança: nada no hero pode ficar preso invisível esperando a
  // decisão. Se ela não chegar, liberamos a entrada assim mesmo.
  const [failsafe, setFailsafe] = useState(false);
  const playing = decision === "play" && !finished;

  useEffect(() => {
    if (decision !== "play") return;
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* sem sessionStorage: a decisão já está em cache no módulo */
    }
    window.scrollTo(0, 0);
    const timer = window.setTimeout(
      () => setFinished(true),
      (reduced ? CALM.hold : HOLD) * 1000,
    );
    return () => window.clearTimeout(timer);
  }, [decision, reduced]);

  // Trava o scroll apenas enquanto a intro está na tela.
  useEffect(() => {
    if (!playing) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [playing]);

  useEffect(() => {
    if (decision !== "idle") return;
    const timer = window.setTimeout(() => setFailsafe(true), 1200);
    return () => window.clearTimeout(timer);
  }, [decision]);

  // O atraso vem da decisão (estável), não do fim da intro: assim a transição
  // do Hero não é reiniciada quando o overlay sai.
  const delay =
    decision === "play" ? (reduced ? CALM.heroDelay : HERO_DELAY) : 0;

  return (
    <IntroContext.Provider
      value={{ ready: decision !== "idle" || failsafe, delay }}
    >
      <AnimatePresence>
        {playing && <IntroOverlay reduced={reduced} />}
      </AnimatePresence>
      {children}
    </IntroContext.Provider>
  );
}

function IntroOverlay({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="brand-intro"
      aria-hidden="true"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: reduced ? CALM.exit : EXIT, ease: EASE },
      }}
    >
      <motion.div
        className="brand-intro-logo"
        initial={
          reduced
            ? { opacity: 0 }
            : { opacity: 0, scale: 1.08, y: 10, filter: "blur(16px)" }
        }
        animate={
          reduced
            ? { opacity: 1, transition: { duration: 0.25 } }
            : {
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: ENTER, ease: EASE },
              }
        }
        exit={
          reduced
            ? { opacity: 0, transition: { duration: CALM.exit } }
            : {
                scale: 0.92,
                opacity: 0,
                filter: "blur(6px)",
                transition: { duration: EXIT, ease: EASE },
              }
        }
      >
        <Image
          src={siteConfig.logo || "/brand/logo.png"}
          alt=""
          width={239}
          height={160}
          priority
        />
        {/* luz atravessando a logo: máscara com a própria imagem */}
        {!reduced && (
          <motion.span
            className="brand-intro-sweep"
            initial={{ x: "-130%" }}
            animate={{
              x: "130%",
              transition: { duration: 0.85, delay: 0.42, ease: EASE },
            }}
          />
        )}
      </motion.div>
      {!reduced && (
        <motion.span
          className="brand-intro-glow"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: [0, 0.9, 0.45],
            scale: 1,
            transition: { duration: 1.1, ease: EASE },
          }}
          exit={{ opacity: 0, transition: { duration: EXIT } }}
        />
      )}
    </motion.div>
  );
}
