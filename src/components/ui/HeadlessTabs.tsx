import React, { Fragment } from 'react';
import { Tab } from '@headlessui/react';
import { cn } from '../../lib/utils';

interface TabsProps {
  defaultIndex?: number;
  tabs: {
    title: string | React.ReactNode;
    content: React.ReactNode;
  }[];
  className?: string;
}

const HeadlessTabs: React.FC<TabsProps> = ({ 
  defaultIndex = 0, 
  tabs, 
  className 
}) => {
  return (
    <div className={cn("w-full", className)}>
      <Tab.Group defaultIndex={defaultIndex}>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/10 dark:bg-blue-900/20 rounded-xl mb-4">
          {tabs.map((tab, index) => (
            <Tab key={index} as={Fragment}>
              {({ selected }) => (
                <button
                  className={cn(
                    'w-full py-2.5 text-sm font-medium rounded-lg transition-colors',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 dark:ring-offset-blue-500 ring-white ring-opacity-60',
                    selected
                      ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-white/[0.12] dark:hover:bg-slate-700/[0.3] hover:text-slate-700 dark:hover:text-slate-300'
                  )}
                >
                  {tab.title}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {tabs.map((tab, index) => (
            <Tab.Panel
              key={index}
              className={cn(
                'rounded-xl bg-white dark:bg-slate-800 p-3 transition-colors',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 dark:ring-offset-blue-500 ring-white ring-opacity-60'
              )}
            >
              {tab.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default HeadlessTabs;
