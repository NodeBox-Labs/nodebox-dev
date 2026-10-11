import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MetricsBanner } from './components/MetricsBanner';
import { Marquee } from './components/Marquee';
import { Features } from './components/Features';
import { UsageTabs } from './components/UsageTabs';
import { Architecture } from './components/Architecture';
import { SocialProof } from './components/SocialProof';
import { Benchmarks } from './components/Benchmarks';
import { InteractiveStudio } from './components/InteractiveStudio';
import { Pricing } from './components/Pricing';
import { ApiReference } from './components/ApiReference';
import { BlogPreview } from './components/BlogPreview';
import { CTA } from './components/CTA';
import { DocsModal } from './components/DocsModal';
import { Footer } from './components/Footer';

export function App() {
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  const scrollToStudio = () => {
    const el = document.getElementById('studio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-100 font-sans selection:bg-orange-500/30 selection:text-orange-200">
      <Navbar
        onOpenDocs={() => setIsDocsOpen(true)}
        onScrollToStudio={scrollToStudio}
      />

      <main>
        {/* 1 — Hero banner */}
        <Hero onLaunchStudio={scrollToStudio} onOpenDocs={() => setIsDocsOpen(true)} />

        {/* 2 — Key metrics strip */}
        <MetricsBanner />

        {/* 3 — Technology marquee */}
        <Marquee />

        {/* 4 — Feature cards */}
        <Features />

        {/* 5 — Sandbox / Studio / Runner tabs */}
        <UsageTabs />

        {/* 6 — Architecture deep-dive */}
        <Architecture />

        {/* 7 — Social proof / testimonials */}
        <SocialProof />

        {/* 8 — Performance benchmarks */}
        <Benchmarks />

        {/* 9 — Interactive Studio playground */}
        <InteractiveStudio />

        {/* 10 — Pricing */}
        <Pricing />

        {/* 11 — API Reference */}
        <ApiReference />

        {/* 12 — Blog preview */}
        <BlogPreview />

        {/* 13 — Final CTA */}
        <CTA onLaunchStudio={scrollToStudio} onOpenDocs={() => setIsDocsOpen(true)} />
      </main>

      <Footer
        onOpenDocs={() => setIsDocsOpen(true)}
        onScrollToStudio={scrollToStudio}
      />

      <DocsModal isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} />
    </div>
  );
}

export default App;
