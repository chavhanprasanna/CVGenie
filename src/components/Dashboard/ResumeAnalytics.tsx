import React from 'react';
import { useResume } from '../../context/ResumeContext';
import SkillsRadarChart from '../Charts/SkillsRadarChart';
import CareerTimeline from '../Charts/CareerTimeline';
import HeadlessTabs from '../ui/HeadlessTabs';

const ResumeAnalytics: React.FC = () => {
  const { resumeData } = useResume();
  const { skillGroups, experience } = resumeData;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Resume Analytics</h2>
      
      <HeadlessTabs
        tabs={[
          {
            title: "Career Progression",
            content: experience.length > 0 ? (
              <CareerTimeline experiences={experience} />
            ) : (
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900">Career Timeline</h3>
                </div>
                <div className="p-6">
                  <p className="text-slate-500">
                    Add work experience to view your career progression timeline.
                  </p>
                </div>
              </div>
            )
          },
          {
            title: "Skills Analysis",
            content: (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {skillGroups.length > 0 ? (
                  skillGroups.map(skillGroup => (
                    <SkillsRadarChart key={skillGroup.id} skillGroup={skillGroup} />
                  ))
                ) : (
                  <div className="col-span-full bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-200">
                      <h3 className="text-lg font-semibold text-slate-900">Skills Visualization</h3>
                    </div>
                    <div className="p-6">
                      <p className="text-slate-500">
                        Add skills to visualize your expertise in different areas.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )
          }
        ]}
      />
    </div>
  );
};

export default ResumeAnalytics;
