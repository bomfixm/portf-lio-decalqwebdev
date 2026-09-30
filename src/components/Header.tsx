"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  FolderOpen,
  Layers3,
  MessageCircle,
  Menu,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import type { NavigationItem } from "@/types/content";
import { EASE, useReducedMotion } from "./Motion";
import { Magnetic } from "./Magnetic";
import { BrandSymbol } from "./BrandSymbol";

const links: NavigationItem[] = [
  { label: "Projetos", href: "/projetos" },
  { label: "Serviços", href: "/servicos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Tecnologias", href: "/#tecnologias" },
  { label: "Contato", href: "/contato" },
];

/* Ícones apoiam os rótulos sem substituí-los. */
const navIcons: Record<string, typeof FolderOpen> = {
  "/projetos": FolderOpen,
  "/servicos": Sparkles,
  "/sobre": Users,
  "/#tecnologias": Layers3,
  "/contato": MessageCircle,
};

/**
 * A marca tem três alvos distintos, todos irmãos (nada de botão dentro de
 * link): o símbolo inteiro pisca, o texto leva para a home e o cursor
 * desenhado troca a cor — e também pisca.
 */
export function Brand() {
  const [alt, setAlt] = useState(false);
  const [clicando, setClicando] = useState(false);
  const [piscadinha, setPiscadinha] = useState(0);
  const reduced = useReducedMotion();

  const piscar = () => setPiscadinha((n) => n + 1);

  const alternarCor = () => {
    setAlt((v) => !v);
    piscar();
    if (!reduced) setClicando(true);
  };

  return (
    <div className="brand">
      <button
        type="button"
        className="brand-face"
        onClick={piscar}
        aria-label={`Fazer o símbolo da ${siteConfig.name} piscar`}
      >
        <BrandSymbol
          className="brand-logo"
          alt={alt}
          clicking={clicando}
          onClickingEnd={() => setClicando(false)}
          wink={piscadinha}
        />
      </button>
      <Link
        href="/"
        className="brand-link"
        aria-label={`${siteConfig.name}, início`}
      >
        {siteConfig.name}
      </Link>
      <button
        type="button"
        className="brand-toggle"
        onClick={alternarCor}
        aria-pressed={alt}
        aria-label={
          alt
            ? "Cor do símbolo: verde-água. Voltar para o azul"
            : "Cor do símbolo: azul. Mudar para verde-água"
        }
      />
    </div>
  );
}

/** Rota/seção atual: páginas por pathname; "Tecnologias" por observação da seção na home. */
function useActiveHref() {
  const pathname = usePathname();
  const [techVisible, setTechVisible] = useState(false);
  useEffect(() => {
    if (pathname !== "/") return;
    const el = document.getElementById("tecnologias");
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setTechVisible(entry.isIntersecting),
      { rootMargin: "-40% 0px -50% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [pathname]);
  if (pathname === "/" && techVisible) return "/#tecnologias";
  const match = links.find(
    ({ href }) =>
      !href.includes("#") &&
      (pathname === href || pathname.startsWith(href + "/")),
  );
  return match?.href ?? "";
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const active = useActiveHref();
  const reduced = useReducedMotion();

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    if (!open) return;
    const f = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", f);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", f);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`header ${scrolled || open ? "scrolled" : ""}`}>
      {/* Intro: a navbar entra junto com o hero (só no primeiro carregamento;
          o header vive no layout e não remonta entre rotas). */}
      <motion.div
        className="container header-inner"
        initial={reduced ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
      >
        <Brand />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {links.map(({ label, href }) => {
            const isActive = active === href;
            const Icon = navIcons[href];
            return (
              <Link
                key={label}
                href={href}
                className={isActive ? "active" : ""}
                aria-current={isActive ? "page" : undefined}
              >
                {Icon && <Icon size={14} aria-hidden="true" />}
                {label}
                {isActive && (
                  <motion.span
                    className="nav-indicator"
                    layoutId="nav-indicator"
                    transition={{ duration: 0.45, ease: EASE }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
        <Link href="/contato" className="header-cta">
          Falar conosco <ArrowUpRight size={15} />
        </Link>
        <button
          className="menu-toggle"
          ref={toggle}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Navegação móvel"
            initial={reduced ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {links.map(({ label, href }, i) => (
              <motion.div
                key={label}
                initial={reduced ? false : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.05 + i * 0.05,
                  duration: 0.4,
                  ease: EASE,
                }}
              >
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={active === href ? "page" : undefined}
                >
                  <span className="mobile-menu-rotulo">
                    {(() => {
                      const Icon = navIcons[href];
                      return Icon ? <Icon size={17} aria-hidden="true" /> : null;
                    })()}
                    {label}
                  </span>
                  <ArrowUpRight size={20} />
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.32, duration: 0.4 }}
            >
              <Magnetic>
                <Link
                  href="/contato"
                  className="button"
                  onClick={() => setOpen(false)}
                >
                  Falar conosco <ArrowUpRight size={17} />
                </Link>
              </Magnetic>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
