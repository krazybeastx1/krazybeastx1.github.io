import { profile, experience, education } from '../data.js';
import { Icon } from './Icons.jsx';
import ShadowSigil from './ShadowSigil.jsx';
import { Reveal, RevealGroup, RevealItem } from './motion.jsx';

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">// 01 — operative profile</p>
          <h2 id="about-title" className="section__title">
            Signal over noise
          </h2>
          <p className="section__sub mono">offensive security · web, api, active directory</p>
        </Reveal>

        <div className="about">
          <RevealGroup className="about__text" step={0.07}>
            {profile.bio.map((paragraph) => (
              <RevealItem key={paragraph}>
                <p className="prose">{paragraph}</p>
              </RevealItem>
            ))}

            <RevealItem className="about__facts">
              <div className="fact">
                <span className="fact__label mono">based in</span>
                <span className="fact__value">{profile.location}</span>
              </div>
              <div className="fact">
                <span className="fact__label mono">focus</span>
                <span className="fact__value">Web · API · Active Directory</span>
              </div>
              <div className="fact">
                <span className="fact__label mono">education</span>
                <span className="fact__value">
                  {education.degree}
                  <em className="muted"> · {education.school}, {education.year}</em>
                </span>
              </div>
            </RevealItem>
          </RevealGroup>

          <Reveal delay={0.1} className="about__panel">
            <ShadowSigil />
            <div className="about__panel-readout">
              <p className="mono muted">shadow.profile</p>
              <p className="mono">web / api / ad</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="timeline">
          <p className="timeline__label mono">experience</p>
          {experience.map((job) => (
            <article className="timeline__item" key={job.company}>
              <header className="timeline__top">
                <h3>
                  {job.role}
                  <span className="timeline__company"> @ {job.company}</span>
                </h3>
                <span className="mono muted timeline__period">{job.period}</span>
              </header>
              <ul className="bullets">
                {job.points.map((point) => (
                  <li key={point}>
                    <Icon name="arrow" size={13} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
