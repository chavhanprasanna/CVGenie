import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import { SkillGroup } from '../../types/resume';

interface SkillsRadarChartProps {
  skillGroup: SkillGroup;
}

const SkillsRadarChart: React.FC<SkillsRadarChartProps> = ({ skillGroup }) => {
  // Transform skill data for the radar chart
  const data = skillGroup.skills.map(skill => ({
    skill: skill.name,
    [skillGroup.name]: skill.level || 0,
    fullMark: 5
  }));

  return (
    <div className="w-full h-[300px] mb-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm overflow-hidden transition-colors duration-200">
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{skillGroup.name}</h3>
      </div>
      <div className="p-5 h-[220px]">
        {data.length > 0 ? (
          <ResponsiveRadar
            data={data}
            keys={[skillGroup.name]}
            indexBy="skill"
            maxValue={5}
            margin={{ top: 20, right: 80, bottom: 30, left: 80 }}
            borderWidth={2}
            gridLabelOffset={16}
            dotSize={8}
            dotColor={{ theme: 'background' }}
            dotBorderWidth={2}
            colors={{ scheme: 'category10' }}
            blendMode="multiply"
            motionConfig="gentle"
            gridShape="circular"
            theme={{
              text: {
                fill: 'var(--chart-text-color, #333333)',
                fontSize: 11,
              },
              axis: {
                domain: {
                  line: {
                    stroke: 'var(--chart-axis-color, #777777)',
                    strokeWidth: 1
                  }
                },
                ticks: {
                  line: {
                    stroke: 'var(--chart-axis-color, #777777)',
                    strokeWidth: 1
                  },
                  text: {
                    fill: 'var(--chart-text-color, #333333)'
                  }
                }
              },
              grid: {
                line: {
                  stroke: 'var(--chart-grid-color, #dddddd)',
                  strokeWidth: 1
                }
              },
              legends: {
                text: {
                  fill: 'var(--chart-text-color, #333333)'
                }
              },
              tooltip: {
                container: {
                  background: 'var(--chart-tooltip-bg, #ffffff)',
                  color: 'var(--chart-tooltip-color, #333333)',
                  boxShadow: '0 3px 9px rgba(0, 0, 0, 0.2)'
                }
              }
            }}
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'column',
                translateX: -40,
                translateY: -20,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: 'var(--chart-legend-text, #999)',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: 'var(--chart-legend-hover, #000)'
                    }
                  }
                ]
              }
            ]}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500 dark:text-slate-400">
            No skills data available
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsRadarChart;
