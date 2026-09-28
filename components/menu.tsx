"use client";

import { usePathname } from "next/navigation";
import { menu } from "@/content/site";

export function Menu() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav className="jb-menu" aria-label="Principal">
      <div className="jb-menu__inner jb-container">
        <a className="jb-menu__brand" href={isHome ? "#" : "/"}>
          {menu.brand}
        </a>
        <div className="jb-menu__links">
          {menu.links.map((link) => {
            const href = isHome ? `#${link.anchor}` : (link.pageHref ?? `/#${link.anchor}`);
            return (
              <a key={link.label} className="jb-menu__link text-small" href={href}>
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
