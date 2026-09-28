import Image from "next/image";
import { channels, contact, email } from "@/content/site";
import photo from "@/public/images/joao-baran-contact.jpg";
import { ArrowIcon } from "./arrow-icon";
import { CopyEmail } from "./copy-email";
import { Reveal } from "./reveal";

const linkedin = channels.find((channel) => channel.name === "LinkedIn");

export function Contact() {
  return (
    <section id="contato" className="jb-contact">
      <div className="jb-container jb-contact__inner">
        <Reveal className="jb-contact__photo">
          <Image
            src={photo}
            alt={contact.photoAlt}
            placeholder="blur"
            sizes="(min-width: 1024px) 420px, (min-width: 768px) 40vw, 100vw"
            className="jb-contact__image"
          />
        </Reveal>

        <Reveal delay={120} className="jb-contact__copy">
          <h2 className="text-section text-text">{contact.title}</h2>
          <p className="jb-contact__lead text-body text-text-2">{contact.lead}</p>

          <div className="jb-contact__email">
            <a className="jb-contact__email-link" href={`mailto:${email}`}>
              {email}
            </a>
            <CopyEmail email={email} />
          </div>

          {linkedin ? (
            <a
              className="jb-link jb-contact__linkedin"
              href={linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.linkedin}
              <ArrowIcon />
            </a>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
