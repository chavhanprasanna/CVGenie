import React from 'react';
import { ResumeData } from '../../types/resume';
import { formatDateRange } from '../../utils/dateUtils';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface CreativeTemplateProps {
  data: ResumeData;
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skillGroups, projects, sectionOrder } = data;

  const renderSection = (section: string) => {
    switch (section) {
      case 'personalInfo':
        return null; // Handled separately in the header
      case 'summary':
        return (
          <div className="mb-6 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-slate-800 dark:to-purple-900 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-3">
              About Me
            </h2>
            <p className="text-slate-700 dark:text-slate-300 italic">{summary.text}</p>
          </div>
        );
      case 'experience':
        return (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-4 flex items-center">
              <span className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-2">
                <span className="text-indigo-500 dark:text-indigo-300">✦</span>
              </span>
              Professional Experience
            </h2>
            
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b from-indigo-400 to-purple-400 dark:from-indigo-600 dark:to-purple-600">
                  <div className="absolute left-[-5px] top-0 h-3 w-3 rounded-full bg-indigo-500 dark:bg-indigo-400"></div>
                  <div className="mb-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{exp.position}</h3>
                    <div className="flex flex-wrap justify-between items-baseline">
                      <h4 className="text-indigo-600 dark:text-indigo-400 font-medium">{exp.company}</h4>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                        {exp.location && ` • ${exp.location}`}
                      </span>
                    </div>
                  </div>
                  {exp.description && <p className="text-slate-700 dark:text-slate-300 mt-2">{exp.description}</p>}
                  {exp.highlights.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.highlights.filter(h => h.trim()).map((highlight, index) => (
                        <li key={index} className="text-slate-700 dark:text-slate-300 flex items-start">
                          <span className="text-indigo-500 dark:text-indigo-400 mr-2">›</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 'education':
        return (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-4 flex items-center">
              <span className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-2">
                <span className="text-indigo-500 dark:text-indigo-300">✦</span>
              </span>
              Education
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu) => (
                <div key={edu.id} className="p-4 bg-gradient-to-r from-indigo-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-lg shadow-sm">
                  <div className="mb-2">
                    <h3 className="font-bold text-slate-900 dark:text-white">{edu.degree}</h3>
                    <h4 className="text-indigo-600 dark:text-indigo-400">{edu.institution}</h4>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                    </div>
                  </div>
                  {edu.description && <p className="text-slate-700 dark:text-slate-300 text-sm">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-4 flex items-center">
              <span className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-2">
                <span className="text-indigo-500 dark:text-indigo-300">✦</span>
              </span>
              Skills
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillGroups.map((group) => (
                <div key={group.id} className="p-4 bg-gradient-to-r from-purple-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-lg shadow-sm">
                  <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-2">{group.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => {
                      // Calculate a color based on skill level (1-5)
                      const level = skill.level || 3;
                      const intensity = 400 + (level * 100);
                      
                      return (
                        <div 
                          key={skill.id} 
                          className={`px-3 py-1 rounded-full text-white text-sm
                                     bg-indigo-${intensity} dark:bg-indigo-${intensity > 600 ? 600 : intensity}`}
                        >
                          {skill.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'projects':
        return (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-4 flex items-center">
              <span className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-2">
                <span className="text-indigo-500 dark:text-indigo-300">✦</span>
              </span>
              Projects
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="p-5 rounded-lg shadow-sm bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-900">
                  <div className="mb-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-slate-900 dark:text-white">
                        {project.name}
                      </h3>
                      {project.url && (
                        <a 
                          href={project.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="ml-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                        >
                          <Globe size={16} />
                        </a>
                      )}
                    </div>
                    {(project.startDate || project.endDate) && (
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {formatDateRange(project.startDate || '', project.endDate || '', false)}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">{project.description}</p>
                  
                  {project.highlights.length > 0 && (
                    <div className="mt-2">
                      <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Key Features</div>
                      <ul className="space-y-1">
                        {project.highlights.filter(h => h.trim()).map((highlight, index) => (
                          <li key={index} className="text-slate-700 dark:text-slate-300 text-sm flex items-start">
                            <span className="text-indigo-500 dark:text-indigo-400 mr-2">›</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 max-w-[210mm] w-full mx-auto">
      {/* Header with gradient background */}
      <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <h1 className="text-3xl font-bold">{personalInfo.name}</h1>
        <p className="text-lg opacity-90 mt-1">{personalInfo.title}</p>
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-sm">
          {personalInfo.email && (
            <div className="flex items-center opacity-90 hover:opacity-100">
              <Mail size={14} className="mr-1" />
              <a href={`mailto:${personalInfo.email}`} className="hover:underline">
                {personalInfo.email}
              </a>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center opacity-90 hover:opacity-100">
              <Phone size={14} className="mr-1" />
              <a href={`tel:${personalInfo.phone}`} className="hover:underline">
                {personalInfo.phone}
              </a>
            </div>
          )}
          
          {personalInfo.location && (
            <div className="flex items-center opacity-90">
              <MapPin size={14} className="mr-1" />
              {personalInfo.location}
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center opacity-90 hover:opacity-100">
              <Globe size={14} className="mr-1" />
              <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center opacity-90 hover:opacity-100">
              <Linkedin size={14} className="mr-1" />
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
              </a>
            </div>
          )}
          
          {personalInfo.github && (
            <div className="flex items-center opacity-90 hover:opacity-100">
              <Github size={14} className="mr-1" />
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Content with sections */}
      <div>
        {sectionOrder.filter(section => section !== 'personalInfo').map(section => (
          <React.Fragment key={section}>
            {renderSection(section)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CreativeTemplate;
