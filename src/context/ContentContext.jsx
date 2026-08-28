import React, { createContext, useContext, useState } from 'react';
import defaultContent from '../data/content.json';

const STORAGE_KEY = 'portfolio-content';
const AUTH_KEY = 'portfolio-edit-auth';
const DEFAULT_PASSCODE = 'aalthara';

const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
  // Helper to normalize project links (migration of legacy `link` / `liveDemoUrl`)
  const normalizeProject = (p) => ({
    ...p,
    githubUrl: p.githubUrl || p.link || '',
    demoUrl: p.demoUrl || p.liveDemoUrl || '',
  });

  // Helper to normalize contact object (migration of legacy `resumeUrl` / `resumeDataUrl`)
  const normalizeContact = (c = {}) => {
    const legacyUrl = c.resumeDataUrl || c.resumeUrl || '';
    const legacyName = c.resumeFileName || 'Akhilesh_MCA_Resume.pdf';
    const defaultCv = defaultContent.contact?.cv || {
      label: 'Curriculum Vitae',
      fileUrl: '',
      fileName: 'Akhilesh_MCA_Resume.pdf',
      updatedAt: 'Feb 2025',
    };

    const cvObj = c.cv
      ? { ...defaultCv, ...c.cv }
      : {
          ...defaultCv,
          fileUrl: legacyUrl || defaultCv.fileUrl || '',
          fileName: legacyName || defaultCv.fileName || 'Akhilesh_MCA_Resume.pdf',
        };

    return {
      ...defaultContent.contact,
      ...c,
      cv: cvObj,
      personalLinks: c.personalLinks || defaultContent.contact?.personalLinks || [],
    };
  };

  // Initialize content by deep-merging localStorage over defaultContent
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const rawProjects = parsed.projects || defaultContent.projects || [];
        const normalizedProjects = rawProjects.map(normalizeProject);
        const normalizedContact = normalizeContact(parsed.contact);

        return {
          ...defaultContent,
          ...parsed,
          sectionHeaders: {
            ...defaultContent.sectionHeaders,
            ...(parsed.sectionHeaders || {}),
          },
          hero: { ...defaultContent.hero, ...(parsed.hero || {}) },
          about: {
            ...defaultContent.about,
            ...(parsed.about || {}),
            directives: parsed.about?.directives || defaultContent.about.directives,
            stats: parsed.about?.stats || defaultContent.about.stats,
          },
          projects: normalizedProjects,
          skills: parsed.skills || defaultContent.skills,
          contact: normalizedContact,
          resume: { ...defaultContent.resume, ...(parsed.resume || {}) },
        };
      }
    } catch (e) {
      console.warn('Failed to load content from localStorage', e);
    }

    return {
      ...defaultContent,
      sectionHeaders: defaultContent.sectionHeaders || {},
      projects: (defaultContent.projects || []).map(normalizeProject),
      contact: normalizeContact(defaultContent.contact),
    };
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [isSavedNotification, setIsSavedNotification] = useState(false);

  // Toggle Edit Mode: gates with password if not yet authenticated
  const toggleEditMode = () => {
    if (isEditMode) {
      setIsEditMode(false);
    } else {
      if (isAuthenticated) {
        setIsEditMode(true);
      } else {
        setIsPasswordModalOpen(true);
      }
    }
  };

  const authenticatePassword = (enteredPassword) => {
    if (enteredPassword.trim().toLowerCase() === DEFAULT_PASSCODE) {
      try {
        sessionStorage.setItem(AUTH_KEY, 'true');
      } catch {}
      setIsAuthenticated(true);
      setIsPasswordModalOpen(false);
      setIsEditMode(true);
      return { success: true };
    }
    return { success: false, error: 'Incorrect passcode. (Passcode: aalthara)' };
  };

  // Save changes to localStorage
  const saveToLocalStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content, null, 2));
      setIsSavedNotification(true);
      setTimeout(() => setIsSavedNotification(false), 2500);
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  };

  // Export current content as downloadable content.json
  const exportJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(content, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'content.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Reset to default content
  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all edits to the original default content? This cannot be undone.')) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
      setContent({
        ...defaultContent,
        projects: (defaultContent.projects || []).map(normalizeProject),
        contact: normalizeContact(defaultContent.contact),
      });
      setIsSavedNotification(true);
      setTimeout(() => setIsSavedNotification(false), 2000);
    }
  };

  // Generic updater by nested dot-path (e.g. 'hero.name', 'about.bio')
  const updateField = (path, value) => {
    setContent((prev) => {
      const keys = path.split('.');
      const updated = { ...prev };
      let current = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  // Hero Section Updaters
  const updateHero = (updates) => {
    setContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...updates },
    }));
  };

  // About Section Updaters
  const updateAbout = (updates) => {
    setContent((prev) => ({
      ...prev,
      about: { ...prev.about, ...updates },
    }));
  };

  const addStat = (newStat = { id: `stat-${Date.now()}`, value: '10+', label: 'New Metric', sublabel: 'Description' }) => {
    setContent((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        stats: [...(prev.about.stats || []), newStat],
      },
    }));
  };

  const removeStat = (index) => {
    setContent((prev) => {
      const newStats = [...prev.about.stats];
      newStats.splice(index, 1);
      return {
        ...prev,
        about: { ...prev.about, stats: newStats },
      };
    });
  };

  const updateStat = (index, updates) => {
    setContent((prev) => {
      const newStats = [...prev.about.stats];
      newStats[index] = { ...newStats[index], ...updates };
      return {
        ...prev,
        about: { ...prev.about, stats: newStats },
      };
    });
  };

  // Projects Section Updaters
  const addProject = (project) => {
    const newProj = {
      id: project.id || `project-${Date.now()}`,
      title: project.title || 'New Project',
      subtitle: project.subtitle || 'System Architecture',
      year: project.year || '2025',
      shortDesc: project.shortDesc || 'Project description summary.',
      fullDesc: project.fullDesc || project.shortDesc || '',
      signatureDetail: project.signatureDetail || 'Core Module',
      techStack: project.techStack || ['Python', 'Django'],
      keyHighlights: project.keyHighlights || ['Engineered key backend services.'],
      githubUrl: project.githubUrl || project.link || '',
      demoUrl: project.demoUrl || project.liveDemoUrl || '',
    };
    setContent((prev) => ({
      ...prev,
      projects: [newProj, ...prev.projects],
    }));
  };

  const editProject = (index, updatedProject) => {
    setContent((prev) => {
      const newProjects = [...prev.projects];
      newProjects[index] = {
        ...newProjects[index],
        ...updatedProject,
        githubUrl: updatedProject.githubUrl !== undefined ? updatedProject.githubUrl : newProjects[index].githubUrl,
        demoUrl: updatedProject.demoUrl !== undefined ? updatedProject.demoUrl : newProjects[index].demoUrl,
      };
      return {
        ...prev,
        projects: newProjects,
      };
    });
  };

  const deleteProject = (index) => {
    if (window.confirm('Delete this project?')) {
      setContent((prev) => {
        const newProjects = [...prev.projects];
        newProjects.splice(index, 1);
        return {
          ...prev,
          projects: newProjects,
        };
      });
    }
  };

  const reorderProject = (index, direction) => {
    setContent((prev) => {
      const newProjects = [...prev.projects];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= newProjects.length) return prev;
      const temp = newProjects[index];
      newProjects[index] = newProjects[targetIndex];
      newProjects[targetIndex] = temp;
      return {
        ...prev,
        projects: newProjects,
      };
    });
  };

  // Skills Section Updaters
  const addSkill = (categoryName, skill = { name: 'New Skill', level: 'Proficient' }) => {
    setContent((prev) => {
      const skills = { ...prev.skills };
      if (!skills[categoryName]) {
        skills[categoryName] = { description: 'Category skills', items: [] };
      }
      skills[categoryName] = {
        ...skills[categoryName],
        items: [...skills[categoryName].items, skill],
      };
      return { ...prev, skills };
    });
  };

  const deleteSkill = (categoryName, skillIndex) => {
    setContent((prev) => {
      const skills = { ...prev.skills };
      if (skills[categoryName]) {
        const items = [...skills[categoryName].items];
        items.splice(skillIndex, 1);
        skills[categoryName] = { ...skills[categoryName], items };
      }
      return { ...prev, skills };
    });
  };

  const updateSkill = (categoryName, skillIndex, updates) => {
    setContent((prev) => {
      const skills = { ...prev.skills };
      if (skills[categoryName]) {
        const items = [...skills[categoryName].items];
        items[skillIndex] = { ...items[skillIndex], ...updates };
        skills[categoryName] = { ...skills[categoryName], items };
      }
      return { ...prev, skills };
    });
  };

  const addSkillCategory = (categoryName, description = 'Category tools') => {
    if (!categoryName.trim()) return;
    setContent((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [categoryName]: { description, items: [] },
      },
    }));
  };

  const deleteSkillCategory = (categoryName) => {
    if (window.confirm(`Delete entire category "${categoryName}"?`)) {
      setContent((prev) => {
        const skills = { ...prev.skills };
        delete skills[categoryName];
        return { ...prev, skills };
      });
    }
  };

  const renameSkillCategory = (oldName, newName) => {
    if (!newName || !newName.trim() || oldName === newName) return;
    const trimmed = newName.trim();
    setContent((prev) => {
      const currentSkills = prev.skills || {};
      if (!currentSkills[oldName]) return prev;

      const updatedSkills = {};
      Object.keys(currentSkills).forEach((k) => {
        if (k === oldName) {
          updatedSkills[trimmed] = currentSkills[oldName];
        } else {
          updatedSkills[k] = currentSkills[k];
        }
      });

      return {
        ...prev,
        skills: updatedSkills,
      };
    });
  };

  // Section Headers Updater (for section eyebrows, titles, descriptions)
  const updateSectionHeader = (sectionKey, updates) => {
    setContent((prev) => {
      const currentHeaders = prev.sectionHeaders || defaultContent.sectionHeaders || {};
      const currentSection = currentHeaders[sectionKey] || {};
      return {
        ...prev,
        sectionHeaders: {
          ...currentHeaders,
          [sectionKey]: {
            ...currentSection,
            ...updates,
          },
        },
      };
    });
  };

  // Contact Section Updaters
  const updateContact = (updates) => {
    setContent((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...updates },
    }));
  };

  // CV / Resume Specific Updater
  const updateCv = (updates) => {
    setContent((prev) => {
      const currentCv = prev.contact?.cv || {
        label: 'Curriculum Vitae',
        fileUrl: '',
        fileName: 'Akhilesh_MCA_Resume.pdf',
        updatedAt: '',
      };
      return {
        ...prev,
        contact: {
          ...prev.contact,
          cv: {
            ...currentCv,
            ...updates,
          },
        },
      };
    });
  };

  // Personal Links Updaters
  const addPersonalLink = (newLink = { id: `link-${Date.now()}`, label: 'New Link', url: 'https://', icon: 'globe' }) => {
    setContent((prev) => {
      const currentLinks = prev.contact?.personalLinks || [];
      return {
        ...prev,
        contact: {
          ...prev.contact,
          personalLinks: [...currentLinks, newLink],
        },
      };
    });
  };

  const removePersonalLink = (index) => {
    setContent((prev) => {
      const currentLinks = [...(prev.contact?.personalLinks || [])];
      currentLinks.splice(index, 1);
      return {
        ...prev,
        contact: {
          ...prev.contact,
          personalLinks: currentLinks,
        },
      };
    });
  };

  const updatePersonalLink = (index, updates) => {
    setContent((prev) => {
      const currentLinks = [...(prev.contact?.personalLinks || [])];
      currentLinks[index] = { ...currentLinks[index], ...updates };
      return {
        ...prev,
        contact: {
          ...prev.contact,
          personalLinks: currentLinks,
        },
      };
    });
  };

  // Resume Section Updaters
  const updateResume = (updates) => {
    setContent((prev) => ({
      ...prev,
      resume: {
        ...(prev.resume || {}),
        ...updates,
      },
    }));
  };

  const addCertification = (cert = 'New Certification or Credential') => {
    setContent((prev) => {
      const current = prev.resume?.certifications || [];
      return {
        ...prev,
        resume: {
          ...(prev.resume || {}),
          certifications: [...current, cert],
        },
      };
    });
  };

  const removeCertification = (index) => {
    setContent((prev) => {
      const current = [...(prev.resume?.certifications || [])];
      current.splice(index, 1);
      return {
        ...prev,
        resume: {
          ...(prev.resume || {}),
          certifications: current,
        },
      };
    });
  };

  const updateCertification = (index, value) => {
    setContent((prev) => {
      const current = [...(prev.resume?.certifications || [])];
      current[index] = value;
      return {
        ...prev,
        resume: {
          ...(prev.resume || {}),
          certifications: current,
        },
      };
    });
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        isEditMode,
        setIsEditMode,
        isPasswordModalOpen,
        setIsPasswordModalOpen,
        isAuthenticated,
        toggleEditMode,
        authenticatePassword,
        saveToLocalStorage,
        exportJson,
        resetToDefaults,
        isSavedNotification,
        updateField,
        updateHero,
        updateAbout,
        addStat,
        removeStat,
        updateStat,
        addProject,
        editProject,
        deleteProject,
        reorderProject,
        addSkill,
        deleteSkill,
        updateSkill,
        addSkillCategory,
        deleteSkillCategory,
        renameSkillCategory,
        updateSectionHeader,
        updateContact,
        updateCv,
        updateResume,
        addCertification,
        removeCertification,
        updateCertification,
        addPersonalLink,
        removePersonalLink,
        updatePersonalLink,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
