"use client";
import Lenis from "lenis";
import { useEffect } from "react";
import { useReducedMotion } from "./Motion";

/**
 * Smooth scroll global (uma única instância). Lenis rola a janela nativa,
 * então `useScroll` do Framer, o header e os IntersectionObservers continuam
 * lendo o scroll real — sem sincronização manual.
 * Desativado com prefers-reduced-motion. Toque permanece nativo (syncTouch=false).
 */
export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: true,
      stopInertiaOnNavigate: true,
    });

    // Âncoras na mesma página: rolagem suave com compensação do header fixo.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      const anchor = (event.target as Element | null)?.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.classList.contains("skip-link")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const target = document.getElementById(
        decodeURIComponent(url.hash.slice(1)),
      );
      if (!target) return;
      event.preventDefault();
      const header = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--header-h-scrolled",
        ),
      );
      lenis.scrollTo(target, { offset: -(header || 0) - 16, duration: 1.2 });
      window.history.pushState(null, "", url.hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, [reduced]);

  return null;
}
