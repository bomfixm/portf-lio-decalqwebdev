import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { projects } from "@/data/projects";
import { Gallery } from "@/components/Gallery";
import { Demonstration } from "@/components/Demonstration";
import {
  LineReveal,
  ReadingProgress,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/Motion";
import { CTA } from "@/components/Footer";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) return { title: "Projeto não encontrado" };
  return {
    title: p.title,
    description: p.shortDescription,
    openGraph: {
      title: p.title,
      description: p.shortDescription,
      type: "article",
    },
    alternates: { canonical: `/projetos/${slug}/` },
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const p = projects[index];
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return (
    <>
      <ReadingProgress />
      <article className="container case">
        <div className="case-header">
          <div className="page-glow" aria-hidden="true" />
          <Reveal variant="fade">
            <Link href="/projetos" className="text-link">
              <ArrowLeft size={15} /> Todos os projetos
            </Link>
            <div className="case-kicker">
              <span className="eyebrow">
                Case {p.id} / {p.label}
              </span>
              {p.demo && (
                <span className="demo-label">Projeto demonstrativo</span>
              )}
            </div>
          </Reveal>
          <LineReveal
            as="h1"
            inView={false}
            delay={0.15}
            lines={[
              <span className="gradient-text" key="t">
                {p.title}
              </span>,
            ]}
          />
          <Reveal variant="up" delay={0.4}>
            <p className="case-lead">{p.shortDescription}</p>
          </Reveal>
          <Reveal variant="up" delay={0.5} className="case-facts">
            <div>
              <span>Categoria</span>
              <p>{p.category}</p>
            </div>
            <div>
              <span>Ano</span>
              <p>{p.year}</p>
            </div>
            <div>
              <span>Tecnologias</span>
              <p>{p.technologies.join(" · ")}</p>
            </div>
          </Reveal>
        </div>
        <Reveal variant="clip" duration={1.1} amount={0.2}>
          <div className="case-cover-wrap">
            <Image
              className="case-cover"
              src={p.cover}
              alt={`Visão geral da interface conceitual de ${p.title}`}
              width={1200}
              height={780}
              priority
              sizes="100vw"
            />
          </div>
        </Reveal>

        <section className="case-section">
          <div className="eyebrow">01 / Visão geral</div>
          <Reveal variant="up">
            <h2>O contexto por trás da ideia.</h2>
            <p>{p.fullDescription}</p>
          </Reveal>
        </section>

        <section className="case-section">
          <div className="eyebrow">02 / Desafio &amp; análise</div>
          <Stagger className="case-columns" stagger={0.15}>
            <StaggerItem variant="left">
              <h2>O desafio.</h2>
              <p>{p.challenge}</p>
            </StaggerItem>
            <StaggerItem variant="right">
              <h2>O ponto de partida.</h2>
              <p>{p.analysis}</p>
            </StaggerItem>
          </Stagger>
        </section>

        <section className="case-section">
          <div className="eyebrow">03 / A solução</div>
          <div>
            <Reveal variant="up">
              <h2>Uma resposta com propósito.</h2>
              <p>{p.solution}</p>
              <h3 className="case-subtitle">Como funciona</h3>
            </Reveal>
            <Stagger className="workflow" stagger={0.1}>
              {p.workflow.map((s, i) => (
                <StaggerItem key={s.title} variant="scale">
                  <div>
                    <span>0{i + 1}</span>
                    <h3>{s.title}</h3>
                    <p>{s.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="case-section">
          <div className="eyebrow">04 / Estrutura</div>
          <div>
            <Reveal variant="up">
              <h2>Funcionalidades propostas.</h2>
            </Reveal>
            <Stagger as="ul" className="feature-list" stagger={0.06}>
              {p.features.map((f) => (
                <StaggerItem key={f} as="li" variant="up">
                  <Check size={17} />
                  {f}
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal variant="fade" delay={0.2}>
              <h3 className="case-subtitle">Tecnologias</h3>
              <div className="badges">
                {p.technologies.map((t) => (
                  <span className="badge" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="case-gallery">
          <div className="section-heading">
            <Reveal variant="up">
              <div className="eyebrow">05 / Mais de perto</div>
              <h2>Uma solução, diferentes perspectivas.</h2>
            </Reveal>
          </div>
          <Reveal variant="scale" duration={0.9}>
            <Gallery images={p.gallery} />
          </Reveal>
        </section>

        <Demonstration project={p} />

        {p.results && (
          <section className="case-section">
            <div className="eyebrow">
              07 / Resultado {p.demo ? "esperado" : ""}
            </div>
            <Reveal variant="up">
              <h2>
                {p.demo
                  ? "O que a proposta pode tornar possível."
                  : "O que mudou com a solução."}
              </h2>
              <ul className="results-list">
                {p.results.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              {(p.github || p.liveUrl || p.demoUrl) && (
                <div className="hero-actions">
                  {[
                    ["Ver projeto", p.liveUrl],
                    ["GitHub", p.github],
                    ["Demonstração", p.demoUrl],
                  ]
                    .filter(([, url]) => url)
                    .map(([label, url]) => (
                      <a
                        className="button secondary"
                        key={label}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {label}
                        <ArrowUpRight size={16} />
                      </a>
                    ))}
                </div>
              )}
            </Reveal>
          </section>
        )}

        <Stagger className="case-navigation" stagger={0.12}>
          <StaggerItem variant="left">
            <Link
              href={`/projetos/${previous.slug}`}
              style={{ display: "block" }}
            >
              <span>
                <ArrowLeft size={15} /> Projeto anterior
              </span>
              <h3>{previous.title}</h3>
            </Link>
          </StaggerItem>
          <StaggerItem variant="right">
            <Link href={`/projetos/${next.slug}`} style={{ display: "block" }}>
              <span>
                Próximo projeto <ArrowRight size={15} />
              </span>
              <h3>{next.title}</h3>
            </Link>
          </StaggerItem>
        </Stagger>
      </article>
      <CTA />
    </>
  );
}
