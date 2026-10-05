"use client";

import { ConsentProvider, CookieBanner } from "consentium";
import "consentium/styles.css";
import { consentConfig } from "@/data/consent.config";

export default function ConsentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConsentProvider config={consentConfig}>
      {children}
      <CookieBanner />
    </ConsentProvider>
  );
}