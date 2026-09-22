"use client";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";
import { EASE, useMediaQuery, useReducedMotion } from "./Motion";

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

/**
 * Galeria horizontal guiada pelo scroll vertical.
 *
 * ≥768px: a seção ganha altura extra (100vh + distância) e o viewport fica
 * sticky; o progresso vertical da seção vira translateX do trilho. A distância
 * é medida do conteúdo real (scrollWidth - clientWidth) e recalculada em
 * resize, então o último card sempre termina totalmente visível antes de a
 * página voltar ao fluxo vertical. Nada de preventDefault no wheel.
 *
 * <768px: carrossel nativo com swipe e scroll-snap.
 */
export function HorizontalGallery({
  projects,
  eyebrow,
  title,
  description,
}: {
  projects: Project[];
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  const outer = useRef<HTMLElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const pinned = useMediaQuery("(min-width: 768px)");
  const reduced = useReducedMotion();
  const [distance, setDistance] = useState(0);

  // Mede quanto o trilho excede o viewport; define a altura da seção.
  useEffect(() => {
    if (!pinned) return;
    const trackEl = track.current;
    const stickyEl = sticky.current;
    if (!trackEl || !stickyEl) return;
    const measure = () =>
      setDistance(Math.max(0, trackEl.scrollWidth - stickyEl.clientWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(trackEl);
    ro.observe(stickyEl);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned, projects.length]);

  const { scrollYProgress } = useScroll({
    target: outer,
    offset: ["start start", "end end"],
  });
  const eased = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
  });
  const x = useTransform(eased, (p) => (pinned ? -p * distance : 0));

  return (
    <section
      ref={outer}
      className={`hgal ${pinned ? "pinned" : ""}`}
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
      aria-label="Mais projetos"
      data-tone="projects"
    >
      <div className="hgal-sticky" ref={sticky}>
        <motion.div
          ref={track}
          className="hgal-track"
          style={{ x }}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <div className="hgal-intro">
            <div className="eyebrow">{eyebrow}</div>
            <h2>{title}</h2>
            {description && <p>{description}</p>}
            <span className="hgal-hint" aria-hidden="true">
              {pinned ? "Continue rolando" : "Arraste para o lado"}{" "}
              <ArrowRight size={14} />
            </span>
          </div>
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              className="hgal-item"
              variants={itemVariants}
            >
              <ProjectCard
                project={p}
                index={i + 2}
                layout="compact"
                counter={`${String(i + 3).padStart(2, "0")} / ${String(projects.length + 2).padStart(2, "0")}`}
              />
            </motion.div>
          ))}
          <div className="hgal-end">
            <Link href="/projetos" className="hgal-all">
              <span>Ver todos os projetos</span>
              <ArrowUpRight size={22} />
            </Link>
          </div>
        </motion.div>
        {pinned && (
          <div className="hgal-progress" aria-hidden="true">
            <motion.div
              className="hgal-progress-fill"
              style={{ scaleX: eased }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
