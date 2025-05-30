import React, { createContext, useContext, useEffect, useState } from 'react';
import { ResumeData, defaultResumeData } from '../types/resume';

interface ResumeContextType {
  resumeData: ResumeData;
  updatePersonalInfo: (data: Partial<ResumeData['personalInfo']>) => void;
  updateSummary: (text: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<Omit<ResumeData['experience'][0], 'id'>>) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Omit<ResumeData['education'][0], 'id'>>) => void;
  removeEducation: (id: string) => void;
  addSkillGroup: () => void;
  updateSkillGroup: (id: string, name: string) => void;
  removeSkillGroup: (id: string) => void;
  addSkill: (groupId: string) => void;
  updateSkill: (groupId: string, id: string, data: Partial<Omit<ResumeData['skillGroups'][0]['skills'][0], 'id'>>) => void;
  removeSkill: (groupId: string, id: string) => void;
  addProject: () => void;
  updateProject: (id: string, data: Partial<Omit<ResumeData['projects'][0], 'id'>>) => void;
  removeProject: (id: string) => void;
  updateSectionOrder: (newOrder: ResumeData['sectionOrder']) => void;
  updateTemplate: (template: string) => void;
  resetResumeData: () => void;
}

export const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

// Generate a unique ID for new items
const generateId = () => Math.random().toString(36).substring(2, 10);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const savedData = localStorage.getItem('resumeData');
    return savedData ? JSON.parse(savedData) : defaultResumeData;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  const updatePersonalInfo = (data: Partial<ResumeData['personalInfo']>) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...data
      }
    }));
  };

  const updateSummary = (text: string) => {
    setResumeData(prev => ({
      ...prev,
      summary: { text }
    }));
  };

  const addExperience = () => {
    const newExperience = {
      id: generateId(),
      company: 'New Company',
      position: 'New Position',
      location: 'City, State',
      startDate: '',
      endDate: '',
      current: true,
      description: '',
      highlights: ['']
    };
    setResumeData(prev => ({
      ...prev,
      experience: [newExperience, ...prev.experience]
    }));
  };

  const updateExperience = (id: string, data: Partial<Omit<ResumeData['experience'][0], 'id'>>) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, ...data } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newEducation = {
      id: generateId(),
      institution: 'New Institution',
      degree: 'Degree',
      field: 'Field of Study',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [newEducation, ...prev.education]
    }));
  };

  const updateEducation = (id: string, data: Partial<Omit<ResumeData['education'][0], 'id'>>) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, ...data } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkillGroup = () => {
    const newSkillGroup = {
      id: generateId(),
      name: 'New Skill Group',
      skills: []
    };
    setResumeData(prev => ({
      ...prev,
      skillGroups: [...prev.skillGroups, newSkillGroup]
    }));
  };

  const updateSkillGroup = (id: string, name: string) => {
    setResumeData(prev => ({
      ...prev,
      skillGroups: prev.skillGroups.map(group => 
        group.id === id ? { ...group, name } : group
      )
    }));
  };

  const removeSkillGroup = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skillGroups: prev.skillGroups.filter(group => group.id !== id)
    }));
  };

  const addSkill = (groupId: string) => {
    const newSkill = {
      id: generateId(),
      name: 'New Skill',
      level: 3
    };
    setResumeData(prev => ({
      ...prev,
      skillGroups: prev.skillGroups.map(group => 
        group.id === groupId 
          ? { ...group, skills: [...group.skills, newSkill] } 
          : group
      )
    }));
  };

  const updateSkill = (groupId: string, id: string, data: Partial<Omit<ResumeData['skillGroups'][0]['skills'][0], 'id'>>) => {
    setResumeData(prev => ({
      ...prev,
      skillGroups: prev.skillGroups.map(group => 
        group.id === groupId 
          ? {
              ...group,
              skills: group.skills.map(skill => 
                skill.id === id ? { ...skill, ...data } : skill
              )
            } 
          : group
      )
    }));
  };

  const removeSkill = (groupId: string, id: string) => {
    setResumeData(prev => ({
      ...prev,
      skillGroups: prev.skillGroups.map(group => 
        group.id === groupId 
          ? {
              ...group,
              skills: group.skills.filter(skill => skill.id !== id)
            } 
          : group
      )
    }));
  };

  const addProject = () => {
    const newProject = {
      id: generateId(),
      name: 'New Project',
      description: 'Project description',
      url: '',
      highlights: [''],
      startDate: '',
      endDate: ''
    };
    setResumeData(prev => ({
      ...prev,
      projects: [newProject, ...prev.projects]
    }));
  };

  const updateProject = (id: string, data: Partial<Omit<ResumeData['projects'][0], 'id'>>) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(project => 
        project.id === id ? { ...project, ...data } : project
      )
    }));
  };

  const removeProject = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id)
    }));
  };

  const updateSectionOrder = (newOrder: ResumeData['sectionOrder']) => {
    setResumeData(prev => ({
      ...prev,
      sectionOrder: newOrder
    }));
  };

  const updateTemplate = (template: string) => {
    setResumeData(prev => ({
      ...prev,
      template
    }));
  };

  const resetResumeData = () => {
    setResumeData(defaultResumeData);
  };

  return (
    <ResumeContext.Provider value={{
      resumeData,
      updatePersonalInfo,
      updateSummary,
      addExperience,
      updateExperience,
      removeExperience,
      addEducation,
      updateEducation,
      removeEducation,
      addSkillGroup,
      updateSkillGroup,
      removeSkillGroup,
      addSkill,
      updateSkill,
      removeSkill,
      addProject,
      updateProject,
      removeProject,
      updateSectionOrder,
      updateTemplate,
      resetResumeData
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};