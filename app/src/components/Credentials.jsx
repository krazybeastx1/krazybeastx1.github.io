import { certifications, achievements, education, certificationsUrl } from '../data.js';
import { Icon } from './Icons.jsx';
import { Reveal, RevealGroup, RevealItem } from './motion.jsx';

export default function Credentials() {
  return (
    <section id="credentials" className="section section--alt" aria-labelledby="credentials-title">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">// 04 — credentials</p>
          <h2 id="credentials-title" className="section__title">
            Proof of work
          </h2>
          <p className="section__sub">
            Certifications, competition results, and the degree that started it.
          </p>
        </Reveal>

        <div className="credentials">
          <RevealGroup className="credentials__col" step={0.06}>
            <RevealItem>
              <h3 className="column__title mono">
                <Icon name="shield" size={16} />
                Certifications
              </h3>
            </RevealItem>

            <div className="cert-timeline">
              {certifications.map((cert) => (
                <RevealItem className="cert" key={cert.short}>
                  <span className="cert__node" aria-hidden="true" />
                  <div className="cert__badge mono">{cert.short}</div>
                  <div className="cert__body">
                    <p className="cert__name">{cert.name}</p>
                    <p className="mono muted cert__meta">
                      {cert.issuer ? `${cert.issuer} · ` : ''}
                      {cert.date}
                    </p>
                    {cert.id && <p className="mono muted cert__id">ID {cert.id}</p>}
                  </div>
                </RevealItem>
              ))}
            </div>

            <RevealItem>
              <a className="cert__verify mono" href={certificationsUrl} target="_blank" rel="noreferrer">
                Verify on LinkedIn
                <Icon name="arrow" size={13} />
              </a>
            </RevealItem>

            <RevealItem className="education">
              <p className="mono muted">education</p>
              <p className="education__degree">{education.degree}</p>
              <p className="muted">{education.school} · {education.year}</p>
            </RevealItem>
          </RevealGroup>

          <RevealGroup className="credentials__col" step={0.06} delay={0.1}>
            <RevealItem>
              <h3 className="column__title mono">
                <Icon name="terminal" size={16} />
                Results
              </h3>
            </RevealItem>
            {achievements.map((item) => (
              <RevealItem className="achievement" key={item.title}>
                <span className="achievement__mark" aria-hidden="true" />
                <div>
                  <p className="achievement__title">{item.title}</p>
                  <p className="muted achievement__detail">{item.detail}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
