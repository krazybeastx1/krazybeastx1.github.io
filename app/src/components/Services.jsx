import { services, mailto } from '../data.js';
import { Icon } from './Icons.jsx';
import { Reveal, RevealGroup, RevealItem } from './motion.jsx';

export default function Services() {
  return (
    <section id="services" className="section services" aria-labelledby="services-title">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">// 05 — freelance</p>
          <h2 id="services-title" className="section__title">
            What I can take on
          </h2>
          <p className="section__sub">
            Independent security work — from a first-pass review to a deeper engagement.
            Everything below is scoped in writing before testing starts.
          </p>
        </Reveal>

        <RevealGroup className="services__grid" step={0.06}>
          {services.map((service, index) => (
            <RevealItem className="service" key={service.title}>
              <header className="service__head">
                <span className="service__index mono" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <Icon name="shield" size={16} />
              </header>
              <h3 className="service__title">{service.title}</h3>
              <p className="service__blurb">{service.blurb}</p>
              <ul className="chips chips--sm">
                {service.tags.map((tag) => (
                  <li className="chip mono" key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="services__foot">
          <p className="mono muted services__note">
            <span className="services__dot" aria-hidden="true" />
            Remote · authorised engagements only · NDA on request
          </p>
          <a className="btn btn--primary" href={mailto} aria-label="Open your mail app to discuss an engagement">
            <Icon name="mail" size={18} />
            Start a conversation
          </a>
        </Reveal>
      </div>
    </section>
  );
}
