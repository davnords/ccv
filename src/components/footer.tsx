import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { navLinks, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-muted/40">
      <div className="mx-auto grid max-w-[90rem] gap-12 px-6 py-16 sm:px-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-foreground text-xs font-bold tracking-tight text-background">
              {site.shortName}
            </span>
            <span className="text-sm font-medium leading-tight">
              {site.name}
              <span className="block text-xs font-normal text-muted-foreground">
                {site.institution}
              </span>
            </span>
          </div>
          <p className="mt-6 max-w-xs text-sm text-muted-foreground">
            {site.description}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" />
              <a href={`mailto:${site.contact.email}`} className="hover:text-foreground">
                {site.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{site.contact.address}</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Quick links</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={site.links.scholar}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:text-foreground"
              >
                Google Scholar <ArrowUpRight className="h-3 w-3" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto max-w-[90rem] px-6 py-6 text-xs text-muted-foreground sm:px-8">
          © {new Date().getFullYear()} {site.name}, {site.institution}.
        </div>
      </div>
    </footer>
  );
}
