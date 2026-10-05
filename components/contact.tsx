import Image from "next/image";
import { channels, contact, email } from "@/content/site";
import photo from "@/public/images/joao-baran-contact.jpg";
import { CopyEmail } from "./copy-email";
import { Reveal } from "./reveal";

const findChannel = (name: string) => channels.find((channel) => channel.name === name);
const linkedin = findChannel("LinkedIn");
const github = findChannel("GitHub");

export function Contact() {
  return (
    <section id="contato" className="jb-contact">
      <div className="jb-container jb-contact__inner">
        <Reveal>
          <Image
            src={photo}
            alt={contact.photoAlt}
            placeholder="blur"
            sizes="(min-width: 1024px) 420px, (min-width: 768px) 40vw, 100vw"
            className="jb-contact__image"
          />
        </Reveal>

        <Reveal delay={120}>
          <h2 className="text-section text-text">{contact.title}</h2>
          <p className="jb-contact__lead text-body text-text-2">{contact.lead}</p>

          <div className="jb-contact__actions">
            <a className="jb-btn2" href={contact.cvHref} target="_blank" rel="noopener noreferrer">
              {contact.cvCta}
            </a>
            {linkedin ? (
              <a className="jb-btn2" href={linkedin.href} target="_blank" rel="noopener noreferrer">
                {contact.linkedinCta}
              </a>
            ) : null}
            {github ? (
              <a className="jb-btn2" href={github.href} target="_blank" rel="noopener noreferrer">
                {contact.githubCta}
              </a>
            ) : null}
          </div>

          <div className="jb-contact__email">
            <a className="jb-contact__email-link" href={`mailto:${email}`}>
              {email}
            </a>
            <CopyEmail email={email} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
