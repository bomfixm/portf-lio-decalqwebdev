import Image from "next/image";
import { Play, ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";
import { Magnetic } from "./Magnetic";
export function Demonstration({ project: p }: { project: Project }) {
  const hasMedia = p.video || p.gif || p.iframe || p.demoUrl || p.liveUrl;
  return (
    <section className="case-section">
      <div className="eyebrow">06 / DEMONSTRAÇÃO</div>
      <div>
        <h2>Veja a solução em movimento.</h2>
        {p.video && (
          <video
            controls
            preload="metadata"
            poster={p.cover}
            aria-label={`Vídeo de demonstração de ${p.title}`}
          >
            <source src={p.video} />
            <p>
              Seu navegador não suporta este vídeo.{" "}
              <a href={p.video}>Abrir vídeo</a>
            </p>
          </video>
        )}
        {p.gif && (
          <Image
            className="demo-gif"
            src={p.gif}
            alt={`Demonstração animada de ${p.title}`}
            width={1200}
            height={780}
            unoptimized
          />
        )}
        {p.iframe && (
          <iframe
            src={p.iframe}
            title={`Demonstração de ${p.title}`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-presentation"
            referrerPolicy="no-referrer"
            allowFullScreen
          />
        )}
        {(p.demoUrl || p.liveUrl) && (
          <Magnetic strength={0.12}>
            <a
              className="button secondary"
              href={p.demoUrl || p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir demonstração <ArrowUpRight size={16} />
            </a>
          </Magnetic>
        )}
        {!hasMedia && (
          <div className="demo-empty">
            <Play size={24} strokeWidth={1.2} />
            <div>
              <h3>Uma ideia apresentada em detalhes.</h3>
              <p>
                Este é um case demonstrativo. As imagens mostram a proposta de
                interface; ainda não há vídeo ou aplicação publicada para este
                exemplo.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
