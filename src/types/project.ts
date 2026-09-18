export const categories = [
  "Todos",
  "Web",
  "React",
  "Python",
  "Automação",
  "Dashboard",
  "Back-end",
  "Dados",
  "IA",
  "Outros",
] as const;
export type Category = Exclude<(typeof categories)[number], "Todos">;
export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: Category;
  tags: Category[];
  year: number;
  featured: boolean;
  demo: boolean;
  technologies: string[];
  cover: string;
  gallery: { src: string; alt: string; width: number; height: number }[];
  challenge: string;
  analysis: string;
  solution: string;
  workflow: { title: string; description: string }[];
  features: string[];
  results?: string[];
  github?: string;
  liveUrl?: string;
  video?: string;
  gif?: string;
  iframe?: string;
  demoUrl?: string;
  accent: string;
  label: string;
}
