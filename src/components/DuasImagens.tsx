import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { Reveal } from "./Motion";

/**
 * Respiro visual entre a essência e os projetos: duas telas reais lado a
 * lado, com o desfoque exatamente na junção — o conteúdo de cada uma fica
 * limpo, só a costura entre elas é borrada.
 */
export function DuasImagens() {
  const usados = ["the-one-bistro", "vai-de-smash", "prospectlife"];
  const par = projects
    .filter((p) => usados.includes(p.slug))
    .slice(0, 2);
  if (par.length < 2) return null;

  return (
    <section className="par container" aria-label="Trabalhos em destaque">
      <Reveal variant="fade" duration={0.8}>
        <div className="par-quadro">
          {par.map((p, i) => (
            <figure className={`par-lado ${i === 0 ? "a" : "b"}`} key={p.slug}>
              <Image
                src={p.cover}
                alt={`Site da ${p.title}`}
                width={1200}
                height={780}
                sizes="(max-width: 860px) 100vw, 50vw"
              />
              <figcaption>
                <Link href={`/projetos/${p.slug}`}>{p.title}</Link>
                <span>{p.label}</span>
              </figcaption>
            </figure>
          ))}
          {/* a costura: desfoca o que passa por baixo dela, nada mais */}
          <span className="par-costura" aria-hidden="true" />
        </div>
      </Reveal>
    </section>
  );
}
