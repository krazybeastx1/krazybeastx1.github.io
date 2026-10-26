import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Icon } from './Icons.jsx';
import { profile } from '../data.js';

const LINKS = [
  { id: 'about', label: 'Profile' },
  { id: 'skills', label: 'Arsenal' },
  { id: 'work', label: 'Operations' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav({ active }) {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />

      <header className="nav">
        <div className="nav__inner">
          <a className="brand" href="#top" aria-label={`${profile.name} — home`}>
            <span className="brand__mark" aria-hidden="true">
              kj
            </span>
            <span className="brand__text">
              {profile.name}
              <span className="brand__dot" aria-hidden="true">.sec</span>
            </span>
          </a>

          <nav className="nav__links" aria-label="Sections">
            {LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={active === link.id ? 'nav__link is-active' : 'nav__link'}
                aria-current={active === link.id ? 'location' : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <a className="btn btn--ghost btn--sm nav__resume" href={profile.resume} target="_blank" rel="noreferrer">
              <Icon name="download" size={16} />
              <span>Dossier</span>
            </a>
            <button
              type="button"
              className="nav__toggle"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <Icon name={open ? 'close' : 'menu'} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav aria-label="Sections">
              {LINKS.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  className="mobile-menu__link"
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 + index * 0.04, duration: 0.26 }}
                >
                  <span className="mono muted">{String(index + 1).padStart(2, '0')}</span>
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={profile.resume}
                className="btn btn--primary mobile-menu__cta"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.26 }}
                onClick={() => setOpen(false)}
              >
                <Icon name="download" size={16} />
                Open dossier
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
