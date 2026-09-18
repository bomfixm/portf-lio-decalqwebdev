import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { content, team } from "@/data/content";
import { CTA } from "@/components/Footer";
import { Process } from "@/components/Sections";
import { PageHeading } from "@/components/PageHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Nossa filosofia: entender a necessidade antes de escolher ferramentas. Clareza, cuidado e tecnologia com propósito.",
};

export default function AboutPage() {
  // "Não desenvolvemos apenas software. Desenvolvemos soluções." → 2 linhas
  const [first, ...rest] = content.about.title.split(". ");
  const lines =
    rest.length > 0
      ? [
          `${first}.`,
          <span className="gradient-text" key="g">
            {rest.join(". ")}
          </span>,
        ]
      : [content.about.title];
  return (
    <>
      <PageHeading
        className="about-heading"
        eyebrow="Sobre / Nossa maneira de pensar"
        lines={lines}
        description={content.about.description}
      />
      <section className="container about-story">
        <Reveal variant="scale" duration={0.9}>
          <div className="about-motif" aria-hidden="true">
            <span>problema</span>
            <span className="arrow">↓</span>
            <strong>entendimento</strong>
            <span className="arrow">↓</span>
            <span>solução</span>
            <small>O código é parte do caminho.</small>
          </div>
        </Reveal>
        <Stagger stagger={0.12}>
          {content.about.paragraphs.map((p) => (
            <StaggerItem key={p} variant="blur">
              <p>{p}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
      <Stagger className="container principles" stagger={0.1}>
        {content.principles.map((p, i) => (
          <StaggerItem key={p.title} variant="up">
            <article>
              <span className="eyebrow">0{i + 1}</span>
              <h2>{p.title}</h2>
              <p>{p.description}</p>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
      <Process />
      {team.length > 0 && (
        <section className="section container">
          <div className="section-heading">
            <h2>As pessoas por trás das soluções.</h2>
          </div>
          <div className="team-grid">
            {team.map((m) => (
              <article key={m.name}>
                <Image src={m.photo} alt={m.name} width={480} height={480} />
                <h3>{m.name}</h3>
                <span className="eyebrow">{m.role}</span>
                <p>{m.description}</p>
                {m.linkedin && (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn <ArrowUpRight size={16} />
                  </a>
                )}
                {m.github && (
                  <a href={m.github} target="_blank" rel="noopener noreferrer">
                    GitHub <ArrowUpRight size={16} />
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
      )}
      <CTA />
    </>
  );
}
