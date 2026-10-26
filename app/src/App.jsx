import { useMemo } from 'react';
import Atmosphere from './components/Atmosphere.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Credentials from './components/Credentials.jsx';
import Services from './components/Services.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import { useActiveSection, usePointerParallax } from './components/motion.jsx';

export default function App() {
  // Memoised so the IntersectionObserver effect doesn't re-run every render.
  const sections = useMemo(
    () => ['about', 'skills', 'work', 'credentials', 'services', 'contact'],
    [],
  );
  const active = useActiveSection(sections);
  usePointerParallax();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Atmosphere />
      <Nav active={active} />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Credentials />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
