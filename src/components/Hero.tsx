"use client";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Command,
  Layers3,
  SlidersHorizontal,
  Sparkles,
  Zap,
} from "lucide-react";
import { PrimaryButton, SecondaryButton } from "./Button";
import {
  Counter,
  EASE,
  Parallax,
  useMouseTilt,
  useReducedMotion,
} from "./Motion";
import { Magnetic } from "./Magnetic";
import { projects } from "@/data/projects";
import { processSteps, services } from "@/data/services";
import { technologyGroups } from "@/data/technologies";

/* Sequência cinematográfica: cada bloco entra em ordem. */
const seq = (i: number) => ({
  duration: 0.9,
  ease: EASE,
  delay: 0.15 + i * 0.12,
});

const stats = [
  { value: projects.length, label: "Cases" },
  { value: services.length, label: "Frentes" },
  {
    value: technologyGroups.reduce((n, g) => n + g.items.length, 0),
    label: "Tecnologias",
  },
  { value: processSteps.length, label: "Etapas" },
];

export function Hero() {
  const reduced = useReducedMotion();
  const initial = reduced ? false : "hidden";
  return (
    <div className="hero-wrap">
      <motion.div
        className="hero-glow"
        aria-hidden="true"
        initial={reduced ? false : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      />
      <section className="hero container" data-tone="hero">
        <div className="hero-copy">
          <motion.div
            className="eyebrow"
            variants={{
              hidden: { opacity: 0, x: -12 },
              visible: { opacity: 1, x: 0 },
            }}
            initial={initial}
            animate="visible"
            transition={seq(0)}
          >
            Estúdio de tecnologia &amp; desenvolvimento
          </motion.div>

          <motion.h1
            initial={initial}
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.11, delayChildren: 0.3 },
              },
            }}
          >
            {[
              <>Transformamos</>,
              <>problemas em</>,
              <span className="gradient-text" key="g">
                soluções digitais.
              </span>,
            ].map((line, i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  overflow: "hidden",
                  paddingBottom: "0.1em",
                  marginBottom: "-0.1em",
                }}
              >
                <motion.span
                  style={{ display: "block" }}
                  variants={{
                    hidden: { y: "110%", rotate: 2 },
                    visible: {
                      y: "0%",
                      rotate: 0,
                      transition: { duration: 1, ease: EASE },
                    },
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            initial={initial}
            animate="visible"
            transition={seq(4)}
          >
            Desenvolvemos sites, sistemas, automações e ferramentas
            personalizadas que simplificam processos e transformam ideias em
            produtos reais.
          </motion.p>

          <motion.div
            className="hero-actions"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            initial={initial}
            animate="visible"
            transition={seq(5)}
          >
            <Magnetic>
              <PrimaryButton href="/projetos">Conhecer projetos</PrimaryButton>
            </Magnetic>
            <Magnetic strength={0.12}>
              <SecondaryButton href="/contato">Falar conosco</SecondaryButton>
            </Magnetic>
          </motion.div>

          <motion.div
            className="hero-foot"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            initial={initial}
            animate="visible"
            transition={seq(6)}
          >
            <div className="hero-stats" aria-label="Resumo do portfólio">
              {stats.map((s) => (
                <div className="hero-stat" key={s.label}>
                  <strong>
                    <Counter to={s.value} />
                  </strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
            <a
              href="#projetos"
              className="scroll-cue"
              aria-label="Ir aos projetos"
            >
              <ArrowDown size={16} />
            </a>
          </motion.div>
        </div>

        <Parallax speed={-0.12} className="hero-art-parallax">
          <HeroScene />
        </Parallax>
      </section>
      <div className="hero-line" aria-hidden="true" />
    </div>
  );
}

function HeroScene() {
  const reduced = useReducedMotion();
  const { ref, rotateX, rotateY } = useMouseTilt(3.5);
  return (
    <motion.div
      className="hero-art"
      aria-label="Composição de interfaces demonstrativas"
      role="img"
      initial={reduced ? false : { opacity: 0, x: 40, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1.3, ease: EASE, delay: 0.5 }}
    >
      <motion.div
        ref={ref}
        className="hero-art-inner"
        style={reduced ? undefined : { rotateX, rotateY }}
      >
        <div className="art-caption">
          <span>Ideias conectadas. Soluções reais.</span>
          <span>01 — 06</span>
        </div>

        <motion.div
          className="app-window"
          animate={reduced ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
        >
          <div className="window-top">
            <span className="window-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>workspace / visão geral</span>
            <Command size={13} />
          </div>
          <div className="app-body">
            <aside>
              <span className="app-symbol">✳</span>
              <Layers3 size={17} />
              <SlidersHorizontal size={17} />
              <span className="side-line" />
              <span className="side-line" />
            </aside>
            <div className="app-main">
              <div className="app-heading">
                <div>
                  <small>Seu trabalho, organizado.</small>
                  <h3>Visão geral</h3>
                </div>
                <span className="mini-tag">Demonstração</span>
              </div>
              <div className="stat-row">
                <div>
                  <small>Projetos</small>
                  <strong>
                    Em movimento <ArrowUpRight size={14} />
                  </strong>
                </div>
                <div>
                  <small>Processos</small>
                  <strong>
                    Conectados <span className="status-dot" />
                  </strong>
                </div>
              </div>
              <div className="chart-title">
                Atividade do projeto<span>Esta semana</span>
              </div>
              <div className="chart">
                <svg
                  viewBox="0 0 430 130"
                  aria-label="Gráfico ilustrativo, sem métricas reais"
                  role="img"
                >
                  <defs>
                    <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop stopColor="var(--primary)" stopOpacity=".28" />
                      <stop
                        offset="1"
                        stopColor="var(--primary)"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M0 110 L40 96 L80 102 L125 67 L160 78 L205 44 L250 55 L300 18 L340 28 L390 12 L430 22 L430 130 L0 130Z"
                    fill="url(#chart-fill)"
                    initial={reduced ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                  />
                  <motion.path
                    d="M0 110 L40 96 L80 102 L125 67 L160 78 L205 44 L250 55 L300 18 L340 28 L390 12 L430 22"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={reduced ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.1, duration: 1.6, ease: EASE }}
                  />
                </svg>
              </div>
              <div className="chart-days">
                <span>SEG</span>
                <span>TER</span>
                <span>QUA</span>
                <span>QUI</span>
                <span>SEX</span>
              </div>
              <div className="task-line">
                <Check size={13} /> Estrutura pronta para evoluir{" "}
                <span>Concluído</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="code-window"
          initial={reduced ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1 }}
        >
          <motion.div
            animate={reduced ? undefined : { y: [0, 5, 0] }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 1,
            }}
          >
            <div className="code-title">
              <span className="code-dot" /> automation.py <span>PYTHON</span>
            </div>
            <pre>
              <span>def</span> <span className="fn">transformar</span>(ideia):
              {"\n"} problema = entender(ideia)
              {"\n"} solução = desenvolver(problema)
              {"\n"} <span>return</span> solução
              <span className="code-caret" aria-hidden="true" />
            </pre>
            <div className="code-bottom">
              <Check size={13} /> Menos tarefas. Mais possibilidades.
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="float-chip a"
          initial={reduced ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.5 }}
        >
          <Zap size={12} /> Automação ativa
        </motion.div>
        <motion.div
          className="float-chip b"
          initial={reduced ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.7 }}
        >
          <Sparkles size={12} /> Interface responsiva
        </motion.div>

        <div className="art-bottom">
          <span>Design + código + propósito</span>
          <span>↓</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
