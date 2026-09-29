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
} from "react";
import { siteConfig } from "@/config/site";
import { EASE, useMounted, useReducedMotion } from "./Motion";
import { BrandSymbol } from "./BrandSymbol";

/* Abertura da home: o decalqzinho entra deslizando de fora da tela, para no
   centro, dá a MESMA piscadinha do clique na logo (o mesmo componente e a
   mesma animação de olho) e some enquanto a cortina revela o site.
   Uma timeline só — HERO_DELAY começa antes de HOLD terminar.

   Ela toca SEMPRE que a home entra em cena: abertura direta, F5 ou volta por
   navegação interna. Não existe memória de sessão, de visita ou de navegador. */
const WINK_AT = 1.25; // piscadinha, logo depois de parar no centro
const HOLD = 1.95; // quando a cortina começa a sair
const HERO_DELAY = 1.85; // Hero entra antes de a intro terminar
const EXIT = 0.75; // duração da saída
const EXIT_SKIP = 0.4; // saída quando o visitante pula

/* Versão para quem pede menos movimento: o personagem aparece já no centro
   (o deslize é cortado pelo CSS), pisca e sai num fade — sem travessia de
   tela e sem cortina. Aparece do mesmo jeito; o que muda é o movimento. */
const CALMO = { wink: 0.45, hold: 1.2, heroDelay: 1.05, exit: 0.45 };

type IntroState = { ready: boolean; delay: number };
const IntroContext = createContext<IntroState>({ ready: true, delay: 0 });

/** Atraso que o Hero deve aplicar para continuar a timeline da intro. */
export const useIntro = () => useContext(IntroContext);

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  // No servidor e na hidratação nada toca: o overlay é só do cliente, e o
  // fundo antes da hidratação vem do CSS (script anti-flash em layout.tsx).
  const montado = useMounted();
  const tempos = reduced
    ? { hold: CALMO.hold, heroDelay: CALMO.heroDelay }
    : { hold: HOLD, heroDelay: HERO_DELAY };

  const [tocando, setTocando] = useState(false);
  const [pulou, setPulou] = useState(false);
  // `rodada` identifica cada exibição: como vira a key do overlay, voltar
  // para a home remonta tudo e a sequência recomeça do zero.
  const [rodada, setRodada] = useState(0);
  const [visto, setVisto] = useState<string | null>(null);
  const inicio = useRef(0);

  /* Toda entrada na home abre uma exibição nova; sair dela fecha a que
     estiver em cena. Ajuste de estado durante a renderização — é o padrão
     do React para reagir a uma prop/rota que mudou, sem efeito no meio. */
  const rota = montado ? pathname : null;
  if (rota !== visto) {
    setVisto(rota);
    setTocando(rota === "/");
    setPulou(false);
    if (rota === "/") setRodada((n) => n + 1);
  }

  const encerrar = useCallback(() => {
    if (
      inicio.current &&
      performance.now() - inicio.current < tempos.heroDelay * 1000
    )
      setPulou(true);
    setTocando(false);
  }, [tempos.heroDelay]);

  useEffect(() => {
    if (!tocando) return;
    window.scrollTo(0, 0);
    inicio.current = performance.now();
    const timer = window.setTimeout(
      () => setTocando(false),
      tempos.hold * 1000,
    );
    return () => window.clearTimeout(timer);
  }, [tocando, rodada, tempos.hold]);

  // Trava o scroll apenas enquanto a intro está na tela e devolve a página
  // assim que ela sai — inclusive para o CSS que segura a rolagem antes da
  // hidratação (ver o script anti-flash em layout.tsx).
  useEffect(() => {
    document.documentElement.dataset.intro = tocando ? "play" : "done";
    if (!tocando) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [tocando]);

  // Clicar, tocar ou tentar rolar encerra a intro suavemente.
  useEffect(() => {
    if (!tocando) return;
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
  }, [tocando, encerrar]);

  // O atraso é estável durante a exibição, então a entrada do Hero não é
  // reiniciada quando a cortina sai.
  const delay = pulou ? 0.1 : tocando ? tempos.heroDelay : 0;

  return (
    <IntroContext.Provider value={{ ready: montado, delay }}>
      <AnimatePresence>
        {tocando && (
          <IntroOverlay key={rodada} reduced={reduced} onSkip={encerrar} />
        )}
      </AnimatePresence>
      {children}
    </IntroContext.Provider>
  );
}

function IntroOverlay({
  reduced,
  onSkip,
}: {
  reduced: boolean;
  onSkip: () => void;
}) {
  const base = reduced ? CALMO.exit : EXIT;
  // A saída é mais rápida quando o visitante pula; guardamos a duração em
  // estado para que o `exit` use o mesmo valor que o clique acabou de definir.
  const [exitDur, setExitDur] = useState(base);
  const [saindo, setSaindo] = useState(false);
  // Mesmo contador que a logo do cabeçalho usa: um incremento, uma piscadinha.
  const [wink, setWink] = useState(0);

  useEffect(() => {
    const quando = (reduced ? CALMO.wink : WINK_AT) * 1000;
    const espera = (reduced ? CALMO.hold : HOLD) * 1000;
    const piscada = window.setTimeout(() => setWink(1), quando);
    const cortina = window.setTimeout(() => setSaindo(true), espera);
    return () => {
      window.clearTimeout(piscada);
      window.clearTimeout(cortina);
    };
  }, [reduced]);

  const pular = () => {
    setExitDur(EXIT_SKIP);
    setSaindo(true);
    onSkip();
  };

  /* Com movimento reduzido a saída é um fade; no resto, a cortina sobe e
     revela o site por baixo. Em ambos os casos o site fica utilizável mesmo
     se a animação travar: `pointer-events` já cai quando a saída começa. */
  const saida = reduced
    ? { opacity: 0, transition: { duration: exitDur, ease: EASE } }
    : {
        clipPath: "inset(100% 0 0% 0)",
        transition: { duration: exitDur, ease: EASE },
      };

  return (
    <motion.div
      className="brand-intro"
      style={{ pointerEvents: saindo ? "none" : "auto" }}
      initial={reduced ? { opacity: 1 } : { clipPath: "inset(0% 0 0% 0)" }}
      exit={saida}
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
            largura, sem número mágico e sem rolagem horizontal. Com movimento
            reduzido o corte global do CSS zera esse deslize e ele já aparece
            no centro. */}
        <BrandSymbol
          className="brand-intro-logo"
          wink={wink}
          blinkOnHover={false}
        />
        <span className="brand-intro-line">
          <motion.span
            initial={{ y: reduced ? "0%" : "115%" }}
            animate={{
              y: "0%",
              transition: reduced
                ? { duration: 0 }
                : { duration: 0.7, delay: 0.5, ease: EASE },
            }}
          >
            {siteConfig.slogan}
          </motion.span>
        </span>
        <motion.i
          className="brand-intro-rule"
          initial={{ scaleX: reduced ? 1 : 0 }}
          animate={{
            scaleX: 1,
            transition: reduced
              ? { duration: 0 }
              : { duration: 0.4, delay: 0.95, ease: EASE },
          }}
        />
      </motion.div>
      <motion.span
        className="brand-intro-glow"
        aria-hidden="true"
        initial={{ opacity: reduced ? 0.5 : 0, scale: reduced ? 1 : 0.6 }}
        animate={{
          opacity: reduced ? 0.5 : [0, 0.9, 0.5],
          scale: 1,
          transition: reduced ? { duration: 0 } : { duration: 1.4, ease: EASE },
        }}
        exit={{ opacity: 0, transition: { duration: 0.4 } }}
      />
      <motion.button
        type="button"
        className="brand-intro-skip"
        onClick={pular}
        initial={{ opacity: reduced ? 1 : 0 }}
        animate={{
          opacity: 1,
          transition: reduced ? { duration: 0 } : { duration: 0.4, delay: 0.7 },
        }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      >
        Pular intro
      </motion.button>
    </motion.div>
  );
}
