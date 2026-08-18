import { siteConfig } from "@/data/siteConfig";
import { navigation } from "@/data/navigation";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ice-black py-14">
      <Container className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-serif text-xl italic text-ice-white">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-ice-white-dim">{siteConfig.tagline}</p>
          <p className="mt-1 text-sm text-ice-white-dim">
            {siteConfig.location.facility}, {siteConfig.location.region}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ice-white-dim transition-colors hover:text-ice-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="space-y-2 text-sm text-ice-white-dim">
          <a
            href={`mailto:${siteConfig.contact.generalEmail}`}
            className="block hover:text-ice-white"
          >
            {siteConfig.contact.generalEmail}
          </a>
          <a
            href={`tel:${siteConfig.contact.phoneStephanie}`}
            className="block hover:text-ice-white"
          >
            {siteConfig.contact.phoneStephanie}
          </a>
          <span className="block">{siteConfig.contact.instagram}</span>
        </div>
      </Container>

      <Container className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-xs text-ice-white-dim/70 md:flex-row md:items-center md:justify-between">
        <span>
          © {year} {siteConfig.name}. All rights reserved.
        </span>
        <a href="#" className="hover:text-ice-white">
          Privacy Policy
        </a>
      </Container>
    </footer>
  );
}
