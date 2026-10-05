"use client";

import { useEffect } from "react";
import { useConsent } from "consentium";

export function Analytics() {
  const { store } = useConsent();

  useEffect(() => {
    // Función que carga Google Analytics/AdSense
    const loadAnalytics = () => {
      // Aquí va tu código de Google AdSense o Analytics
      // Por ejemplo, insertar el script de AdSense dinámicamente
      console.log("Cargando Google Analytics/AdSense...");
      
      // Ejemplo real de AdSense (reemplaza con tu código real):
      // const script = document.createElement("script");
      // script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX";
      // script.async = true;
      // script.crossOrigin = "anonymous";
      // document.head.appendChild(script);
    };

    // Verificar si ya hay consentimiento
    if (store.hasConsent("analytics") || store.hasConsent("marketing")) {
      loadAnalytics();
    }

    // Suscribirse a cambios futuros (si el usuario cambia de opinión)
    return store.subscribe(() => {
      if (store.hasConsent("analytics") || store.hasConsent("marketing")) {
        loadAnalytics();
      }
    });
  }, [store]);

  return null; // Este componente no renderiza nada visible
}