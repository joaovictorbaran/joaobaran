import Image from "next/image";
import { channels, contact, email } from "@/content/site";
import photo from "@/public/images/joao-baran-contact.jpg";
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

          <div className="jb-contact__actions">
            <a className="jb-btn" href={`mailto:${email}?subject=${encodeURIComponent(contact.emailSubject)}`}>
              {contact.emailCta}
            </a>
            <a className="jb-btn2" href={contact.whatsappHref} target="_blank" rel="noopener noreferrer">
              {contact.whatsappCta}
            </a>
            {linkedin ? (
              <a className="jb-btn2" href={linkedin.href} target="_blank" rel="noopener noreferrer">
                {contact.linkedinCta}
              </a>
            ) : null}
          </div>

          <div className="jb-contact__email">
            <span className="jb-contact__email-text text-small text-text-2">{email}</span>
            <CopyEmail email={email} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
