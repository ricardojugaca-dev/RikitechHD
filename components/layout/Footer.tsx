import Link from "next/link";
import Image from "next/image";

// ==========================================
// Resources: Categorías principales del navbar
// ==========================================
const resourcesLinks = [
  { name: "Todos", href: "/software" },
  { name: "Utilities", href: "/software?cat=Utilities" },
  { name: "Multimedia", href: "/software?cat=Multimedia" },
  { name: "Drivers", href: "/software?cat=Drivers" },
];

// ==========================================
// Company: Información del sitio
// ==========================================
const companyLinks = [
  { name: "Sobre Nosotros", href: "/about" },
  { name: "Contacto", href: "/contact" },
  { name: "Publicidad", href: "/advertise" },
  { name: "DMCA", href: "/dmca" },
];

// ==========================================
// Legal: Políticas y términos
// ==========================================
const legalLinks = [
  { name: "Privacidad", href: "/privacy" },
  { name: "Términos", href: "/terms" },
  { name: "Cookies", href: "/cookies" },
  { name: "DMCA", href: "/dmca" },
];

// ==========================================
// Redes sociales (con Facebook y Telegram)
// ==========================================
const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M19.6 7.2c-1.7 0-3.2-1-3.9-2.5-.2-.4-.3-.9-.3-1.4h-3.1v13.2c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7c.3 0 .7.1 1 .2v-3.2c-.3 0-.7-.1-1-.1-3.2 0-5.8 2.6-5.8 5.8s2.6 5.8 5.8 5.8 5.8-2.6 5.8-5.8V10c1.2.9 2.7 1.4 4.2 1.4V8.3c0-.4 0-.7-.1-1.1Z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@rikitechhd",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.8V8.2l6.5 3.8-6.5 3.8Z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://twitter.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.2-8.2L2.8 2h6.5l4.4 5.8L18.9 2Zm-1.1 17.9h1.7L8.3 4H6.5l11.3 15.9Z" />
      </svg>
    ),
  },
  {
    name: "Telegram",
    href: "https://t.me/rikitechhd",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.97 9.29c-.15.66-.54.82-1.09.51l-3.02-2.23-1.46 1.41c-.16.16-.3.3-.61.3l.22-3.08 5.61-5.07c.24-.22-.05-.34-.38-.13l-6.93 4.36-2.98-.93c-.65-.2-.66-.65.14-.96l11.66-4.49c.54-.2 1.01.13.82 1.02z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Footer columns */}
        <div className="grid grid-cols-2 items-start gap-8 md:grid-cols-3 lg:grid-cols-5">
          {/* Columna 1: Logo + descripción */}
          <div className="-mt-2 col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-white shadow-sm">
                <Image
                  src="/software/Logo.png"
                  alt="RIKITECH"
                  width={32}
                  height={32}
                  className="h-full w-full object-contain p-1"
                />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wider">
                RIKITECH
              </span>
            </Link>

            <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
              Software downloads, drivers and technology content.
            </p>
          </div>

          {/* Columna 2: Resources (Categorías) */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              {resourcesLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Follow Us */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Follow Us
            </h3>
            <div className="mt-4 flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-muted transition-colors hover:text-foreground"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Columna 4: Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 5: Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} RIKITECH. All rights reserved.
          </p>
          <p className="text-sm text-muted">Software, Drivers &amp; Technology</p>
        </div>
      </div>
    </footer>
  );
}