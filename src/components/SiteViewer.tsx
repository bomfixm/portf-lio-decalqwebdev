"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, LoaderCircle } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { siteConfig } from "@/config/site";
import { EASE, useMounted, useReducedMotion } from "./Motion";
import { usePointerVars } from "@/lib/pointer";
import { canGoBackInternally } from "@/lib/history";
import { Magnetic } from "./Magnetic";

/**
 * Visualizador: o site do cliente roda dentro do portfólio, com uma barra
 * nossa no topo. Assim o visitante nunca perde o caminho de volta — e não é
 * preciso instalar nada no site visitado.
 *
 * O botão suspenso fica visível o tempo todo. A barra do topo aparece na
 * entrada (contexto: marca, nome do case, domínio, abrir em nova aba) e se
 * recolhe de vez, para o site ocupar a tela inteira — sem ficar alternando.
 * Como o iframe é de outra origem, não dá para ouvir o scroll dentro dele; os
 * gatilhos do recolhimento são o tempo e o momento em que o visitante passa a
 * usar o site (o foco vai para o iframe).
 *
 * "Voltar" usa o histórico quando o visitante veio do case (volta à posição
 * exata do scroll); em acesso direto ao link, navega para o case.
 */
const COLLAPSE_AFTER = 3200; // ms de barra aberta antes de recolher

export function SiteViewer({
  title,
  url,
  caseHref,
}: {
  title: string;
  url: string;
  caseHref: string;
}) {
  const router = useRouter();
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const [loaded, setLoaded] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [barHover, setBarHover] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  const onPointerMove = usePointerVars<HTMLAnchorElement>();
  const onPointerMoveBtn = usePointerVars<HTMLAnchorElement>();

  // Avaliado no mount: depois disso o próprio clique no botão já conta como
  // navegação interna e falsearia a resposta.
  const cameFromSite = useRef(false);
  useEffect(() => {
    cameFromSite.current = canGoBackInternally();
  }, []);

  const goBack = useCallback(
    (event?: { preventDefault: () => void }) => {
      // Veio do case: volta pelo histórico e recupera a posição do scroll.
      // Acesso direto ao link: segue o href (Link para o case).
      if (!cameFromSite.current) return;
      event?.preventDefault();
      router.back();
    },
    [router],
  );

  // Esc fecha o visualizador.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (cameFromSite.current) router.back();
      else router.push(caseHref);
    };
    document.addEventListener("keydown", onKey);
    // Sem travar o scroll do documento: o iframe cobre a tela e consome a
    // rolagem, e o body livre permite que o Next restaure a posição do case
    // ao voltar.
    return () => document.removeEventListener("keydown", onKey);
  }, [router, caseHref]);

  // Recolhe sozinha depois de um tempo, a menos que o ponteiro esteja nela.
  useEffect(() => {
    if (collapsed || barHover) return;
    const timer = window.setTimeout(() => setCollapsed(true), COLLAPSE_AFTER);
    return () => window.clearTimeout(timer);
  }, [collapsed, barHover]);

  // O visitante começou a usar o site: o foco vai para o iframe e a janela
  // perde o foco — único sinal de interação que atravessa a fronteira de origem.
  useEffect(() => {
    const onBlur = () => {
      if (document.activeElement === frame.current) setCollapsed(true);
    };
    window.addEventListener("blur", onBlur);
    return () => window.removeEventListener("blur", onBlur);
  }, []);

  if (!mounted) return null;

  // Portal para o <body>: o template de rota anima um `transform`, e um
  // ancestral transformado vira o bloco de contenção de um `position: fixed`.
  return createPortal(
    <motion.div
      className="viewer"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <motion.div
        className="viewer-bar"
        animate={{ y: collapsed ? "-100%" : "0%" }}
        transition={reduced ? { duration: 0 } : { duration: 0.45, ease: EASE }}
        onPointerEnter={() => setBarHover(true)}
        onPointerLeave={() => setBarHover(false)}
        inert={collapsed}
      >
        <Link
          href={caseHref}
          className="viewer-back"
          onClick={goBack}
          onPointerMove={onPointerMove}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span className="viewer-back-label">Voltar ao portfólio</span>
          <span className="viewer-back-short">Portfólio</span>
        </Link>

        <div className="viewer-id">
          <Image
            src={siteConfig.logo || "/brand/logo.png"}
            alt=""
            width={36}
            height={24}
            className="viewer-logo"
          />
          <span className="viewer-title">{title}</span>
          <span className="viewer-host">{new URL(url).host}</span>
        </div>

        <a
          className="viewer-open"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Abrir em nova aba</span>
          <ExternalLink size={15} aria-hidden="true" />
        </a>
      </motion.div>

      {/* Botão suspenso: presente o tempo todo, independente da barra. */}
      <motion.div
        className="viewer-pill-wrap"
        initial={reduced ? false : { opacity: 0, y: 14, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={
          reduced ? { duration: 0 } : { duration: 0.6, delay: 0.25, ease: EASE }
        }
      >
        <Magnetic strength={0.16}>
          <Link
            href={caseHref}
            className="viewer-pill"
            onClick={goBack}
            onPointerMove={onPointerMove}
          >
            <ArrowLeft size={15} aria-hidden="true" />
            <Image
              src={siteConfig.logo || "/brand/logo.png"}
              alt=""
              width={27}
              height={18}
              className="viewer-pill-logo"
            />
            <span>Portfólio</span>
          </Link>
        </Magnetic>
        <Magnetic strength={0.16}>
          <a
            className="viewer-pill-open"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir o site em nova aba"
            title="Abrir em nova aba"
            onPointerMove={onPointerMoveBtn}
          >
            <ExternalLink size={15} aria-hidden="true" />
          </a>
        </Magnetic>
      </motion.div>

      <div className="viewer-frame">
        {!loaded && (
          <div className="viewer-loading" role="status">
            <LoaderCircle className="spin" size={22} aria-hidden="true" />
            <span>Carregando {title}…</span>
          </div>
        )}
        <iframe
          ref={frame}
          src={url}
          title={`${title} — site publicado`}
          onLoad={() => setLoaded(true)}
          allow="clipboard-write; fullscreen"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </motion.div>,
    document.body,
  );
}
