import { profile, socials, mailto } from '../data.js';
import { Icon } from './Icons.jsx';
import { Reveal, RevealGroup, RevealItem } from './motion.jsx';

export default function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <Reveal className="contact__head">
          <p className="eyebrow">// 05 — contact</p>
          <h2 id="contact-title" className="contact__title">
            Got a target in mind?
          </h2>
          <p className="contact__lede">
            Happy to talk engagements, CTFs, or tooling. Email is the fastest route.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="contact__actions">
          <a className="btn btn--primary contact__mail" href={mailto} aria-label="Open your mail app to email Karthikeswar">
            <Icon name="mail" size={18} />
            Open in mail app
          </a>
          <p className="contact__mask" aria-hidden="true">
            {profile.email}
          </p>
        </Reveal>

        <RevealGroup className="contact__grid" step={0.06} delay={0.1}>
          {socials.map((social) => (
            <RevealItem key={social.id}>
              <a className="link-card" href={social.href} target="_blank" rel="noreferrer">
                <span className="link-card__icon">
                  <Icon name={social.id} size={18} />
                </span>
                <span className="link-card__text">
                  <span className="link-card__label">{social.label}</span>
                  <span className="mono muted link-card__handle">{social.handle}</span>
                </span>
                <Icon name="arrow" size={15} />
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
