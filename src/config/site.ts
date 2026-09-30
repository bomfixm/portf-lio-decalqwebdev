export const siteConfig = {
  name: "web decalq",
  slogan: "Tecnologia transformando ideias em soluções.",
  description:
    "Sites, sistemas, automações, social media e ferramentas personalizadas. Conheça nossa abordagem para transformar problemas em soluções digitais.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://estudio-solucoes-digitais-portfolio.bomfixm.chatgpt.site",
  logo: "/brand/logo.png",
  accent: "#6ea8ff",
  /* Contato real. O botão do WhatsApp só aparece com um número válido
     aqui: país + DDD + número, ex. "5511999999999". */
  email: "",
  whatsapp: "",
  /* Opcional: número usado nas prospecções (links com ?origem=whatsapp).
     Vazio = usa o mesmo `whatsapp` acima. */
  whatsappProspeccao: "",
  instagram: "",
  linkedin: "",
  github: "",
};
