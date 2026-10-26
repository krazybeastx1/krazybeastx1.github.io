import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Shared easing/timing tokens — short, transform+opacity only.
export const EASE = [0.22, 0.61, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export const stagger = (step = 0.06, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

/**
 * Scroll reveal. Fires once per element, renders the final state immediately
 * when the user prefers reduced motion.
 */
export function Reveal({ delay = 0, y = 16, className = '', children, ...rest }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Parent that staggers <RevealItem> children when scrolled into view. */
export function RevealGroup({ className = '', step = 0.07, delay = 0.05, children, ...rest }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={stagger(step, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ className = '', children, ...rest }) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  }
  return (
    <motion.div className={className} variants={fadeUp} {...rest}>
      {children}
    </motion.div>
  );
}

/** Tracks which section id is closest to the middle of the viewport. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/** Rotates through a list. Static first value under reduced motion. */
export function useRotatingRole(roles, interval = 2600) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || roles.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % roles.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [reduce, roles.length, interval]);

  return { role: roles[index], index };
}

/** Copy-to-clipboard with a short-lived "copied" flag. */
export function useCopy(text, resetAfter = 1800) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      document.body.removeChild(area);
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), resetAfter);
  };

  return { copied, copy };
}

/**
 * Pointer-reactive spotlight + tilt for project cards.
 * One rAF per frame, no React state, skipped on touch and reduced motion.
 */
export function useTilt(ref, { max = 3, disabled = false } = {}) {
  useEffect(() => {
    const element = ref.current;
    if (!element || disabled || !isFinePointer() || prefersReduced()) return;

    let frame = 0;
    let rect = null;
    let rotateX = 0;
    let rotateY = 0;

    const paint = () => {
      frame = 0;
      element.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    };

    const onMove = (event) => {
      rect ??= element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      rotateX = (0.5 - y) * max * 2;
      rotateY = (x - 0.5) * max * 2;
      element.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
      element.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      rect = null;
      element.style.transform = '';
    };

    element.addEventListener('pointermove', onMove, { passive: true });
    element.addEventListener('pointerleave', onLeave);
    return () => {
      element.removeEventListener('pointermove', onMove);
      element.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref, max, disabled]);
}

/** Global pointer position as CSS vars, for the atmospheric parallax layers. */
export function usePointerParallax() {
  useEffect(() => {
    if (!isFinePointer() || prefersReduced()) return;
    const root = document.documentElement;
    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      root.style.setProperty('--px', x.toFixed(3));
      root.style.setProperty('--py', y.toFixed(3));
    };

    const onMove = (event) => {
      x = (event.clientX / window.innerWidth - 0.5) * 2;
      y = (event.clientY / window.innerHeight - 0.5) * 2;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
      root.style.removeProperty('--px');
      root.style.removeProperty('--py');
    };
  }, []);
}
