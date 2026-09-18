import type { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Motion";

/**
 * Cases em destaque com composição editorial:
 *  01 — imagem enorme, largura total (revela por clip-path);
 *  02 — layout invertido (entra com blur).
 * Os demais seguem na HorizontalGallery, fora do container.
 */
export function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <div className="project-grid featured-grid">
      {projects.map((p, i) => (
        <Reveal
          key={p.id}
          variant={i % 2 === 0 ? "clip" : "blur"}
          duration={i % 2 === 0 ? 1.1 : 0.9}
          amount={0.15}
          style={{ gridColumn: "1 / -1" }}
        >
          <ProjectCard
            project={p}
            index={i}
            layout={i % 2 === 0 ? "feature" : "feature-reverse"}
          />
        </Reveal>
      ))}
    </div>
  );
}
