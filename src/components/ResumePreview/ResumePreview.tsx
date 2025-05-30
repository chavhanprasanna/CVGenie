import React from 'react';
import { useResume } from '../../context/ResumeContext';
import ModernTemplate from './ModernTemplate';
import ClassicTemplate from './ClassicTemplate';
import MinimalTemplate from './MinimalTemplate';
import CreativeTemplate from './CreativeTemplate';
import TechTemplate from './TechTemplate';

interface ResumePreviewProps {
  scale?: number;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ scale = 1 }) => {
  const { resumeData } = useResume();
  const { template } = resumeData;

  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      case 'classic':
        return <ClassicTemplate data={resumeData} />;
      case 'minimal':
        return <MinimalTemplate data={resumeData} />;
      case 'creative':
        return <CreativeTemplate data={resumeData} />;
      case 'tech':
        return <TechTemplate data={resumeData} />;
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  // A4 dimensions: 210mm x 297mm (8.27in x 11.69in)
  // Calculate responsive scale based on viewport width
  const getResponsiveScale = () => {
    // Base scale is what's set by the zoom control
    let responsiveScale = scale;
    
    // On very small screens, reduce scale further for better visibility
    if (typeof window !== 'undefined') {
      const viewportWidth = window.innerWidth;
      if (viewportWidth < 768) { // Mobile devices
        responsiveScale = Math.max(0.35, scale - 0.1);
      } else if (viewportWidth < 1024) { // Tablets
        responsiveScale = Math.max(0.45, scale - 0.05);
      }
    }
    
    return responsiveScale;
  };

  return (
    <div className="resume-preview-container relative overflow-auto flex flex-col items-center w-full max-w-full">
      <div 
        id="resume-preview" 
        className="transform origin-top transition-transform duration-300 bg-white shadow-xl" 
        style={{ 
          transform: `scale(${getResponsiveScale()})`, 
          width: '210mm',
          height: '297mm',
          margin: '0 auto',
          padding: '20mm 25mm',
          boxSizing: 'border-box',
          borderRadius: '2px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          overflowY: 'hidden',
          maxWidth: '100%'
        }}
      >
        {renderTemplate()}
      </div>
      <div className="text-xs text-slate-500 mt-3 text-center flex items-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        A4 Size (210mm × 297mm)
      </div>
    </div>
  );
};

export default ResumePreview;