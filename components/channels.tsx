import { canais, channels } from "@/content/site";
import { ArrowIcon } from "./arrow-icon";
import { Reveal } from "./reveal";

export function Channels() {
  return (
    <section id="canais" className="jb-channels">
      <div className="jb-container">
        <Reveal>
          <h2 className="text-section text-text">{canais.title}</h2>
        </Reveal>

        <div className="jb-channels__list">
          {channels.map((channel, index) => {
            const isExternal = channel.href.startsWith("http");

            return (
              <Reveal key={channel.name} delay={index * 60}>
                <a
                  className="jb-channels__row"
                  href={channel.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  <span className="jb-channels__name">{channel.name}</span>
                  <span className="jb-channels__description">{channel.description}</span>
                  <span className="jb-channels__meta">
                    <span className="jb-channels__handle">{channel.handle}</span>
                    <ArrowIcon className="jb-channels__arrow" />
                  </span>
                </a>
              </Reveal>
            );
          })}
          <div className="jb-channels__divider" />
        </div>
      </div>
    </section>
  );
}
