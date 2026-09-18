import { LineReveal, Reveal } from "./Motion";

/** Cabeçalho das páginas internas com entrada linha a linha. */
export function PageHeading({
  eyebrow,
  lines,
  description,
  className = "",
}: {
  eyebrow: string;
  lines: React.ReactNode[];
  description?: string;
  className?: string;
}) {
  return (
    <div className={`container page-heading ${className}`}>
      <div className="page-glow" aria-hidden="true" />
      <Reveal variant="fade" duration={0.7}>
        <div className="eyebrow">{eyebrow}</div>
      </Reveal>
      <LineReveal as="h1" lines={lines} delay={0.1} inView={false} />
      {description && (
        <Reveal variant="up" delay={0.45}>
          <p>{description}</p>
        </Reveal>
      )}
    </div>
  );
}
