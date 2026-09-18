"use client";
import { RotateCcw } from "lucide-react";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container not-found">
      <div className="page-glow" aria-hidden="true" />
      <span className="eyebrow">Algo saiu do esperado</span>
      <h1>Não conseguimos carregar este conteúdo.</h1>
      <p>Tente novamente para continuar explorando.</p>
      <button className="button" onClick={reset}>
        Tentar novamente <RotateCcw size={16} />
      </button>
    </div>
  );
}
