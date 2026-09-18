import type { TechnologyGroup } from "@/types/content";

export const technologyGroups = [
  {
    title: "Front-end",
    description: "Experiências que fazem sentido.",
    items: [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "Tailwind",
    ],
  },
  {
    title: "Back-end",
    description: "Estruturas para ir além.",
    items: ["Python", "Flask", "Node.js"],
  },
  {
    title: "Dados",
    description: "Informações bem conectadas.",
    items: ["SQLite", "PostgreSQL", "Excel", "Power Query", "Pandas"],
  },
  {
    title: "Ferramentas",
    description: "Qualidade em cada entrega.",
    items: ["Git", "GitHub", "VS Code", "Vercel"],
  },
] satisfies TechnologyGroup[];
