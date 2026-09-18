import { services } from "@/data/services";
import { technologyGroups } from "@/data/technologies";

/**
 * Faixa de capacidades em movimento contínuo. Conteúdo vem dos dados
 * existentes (serviços + tecnologias). A lista é duplicada para o loop.
 */
export function Ticker() {
  const items = [
    ...services.map((s) => s.title),
    ...technologyGroups.flatMap((g) => g.items),
  ];
  return (
    <div className="ticker" aria-label="Capacidades e tecnologias">
      <div className="ticker-track">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="ticker-group"
            aria-hidden={copy === 1 ? "true" : undefined}
          >
            {items.map((item, i) => (
              <span className="ticker-item" key={`${copy}-${i}`}>
                <i aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
