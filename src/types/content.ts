/** Contratos das estruturas de conteúdo compartilhadas entre dados e componentes. */

export const serviceIcons = [
  "Globe",
  "Workflow",
  "Layers3",
  "ChartNoAxesCombined",
  "Braces",
  "Sparkles",
  "Clapperboard",
] as const;
export type ServiceIcon = (typeof serviceIcons)[number];

export interface Service {
  id: string;
  icon: ServiceIcon;
  title: string;
  description: string;
  details: string;
}

/** Formato demonstrativo exibido na vitrine de social media. */
export interface SocialFormat {
  id: string;
  label: string;
  ratio: string;
  description: string;
}

export interface SocialMediaContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  formats: SocialFormat[];
  deliverables: string[];
  disclaimer: string;
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
