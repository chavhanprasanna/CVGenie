import React from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface DisclosureProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

const HeadlessDisclosure: React.FC<DisclosureProps> = ({
  title,
  children,
  defaultOpen = false,
  className
}) => {
  return (
    <Disclosure as="div" className={cn("mt-2", className)} defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 dark:focus-visible:ring-slate-400 focus-visible:ring-opacity-75 transition-colors">
            <span>{title}</span>
            <ChevronUpIcon
              className={`${
                open ? 'transform rotate-180' : ''
              } w-5 h-5 text-slate-500 dark:text-slate-300`}
            />
          </Disclosure.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 rounded-b-lg shadow-sm border border-t-0 border-slate-200 dark:border-slate-700 transition-colors">
              {children}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default HeadlessDisclosure;
