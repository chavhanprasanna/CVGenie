import React from 'react';
import { ResumeData } from '../../types/resume';
import { formatDateRange } from '../../utils/dateUtils';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface ModernTemplateProps {
  data: ResumeData;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skillGroups, projects, sectionOrder } = data;
  
  // A4 specific styling adjustments
  const fontSizeBase = '0.9rem'; // Slightly smaller base font for A4 format

  const renderSection = (section: string) => {
    switch (section) {
      case 'personalInfo':
        return null; // Handled separately in the header
      case 'summary':
        return (
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>
              Professional Summary
            </h2>
            <p className="text-sm leading-relaxed text-slate-700 mt-2 whitespace-pre-line">{summary.text}</p>
          </div>
        );
      case 'experience':
        return (
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>
              Work Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <div className="mb-1 sm:mb-0">
                    <h3 className={styles.entryTitle}>{exp.position}</h3>
                    <h4 className={styles.entrySubtitle}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</h4>
                  </div>
                  <div className={styles.dateText}>
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </div>
                </div>
                {exp.description && <p className={styles.entryText}>{exp.description}</p>}
                {exp.highlights.length > 0 && (
                  <ul className="list-disc ml-4 mt-2">
                    {exp.highlights.filter(h => h.trim()).map((highlight, index) => (
                      <li key={index} className={styles.listItem}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        );
      case 'education':
        return (
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <div className="mb-1 sm:mb-0">
                    <h3 className={styles.entryTitle}>{edu.degree} {edu.field ? `in ${edu.field}` : ''}</h3>
                    <h4 className={styles.entrySubtitle}>{edu.institution}</h4>
                  </div>
                  <div className={styles.dateText}>
                    {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                  </div>
                </div>
                {edu.description && <p className={styles.entryText}>{edu.description}</p>}
              </div>
            ))}
          </div>
        );
      case 'skills':
        return (
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>
              Skills
            </h2>
            {skillGroups.map((group) => (
              <div key={group.id} className="mb-4">
                <h3 className={styles.entryTitle}>{group.name}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {group.skills.map((skill) => (
                    <div key={skill.id} className="bg-slate-100 px-3 py-1 rounded text-sm text-slate-700 shadow-sm">
                      {skill.name}{skill.level ? ` (${skill.level})` : ''}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case 'projects':
        return (
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>
              Projects
            </h2>
            {projects.map((project) => (
              <div key={project.id} className="mb-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <div className="mb-1 sm:mb-0">
                    <h3 className={styles.entryTitle}>
                      {project.name}
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-600 hover:text-blue-800 text-xs"
                        >
                          View Project
                        </a>
                      )}
                    </h3>
                  </div>
                  {(project.startDate || project.endDate) && (
                    <div className={styles.dateText}>
                      {formatDateRange(project.startDate || '', project.endDate || '', false)}
                    </div>
                  )}
                </div>
                <p className={styles.entryText}>{project.description}</p>
                {project.highlights.length > 0 && (
                  <ul className="list-disc ml-4 mt-2">
                    {project.highlights.filter(h => h.trim()).map((highlight, index) => (
                      <li key={index} className={styles.listItem}>{highlight}</li>
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

  const styles = {
    container: "bg-white w-full h-full text-base print:p-0 overflow-hidden",
    header: "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 pb-4 border-b border-slate-200",
    nameSection: "w-full sm:w-auto mb-4 sm:mb-0",
    name: "text-2xl font-bold text-slate-900 mb-1",
    title: "text-lg text-slate-700",
    contactSection: "w-full sm:w-auto flex flex-col sm:items-end",
    contactInfo: "flex items-center sm:justify-end text-slate-700 text-sm mb-2",
    contactIcon: "text-slate-500 ml-1.5",
    sectionTitle: "text-base font-bold text-slate-800 border-b border-slate-300 pb-1.5 mb-4",
    sectionContent: "mb-6 md:mb-8",
    entryTitle: "font-bold text-slate-800 text-base",
    entrySubtitle: "text-slate-700 text-sm",
    entryText: "text-slate-700 text-sm mt-1.5 leading-relaxed",
    dateText: "text-slate-600 text-xs whitespace-nowrap",
    listItem: "text-sm mb-1 leading-relaxed"
  };

  return (
    <div className={styles.container} style={{ fontSize: fontSizeBase }}>
      {/* Header with personal info */}
      <div className={styles.header}>
        <div className={styles.nameSection}>
          <h1 className={styles.name}>{personalInfo.name}</h1>
          <h2 className={styles.title}>{personalInfo.title}</h2>
        </div>
        <div className={styles.contactSection}>
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-x-4 w-full sm:w-auto">
            {personalInfo.email && (
              <div className={styles.contactInfo}>
                <span className="truncate max-w-[200px]">{personalInfo.email}</span>
                <Mail size={12} className={styles.contactIcon} />
              </div>
            )}
            {personalInfo.phone && (
              <div className={styles.contactInfo}>
                <span>{personalInfo.phone}</span>
                <Phone size={12} className={styles.contactIcon} />
              </div>
            )}
            {personalInfo.location && (
              <div className={styles.contactInfo}>
                <span>{personalInfo.location}</span>
                <MapPin size={12} className={styles.contactIcon} />
              </div>
            )}
            {personalInfo.website && (
              <div className={styles.contactInfo}>
                <span className="truncate max-w-[200px]">{personalInfo.website}</span>
                <Globe size={12} className={styles.contactIcon} />
              </div>
            )}
            {personalInfo.linkedin && (
              <div className={styles.contactInfo}>
                <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
                <Linkedin size={12} className={styles.contactIcon} />
              </div>
            )}
            {personalInfo.github && (
              <div className={styles.contactInfo}>
                <span>{personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>
                <Github size={12} className={styles.contactIcon} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {sectionOrder.filter(section => section !== 'personalInfo').map(section => (
          <div key={section} className="w-full">
            {renderSection(section)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModernTemplate;