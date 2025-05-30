export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  highlights: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: number; // 1-5
}

export interface SkillGroup {
  id: string;
  name: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
  highlights: string[];
  startDate?: string;
  endDate?: string;
}

export interface Summary {
  text: string;
}

export type SectionType = 
  | 'personalInfo' 
  | 'summary' 
  | 'experience' 
  | 'education' 
  | 'skills'
  | 'projects';

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: Summary;
  experience: Experience[];
  education: Education[];
  skillGroups: SkillGroup[];
  projects: Project[];
  sectionOrder: SectionType[];
  template: string;
}

export const defaultResumeData: ResumeData = {
  personalInfo: {
    name: 'Your Name',
    title: 'Professional Title',
    email: 'email@example.com',
    phone: '(123) 456-7890',
    location: 'City, State',
    website: '',
    linkedin: '',
    github: ''
  },
  summary: {
    text: 'Experienced professional with a passion for innovation and problem-solving. Skilled in collaborating with cross-functional teams to deliver high-quality solutions.'
  },
  experience: [
    {
      id: '1',
      company: 'Company Name',
      position: 'Job Title',
      location: 'City, State',
      startDate: '2020-01',
      endDate: '',
      current: true,
      description: 'Working on exciting projects and initiatives.',
      highlights: [
        'Accomplished X resulting in Y improvement',
        'Led initiative to improve Z by 30%',
        'Collaborated with cross-functional teams to deliver project ahead of schedule'
      ]
    }
  ],
  education: [
    {
      id: '1',
      institution: 'University Name',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2016-09',
      endDate: '2020-05',
      current: false,
      description: 'Graduated with honors.'
    }
  ],
  skillGroups: [
    {
      id: '1',
      name: 'Technical Skills',
      skills: [
        { id: '1', name: 'JavaScript', level: 4 },
        { id: '2', name: 'React', level: 4 },
        { id: '3', name: 'Node.js', level: 3 }
      ]
    },
    {
      id: '2',
      name: 'Soft Skills',
      skills: [
        { id: '1', name: 'Communication', level: 5 },
        { id: '2', name: 'Team Leadership', level: 4 },
        { id: '3', name: 'Problem Solving', level: 5 }
      ]
    }
  ],
  projects: [
    {
      id: '1',
      name: 'Project Name',
      description: 'A brief description of the project and your role.',
      url: 'https://project-url.com',
      highlights: [
        'Implemented feature X using technology Y',
        'Improved performance by Z%',
        'Collaborated with team to deliver ahead of schedule'
      ],
      startDate: '2022-01',
      endDate: '2022-06'
    }
  ],
  sectionOrder: ['personalInfo', 'summary', 'experience', 'education', 'skills', 'projects'],
  template: 'modern'
};