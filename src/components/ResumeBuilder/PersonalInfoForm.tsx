import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Input from '../ui/Input';

const PersonalInfoForm: React.FC = () => {
  const { resumeData, updatePersonalInfo } = useResume();
  const { personalInfo } = resumeData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  return (
    <Card className="mb-6 animate-fadeIn shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            name="name"
            value={personalInfo.name}
            onChange={handleChange}
            placeholder="John Doe"
            enableGrammarly={true}
            className="shadow-sm"
          />
          <Input
            label="Professional Title"
            name="title"
            value={personalInfo.title}
            onChange={handleChange}
            placeholder="Software Engineer"
            enableGrammarly={true}
            className="shadow-sm"
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={personalInfo.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            className="shadow-sm"
          />
          <Input
            label="Phone"
            name="phone"
            value={personalInfo.phone}
            onChange={handleChange}
            placeholder="(123) 456-7890"
            className="shadow-sm"
          />
          <Input
            label="Location"
            name="location"
            value={personalInfo.location}
            onChange={handleChange}
            placeholder="City, State"
            enableGrammarly={true}
            className="shadow-sm"
          />
          <Input
            label="Website (optional)"
            name="website"
            value={personalInfo.website || ''}
            onChange={handleChange}
            placeholder="https://your-website.com"
            className="shadow-sm"
          />
          <Input
            label="LinkedIn (optional)"
            name="linkedin"
            value={personalInfo.linkedin || ''}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
            className="shadow-sm"
          />
          <Input
            label="GitHub (optional)"
            name="github"
            value={personalInfo.github || ''}
            onChange={handleChange}
            placeholder="https://github.com/username"
            className="shadow-sm"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;