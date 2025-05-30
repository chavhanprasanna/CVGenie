import React from 'react';
import { ResumeData } from '../../types/resume';
import { formatDateRange } from '../../utils/dateUtils';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Code, Briefcase, GraduationCap, Award } from 'lucide-react';

interface TechTemplateProps {
  data: ResumeData;
}

const TechTemplate: React.FC<TechTemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skillGroups, projects, sectionOrder } = data;

  const renderSection = (section: string) => {
    switch (section) {
      case 'personalInfo':
        return null; // Handled separately in the header
      case 'summary':
        return (
          <div className="mb-8 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-md border-l-4 border-cyan-500 dark:border-cyan-600">
            <div className="flex items-center mb-3">
              <Code className="text-cyan-500 dark:text-cyan-400 mr-2" size={20} />
              <h2 className="text-xl font-mono font-bold text-slate-800 dark:text-white">console.log(profile.summary);</h2>
            </div>
            <p className="text-slate-700 dark:text-slate-300 ml-6 font-mono leading-relaxed">
              // {summary.text}
            </p>
          </div>
        );
      case 'experience':
        return (
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <Briefcase className="text-cyan-500 dark:text-cyan-400 mr-2" size={20} />
              <h2 className="text-xl font-mono font-bold text-slate-800 dark:text-white">work.experience()</h2>
            </div>
            
            <div className="space-y-6 ml-6">
              {experience.map((exp) => (
                <div key={exp.id} className="bg-white dark:bg-slate-800 p-5 rounded-md shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                  <div className="mb-2">
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">{exp.position}</h3>
                    <div className="flex flex-wrap justify-between items-baseline">
                      <h4 className="text-cyan-600 dark:text-cyan-400 font-medium">{exp.company}</h4>
                      <span className="text-sm text-slate-500 dark:text-slate-400 font-mono">
                        {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                        {exp.location && ` | ${exp.location}`}
                      </span>
                    </div>
                  </div>
                  
                  {exp.description && (
                    <p className="text-slate-700 dark:text-slate-300 mb-3">{exp.description}</p>
                  )}
                  
                  {exp.highlights.length > 0 && (
                    <div className="space-y-1 font-mono">
                      {exp.highlights.filter(h => h.trim()).map((highlight, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-cyan-500 dark:text-cyan-400 mr-2">→</span>
                          <span className="text-slate-700 dark:text-slate-300">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 'education':
        return (
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <GraduationCap className="text-cyan-500 dark:text-cyan-400 mr-2" size={20} />
              <h2 className="text-xl font-mono font-bold text-slate-800 dark:text-white">education.map(item =&gt; &#123;&#125;)</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
              {education.map((edu) => (
                <div key={edu.id} className="bg-white dark:bg-slate-800 p-4 rounded-md shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="mb-2">
                    <h3 className="font-bold text-slate-900 dark:text-white">{edu.degree} <span className="text-cyan-600 dark:text-cyan-400">in</span> {edu.field}</h3>
                    <h4 className="text-slate-700 dark:text-slate-300">{edu.institution}</h4>
                    <div className="text-sm text-slate-500 dark:text-slate-400 font-mono">
                      {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <Code className="text-cyan-500 dark:text-cyan-400 mr-2" size={20} />
              <h2 className="text-xl font-mono font-bold text-slate-800 dark:text-white">skills.sort((a, b) =&gt; b.level - a.level)</h2>
            </div>
            
            <div className="space-y-4 ml-6">
              {skillGroups.map((group) => (
                <div key={group.id} className="bg-white dark:bg-slate-800 p-4 rounded-md shadow-sm border border-slate-200 dark:border-slate-700">
                  <h3 className="font-mono font-bold text-cyan-600 dark:text-cyan-400 mb-3">
                    {`const ${group.name.toLowerCase().replace(/\s+/g, '_')} = [`}
                  </h3>
                  <div className="pl-6 pb-2">
                    {group.skills.map((skill, idx) => {
                      const level = skill.level || 3;
                      const dots = Array(level).fill('•').join('');
                      
                      return (
                        <div key={skill.id} className="mb-2 font-mono">
                          &#123; name: "{skill.name}", level: <span className="text-cyan-600 dark:text-cyan-400">{dots}</span> &#125;
                          {idx < group.skills.length - 1 ? ',' : ''}
                        </div>
                      );
                    })}
                  </div>
                  <div className="font-mono">];</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'projects':
        return (
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <Award className="text-cyan-500 dark:text-cyan-400 mr-2" size={20} />
              <h2 className="text-xl font-mono font-bold text-slate-800 dark:text-white">projects.forEach(project =&gt; &#123;...&#125;)</h2>
            </div>
            
            <div className="space-y-4 ml-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white dark:bg-slate-800 p-5 rounded-md shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                  <div className="mb-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-slate-900 dark:text-white flex items-center">
                        <span className="text-cyan-500 dark:text-cyan-400 mr-2">./</span>
                        {project.name}
                        {project.url && (
                          <a 
                            href={project.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="ml-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300"
                          >
                            <Globe size={16} />
                          </a>
                        )}
                      </h3>
                      {(project.startDate || project.endDate) && (
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                          {formatDateRange(project.startDate || '', project.endDate || '', false)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-slate-700 dark:text-slate-300 mb-3">{project.description}</p>
                  
                  {project.highlights.length > 0 && (
                    <div className="space-y-1 font-mono">
                      {project.highlights.filter(h => h.trim()).map((highlight, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-cyan-500 dark:text-cyan-400 mr-2">$</span>
                          <span className="text-slate-700 dark:text-slate-300">{highlight}</span>
                        </div>
                      ))}
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
    <div className="bg-slate-100 dark:bg-slate-900 p-8 rounded-lg shadow-md max-w-[210mm] w-full mx-auto border border-slate-200 dark:border-slate-700">
      {/* Header */}
      <div className="mb-8 bg-gradient-to-r from-slate-800 to-cyan-900 dark:from-cyan-900 dark:to-slate-800 p-6 rounded-md text-white shadow-md">
        <div className="font-mono mb-1 text-cyan-400">{"<Profile>"}</div>
        <h1 className="text-3xl font-bold font-mono mb-1">{personalInfo.name}</h1>
        <p className="text-lg text-slate-200 mb-4 ml-4 font-mono">// {personalInfo.title}</p>
        
        <div className="flex flex-wrap gap-3 ml-4 text-sm font-mono">
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail size={14} className="mr-1 text-cyan-400" />
              <a href={`mailto:${personalInfo.email}`} className="hover:text-cyan-300">
                {personalInfo.email}
              </a>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone size={14} className="mr-1 text-cyan-400" />
              <a href={`tel:${personalInfo.phone}`} className="hover:text-cyan-300">
                {personalInfo.phone}
              </a>
            </div>
          )}
          
          {personalInfo.location && (
            <div className="flex items-center">
              <MapPin size={14} className="mr-1 text-cyan-400" />
              {personalInfo.location}
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center">
              <Globe size={14} className="mr-1 text-cyan-400" />
              <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300">
                {personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <Linkedin size={14} className="mr-1 text-cyan-400" />
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300">
                {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
              </a>
            </div>
          )}
          
          {personalInfo.github && (
            <div className="flex items-center">
              <Github size={14} className="mr-1 text-cyan-400" />
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300">
                {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
              </a>
            </div>
          )}
        </div>
        <div className="font-mono mt-2 text-cyan-400">{"</Profile>"}</div>
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

export default TechTemplate;
