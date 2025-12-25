import { useEffect, useState } from 'react';
import Lenis from 'lenis';

import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Vault from './sections/Vault';
import BioMetrics from './sections/BioMetrics';
import MemeForge from './sections/MemeForge';
import StickerHub from './sections/StickerHub';
import CommandPalette from './components/CommandPalette';

function App() {
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isBioMetricsOpen, setIsBioMetricsOpen] = useState(false);
  const [isMemeForgeOpen, setIsMemeForgeOpen] = useState(false);
  const [isStickerHubOpen, setIsStickerHubOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />

      <CommandPalette
        onOpenVault={() => setIsVaultOpen(true)}
        onOpenBioMetrics={() => setIsBioMetricsOpen(true)}
        onOpenMemeForge={() => setIsMemeForgeOpen(true)}
        onOpenStickerHub={() => setIsStickerHubOpen(true)}
      />
      <Vault isOpen={isVaultOpen} onClose={() => setIsVaultOpen(false)} />
      <BioMetrics isOpen={isBioMetricsOpen} onClose={() => setIsBioMetricsOpen(false)} />
      <MemeForge isOpen={isMemeForgeOpen} onClose={() => setIsMemeForgeOpen(false)} />
      <StickerHub isOpen={isStickerHubOpen} onClose={() => setIsStickerHubOpen(false)} />
    </div>
  );
}

export default App;
