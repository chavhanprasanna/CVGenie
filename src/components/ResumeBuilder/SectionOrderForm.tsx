import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { ArrowUp, ArrowDown, GripVertical } from 'lucide-react';
import Button from '../ui/Button';

const sectionNames: Record<string, string> = {
  personalInfo: 'Personal Information',
  summary: 'Professional Summary',
  experience: 'Work Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects'
};

const SectionOrderForm: React.FC = () => {
  const { resumeData, updateSectionOrder } = useResume();
  const { sectionOrder } = resumeData;

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === sectionOrder.length - 1)
    ) {
      return;
    }

    const newOrder = [...sectionOrder];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap positions
    [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
    
    updateSectionOrder(newOrder);
  };

  return (
    <Card className="mb-6 animate-fadeIn">
      <CardHeader>
        <CardTitle>Section Order</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-600 mb-4">
          Arrange the sections in the order you want them to appear on your resume.
        </p>
        
        <div className="border rounded-md overflow-hidden">
          {sectionOrder.map((section, index) => (
            <div 
              key={section}
              className={`flex items-center p-3 ${
                index !== sectionOrder.length - 1 ? 'border-b border-slate-200' : ''
              } hover:bg-slate-50`}
            >
              <div className="text-slate-400 mr-3">
                <GripVertical size={20} />
              </div>
              <div className="flex-1">
                {sectionNames[section] || section}
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveSection(index, 'up')}
                  disabled={index === 0}
                  className="h-8 w-8 p-0"
                  aria-label="Move up"
                >
                  <ArrowUp size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveSection(index, 'down')}
                  disabled={index === sectionOrder.length - 1}
                  className="h-8 w-8 p-0"
                  aria-label="Move down"
                >
                  <ArrowDown size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SectionOrderForm;