import React from 'react';
import { ResumeData } from '../../types/resume';
import { formatDateRange } from '../../utils/dateUtils';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface MinimalTemplateProps {
  data: ResumeData;
}

const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skillGroups, projects, sectionOrder } = data;

  const renderSection = (section: string) => {
    switch (section) {
      case 'personalInfo':
        return null; // Handled separately in the header
      case 'summary':
        return (
          <div className="mb-6">
            <h2 className="text-md uppercase tracking-wider text-slate-500 mb-3">About</h2>
            <p className="text-slate-700">{summary.text}</p>
          </div>
        );
      case 'experience':
        return (
          <div className="mb-6">
            <h2 className="text-md uppercase tracking-wider text-slate-500 mb-3">Experience</h2>
            
            {experience.map((exp) => (
              <div key={exp.id} className="mb-5">
                <div className="flex flex-col md:flex-row justify-between md:items-end mb-1">
                  <h3 className="font-medium text-slate-900">
                    {exp.position} · <span className="text-slate-700">{exp.company}</span>
                  </h3>
                  <div className="text-slate-600 text-sm">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    {exp.location && ` · ${exp.location}`}
                  </div>
                </div>
                
                {exp.description && <p className="text-slate-700 mt-1">{exp.description}</p>}
                
                {exp.highlights.length > 0 && exp.highlights.some(h => h.trim()) && (
                  <ul className="list-disc list-outside pl-5 mt-2">
                    {exp.highlights.filter(h => h.trim()).map((highlight, index) => (
                      <li key={index} className="text-slate-700 mt-1">{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        );
      case 'education':
        return (
          <div className="mb-6">
            <h2 className="text-md uppercase tracking-wider text-slate-500 mb-3">Education</h2>
            
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <div className="flex flex-col md:flex-row justify-between md:items-end mb-1">
                  <h3 className="font-medium text-slate-900">
                    {edu.degree} in {edu.field} · <span className="text-slate-700">{edu.institution}</span>
                  </h3>
                  <div className="text-slate-600 text-sm">
                    {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                  </div>
                </div>
                
                {edu.description && <p className="text-slate-700 mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        );
      case 'skills':
        return (
          <div className="mb-6">
            <h2 className="text-md uppercase tracking-wider text-slate-500 mb-3">Skills</h2>
            
            {skillGroups.map((group) => (
              <div key={group.id} className="mb-4">
                <h3 className="font-medium text-slate-900 mb-2">{group.name}</h3>
                <div className="flex flex-wrap gap-1">
                  {group.skills.map((skill) => (
                    <span 
                      key={skill.id} 
                      className="inline-block px-2 py-1 bg-slate-100 text-slate-700 text-sm rounded"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case 'projects':
        return (
          <div className="mb-6">
            <h2 className="text-md uppercase tracking-wider text-slate-500 mb-3">Projects</h2>
            
            {projects.map((project) => (
              <div key={project.id} className="mb-5">
                <div className="flex flex-col md:flex-row justify-between md:items-end mb-1">
                  <h3 className="font-medium text-slate-900">
                    {project.name}
                    {project.url && (
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-2 text-sm text-slate-500 hover:text-slate-700"
                      >
                        ↗
                      </a>
                    )}
                  </h3>
                  {(project.startDate || project.endDate) && (
                    <div className="text-slate-600 text-sm">
                      {formatDateRange(project.startDate || '', project.endDate || '', false)}
                    </div>
                  )}
                </div>
                
                <p className="text-slate-700 mt-1">{project.description}</p>
                
                {project.highlights.length > 0 && project.highlights.some(h => h.trim()) && (
                  <ul className="list-disc list-outside pl-5 mt-2">
                    {project.highlights.filter(h => h.trim()).map((highlight, index) => (
                      <li key={index} className="text-slate-700 mt-1">{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 max-w-[210mm] w-full mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-slate-900">{personalInfo.name}</h1>
        <p className="text-lg text-slate-700">{personalInfo.title}</p>
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm">
          {personalInfo.email && (
            <div className="flex items-center text-slate-600">
              <Mail size={12} className="mr-1" />
              <a href={`mailto:${personalInfo.email}`} className="hover:text-slate-900">
                {personalInfo.email}
              </a>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center text-slate-600">
              <Phone size={12} className="mr-1" />
              <a href={`tel:${personalInfo.phone}`} className="hover:text-slate-900">
                {personalInfo.phone}
              </a>
            </div>
          )}
          
          {personalInfo.location && (
            <div className="flex items-center text-slate-600">
              <MapPin size={12} className="mr-1" />
              {personalInfo.location}
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center text-slate-600">
              <Globe size={12} className="mr-1" />
              <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">
                {personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center text-slate-600">
              <Linkedin size={12} className="mr-1" />
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">
                {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
              </a>
            </div>
          )}
          
          {personalInfo.github && (
            <div className="flex items-center text-slate-600">
              <Github size={12} className="mr-1" />
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">
                {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
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

export default MinimalTemplate;