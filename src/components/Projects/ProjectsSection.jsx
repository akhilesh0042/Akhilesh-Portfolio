import React, { useState } from 'react';
import { SectionHeader } from '../Common/SectionHeader';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { ProjectEditModal } from '../EditMode/ProjectEditModal';
import { useContent } from '../../context/ContentContext';
import { Plus } from 'lucide-react';

export const ProjectsSection = () => {
  const { content, addProject, editProject, isEditMode } = useContent();
  const projects = content.projects || [];

  const [selectedProject, setSelectedProject] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProjectData, setEditingProjectData] = useState({ project: null, index: -1 });

  const handleOpenAddModal = () => {
    setEditingProjectData({ project: null, index: -1 });
    setIsEditModalOpen(true);
  };

  const handleOpenEditModal = (project, index) => {
    setEditingProjectData({ project, index });
    setIsEditModalOpen(true);
  };

  const handleSaveProject = (projectData) => {
    if (editingProjectData.index >= 0) {
      editProject(editingProjectData.index, projectData);
    } else {
      addProject(projectData);
    }
  };

  // Split into left and right columns to maintain reverse-grid zigzag rhythm:
  // Right column: 0, 2, 4, 6... (anchors top right)
  // Left column: 1, 3, 5, 7... (offset downwards by lg:pt-14)
  const rightColumnProjects = projects.filter((_, idx) => idx % 2 === 0);
  const leftColumnProjects = projects.filter((_, idx) => idx % 2 !== 0);

  return (
    <section
      id="projects"
      className="py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto relative"
      aria-label="Selected Engineering Projects"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
        <SectionHeader
          number="02"
          eyebrow="SELECTED WORK"
          title="Engineered systems & applied intelligence."
          description="A curated selection of full-stack Django applications, database workflows, and generative AI integrations. Arranged in reverse-grid order with staggered elevation planes."
        />

        {/* Add Project Button in Edit Mode */}
        {isEditMode && (
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 rounded-lg bg-elevation1 hover:bg-elevation2 border border-accent/40 hover:border-accent text-accent text-xs font-mono font-medium flex items-center gap-2 transition-all hover:-translate-y-0.5 shadow-elevation-chip shrink-0 mb-12"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
        )}
      </div>

      {/* 
        Reverse Grid Container:
        - Right-to-Left priority: LeavEase (Project 1) is the primary anchor at Top-Right.
        - Left column is vertically offset by ~48px on desktop to create the signature zigzag line.
        - Mobile flattens to a single column.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pt-4 pb-8 items-start">
        {/* Left Column: Odd indices (1, 3, 5...) — Offset downwards on desktop for Zigzag */}
        <div className="space-y-8 lg:space-y-14 lg:pt-14">
          {leftColumnProjects.map((project) => {
            const actualIndex = projects.findIndex((p) => p.id === project.id);
            return (
              <ProjectCard
                key={project.id || actualIndex}
                project={project}
                index={actualIndex}
                totalProjects={projects.length}
                onSelectProject={setSelectedProject}
                onEditProject={handleOpenEditModal}
              />
            );
          })}
        </div>

        {/* Right Column: Even indices (0, 2, 4...) — Anchored at top */}
        <div className="space-y-8 lg:space-y-14">
          {rightColumnProjects.map((project) => {
            const actualIndex = projects.findIndex((p) => p.id === project.id);
            return (
              <ProjectCard
                key={project.id || actualIndex}
                project={project}
                index={actualIndex}
                totalProjects={projects.length}
                onSelectProject={setSelectedProject}
                onEditProject={handleOpenEditModal}
              />
            );
          })}
        </div>
      </div>

      {/* Interactive Modal for Deep Dive (View Mode) */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />

      {/* Project Edit / Add Modal (Edit Mode) */}
      <ProjectEditModal
        isOpen={isEditModalOpen}
        project={editingProjectData.project}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProject}
      />
    </section>
  );
};
