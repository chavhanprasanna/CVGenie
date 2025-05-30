import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Trash, Plus } from 'lucide-react';

const SkillsForm: React.FC = () => {
  const { resumeData, addSkillGroup, updateSkillGroup, removeSkillGroup, addSkill, updateSkill, removeSkill } = useResume();
  const { skillGroups } = resumeData;

  const handleGroupNameChange = (id: string, name: string) => {
    updateSkillGroup(id, name);
  };

  const handleSkillChange = (groupId: string, skillId: string, name: string) => {
    updateSkill(groupId, skillId, { name });
  };

  const handleSkillLevelChange = (groupId: string, skillId: string, level: number) => {
    updateSkill(groupId, skillId, { level });
  };

  return (
    <Card className="mb-6 animate-fadeIn">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Skills</CardTitle>
        <Button 
          variant="primary" 
          size="sm" 
          onClick={addSkillGroup}
          leftIcon={<Plus size={16} />}
        >
          Add Skill Group
        </Button>
      </CardHeader>
      <CardContent>
        {skillGroups.length === 0 ? (
          <div className="text-center py-6 text-slate-500">
            No skill groups added yet. Click the button above to add a skill category.
          </div>
        ) : (
          <div className="space-y-6">
            {skillGroups.map((group) => (
              <div key={group.id} className="border border-slate-200 rounded-md p-4 bg-slate-50">
                <div className="flex items-center justify-between mb-4">
                  <Input
                    className="flex-1 mb-0"
                    value={group.name}
                    onChange={(e) => handleGroupNameChange(group.id, e.target.value)}
                    placeholder="Skill Category (e.g., Technical Skills, Languages, etc.)"
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeSkillGroup(group.id)}
                    leftIcon={<Trash size={16} />}
                    className="ml-2"
                  >
                    Remove
                  </Button>
                </div>

                {group.skills.length === 0 ? (
                  <div className="text-center py-4 text-slate-500 bg-white rounded border border-slate-200">
                    No skills added to this group yet.
                  </div>
                ) : (
                  <div className="space-y-2 mb-4">
                    {group.skills.map((skill) => (
                      <div key={skill.id} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => handleSkillChange(group.id, skill.id, e.target.value)}
                          placeholder="Skill name"
                          className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50"
                        />
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <button
                              key={level}
                              type="button"
                              onClick={() => handleSkillLevelChange(group.id, skill.id, level)}
                              className={`w-5 h-5 rounded-full ${
                                level <= (skill.level || 0)
                                  ? 'bg-emerald-500'
                                  : 'bg-slate-200'
                              } focus:outline-none transition-colors duration-200`}
                              aria-label={`Skill level ${level}`}
                            />
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeSkill(group.id, skill.id)}
                          className="p-2 text-red-500 hover:text-red-700 focus:outline-none"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addSkill(group.id)}
                  leftIcon={<Plus size={16} />}
                >
                  Add Skill
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillsForm;