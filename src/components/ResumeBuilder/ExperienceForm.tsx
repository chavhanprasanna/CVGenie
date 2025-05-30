import React, { useState, useEffect } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { Trash, Plus, Lightbulb, Check, X, Wand2, Sparkles } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const ExperienceForm: React.FC = () => {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResume();
  const { experience } = resumeData;
  
  // State for AI features
  const [aiActive, setAiActive] = useState(false);
  const [suggestions, setSuggestions] = useState<{[key: string]: string[]}>({});
  const [selectedFont, setSelectedFont] = useState('Inter');
  
  // Font options
  const fonts = [
    { name: 'Inter', value: 'Inter, sans-serif' },
    { name: 'Roboto', value: 'Roboto, sans-serif' },
    { name: 'Playfair Display', value: 'Playfair Display, serif' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif' },
    { name: 'Open Sans', value: 'Open Sans, sans-serif' },
    { name: 'Lato', value: 'Lato, sans-serif' },
    { name: 'Poppins', value: 'Poppins, sans-serif' },
    { name: 'Merriweather', value: 'Merriweather, serif' },
    { name: 'Source Code Pro', value: 'Source Code Pro, monospace' },
  ];
  
  // Initialize Grammarly SDK (simulated)
  useEffect(() => {
    console.log('Grammarly SDK initialized for Experience Form');
    return () => {
      console.log('Grammarly SDK cleaned up for Experience Form');
    };
  }, []);
  
  // Generate AI suggestions for job descriptions
  useEffect(() => {
    const newSuggestions: {[key: string]: string[]} = {};
    
    experience.forEach(exp => {
      if (exp.description && exp.description.length > 10) {
        newSuggestions[exp.id] = [
          `${exp.description} Collaborated with cross-functional teams to drive project success.`,
          `As part of my role at ${exp.company}, ${exp.description.toLowerCase()}`,
          `${exp.description} Consistently exceeded performance targets and received recognition for outstanding contributions.`
        ];
      }
    });
    
    setSuggestions(newSuggestions);
  }, [experience]);
  
  const handleFontChange = (value: string) => {
    setSelectedFont(value);
  };

  const handleChange = (id: string, field: string, value: string | boolean) => {
    updateExperience(id, { [field]: value });
  };

  const handleHighlightChange = (id: string, index: number, value: string) => {
    const exp = experience.find(e => e.id === id);
    if (!exp) return;
    
    const newHighlights = [...exp.highlights];
    newHighlights[index] = value;
    
    updateExperience(id, { highlights: newHighlights });
  };

  const addHighlight = (id: string) => {
    const exp = experience.find(e => e.id === id);
    if (!exp) return;
    
    const newHighlights = [...exp.highlights, ''];
    updateExperience(id, { highlights: newHighlights });
  };

  const removeHighlight = (id: string, index: number) => {
    const exp = experience.find(e => e.id === id);
    if (!exp) return;
    
    const newHighlights = exp.highlights.filter((_, i) => i !== index);
    updateExperience(id, { highlights: newHighlights });
  };

  return (
    <Card className="mb-6 animate-fadeIn">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Work Experience</CardTitle>
        <div className="flex items-center space-x-2">
          <Select value={selectedFont} onValueChange={handleFontChange}>
            <SelectTrigger className="w-[180px] h-8 text-sm">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              {fonts.map((font) => (
                <SelectItem key={font.name} value={font.name}>
                  <span style={{ fontFamily: font.value }}>{font.name}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            className="h-8"
            onClick={() => setAiActive(!aiActive)}
          >
            <Wand2 size={16} className="mr-2" />
            AI Assist
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={addExperience}
            leftIcon={<Plus size={16} />}
          >
            Add Experience
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {aiActive && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-center">
              <Sparkles className="text-blue-500 mr-2" size={18} />
              <div>
                <h3 className="font-medium text-blue-800">AI Assistant Active</h3>
                <p className="text-sm text-blue-600">Enhancing your resume with smart suggestions and grammar improvements</p>
              </div>
            </div>
          </div>
        )}
        
        {experience.length === 0 ? (
          <div className="text-center py-6 text-slate-500">
            No work experience added yet. Click the button above to add your first position.
          </div>
        ) : (
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="border border-slate-200 rounded-md p-4 bg-slate-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    label="Company Name"
                    value={exp.company}
                    onChange={(e) => handleChange(exp.id, 'company', e.target.value)}
                    placeholder="Company ABC"
                  />
                  <Input
                    label="Job Title"
                    value={exp.position}
                    onChange={(e) => handleChange(exp.id, 'position', e.target.value)}
                    placeholder="Software Engineer"
                  />
                  <Input
                    label="Location (Optional)"
                    value={exp.location || ''}
                    onChange={(e) => handleChange(exp.id, 'location', e.target.value)}
                    placeholder="City, State"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
                    <div className="w-full sm:w-1/2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2" htmlFor={`startDate-${exp.id}`}>
                        Start Date
                      </label>
                      <div className="flex space-x-2">
                        <div className="w-1/2">
                          <select
                            id={`startMonth-${exp.id}`}
                            className="flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={exp.startDate ? exp.startDate.split('-')[1] : ''}
                            onChange={(e) => {
                              const year = exp.startDate ? exp.startDate.split('-')[0] : new Date().getFullYear().toString();
                              handleChange(exp.id, 'startDate', `${year}-${e.target.value}`);
                            }}
                          >
                            <option value="">Month</option>
                            <option value="01">January</option>
                            <option value="02">February</option>
                            <option value="03">March</option>
                            <option value="04">April</option>
                            <option value="05">May</option>
                            <option value="06">June</option>
                            <option value="07">July</option>
                            <option value="08">August</option>
                            <option value="09">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                          </select>
                        </div>
                        <div className="w-1/2">
                          <input
                            id={`startYear-${exp.id}`}
                            type="number"
                            min="1900"
                            max="2100"
                            className="flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Year"
                            value={exp.startDate ? exp.startDate.split('-')[0] : ''}
                            onChange={(e) => {
                              const month = exp.startDate ? exp.startDate.split('-')[1] : '01';
                              if (e.target.value && e.target.value.length === 4) {
                                handleChange(exp.id, 'startDate', `${e.target.value}-${month}`);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {!exp.current && (
                      <div className="w-full sm:w-1/2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2" htmlFor={`endDate-${exp.id}`}>
                          End Date
                        </label>
                        <div className="flex space-x-2">
                          <div className="w-1/2">
                            <select
                              id={`endMonth-${exp.id}`}
                              className="flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              value={exp.endDate ? exp.endDate.split('-')[1] : ''}
                              onChange={(e) => {
                                const year = exp.endDate ? exp.endDate.split('-')[0] : new Date().getFullYear().toString();
                                handleChange(exp.id, 'endDate', `${year}-${e.target.value}`);
                              }}
                            >
                              <option value="">Month</option>
                              <option value="01">January</option>
                              <option value="02">February</option>
                              <option value="03">March</option>
                              <option value="04">April</option>
                              <option value="05">May</option>
                              <option value="06">June</option>
                              <option value="07">July</option>
                              <option value="08">August</option>
                              <option value="09">September</option>
                              <option value="10">October</option>
                              <option value="11">November</option>
                              <option value="12">December</option>
                            </select>
                          </div>
                          <div className="w-1/2">
                            <input
                              id={`endYear-${exp.id}`}
                              type="number"
                              min="1900"
                              max="2100"
                              className="flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder="Year"
                              value={exp.endDate ? exp.endDate.split('-')[0] : ''}
                              onChange={(e) => {
                                const month = exp.endDate ? exp.endDate.split('-')[1] : '01';
                                if (e.target.value && e.target.value.length === 4) {
                                  handleChange(exp.id, 'endDate', `${e.target.value}-${month}`);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center mt-1">
                    <input
                      type="checkbox"
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onChange={(e) => handleChange(exp.id, 'current', e.target.checked)}
                      className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-slate-300 rounded"
                    />
                    <label htmlFor={`current-${exp.id}`} className="ml-2 block text-sm text-slate-700">
                      I currently work here
                    </label>
                  </div>
                </div>

                <div className="relative">
                  <TextArea
                    label="Job Description"
                    value={exp.description}
                    onChange={(e) => handleChange(exp.id, 'description', e.target.value)}
                    placeholder="Describe your role and responsibilities"
                    className={selectedFont}
                    style={{ fontFamily: fonts.find(f => f.name === selectedFont)?.value }}
                  />
                  
                  {aiActive && suggestions[exp.id] && (
                    <div className="mt-2 mb-4">
                      <div className="flex items-center text-blue-600 mb-1 text-sm">
                        <Sparkles size={14} className="mr-1" /> AI Enhancement Suggestions
                      </div>
                      <div className="space-y-2 border-l-2 border-blue-200 pl-3">
                        {suggestions[exp.id].map((suggestion, index) => (
                          <div key={index} className="group flex">
                            <p className="text-xs text-slate-600 flex-1">{suggestion}</p>
                            <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleChange(exp.id, 'description', suggestion)}
                                className="p-1 hover:bg-green-100 rounded-full text-green-600"
                                title="Apply suggestion"
                              >
                                <Check size={14} />
                              </button>
                              <button
                                onClick={() => {
                                  const newSuggestions = {...suggestions};
                                  newSuggestions[exp.id].splice(index, 1);
                                  if (newSuggestions[exp.id].length === 0) {
                                    delete newSuggestions[exp.id];
                                  }
                                  setSuggestions(newSuggestions);
                                }}
                                className="p-1 hover:bg-red-100 rounded-full text-red-600"
                                title="Dismiss suggestion"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-slate-700">
                      Key Achievements / Responsibilities
                    </label>
                    {aiActive && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          // Generate an achievement based on job description
                          if (exp.description) {
                            const newHighlights = [...exp.highlights];
                            newHighlights.push(`Achieved significant improvements in ${exp.description.split(' ').slice(0, 3).join(' ')} processes, resulting in increased efficiency.`);
                            updateExperience(exp.id, { highlights: newHighlights });
                          }
                        }}
                      >
                        <Lightbulb size={14} className="mr-1" />
                        Generate Achievement
                      </Button>
                    )}
                  </div>
                  
                  {exp.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) => handleHighlightChange(exp.id, index, e.target.value)}
                        placeholder="Accomplished X resulting in Y improvement"
                        className={`flex-1 px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 ${selectedFont}`}
                        style={{ fontFamily: fonts.find(f => f.name === selectedFont)?.value }}
                      />
                      <button
                        type="button"
                        onClick={() => removeHighlight(exp.id, index)}
                        className="ml-2 p-2 text-red-500 hover:text-red-700 focus:outline-none"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addHighlight(exp.id)}
                    leftIcon={<Plus size={16} />}
                    className="mt-2"
                  >
                    Add Achievement
                  </Button>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeExperience(exp.id)}
                    leftIcon={<Trash size={16} />}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExperienceForm;
