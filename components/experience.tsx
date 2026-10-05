import { experience, status } from "@/content/site";
import { Reveal } from "./reveal";
import { DiagCobranca } from "./diagrams/diag-cobranca";
import { DiagCredito } from "./diagrams/diag-credito";
import { DiagIA } from "./diagrams/diag-ia";
import { DiagIntegracoes } from "./diagrams/diag-integracoes";
import { DiagMigracao } from "./diagrams/diag-migracao";

const DIAGRAMS = [DiagCobranca, DiagCredito, DiagIntegracoes, DiagIA, DiagMigracao];

const MILESTONES = [
  ...experience.milestones,
  { year: status.currentMilestone.year, text: status.currentMilestone.text },
];

export function Experience() {
  return (
    <section id="experiencia" className="jb-experience">
      <div className="jb-container">
        <Reveal>
          <h2 className="text-section text-text">{experience.title}</h2>
          <p className="jb-experience__lead text-body text-text-2">{status.currentLine}</p>
        </Reveal>

        <Reveal>
          <p className="jb-experience__eyebrow text-small text-text-3">{experience.impactLabel}</p>
        </Reveal>

        <div className="jb-experience__impact">
          {experience.impact.map((item, index) => (
            <Reveal key={item.label} delay={index * 80}>
              <div className="text-small text-text-3">Mais de</div>
              <div className="jb-experience__impact-value text-impact text-text">{item.value}</div>
              <div className="jb-experience__impact-label text-small text-text-2">{item.label}</div>
            </Reveal>
          ))}
        </div>

        <Reveal className="jb-experience__blocks-intro">
          <h2 className="text-section text-text">{experience.blocksTitle}</h2>
          <p className="jb-experience__lead text-body text-text-2">{experience.blocksIntro}</p>
        </Reveal>

        <div className="jb-experience__blocks">
          {experience.blocks.map((block, index) => {
            const Diagram = DIAGRAMS[index];
            const flipped = index % 2 === 1;
            return (
              <div key={block.title} className="jb-experience__block" data-flipped={flipped}>
                <Reveal className="jb-experience__block-text">
                  <h3 className="text-subtitle text-text">{block.title}</h3>
                  <p className="jb-experience__block-copy text-body text-text-3">{block.problem}</p>
                  <p className="jb-experience__block-copy text-body text-text">{block.solution}</p>
                </Reveal>
                <Reveal className="jb-experience__block-diagram" delay={120}>
                  <Diagram />
                </Reveal>
              </div>
            );
          })}
        </div>

        <div className="jb-experience__trajectory">
          <Reveal>
            <h2 className="text-section text-text">{experience.trajectoryTitle}</h2>
          </Reveal>
          <div className="jb-experience__timeline">
            <div className="jb-experience__timeline-line" aria-hidden="true" />
            {MILESTONES.map((milestone, index) => {
              const current = index === MILESTONES.length - 1;
              return (
                <Reveal key={milestone.year} delay={index * 80} className="jb-experience__milestone">
                  <span className="jb-experience__milestone-dot" data-current={current} aria-hidden="true" />
                  <div className="jb-experience__milestone-year">{milestone.year}</div>
                  <div className="jb-experience__milestone-text">{milestone.text}</div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal className="jb-experience__closing">
          <p className="text-closing text-text">{experience.closing}</p>
          <a className="jb-btn2" href="/cv" target="_blank" rel="noopener noreferrer">
            {experience.cv}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
