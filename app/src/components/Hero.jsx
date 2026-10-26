import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Icon } from './Icons.jsx';
import { profile, socials, stats, mailto } from '../data.js';
import { useRotatingRole } from './motion.jsx';

const TERMINAL = [
  { cmd: 'whoami', out: 'karthikeswar — security researcher' },
  { cmd: 'cat focus.txt', out: 'web · api · active directory' },
  { cmd: 'tail -1 exp.log', out: 'penetration testing intern @ seckio' },
];

const HOSTS = ['krazybeastx@profile', 'karthikeswar@profile'];

const PORTRAITS = [
  { file: 'portrait-1.jpg', state: 'original' },
  { file: 'portrait-2.jpg', state: 'render' },
];

// Deterministic glyph columns for the ring around the portrait. Positions and
// timings are fixed so the layout never shifts between renders.
const RAIN = [
  { x: 3, dur: 9.5, delay: -1.2, text: '0A3F7B21C4E' },
  { x: 8, dur: 7.8, delay: -4.6, text: 'C41E09D7' },
  { x: 14, dur: 11.2, delay: -2.4, text: '5D8A31F4B0' },
  { x: 19, dur: 8.4, delay: -6.1, text: 'E07B12A9C' },
  { x: 24, dur: 10.6, delay: -0.8, text: '93CF40A7' },
  { x: 30, dur: 7.2, delay: -5.3, text: '1B6E8D2F05' },
  { x: 35, dur: 12.0, delay: -3.7, text: 'A4D70E1B' },
  { x: 40, dur: 8.9, delay: -7.2, text: '7F205C93E8' },
  { x: 46, dur: 9.8, delay: -1.9, text: 'B53E0A7C' },
  { x: 51, dur: 7.6, delay: -4.1, text: '2C9F6418B3' },
  { x: 56, dur: 11.6, delay: -6.8, text: '6E3B0D94' },
  { x: 62, dur: 8.2, delay: -2.9, text: '90AC52F7D1' },
  { x: 67, dur: 10.1, delay: -5.8, text: '3F0B96E2' },
  { x: 72, dur: 7.4, delay: -1.5, text: 'D81C4A70B' },
  { x: 78, dur: 9.1, delay: -3.3, text: '52E7B09C' },
  { x: 83, dur: 11.9, delay: -6.4, text: 'A03D6F18EC' },
  { x: 89, dur: 8.6, delay: -0.6, text: '7C41B95E' },
  { x: 95, dur: 10.8, delay: -4.9, text: '1E80C3A6D' },
];

function Portrait() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [broken, setBroken] = useState([]);

  // Toggles between the two portraits on the same beat as the name.
  useEffect(() => {
    if (reduce) return undefined;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % PORTRAITS.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [reduce]);

  const available = PORTRAITS.filter((item) => !broken.includes(item.file));
  const active = available.length ? available[index % available.length] : null;

  return (
    <figure className="portrait">
      <div className="portrait__stage">
        <div className="portrait__rain" aria-hidden="true">
          {RAIN.map((column) => (
            <span
              key={column.x}
              className="portrait__rain-col"
              style={{
                left: `${column.x}%`,
                animationDuration: `${column.dur}s`,
                animationDelay: `${column.delay}s`,
              }}
            >
              {column.text}
            </span>
          ))}
        </div>

        <div className="portrait__frame">
          <div className="portrait__aura" aria-hidden="true" />
          {available.length === 0 ? (
            <span className="portrait__monogram" aria-hidden="true">kj</span>
          ) : (
            <div className="portrait__media">
              {available.map((item) => {
                const isActive = item.file === active.file;
                return (
                  <div
                    key={item.file}
                    className={`portrait__layer${isActive ? ' is-active' : ''}`}
                    aria-hidden={isActive ? undefined : 'true'}
                  >
                    <img
                      className="portrait__img"
                      src={`${import.meta.env.BASE_URL}${item.file}`}
                      alt={isActive ? `Portrait of ${profile.fullName}` : ''}
                      width="640"
                      height="640"
                      loading="eager"
                      decoding="async"
                      onError={() =>
                        setBroken((list) => (list.includes(item.file) ? list : [...list, item.file]))
                      }
                    />
                  </div>
                );
              })}
              <span className="portrait__scan" aria-hidden="true" />
              <span className="portrait__shade" aria-hidden="true" />
            </div>
          )}
        </div>
      </div>

      <figcaption className="portrait__caption mono">
        <Icon name="pin" size={14} />
        {profile.location}
        <span className="portrait__sep" aria-hidden="true" />
        <span className="portrait__state">{active ? active.state : 'offline'}</span>
      </figcaption>
    </figure>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const { role } = useRotatingRole(profile.roles);
  const { role: displayName } = useRotatingRole(profile.aliases, 3400);
  const { role: host } = useRotatingRole(HOSTS, 3400);

  const intro = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.62, delay, ease: [0.22, 0.61, 0.36, 1] },
        };

  return (
    <section id="top" className="hero">
      <div className="hero__halo" aria-hidden="true" />

      <div className="container hero__grid">
        <div className="hero__copy">
          <motion.div className="hero__status" {...intro(0.05)}>
            <span className="hero__status-dot" aria-hidden="true" />
            <span className="mono">system online</span>
            <span className="mono muted hero__status-sep" aria-hidden="true">/</span>
            <span className="mono muted">operative profile</span>
          </motion.div>

          <motion.h1 className="hero__title" {...intro(0.12)}>
            <span className="hero__name" aria-hidden="true">
              <AnimatePresence initial={false}>
                <motion.span
                  key={displayName}
                  className="hero__name-item"
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14 }}
                  transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  {displayName}
                </motion.span>
              </AnimatePresence>
              <span className="hero__caret" aria-hidden="true" />
            </span>
            <span className="hero__title-sub">{profile.fullName}</span>
          </motion.h1>
          <span className="visually-hidden">
            {profile.fullName} — also known as KrazyBeastX. Security researcher and penetration tester.
          </span>

          <motion.div className="hero__role" {...intro(0.2)}>
            <span className="hero__role-slot" aria-hidden="true">
              <AnimatePresence initial={false}>
                <motion.span
                  key={role}
                  className="mono hero__role-text"
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.24 }}
                >
                  {role}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="visually-hidden">{profile.roles.join(', ')}</span>
          </motion.div>

          <motion.p className="hero__lede" {...intro(0.28)}>
            {profile.tagline}
          </motion.p>

          <motion.div className="hero__cta" {...intro(0.34)}>
            <a className="btn btn--primary" href="#work">
              <Icon name="shield" size={18} />
              View security projects
            </a>
            <a className="btn btn--ghost" href={mailto} aria-label="Email Karthikeswar — opens your mail app">
              <Icon name="mail" size={18} />
              Contact me
            </a>
          </motion.div>

          <motion.div className="hero__meta" {...intro(0.4)}>
            <ul className="hero__socials">
              {socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${social.label} — ${social.handle}`}
                    title={social.label}
                  >
                    <Icon name={social.id} size={18} />
                  </a>
                </li>
              ))}
            </ul>
            <a className="hero__dossier mono" href={profile.resume} target="_blank" rel="noreferrer">
              <Icon name="download" size={14} />
              dossier.pdf
            </a>
          </motion.div>
        </div>

        <motion.div className="hero__side" {...intro(0.2)}>
          <Portrait />

          <div className="terminal" role="img" aria-label="Terminal session summary">
            <div className="terminal__bar">
              <span className="terminal__dots" aria-hidden="true">
                <i /><i /><i />
              </span>
              <span className="mono terminal__host" aria-hidden="true">
                <AnimatePresence initial={false}>
                  <motion.span
                    key={host}
                    className="terminal__host-text"
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.26, ease: [0.22, 0.61, 0.36, 1] }}
                  >
                    {host}: ~
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="mono terminal__flag">rec</span>
            </div>
            <div className="terminal__body mono" aria-hidden="true">
              {TERMINAL.map((line, lineIndex) => (
                <div className="terminal__line" key={line.cmd} style={{ '--i': lineIndex }}>
                  <span className="terminal__prompt">$</span>
                  <span className="terminal__cmd">{line.cmd}</span>
                  <span className="terminal__out">{line.out}</span>
                </div>
              ))}
              <div className="terminal__line terminal__line--cursor" style={{ '--i': TERMINAL.length }}>
                <span className="terminal__prompt">$</span>
                <span className="terminal__caret" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="container">
        <motion.ul className="stats" {...intro(0.48)}>
          {stats.map((stat) => (
            <li className="stats__item" key={stat.label}>
              <span className="stats__value">{stat.value}</span>
              <span className="stats__label mono">{stat.label}</span>
            </li>
          ))}
        </motion.ul>
      </div>

      <motion.a className="hero__scroll" href="#about" {...intro(0.6)} aria-label="Scroll to profile">
        <span className="mono">scroll</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
