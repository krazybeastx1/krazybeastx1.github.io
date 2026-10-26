import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { skillGroups } from '../data.js';
import { Reveal, EASE } from './motion.jsx';

const ALL = 'All';

export default function Skills() {
  const [filter, setFilter] = useState(ALL);
  const reduce = useReducedMotion();

  const total = useMemo(
    () => skillGroups.reduce((count, group) => count + group.items.length, 0),
    [],
  );

  const visible = useMemo(
    () => (filter === ALL ? skillGroups : skillGroups.filter((group) => group.title === filter)),
    [filter],
  );

  return (
    <section id="skills" className="section section--alt" aria-labelledby="skills-title">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">// 02 — arsenal</p>
          <h2 id="skills-title" className="section__title">
            What I reach for
          </h2>
          <p className="section__sub">
            Tools are only half of it — the rest is method, notes, and clean reproduction steps.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="filters" role="group" aria-label="Filter arsenal by category">
          <button
            type="button"
            className={filter === ALL ? 'filter is-active' : 'filter'}
            onClick={() => setFilter(ALL)}
            aria-pressed={filter === ALL}
          >
            <span>All</span>
            <span className="mono filter__count">{total}</span>
          </button>
          {skillGroups.map((group) => (
            <button
              key={group.title}
              type="button"
              className={filter === group.title ? 'filter is-active' : 'filter'}
              onClick={() => setFilter(group.title)}
              aria-pressed={filter === group.title}
            >
              <span>{group.title}</span>
              <span className="mono filter__count">{group.items.length}</span>
            </button>
          ))}
        </Reveal>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={filter}
            className="skills"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.26, ease: EASE }}
          >
            {visible.map((group) => (
              <article className="card skills__card" key={group.title}>
                <header className="skills__head">
                  <h3>{group.title}</h3>
                  <span className="mono muted">{group.caption}</span>
                </header>
                <ul className="chips">
                  {group.items.map((item) => (
                    <li className="chip mono" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>

        <Reveal delay={0.12} className="skills__note mono">
          <span className="skills__note-dot" aria-hidden="true" />
          {total} tools &amp; disciplines across {skillGroups.length} groups
        </Reveal>
      </div>
    </section>
  );
}
