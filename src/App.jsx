import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';
import Cursor from './components/Cursor';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <>
      <LoadingScreen />
      <Cursor />
      <div style={{ background: '#0a0a0f', minHeight: '100vh', overflowX: 'hidden', cursor: 'none' }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Timeline />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}

export default App;
