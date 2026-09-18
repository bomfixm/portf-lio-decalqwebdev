/** Contratos das estruturas de conteúdo compartilhadas entre dados e componentes. */

export const serviceIcons = [
  "Globe",
  "Workflow",
  "Layers3",
  "ChartNoAxesCombined",
  "Braces",
  "Sparkles",
] as const;
export type ServiceIcon = (typeof serviceIcons)[number];

export interface Service {
  id: string;
  icon: ServiceIcon;
  title: string;
  description: string;
  details: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface TechnologyGroup {
  title: string;
  description: string;
  items: string[];
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface Principle {
  title: string;
  description: string;
}

export interface SiteIntro {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface AboutContent {
  title: string;
  description: string;
  paragraphs: string[];
}
