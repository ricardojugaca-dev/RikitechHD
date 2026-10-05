import type { ConsentConfig } from "consentium";

export const consentConfig: ConsentConfig = {
  productName: "Rikitechhd",
  storageKey: "rikitechhd_consent",
  policyVersion: 1,

  routes: {
    cookies: "/cookies",
    privacy: "/privacy",
  },

  categories: [
    {
      id: "functional",
      label: "Funcional",
      description:
        "Las cookies funcionales ayudan a realizar ciertas funcionalidades, como compartir el contenido del sitio web en plataformas de redes sociales, recopilar comentarios y otras características de terceros.",
    },
    {
      id: "analytics",
      label: "Analítica",
      description:
        "Las cookies analíticas se utilizan para comprender cómo interactúan los visitantes con el sitio web. Estas cookies ayudan a proporcionar información sobre métricas: el número de visitantes, el porcentaje de rebote, la fuente de tráfico, etc.",
    },
    {
      id: "marketing",
      label: "Publicidad",
      description:
        "Las cookies publicitarias se utilizan para entregar a los visitantes anuncios personalizados basados en las páginas que visitaron antes y analizar la efectividad de la campaña publicitaria.",
    },
  ],
};