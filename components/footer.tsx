import { channels, email, footer, hero } from "@/content/site";

const channelLink = (name: string) => channels.find((channel) => channel.name === name);

const CONTACT_LINKS = [
  { label: "E-mail", href: `mailto:${email}`, external: false },
  { label: "WhatsApp", href: footer.whatsappHref, external: true },
  ...["LinkedIn", "GitHub", "YouTube", "X"].flatMap((name) => {
    const channel = channelLink(name);
    return channel ? [{ label: name, href: channel.href, external: true }] : [];
  }),
];

export function Footer() {
  return (
    <footer className="jb-footer">
      <div className="jb-container">
        <div className="jb-footer__columns">
          <div>
            <p className="jb-footer__name text-body text-text">João Baran</p>
            <p className="jb-footer__tagline">{hero.support}</p>
          </div>

          <div className="jb-footer__links">
            <div className="jb-footer__group">
              <p className="jb-footer__label" aria-hidden="true">
                {footer.navTitle}
              </p>
              <nav aria-label={footer.navLabel}>
                <ul className="jb-footer__list">
                  {footer.nav.map((item) => (
                    <li key={item.label}>
                      <a className="jb-footer__link" href={item.href}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="jb-footer__group">
              <p className="jb-footer__label" aria-hidden="true">
                {footer.contactTitle}
              </p>
              <ul className="jb-footer__list" aria-label={footer.contactLabel}>
                {CONTACT_LINKS.map((item) => (
                  <li key={item.label}>
                    <a
                      className="jb-footer__link"
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="jb-footer__bottom">
          <p>
            {footer.baran.text}{" "}
            <a className="jb-footer__link jb-footer__link--inline" href={footer.baran.href} target="_blank" rel="noopener noreferrer">
              {footer.baran.link}
            </a>
          </p>
          <span>{new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
