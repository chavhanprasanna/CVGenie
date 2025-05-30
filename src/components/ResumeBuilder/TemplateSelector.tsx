import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';

interface TemplateOption {
  id: string;
  name: string;
  description: string;
  color?: string;
  previewStyle?: string;
}

const templates: TemplateOption[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with a balanced layout.',
    color: 'emerald',
    previewStyle: 'bg-gradient-to-r from-slate-200 to-slate-300'
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional and professional look that works for any industry.',
    color: 'blue',
    previewStyle: 'bg-slate-200 border-t-4 border-slate-400'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Elegant and simple design that focuses on content.',
    color: 'slate',
    previewStyle: 'bg-white border border-slate-300'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Distinctive visual style with a modern color palette.',
    color: 'purple',
    previewStyle: 'bg-gradient-to-r from-indigo-200 to-purple-200'
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Programming-inspired theme perfect for technical roles.',
    color: 'cyan',
    previewStyle: 'bg-slate-200 border-l-4 border-cyan-400'
  }
];

const TemplateSelector: React.FC = () => {
  const { resumeData, updateTemplate } = useResume();
  const { template } = resumeData;

  return (
    <Card className="mb-6 animate-fadeIn">
      <CardHeader>
        <CardTitle>Resume Template</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {templates.map((templateOption) => (
            <div 
              key={templateOption.id}
              className={`border rounded-md p-4 hover:shadow-md transition-all duration-200 cursor-pointer ${
                template === templateOption.id 
                  ? 'border-emerald-500 bg-emerald-50' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
              onClick={() => updateTemplate(templateOption.id)}
            >
              <div className="h-32 bg-slate-100 mb-3 rounded flex items-center justify-center">
                {/* Template preview placeholder */}
                <div className={`w-3/4 h-4/5 ${
                  templateOption.id === 'modern' 
                    ? 'bg-gradient-to-r from-slate-200 to-slate-300' 
                    : templateOption.id === 'classic'
                      ? 'bg-slate-200 border-t-4 border-slate-400' 
                      : 'bg-white border border-slate-300'
                }`}></div>
              </div>
              <h3 className="font-medium text-slate-800">{templateOption.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{templateOption.description}</p>
              <div className="mt-3">
                <Button
                  variant={template === templateOption.id ? 'secondary' : 'outline'}
                  size="sm"
                  fullWidth
                  onClick={() => updateTemplate(templateOption.id)}
                >
                  {template === templateOption.id ? 'Selected' : 'Select'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateSelector;