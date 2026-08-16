import React, { useState } from 'react';
import { ContentProvider } from './context/ContentContext';
import { MenuCard } from './components/Navigation/MenuCard';
import { HeroSection } from './components/Hero/HeroSection';
import { AboutSection } from './components/About/AboutSection';
import { ProjectsSection } from './components/Projects/ProjectsSection';
import { SkillsSection } from './components/Skills/SkillsSection';
import { ContactSection } from './components/Contact/ContactSection';
import { ResumeModal } from './components/Contact/ResumeModal';
import { PasswordModal } from './components/EditMode/PasswordModal';
import { FloatingEditBar } from './components/EditMode/FloatingEditBar';
import { Footer } from './components/Common/Footer';

function PortfolioApp() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="bg-base text-textPrimary min-h-screen relative font-body selection:bg-accent/20 selection:text-accent">
      {/* Persistent Stationary Menu Card with Edit Mode toggle */}
      <MenuCard />

      {/* Main Content Layout */}
      <main className="relative z-10">
        <HeroSection onOpenResume={() => setIsResumeOpen(true)} />
        
        {/* Subtle Suspended Section Divider on Plane 1 */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
        </div>

        <AboutSection />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
        </div>

        <ProjectsSection />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
        </div>

        <SkillsSection />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
        </div>

        <ContactSection onOpenResume={() => setIsResumeOpen(true)} />
      </main>

      {/* Global Interactive Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Password Gate Modal for Edit Mode */}
      <PasswordModal />

      {/* Floating Bottom Edit Control Bar (Visible in Edit Mode only) */}
      <FloatingEditBar />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <ContentProvider>
      <PortfolioApp />
    </ContentProvider>
  );
}

export default App;
