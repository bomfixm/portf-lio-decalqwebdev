"use client";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <button
      type="button"
      className="to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Voltar ao topo"
    >
      Topo <ArrowUp size={14} />
    </button>
  );
}
