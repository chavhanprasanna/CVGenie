import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import HeadlessButton from './ui/HeadlessButton';
import { Download, RefreshCw } from 'lucide-react';
import { generatePDF } from '../utils/pdfUtils';

const ResumeControls: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { resetResumeData } = useResume();

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await generatePDF('resume-preview');
      setIsGenerating(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all resume data? This action cannot be undone.')) {
      resetResumeData();
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <HeadlessButton 
        variant="primary" 
        onClick={handleDownload}
        isLoading={isGenerating}
        leftIcon={<Download size={16} />}
      >
        Download PDF
      </HeadlessButton>
      
      <HeadlessButton 
        variant="outline" 
        size="sm" 
        onClick={handleReset}
        leftIcon={<RefreshCw size={16} />}
      >
        Reset Data
      </HeadlessButton>
    </div>
  );
};

export default ResumeControls;