import { menu } from "@/content/site";

export function Menu() {
  return (
    <nav className="jb-menu" aria-label="Principal">
      <div className="jb-menu__inner jb-container">
        <a className="jb-menu__brand" href="#">
          {menu.brand}
        </a>
        <div className="jb-menu__links">
          {menu.links.map((link) => (
            <a key={link.href} className="jb-menu__link text-small" href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
