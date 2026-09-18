import { siteConfig } from "@/config/site";
export const projectTypes = [
  "Site",
  "Sistema Web",
  "Automação",
  "Dashboard",
  "Aplicativo",
  "IA",
  "Outro",
] as const;
export interface ContactData {
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  projectType: string;
  message: string;
}
export type ContactErrors = Partial<Record<keyof ContactData, string>>;
export function validateContact(data: ContactData): ContactErrors {
  const errors: ContactErrors = {};
  if (data.name.trim().length < 2)
    errors.name = "Informe seu nome (pelo menos 2 caracteres).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
    errors.email = "Informe um e-mail válido.";
  if (!projectTypes.some((t) => t === data.projectType))
    errors.projectType = "Selecione o tipo de projeto.";
  if (data.whatsapp && !/^\+?[\d\s()-]{8,22}$/.test(data.whatsapp))
    errors.whatsapp = "Informe um telefone válido ou deixe este campo vazio.";
  if (data.message.trim().length < 20)
    errors.message = "Conte um pouco mais: use pelo menos 20 caracteres.";
  return errors;
}
export async function submitContact(
  data: ContactData,
): Promise<{ mode: "demo" | "sent" }> {
  if (!siteConfig.contactEndpoint) return { mode: "demo" };
  const response = await fetch(siteConfig.contactEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok)
    throw new Error(
      "Não foi possível enviar agora. Tente novamente em alguns instantes.",
    );
  return { mode: "sent" };
}
