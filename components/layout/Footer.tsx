import Link from "next/link";

const footerNavigation = [
  {
    name: "Software",
    href: "/software",
  },
  {
    name: "Drivers",
    href: "/drivers",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Categorías",
    href: "/categories",
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Main Footer */}
        <div className="grid gap-10 md:grid-cols-2">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-xl font-bold tracking-tight"
            >
              RIKITECH
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
              Software downloads, drivers and technology content.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:flex md:justify-end">
            <div>
              <h2 className="text-sm font-semibold">
                Quick Links
              </h2>

              <nav className="mt-4 flex flex-col gap-3">
                {footerNavigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">

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