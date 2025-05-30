import React, { useState, useEffect } from 'react';
import { ResumeProvider } from '../context/ResumeContext';
import PersonalInfoForm from '../components/ResumeBuilder/PersonalInfoForm';
import SummaryForm from '../components/ResumeBuilder/SummaryForm';
import ExperienceForm from '../components/ResumeBuilder/ExperienceForm';
import EducationForm from '../components/ResumeBuilder/EducationForm';
import SkillsForm from '../components/ResumeBuilder/SkillsForm';
import ProjectsForm from '../components/ResumeBuilder/ProjectsForm';
import TemplateSelector from '../components/ResumeBuilder/TemplateSelector';
import SectionOrderForm from '../components/ResumeBuilder/SectionOrderForm';
import ResumePreview from '../components/ResumePreview/ResumePreview';
import ResumeControls from '../components/ResumeControls';
import ResumeAnalytics from '../components/Dashboard/ResumeAnalytics';
import ThemeToggle from '../components/ThemeToggle';
import ThreeBackground from '../components/ThreeBackground';
import { FileText } from 'lucide-react';
import HeadlessTabs from '../components/ui/HeadlessTabs';

// This is the inner content of the Builder component
// It needs to be separate so it can access the Resume context
const BuilderContent: React.FC = () => {
  const [previewScale] = useState(0.8);
  const [showEffects, setShowEffects] = useState(true);
  const [activeTemplate, setActiveTemplate] = useState<string>('modern');

  // Save the effects preference in localStorage
  useEffect(() => {
    const savedPreference = localStorage.getItem('showEffects');
    if (savedPreference !== null) {
      setShowEffects(savedPreference === 'true');
    }
  }, []);

  // This effect monitors the template from localStorage
  useEffect(() => {
    const savedTemplate = localStorage.getItem('resumeTemplate');
    if (savedTemplate) {
      setActiveTemplate(savedTemplate);
    }
  }, []);

  // Update the template based on user selection
  const checkTemplate = () => {
    const resumeData = localStorage.getItem('resumeData');
    if (resumeData) {
      try {
        const data = JSON.parse(resumeData);
        if (data.template && data.template !== activeTemplate) {
          setActiveTemplate(data.template);
        }
      } catch (error) {
        console.error('Error parsing resume data:', error);
      }
    }
  };

  // Check template periodically
  useEffect(() => {
    const interval = setInterval(checkTemplate, 1000);
    return () => clearInterval(interval);
  }, [activeTemplate]);

  const toggleEffects = () => {
    const newValue = !showEffects;
    setShowEffects(newValue);
    localStorage.setItem('showEffects', newValue.toString());
  };

  // Enable 3D background for all templates
  const showBackground = true; // Always show background regardless of template

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      {showBackground && showEffects && <ThreeBackground />}
      <header className="bg-white/95 dark:bg-slate-800/95 shadow-md border-b border-slate-200 dark:border-slate-700 backdrop-blur-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <FileText className="text-blue-600 dark:text-blue-400 mr-3" size={26} />
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Resume Builder</h1>
          </div>
          <div className="flex items-center space-x-6">
            <label className="inline-flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showEffects}
                onChange={toggleEffects}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Effects</span>
            </label>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 relative z-0">
        <HeadlessTabs
          tabs={[
            {
              title: "Builder",
              content: (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div className="space-y-8">
                    <div className="bg-white/95 dark:bg-slate-800/95 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-6 backdrop-blur-sm">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-5">Template Selection</h2>
                      <TemplateSelector />
                    </div>
                    <div className="space-y-8 bg-white/95 dark:bg-slate-800/95 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-6 backdrop-blur-sm">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-5">Resume Content</h2>
                      <PersonalInfoForm />
                      <SummaryForm />
                      <ExperienceForm />
                      <EducationForm />
                      <SkillsForm />
                      <ProjectsForm />
                      <SectionOrderForm />
                    </div>
                  </div>
                  <div className="lg:sticky lg:top-24 h-fit">
                    <div className="bg-white/95 dark:bg-slate-800/95 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-6 mb-8 backdrop-blur-sm">
                      <ResumeControls />
                    </div>
                    <div className="overflow-auto bg-slate-100/95 dark:bg-slate-900/95 rounded-lg border border-slate-200 dark:border-slate-700 p-6 backdrop-blur-sm shadow-xl transition-all duration-500">
                      <ResumePreview scale={previewScale} />
                    </div>
                  </div>
                </div>
              )
            },
            {
              title: "Analytics",
              content: <ResumeAnalytics />
            }
          ]}
        />
      </main>

      <footer className="bg-white/95 dark:bg-slate-800/95 shadow-md border-t border-slate-200 dark:border-slate-700 backdrop-blur-sm py-5 mt-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <FileText className="text-blue-500 dark:text-blue-400 mr-2" size={20} />
              <span className="font-semibold text-slate-700 dark:text-slate-300">Resume Builder</span>
            </div>
            <div className="text-center text-slate-500 dark:text-slate-400 text-sm">
              &copy; {new Date().getFullYear()} Resume Builder • Made with modern UI and responsive design
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Grammar checking powered by Grammarly SDK
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// The main Builder component wraps the content with the ResumeProvider
const Builder: React.FC = () => {
  return (
    <ResumeProvider>
      <BuilderContent />
    </ResumeProvider>
  );
};

export default Builder;
