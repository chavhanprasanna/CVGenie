import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { Trash, Plus } from 'lucide-react';

const EducationForm: React.FC = () => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
  const { education } = resumeData;

  const handleChange = (id: string, field: string, value: string | boolean) => {
    updateEducation(id, { [field]: value });
  };

  return (
    <Card className="mb-6 animate-fadeIn">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Education</CardTitle>
        <Button 
          variant="primary" 
          size="sm" 
          onClick={addEducation}
          leftIcon={<Plus size={16} />}
        >
          Add Education
        </Button>
      </CardHeader>
      <CardContent>
        {education.length === 0 ? (
          <div className="text-center py-6 text-slate-500">
            No education added yet. Click the button above to add your educational background.
          </div>
        ) : (
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="border border-slate-200 rounded-md p-4 bg-slate-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    label="Institution Name"
                    value={edu.institution}
                    onChange={(e) => handleChange(edu.id, 'institution', e.target.value)}
                    placeholder="University Name"
                  />
                  <Input
                    label="Degree"
                    value={edu.degree}
                    onChange={(e) => handleChange(edu.id, 'degree', e.target.value)}
                    placeholder="Bachelor of Science"
                  />
                  <Input
                    label="Field of Study"
                    value={edu.field}
                    onChange={(e) => handleChange(edu.id, 'field', e.target.value)}
                    placeholder="Computer Science"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
                    <div className="w-full sm:w-1/2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2" htmlFor={`edu-startDate-${edu.id}`}>
                        Start Date
                      </label>
                      <div className="flex space-x-2">
                        <div className="w-1/2">
                          <select
                            id={`edu-startMonth-${edu.id}`}
                            className="flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={edu.startDate ? edu.startDate.split('-')[1] : ''}
                            onChange={(e) => {
                              const year = edu.startDate ? edu.startDate.split('-')[0] : new Date().getFullYear().toString();
                              handleChange(edu.id, 'startDate', `${year}-${e.target.value}`);
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
                            id={`edu-startYear-${edu.id}`}
                            type="number"
                            min="1900"
                            max="2100"
                            className="flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Year"
                            value={edu.startDate ? edu.startDate.split('-')[0] : ''}
                            onChange={(e) => {
                              const month = edu.startDate ? edu.startDate.split('-')[1] : '01';
                              if (e.target.value && e.target.value.length === 4) {
                                handleChange(edu.id, 'startDate', `${e.target.value}-${month}`);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {!edu.current && (
                      <div className="w-full sm:w-1/2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2" htmlFor={`edu-endDate-${edu.id}`}>
                          End Date
                        </label>
                        <div className="flex space-x-2">
                          <div className="w-1/2">
                            <select
                              id={`edu-endMonth-${edu.id}`}
                              className="flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              value={edu.endDate ? edu.endDate.split('-')[1] : ''}
                              onChange={(e) => {
                                const year = edu.endDate ? edu.endDate.split('-')[0] : new Date().getFullYear().toString();
                                handleChange(edu.id, 'endDate', `${year}-${e.target.value}`);
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
                              id={`edu-endYear-${edu.id}`}
                              type="number"
                              min="1900"
                              max="2100"
                              className="flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder="Year"
                              value={edu.endDate ? edu.endDate.split('-')[0] : ''}
                              onChange={(e) => {
                                const month = edu.endDate ? edu.endDate.split('-')[1] : '01';
                                if (e.target.value && e.target.value.length === 4) {
                                  handleChange(edu.id, 'endDate', `${e.target.value}-${month}`);
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
                      id={`current-edu-${edu.id}`}
                      checked={edu.current}
                      onChange={(e) => handleChange(edu.id, 'current', e.target.checked)}
                      className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-slate-300 rounded"
                    />
                    <label htmlFor={`current-edu-${edu.id}`} className="ml-2 block text-sm text-slate-700">
                      I am currently studying here
                    </label>
                  </div>
                </div>

                <TextArea
                  label="Description (Optional)"
                  value={edu.description || ''}
                  onChange={(e) => handleChange(edu.id, 'description', e.target.value)}
                  placeholder="Honors, achievements, or relevant coursework"
                />

                <div className="mt-4 flex justify-end">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeEducation(edu.id)}
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

export default EducationForm;