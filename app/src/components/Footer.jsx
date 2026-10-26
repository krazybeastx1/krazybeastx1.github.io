import { profile } from '../data.js';
import { Icon } from './Icons.jsx';

export default function Footer() {
  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__mark mono" aria-hidden="true">kj</span>
          <p className="mono muted">
            © {new Date().getFullYear()} {profile.name} — built with React &amp; Framer Motion
          </p>
        </div>

        <button type="button" className="footer__top mono" onClick={toTop} aria-label="Back to top">
          <Icon name="arrow" size={14} />
          top
        </button>
      </div>
    </footer>
  );
}
