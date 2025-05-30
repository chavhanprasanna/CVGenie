import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Experience } from '../../types/resume';

interface CareerTimelineProps {
  experiences: Experience[];
}

const CareerTimeline: React.FC<CareerTimelineProps> = ({ experiences }) => {
  // Sort experiences chronologically
  const sortedExperiences = [...experiences].sort((a, b) => {
    const aStartDate = new Date(a.startDate).getTime();
    const bStartDate = new Date(b.startDate).getTime();
    return aStartDate - bStartDate;
  });

  // Transform experience data for the timeline chart
  const data = sortedExperiences.map(exp => {
    const startDate = new Date(exp.startDate);
    const endDate = exp.current ? new Date() : new Date(exp.endDate);
    const durationMonths = (
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth())
    );
    
    return {
      company: exp.company,
      position: exp.position,
      duration: durationMonths,
      startDate: startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
      endDate: exp.current ? 'Present' : endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
    };
  });

  return (
    <div className="w-full h-[400px] mb-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm overflow-hidden transition-colors duration-200">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Career Progression</h3>
      </div>
      <div className="p-6 h-[320px]">
        {data.length > 0 ? (
          <ResponsiveBar
            data={data}
            keys={['duration']}
            indexBy="company"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            layout="horizontal"
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'blues' }}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Duration (months)',
              legendPosition: 'middle',
              legendOffset: 40
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Company',
              legendPosition: 'middle',
              legendOffset: -40
            }}
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
              }
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            tooltip={({ data }) => (
              <div className="bg-white dark:bg-slate-700 p-2 shadow-md rounded-md border border-gray-200 dark:border-gray-600 dark:text-white">
                <strong>{data.position}</strong>
                <div>{data.company}</div>
                <div>{`${data.startDate} - ${data.endDate}`}</div>
                <div>{`${data.duration} months`}</div>
              </div>
            )}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemTextColor: 'var(--chart-legend-text, #999)',
                symbolSize: 20,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemOpacity: 1,
                      itemTextColor: 'var(--chart-legend-hover, #000)'
                    }
                  }
                ]
              }
            ]}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500 dark:text-slate-400">
            No experience data available
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerTimeline;
