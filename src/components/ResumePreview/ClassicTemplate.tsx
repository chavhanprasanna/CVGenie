import React from 'react';
import { ResumeData } from '../../types/resume';
import { formatDateRange } from '../../utils/dateUtils';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface ClassicTemplateProps {
  data: ResumeData;
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skillGroups, projects, sectionOrder } = data;

  const renderSection = (section: string) => {
    switch (section) {
      case 'personalInfo':
        return null; // Handled separately in the header
      case 'summary':
        return (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-center text-slate-900 uppercase tracking-wider mb-2">
              Professional Summary
            </h2>
            <div className="h-1 w-full bg-slate-900 mb-4"></div>
            <p className="text-slate-700">{summary.text}</p>
          </div>
        );
      case 'experience':
        return (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-center text-slate-900 uppercase tracking-wider mb-2">
              Work Experience
            </h2>
            <div className="h-1 w-full bg-slate-900 mb-4"></div>
            
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-1 text-right pr-4 border-r border-slate-300">
                    <div className="font-medium text-slate-800">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </div>
                    {exp.location && (
                      <div className="text-slate-600 text-sm">{exp.location}</div>
                    )}
                  </div>
                  <div className="col-span-3">
                    <h3 className="font-bold text-slate-900">{exp.position}</h3>
                    <h4 className="font-medium text-slate-700">{exp.company}</h4>
                    {exp.description && <p className="text-slate-700 mt-2">{exp.description}</p>}
                    {exp.highlights.length > 0 && (
                      <ul className="list-disc list-outside pl-5 mt-2">
                        {exp.highlights.filter(h => h.trim()).map((highlight, index) => (
                          <li key={index} className="text-slate-700">{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'education':
        return (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-center text-slate-900 uppercase tracking-wider mb-2">
              Education
            </h2>
            <div className="h-1 w-full bg-slate-900 mb-4"></div>
            
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-1 text-right pr-4 border-r border-slate-300">
                    <div className="font-medium text-slate-800">
                      {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                    </div>
                  </div>
                  <div className="col-span-3">
                    <h3 className="font-bold text-slate-900">{edu.institution}</h3>
                    <h4 className="font-medium text-slate-700">{edu.degree} in {edu.field}</h4>
                    {edu.description && <p className="text-slate-700 mt-2">{edu.description}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'skills':
        return (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-center text-slate-900 uppercase tracking-wider mb-2">
              Skills
            </h2>
            <div className="h-1 w-full bg-slate-900 mb-4"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {skillGroups.map((group) => (
                <div key={group.id}>
                  <h3 className="font-semibold text-slate-900 mb-2">{group.name}</h3>
                  <ul className="list-disc list-inside">
                    {group.skills.map((skill) => (
                      <li key={skill.id} className="text-slate-700">{skill.name}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );
      case 'projects':
        return (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-center text-slate-900 uppercase tracking-wider mb-2">
              Projects
            </h2>
            <div className="h-1 w-full bg-slate-900 mb-4"></div>
            
            {projects.map((project) => (
              <div key={project.id} className="mb-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-1 text-right pr-4 border-r border-slate-300">
                    {(project.startDate || project.endDate) && (
                      <div className="font-medium text-slate-800">
                        {formatDateRange(project.startDate || '', project.endDate || '', false)}
                      </div>
                    )}
                  </div>
                  <div className="col-span-3">
                    <h3 className="font-bold text-slate-900">
                      {project.name}
                      {project.url && (
                        <a 
                          href={project.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="ml-2 text-slate-600 text-sm hover:underline"
                        >
                          View Project
                        </a>
                      )}
                    </h3>
                    <p className="text-slate-700 mt-1">{project.description}</p>
                    {project.highlights.length > 0 && (
                      <ul className="list-disc list-outside pl-5 mt-2">
                        {project.highlights.filter(h => h.trim()).map((highlight, index) => (
                          <li key={index} className="text-slate-700">{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
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
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900 uppercase tracking-wider">{personalInfo.name}</h1>
        <p className="text-lg text-slate-700 mt-1">{personalInfo.title}</p>
        
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-3 text-sm">
          {personalInfo.email && (
            <div className="flex items-center text-slate-700">
              <Mail size={14} className="mr-1" />
              <a href={`mailto:${personalInfo.email}`} className="hover:underline">
                {personalInfo.email}
              </a>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center text-slate-700">
              <Phone size={14} className="mr-1" />
              <a href={`tel:${personalInfo.phone}`} className="hover:underline">
                {personalInfo.phone}
              </a>
            </div>
          )}
          
          {personalInfo.location && (
            <div className="flex items-center text-slate-700">
              <MapPin size={14} className="mr-1" />
              {personalInfo.location}
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center text-slate-700">
              <Globe size={14} className="mr-1" />
              <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center text-slate-700">
              <Linkedin size={14} className="mr-1" />
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
              </a>
            </div>
          )}
          
          {personalInfo.github && (
            <div className="flex items-center text-slate-700">
              <Github size={14} className="mr-1" />
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
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

export default ClassicTemplate;