import Link from "next/link";
import {
  ArrowUpRight,
  Globe,
  Workflow,
  Layers3,
  ChartNoAxesCombined,
  Braces,
  Sparkles,
  Clapperboard,
  Code2,
  Database,
  Terminal,
  GitBranch,
} from "lucide-react";
import { services, processSteps } from "@/data/services";
import { technologyGroups } from "@/data/technologies";
import { Reveal, Stagger, StaggerItem } from "./Motion";
import { ProcessTimeline } from "./ProcessTimeline";

const icons = {
  Globe,
  Workflow,
  Layers3,
  ChartNoAxesCombined,
  Braces,
  Sparkles,
  Clapperboard,
};

export function SectionTitle({
  number,
  label,
  title,
  description,
  children,
}: {
  number: string;
  label: string;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <Reveal variant="up">
        <div className="eyebrow">
          {number} / {label}
        </div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </Reveal>
      {children && (
        <Reveal variant="fade" delay={0.2}>
          {children}
        </Reveal>
      )}
    </div>
  );
}

/* Layout do bento em 4 colunas: web e social abrem a grade com 2x2 cada,
   automação/api/ia ocupam 2 colunas e custom/data fecham as linhas. */
const bentoSize: Record<string, string> = {
  web: "span-2 tall",
  social: "span-2 tall",
  automation: "span-2",
  custom: "",
  data: "",
  api: "span-2",
  ai: "span-2",
};
const contactType: Record<string, string> = {
  web: "Site",
  social: "Social Media",
  automation: "Automação",
  custom: "Sistema Web",
  data: "Dashboard",
  api: "Sistema Web",
  ai: "IA",
};

function BentoDeco({ id }: { id: string }) {
  switch (id) {
    case "web":
      return (
        <>
          <div className="bento-deco deco-wire" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="bento-deco deco-window" aria-hidden="true" />
        </>
      );
    case "social":
      return (
        <div className="bento-deco deco-social" aria-hidden="true">
          <i className="quadro a" />
          <i className="quadro b" />
          <i className="quadro c" />
        </div>
      );
    case "automation":
      return (
        <div className="bento-deco deco-flow" aria-hidden="true">
          <svg viewBox="0 0 200 40">
            <path
              className="flow-path"
              d="M0 20 C 40 20, 60 4, 100 4 S 160 36, 200 20"
            />
            <circle className="flow-dot" r="3.5" />
          </svg>
        </div>
      );
    case "data":
      return (
        <div className="bento-deco deco-bars" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      );
    case "api":
      return (
        <div className="bento-deco deco-braces" aria-hidden="true">
          {"{ }"}
        </div>
      );
    case "ai":
      return <div className="bento-deco deco-orbit" aria-hidden="true" />;
    case "custom":
      return (
        <div className="bento-deco deco-nodes" aria-hidden="true">
          <svg viewBox="0 0 120 60">
            <line x1="14" y1="30" x2="60" y2="12" />
            <line x1="14" y1="30" x2="60" y2="48" />
            <line x1="60" y1="12" x2="106" y2="30" />
            <line x1="60" y1="48" x2="106" y2="30" />
            <circle cx="14" cy="30" r="5" />
            <circle cx="60" cy="12" r="5" />
            <circle cx="60" cy="48" r="5" />
            <circle className="hot" cx="106" cy="30" r="5" />
          </svg>
        </div>
      );
    default:
      return null;
  }
}

export function Services({ expanded = false }: { expanded?: boolean }) {
  return (
    <section id="servicos" className="section container" data-tone="services">
      <SectionTitle
        number="03"
        label="O que fazemos"
        title={
          <>
            Do desafio <span className="gradient-text">à solução.</span>
          </>
        }
        description="Tecnologia sob medida para cada necessidade."
      />
      <Stagger className="bento" stagger={0.07}>
        {services.map((s, i) => {
          const Icon = icons[s.icon];
          return (
            <StaggerItem
              key={s.id}
              className={`bento-item ${bentoSize[s.id] ?? ""}`}
              variant="scale"
            >
              <BentoDeco id={s.id} />
              <div className="bento-top">
                <span className="bento-icon">
                  <Icon size={22} strokeWidth={1.5} />
                </span>
                <span className="bento-num">0{i + 1}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              {expanded && <p className="service-detail">{s.details}</p>}
              <Link
                href={`/contato?tipo=${encodeURIComponent(contactType[s.id] ?? "Outro")}`}
                aria-label={`Conversar sobre ${s.title}`}
                className="service-link"
              >
                Vamos conversar <ArrowUpRight size={15} />
              </Link>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}

export function Technologies() {
  const groupIcons = [Code2, Terminal, Database, GitBranch];
  return (
    <section id="tecnologias" className="section container" data-tone="stack">
      <SectionTitle
        number="04"
        label="Nossa stack"
        title={
          <>
            As ferramentas <span className="gradient-text">certas.</span>
          </>
        }
        description="Tecnologias que utilizamos, escolhidas a partir do que o projeto precisa."
      />
      <Stagger className="tech-grid" stagger={0.1}>
        {technologyGroups.map((g, i) => {
          const Icon = groupIcons[i] ?? Code2;
          return (
            <StaggerItem key={g.title} className="tech-group" variant="clip">
              <Icon size={22} strokeWidth={1.5} />
              <h3>{g.title}</h3>
              <p>{g.description}</p>
              <div className="badges">
                {g.items.map((t) => (
                  <span className="badge" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}

export function Process() {
  return (
    <section className="section container" id="processo" data-tone="process">
      <SectionTitle
        number="05"
        label="Nosso processo"
        title={
          <>
            Da ideia <span className="gradient-text">ao projeto.</span>
          </>
        }
        description="Um caminho claro, construído em conjunto."
      />
      <ProcessTimeline>
        {processSteps.map((s, i) => (
          <StaggerItem key={s.title} className="process-step" variant="up">
            <span className="process-number">0{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </StaggerItem>
        ))}
      </ProcessTimeline>
    </section>
  );
}
