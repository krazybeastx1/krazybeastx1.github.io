import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { projects } from '../data.js';
import { Icon } from './Icons.jsx';
import { Reveal, useTilt, EASE } from './motion.jsx';

const CATEGORIES = ['All', ...new Set(projects.map((project) => project.category))];

function ProjectModal({ project, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      className="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        className="modal__panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.99 }}
        transition={{ duration: 0.26, ease: EASE }}
      >
        <header className="modal__head">
          <div>
            <p className="mono modal__tag">{project.tag}</p>
            <h2 id="modal-title" className="modal__title">
              {project.name}
            </h2>
          </div>
          <button
            type="button"
            className="modal__close"
            onClick={onClose}
            ref={closeRef}
            aria-label="Close case file"
          >
            <Icon name="close" size={18} />
          </button>
        </header>

        <p className="modal__summary">{project.summary}</p>

        <div className="modal__section">
          <p className="mono muted modal__label">technical detail</p>
          <ul className="bullets">
            {project.details.map((detail) => (
              <li key={detail}>
                <Icon name="arrow" size={13} />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="modal__section">
          <p className="mono muted modal__label">stack</p>
          <ul className="chips chips--sm">
            {project.stack.map((tech) => (
              <li className="chip mono" key={tech}>
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <footer className="modal__foot">
          <a className="btn btn--primary" href={project.href} target="_blank" rel="noreferrer">
            <Icon name="github" size={17} />
            View source
          </a>
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            Close
          </button>
        </footer>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

function ProjectCard({ project, index, onOpen }) {
  const cardRef = useRef(null);
  useTilt(cardRef, { max: 2.6 });

  return (
    <article className="project" ref={cardRef}>
      <span className="project__glow" aria-hidden="true" />
      <header className="project__head">
        <span className="project__index mono">{String(index + 1).padStart(2, '0')}</span>
        <span className="project__tag mono">{project.tag}</span>
      </header>

      <h3 className="project__name">{project.name}</h3>
      <p className="project__summary">{project.summary}</p>

      <ul className="chips chips--sm">
        {project.stack.map((tech) => (
          <li className="chip mono" key={tech}>
            {tech}
          </li>
        ))}
      </ul>

      <footer className="project__foot">
        <button type="button" className="project__open" onClick={() => onOpen(project)}>
          Open case file
          <Icon name="arrow" size={14} />
        </button>
        <a
          className="project__repo"
          href={project.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.name} source on GitHub`}
        >
          <Icon name="github" size={17} />
        </a>
      </footer>
    </article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const reduce = useReducedMotion();

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  );

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">// 03 — red team operations</p>
          <h2 id="work-title" className="section__title">
            Things I built
          </h2>
          <p className="section__sub">
            Tooling and labs where the goal was simple: make the next engagement faster.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="filters" role="group" aria-label="Filter operations">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              className={filter === category ? 'filter is-active' : 'filter'}
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
            >
              <span>{category}</span>
              <span className="mono filter__count">
                {category === 'All'
                  ? projects.length
                  : projects.filter((project) => project.category === category).length}
              </span>
            </button>
          ))}
        </Reveal>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={filter}
            className="projects"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.26, ease: EASE }}
          >
            {visible.map((project) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={projects.indexOf(project)}
                onOpen={setSelected}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <Reveal delay={0.1} className="projects__foot">
          <a className="btn btn--ghost" href="https://github.com/krazybeastx1" target="_blank" rel="noreferrer">
            <Icon name="github" size={17} />
            More on GitHub
            <Icon name="arrow" size={14} />
          </a>
        </Reveal>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
