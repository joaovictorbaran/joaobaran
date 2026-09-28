import { email, footer } from "@/content/site";

export function Footer() {
  return (
    <footer className="jb-footer">
      <div className="jb-container jb-footer__inner">
        <a className="jb-footer__link" href={`mailto:${email}`}>
          {email}
        </a>
        <div className="jb-footer__meta">
          <a className="jb-footer__link" href="/cv">
            {footer.cv}
          </a>
          <span>{new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
