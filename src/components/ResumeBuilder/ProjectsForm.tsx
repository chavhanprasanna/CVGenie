import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { Trash, Plus } from 'lucide-react';

const ProjectsForm: React.FC = () => {
  const { resumeData, addProject, updateProject, removeProject } = useResume();
  const { projects } = resumeData;

  const handleChange = (id: string, field: string, value: string) => {
    updateProject(id, { [field]: value });
  };

  const handleHighlightChange = (id: string, index: number, value: string) => {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    
    const newHighlights = [...project.highlights];
    newHighlights[index] = value;
    
    updateProject(id, { highlights: newHighlights });
  };

  const addHighlight = (id: string) => {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    
    const newHighlights = [...project.highlights, ''];
    updateProject(id, { highlights: newHighlights });
  };

  const removeHighlight = (id: string, index: number) => {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    
    const newHighlights = project.highlights.filter((_, i) => i !== index);
    updateProject(id, { highlights: newHighlights });
  };

  return (
    <Card className="mb-6 animate-fadeIn">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Projects</CardTitle>
        <Button 
          variant="primary" 
          size="sm" 
          onClick={addProject}
          leftIcon={<Plus size={16} />}
        >
          Add Project
        </Button>
      </CardHeader>
      <CardContent>
        {projects.length === 0 ? (
          <div className="text-center py-6 text-slate-500">
            No projects added yet. Click the button above to add your first project.
          </div>
        ) : (
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id} className="border border-slate-200 rounded-md p-4 bg-slate-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    label="Project Name"
                    value={project.name}
                    onChange={(e) => handleChange(project.id, 'name', e.target.value)}
                    placeholder="Project Name"
                  />
                  <Input
                    label="Project URL (Optional)"
                    value={project.url || ''}
                    onChange={(e) => handleChange(project.id, 'url', e.target.value)}
                    placeholder="https://project-url.com"
                  />
                  <div className="md:col-span-2">
                    <TextArea
                      label="Project Description"
                      value={project.description}
                      onChange={(e) => handleChange(project.id, 'description', e.target.value)}
                      placeholder="Describe the project, its purpose, and your role in it"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                    <div className="w-full sm:w-1/2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2" htmlFor={`proj-startDate-${project.id}`}>
                        Start Date (Optional)
                      </label>
                      <div className="flex space-x-2">
                        <div className="w-1/2">
                          <select
                            id={`proj-startMonth-${project.id}`}
                            className="flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={project.startDate ? project.startDate.split('-')[1] : ''}
                            onChange={(e) => {
                              if (!e.target.value) {
                                handleChange(project.id, 'startDate', '');
                                return;
                              }
                              const year = project.startDate ? project.startDate.split('-')[0] : new Date().getFullYear().toString();
                              handleChange(project.id, 'startDate', `${year}-${e.target.value}`);
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
                            id={`proj-startYear-${project.id}`}
                            type="number"
                            min="1900"
                            max="2100"
                            className="flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Year"
                            value={project.startDate ? project.startDate.split('-')[0] : ''}
                            onChange={(e) => {
                              if (!e.target.value) {
                                handleChange(project.id, 'startDate', '');
                                return;
                              }
                              const month = project.startDate ? project.startDate.split('-')[1] : '01';
                              if (e.target.value && e.target.value.length === 4) {
                                handleChange(project.id, 'startDate', `${e.target.value}-${month}`);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2" htmlFor={`proj-endDate-${project.id}`}>
                        End Date (Optional)
                      </label>
                      <div className="flex space-x-2">
                        <div className="w-1/2">
                          <select
                            id={`proj-endMonth-${project.id}`}
                            className="flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={project.endDate ? project.endDate.split('-')[1] : ''}
                            onChange={(e) => {
                              if (!e.target.value) {
                                handleChange(project.id, 'endDate', '');
                                return;
                              }
                              const year = project.endDate ? project.endDate.split('-')[0] : new Date().getFullYear().toString();
                              handleChange(project.id, 'endDate', `${year}-${e.target.value}`);
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
                            id={`proj-endYear-${project.id}`}
                            type="number"
                            min="1900"
                            max="2100"
                            className="flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Year"
                            value={project.endDate ? project.endDate.split('-')[0] : ''}
                            onChange={(e) => {
                              if (!e.target.value) {
                                handleChange(project.id, 'endDate', '');
                                return;
                              }
                              const month = project.endDate ? project.endDate.split('-')[1] : '01';
                              if (e.target.value && e.target.value.length === 4) {
                                handleChange(project.id, 'endDate', `${e.target.value}-${month}`);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Key Features / Highlights
                  </label>
                  
                  {project.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) => handleHighlightChange(project.id, index, e.target.value)}
                        placeholder="Implemented feature X using technology Y"
                        className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50"
                      />
                      <button
                        type="button"
                        onClick={() => removeHighlight(project.id, index)}
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
                    onClick={() => addHighlight(project.id)}
                    leftIcon={<Plus size={16} />}
                    className="mt-2"
                  >
                    Add Highlight
                  </Button>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeProject(project.id)}
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

export default ProjectsForm;