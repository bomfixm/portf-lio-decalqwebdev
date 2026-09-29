"use client";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { siteConfig } from "@/config/site";
import { EASE } from "./Motion";
import { BrandSymbol } from "./BrandSymbol";

/* Assinatura da marca antes do Hero: o decalqzinho entra deslizando de fora
   da tela, para no centro, dá a MESMA piscadinha do clique na logo (o mesmo
   componente e a mesma animação de olho) e some enquanto a cortina revela o
   site. Uma timeline só — HERO_DELAY começa antes de HOLD terminar. */
const KEY = "decalq:intro";
const WINK_AT = 1.25; // piscadinha, logo depois de parar no centro
const HOLD = 1.95; // quando a cortina começa a sair
const HERO_DELAY = 1.85; // Hero entra antes de a intro terminar
const EXIT = 0.75; // duração da saída
const EXIT_SKIP = 0.4; // saída quando o visitante pula

type IntroState = { ready: boolean; delay: number };
const IntroContext = createContext<IntroState>({ ready: true, delay: 0 });

/** Atraso que o Hero deve aplicar para continuar a timeline da intro. */
export const useIntro = () => useContext(IntroContext);

/**
 * Decide, uma única vez por aba, se a intro deve tocar. O valor fica em cache
 * no módulo: voltar de um projeto ou navegar entre rotas não repete a intro.
 * "idle" é o valor de servidor/hidratação — nada anima até a decisão chegar,
 * e por isso não existe divergência de hidratação.
 *
 * A preferência por menos movimento é lida aqui, junto com a decisão, para que
 * o overlay nunca chegue a montar nesse caso (nada de piscar e sumir).
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
        const calmo = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        try {
          cached =
            calmo || sessionStorage.getItem(KEY) === "1" ? "skip" : "play";
        } catch {
          cached = calmo ? "skip" : "play"; // sessionStorage bloqueado
        }
      }
      return cached;
    },
    () => "idle",
  );
}

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const decision = useDecision(pathname);
  const [finished, setFinished] = useState(false);
  // Rede de segurança: nada no hero pode ficar preso invisível esperando a
  // decisão. Se ela não chegar, liberamos a entrada assim mesmo.
  const [failsafe, setFailsafe] = useState(false);
  // Quando o visitante pula antes de o Hero começar, ele entra na hora.
  const [pulou, setPulou] = useState(false);
  const inicio = useRef(0);
  const playing = decision === "play" && !finished;

  const encerrar = useCallback(() => {
    if (
      inicio.current &&
      performance.now() - inicio.current < HERO_DELAY * 1000
    )
      setPulou(true);
    setFinished(true);
  }, []);

  useEffect(() => {
    if (decision !== "play") return;
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* sem sessionStorage: a decisão já está em cache no módulo */
    }
    window.scrollTo(0, 0);
    inicio.current = performance.now();
    const timer = window.setTimeout(() => setFinished(true), HOLD * 1000);
    return () => window.clearTimeout(timer);
  }, [decision]);

  // Trava o scroll apenas enquanto a intro está na tela e devolve a página
  // assim que ela sai — inclusive para o CSS que segura a rolagem antes da
  // hidratação (ver o script anti-flash em layout.tsx).
  useEffect(() => {
    document.documentElement.dataset.intro = playing ? "play" : "done";
    if (!playing) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [playing]);

  // Clicar, tocar ou tentar rolar encerra a intro suavemente.
  useEffect(() => {
    if (!playing) return;
    const porTecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") encerrar();
    };
    const opts = { passive: true } as const;
    window.addEventListener("pointerdown", encerrar, opts);
    window.addEventListener("wheel", encerrar, opts);
    window.addEventListener("touchmove", encerrar, opts);
    window.addEventListener("keydown", porTecla);
    return () => {
      window.removeEventListener("pointerdown", encerrar);
      window.removeEventListener("wheel", encerrar);
      window.removeEventListener("touchmove", encerrar);
      window.removeEventListener("keydown", porTecla);
    };
  }, [playing, encerrar]);

  useEffect(() => {
    if (decision !== "idle") return;
    const timer = window.setTimeout(() => setFailsafe(true), 1200);
    return () => window.clearTimeout(timer);
  }, [decision]);

  // O atraso vem da decisão (estável), não do fim da intro: assim a transição
  // do Hero não é reiniciada quando o overlay sai.
  // O Hero entra pouco antes de a cortina subir: uma timeline só.
  const delay = pulou ? 0.1 : decision === "play" ? HERO_DELAY : 0;

  return (
    <IntroContext.Provider
      value={{ ready: decision !== "idle" || failsafe, delay }}
    >
      <AnimatePresence>
        {playing && <IntroOverlay onSkip={encerrar} />}
      </AnimatePresence>
      {children}
    </IntroContext.Provider>
  );
}

function IntroOverlay({ onSkip }: { onSkip: () => void }) {
  // A saída é mais rápida quando o visitante pula; guardamos a duração em
  // estado para que o `exit` use o mesmo valor que o clique acabou de definir.
  const [exitDur, setExitDur] = useState(EXIT);
  const [saindo, setSaindo] = useState(false);
  // Mesmo contador que a logo do cabeçalho usa: um incremento, uma piscadinha.
  const [wink, setWink] = useState(0);

  useEffect(() => {
    const piscada = window.setTimeout(() => setWink(1), WINK_AT * 1000);
    const cortina = window.setTimeout(() => setSaindo(true), HOLD * 1000);
    return () => {
      window.clearTimeout(piscada);
      window.clearTimeout(cortina);
    };
  }, []);

  const pular = () => {
    setExitDur(EXIT_SKIP);
    setSaindo(true);
    onSkip();
  };

  return (
    <motion.div
      className="brand-intro"
      // durante a saída a cortina não pode mais interceptar cliques do Hero
      style={{ pointerEvents: saindo ? "none" : "auto" }}
      initial={{ clipPath: "inset(0% 0 0% 0)" }}
      exit={{
        clipPath: "inset(100% 0 0% 0)",
        transition: { duration: exitDur, ease: EASE },
      }}
    >
      <motion.div
        className="brand-intro-stage"
        aria-hidden="true"
        exit={{
          opacity: 0,
          transition: { duration: exitDur * 0.65, ease: EASE },
        }}
      >
        {/* A entrada é CSS (ver .brand-intro-logo): a distância sai de
            calc(-50vw - 60%), então ele começa fora da tela em qualquer
            largura, sem número mágico e sem rolagem horizontal. */}
        <BrandSymbol
          className="brand-intro-logo"
          wink={wink}
          blinkOnHover={false}
        />
        <span className="brand-intro-line">
          <motion.span
            initial={{ y: "115%" }}
            animate={{
              y: "0%",
              transition: { duration: 0.7, delay: 0.5, ease: EASE },
            }}
          >
            {siteConfig.slogan}
          </motion.span>
        </span>
        <motion.i
          className="brand-intro-rule"
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: 1,
            transition: { duration: 0.4, delay: 0.95, ease: EASE },
          }}
        />
      </motion.div>
      <motion.span
        className="brand-intro-glow"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{
          opacity: [0, 0.9, 0.5],
          scale: 1,
          transition: { duration: 1.4, ease: EASE },
        }}
        exit={{ opacity: 0, transition: { duration: 0.4 } }}
      />
      <motion.button
        type="button"
        className="brand-intro-skip"
        onClick={pular}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.7 } }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      >
        Pular intro
      </motion.button>
    </motion.div>
  );
}
