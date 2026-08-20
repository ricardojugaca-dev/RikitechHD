import Link from "next/link";
import Image from "next/image";

const footerNavigation = [
  { name: "Software", href: "/software" },
  { name: "Drivers", href: "/drivers" },
  { name: "Blog", href: "/blog" },
  { name: "Categorías", href: "/categories" },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-5 w-5"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle
          cx="17.5"
          cy="6.5"
          r="0.8"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path d="M19.6 7.2c-1.7 0-3.2-1-3.9-2.5-.2-.4-.3-.9-.3-1.4h-3.1v13.2c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7c.3 0 .7.1 1 .2v-3.2c-.3 0-.7-.1-1-.1-3.2 0-5.8 2.6-5.8 5.8s2.6 5.8 5.8 5.8 5.8-2.6 5.8-5.8V10c1.2.9 2.7 1.4 4.2 1.4V8.3c0-.4 0-.7-.1-1.1Z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.8V8.2l6.5 3.8-6.5 3.8Z" />
      </svg>
    ),
  },
  {
    name: "Discord",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path d="M19.5 5.1A16.4 16.4 0 0 0 15.4 4l-.5 1a15 15 0 0 0-5.8 0l-.5-1a16.4 16.4 0 0 0-4.1 1.1C1.8 8.2 1.1 12.1 1.4 16c1.7 1.3 3.3 2.1 4.9 2.6l1.2-1.7c-.7-.3-1.4-.7-2-1.2l.5-.4c3.8 1.8 8.1 1.8 11.9 0l.5.4c-.6.5-1.3.9-2 1.2l1.2 1.7c1.6-.5 3.2-1.3 4.9-2.6.4-4.5-.8-8.3-3-10.9ZM8.9 14.3c-1.1 0-2-1-2-2.2s.9-2.2 2-2.2 2 1 2 2.2-.9 2.2-2 2.2Zm6.2 0c-.9 0-1.6-.7-1.6-1.6s.7-1.6 1.6-1.6 1.6.7 1.6 1.6-.7 1.6-1.6 1.6Z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.2-8.2L2.8 2h6.5l4.4 5.8L18.9 2Zm-1.1 17.9h1.7L8.3 4H6.5l11.3 15.9Z" />
      </svg>
    ),
  },
  {
    name: "Reddit",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path d="M21.5 11.2c.2-.5.3-1 .3-1.5 0-1.8-1.5-3.3-3.3-3.3-.9 0-1.7.4-2.3 1-1.3-.9-2.9-1.4-4.7-1.5l1-3.1 2.7.6c.1 1 1 1.7 2 1.5 1-.2 1.7-1.1 1.5-2.1-.2-1-1.1-1.7-2.1-1.5-.6.1-1.1.5-1.3 1l-3.1-.7c-.4-.1-.8.1-.9.5L10 5.9c-1.8.1-3.5.6-4.8 1.5-.6-.6-1.4-1-2.3-1C1.1 6.4-.4 7.9-.4 9.7c0 .5.1 1 .3 1.5-.3.5-.4 1.1-.4 1.8 0 3.7 4.8 6.7 10.7 6.7s10.7-3 10.7-6.7c0-.7-.1-1.3-.4-1.8ZM6.5 12.4c0-.9.7-1.6 1.6-1.6s1.6.7 1.6 1.6S9 14 8.1 14s-1.6-.7-1.6-1.6Zm9.9 3.1c-1.2 1.2-3.1 1.8-5.3 1.8s-4.1-.6-5.3-1.8c-.2-.2-.2-.6 0-.8.2-.2.6-.2.8 0 1 .9 2.6 1.4 4.5 1.4s3.5-.5 4.5-1.4c.2-.2.6-.2.8 0 .2.2.2.6 0 .8Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-background">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Footer columns */}
        <div className="grid items-start gap-8 md:grid-cols-2 lg:grid-cols-4">

          {/* Columna 1: Logo + descripción */}
          <div className="-mt-2">

            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold tracking-tight"
            >
              <Image
                src="/software/Logo.png"
                alt="RIKITECH"
                width={40}
                height={40}
              />  

              <span className="text-sm font-semibold uppercase tracking-wider">
                RIKITECH
              </span>
            </Link>

            <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
              Software downloads, drivers and technology content.
            </p>

          </div>

          {/* Columna 2: Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Resources
            </h3>

            <ul className="mt-4 space-y-2">
              {footerNavigation.map((item) => (
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
          <div className="md:-ml-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Follow Us
            </h3>

            <div className="mt-4 flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="text-muted transition-colors hover:text-foreground"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Columna 4: Legal */}
          <div className="md:-ml-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Legal
            </h3>

            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  License (EULA)
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  Brand Guidelines
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-sm text-muted">
            © {new Date().getFullYear()} RIKITECH. All rights reserved.
          </p>

          <p className="text-sm text-muted">
            Software, Drivers &amp; Technology
          </p>

        </div>

      </div>
    </footer>
  );
}