"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PrimaryButton, SecondaryButton } from "./Button";
import { EASE, useReducedMotion } from "./Motion";
import { useIntro } from "./Intro";
import { projects } from "@/data/projects";

/* A abertura continua a timeline da intro: `offset` evita corte entre uma e
   outra. Um único momento orquestrado — depois disso a página fica quieta. */
const seq = (i: number, offset = 0) => ({
  duration: 0.8,
  ease: EASE,
  delay: offset + 0.1 + i * 0.09,
});

/** Endereço do site, como apareceria na barra de um navegador. */
const endereco = (p: { liveUrl?: string; slug: string }) =>
  p.liveUrl
    ? p.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : `${p.slug}.decalq`;

export function Hero() {
  const reduced = useReducedMotion();
  const { ready, delay } = useIntro();
  const initial = reduced ? false : "hidden";
  // Enquanto não sabemos se a intro vai rodar, o Hero espera.
  const show = reduced || ready ? "visible" : "hidden";

  const vitrine = projects.filter((p) => p.featured && !p.demo).slice(0, 3);

  const sobe = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="hero-wrap">
      <motion.div
        className="hero-glow"
        aria-hidden="true"
        initial={reduced ? false : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: EASE, delay }}
      />
      <section className="hero container" data-tone="hero">
        <div className="hero-lead">
          <motion.h1 initial={initial} animate={show} variants={sobe} transition={seq(0, delay)}>
            Transformamos problemas
            <br />
            em soluções digitais.
          </motion.h1>

          <motion.p
            initial={initial}
            animate={show}
            variants={sobe}
            transition={seq(1, delay)}
          >
            Sites, sistemas e automações que simplificam processos e
            transformam ideias em produtos reais.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={initial}
            animate={show}
            variants={sobe}
            transition={seq(2, delay)}
          >
            <PrimaryButton href="/projetos">Ver os projetos</PrimaryButton>
            <SecondaryButton href="/contato">Falar com a gente</SecondaryButton>
          </motion.div>
        </div>

        {/* Vitrine: três janelas com trabalho no ar. O cromo (cantos, pontos,
            endereço) é a linguagem do próprio símbolo da marca. */}
        <motion.div
          className="vitrine"
          initial={initial}
          animate={show}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.09, delayChildren: delay + 0.35 } },
          }}
        >
          {vitrine.map((p) => (
            <motion.article
              className="janela"
              key={p.slug}
              /* Nunca condicionar `variants`: sem alvo definido o elemento
                 fica preso no estado inicial. Com movimento reduzido o
                 estado oculto é igual ao visível. */
              variants={{
                hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 26 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <div className="janela-cromo">
                <span className="janela-pontos" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="janela-url">{endereco(p)}</span>
              </div>
              <Link href={`/projetos/${p.slug}`} className="janela-tela">
                <Image
                  src={p.cover}
                  alt={`Site da ${p.title}`}
                  width={1200}
                  height={780}
                  priority
                  sizes="(max-width: 900px) 88vw, 420px"
                />
              </Link>
              <div className="janela-pe">
                <h2>{p.title}</h2>
                <p>{p.shortDescription}</p>
                <Link href={`/projetos/${p.slug}`} className="janela-link">
                  Ver o case
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>
      <div className="hero-line" aria-hidden="true" />
    </div>
  );
}
