import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";
import { hexToRgbChannels } from "@/lib/color";
import { SpotlightCard } from "./SpotlightCard";
import { RevealImage } from "./RevealImage";

export type CardLayout = "grid" | "feature" | "feature-reverse" | "compact";

/**
 * Card de projeto com spotlight e borda em gradiente na cor do próprio case.
 * Layouts: grid (catálogo), feature / feature-reverse (destaques editoriais)
 * e compact (faixa horizontal).
 */
export function ProjectCard({
  project,
  index = 0,
  layout = "grid",
  counter,
}: {
  project: Project;
  index?: number;
  layout?: CardLayout;
  /** Texto do canto direito da meta (ex.: "03 / 06"); padrão "Case {id}". */
  counter?: string;
}) {
  const href = `/projetos/${project.slug}`;
  const feature = layout === "feature" || layout === "feature-reverse";
  const compact = layout === "compact";
  const className = [
    "project-card",
    feature && "feature",
    compact && "compact",
    layout === "feature-reverse" && "reverse",
  ]
    .filter(Boolean)
    .join(" ");
  const style = {
    "--card-accent": project.accent,
    "--card-accent-rgb": hexToRgbChannels(project.accent),
  } as CSSProperties;
  const sizes = feature
    ? "(max-width: 767px) 100vw, 60vw"
    : compact
      ? "(max-width: 767px) 85vw, 560px"
      : "(max-width: 767px) 100vw, 50vw";
  return (
    <SpotlightCard className={className} style={style}>
      <Link
        href={href}
        className="project-media"
        aria-label={`Ver projeto: ${project.title}`}
      >
        <RevealImage>
          <Image
            src={project.cover}
            alt={`${project.demo ? "Interface conceitual" : "Interface"} de ${project.title}`}
            width={1200}
            height={780}
            sizes={sizes}
            loading={index < 1 ? "eager" : "lazy"}
            priority={index === 0 && feature}
          />
        </RevealImage>
        <span className="image-arrow" aria-hidden="true">
          <ArrowUpRight size={20} />
        </span>
        <span className="project-image-label">
          {project.label}
          {project.demo && <span>Demonstrativo</span>}
        </span>
      </Link>
      <div className="project-body">
        <div className="project-meta">
          <span>
            {project.category} <span className="meta-dot">/</span>{" "}
            {project.year}
          </span>
          <span>{counter ?? `Case ${project.id}`}</span>
        </div>
        <div className="project-title">
          <h3>
            <Link href={href}>{project.title}</Link>
          </h3>
          {!compact && (
            <span className="text-link" aria-hidden="true">
              Ver case <ArrowUpRight size={15} />
            </span>
          )}
        </div>
        <p>{project.shortDescription}</p>
        <div className="project-tech" aria-label="Tecnologias">
          {project.technologies
            .slice(0, feature ? 5 : compact ? 3 : 4)
            .map((t) => (
              <span key={t}>{t}</span>
            ))}
        </div>
      </div>
    </SpotlightCard>
  );
}
