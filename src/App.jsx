import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';
import Cursor from './components/Cursor';
import ErrorBoundary from './components/ErrorBoundary';

const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Timeline = lazy(() => import('./components/Timeline'));
const Projects = lazy(() => import('./components/Projects'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const NotFound = lazy(() => import('./components/NotFound'));

gsap.registerPlugin(ScrollTrigger);

function PortfolioPage() {
  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', overflowX: 'hidden', cursor: 'none' }}>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<div style={{ minHeight: '40vh' }} />}>
          <ErrorBoundary><About /></ErrorBoundary>
          <ErrorBoundary><Skills /></ErrorBoundary>
          <ErrorBoundary><Timeline /></ErrorBoundary>
          <ErrorBoundary><Projects /></ErrorBoundary>
          <ErrorBoundary><Testimonials /></ErrorBoundary>
          <ErrorBoundary><Contact /></ErrorBoundary>
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <LoadingScreen />
      <Cursor />
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="*" element={
          <Suspense fallback={null}>
            <NotFound />
          </Suspense>
        } />
      </Routes>
    </HashRouter>
  );
}

export default App;
