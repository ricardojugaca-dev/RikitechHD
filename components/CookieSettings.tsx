"use client";

import { CookieSettingsLink } from "consentium";

interface CookieSettingsProps {
  className?: string;
  children?: React.ReactNode;
}

export default function CookieSettings({
  className,
  children,
}: CookieSettingsProps) {
  return (
    <span className={`cookie-settings-inline ${className || ""}`}>
      <CookieSettingsLink>{children}</CookieSettingsLink>
    </span>
  );
}