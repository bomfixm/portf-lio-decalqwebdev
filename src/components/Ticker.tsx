import { services } from "@/data/services";
import { technologyGroups } from "@/data/technologies";

/**
 * Faixa infinita de capacidades em duas linhas (serviços + tecnologias, dos
 * dados existentes). Cada trilho contém o mesmo grupo duas vezes e anima de
 * translateX(0) a translateX(-50%) em loop linear — o segundo grupo é
 * idêntico ao primeiro, então o reinício é invisível. A linha 2 corre no
 * sentido contrário e mais devagar. Hover pausa; reduced-motion desacelera.
 */
function TickerRow({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  return (
    <div className={`ticker-row ${reverse ? "reverse" : ""}`}>
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

export function Ticker() {
  const serviceItems = services.map((s) => s.title);
  const techItems = technologyGroups.flatMap((g) => g.items);
  return (
    <div className="ticker" aria-label="Capacidades e tecnologias">
      <TickerRow items={[...serviceItems, ...techItems]} />
      <TickerRow items={[...techItems, ...serviceItems]} reverse />
    </div>
  );
}
