import React from 'react';
import { Switch } from '@headlessui/react';
import { cn } from '../../lib/utils';

interface HeadlessSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  className?: string;
}

const HeadlessSwitch: React.FC<HeadlessSwitchProps> = ({
  checked,
  onChange,
  label,
  description,
  className,
}) => {
  return (
    <Switch.Group as="div" className={cn("flex items-center", className)}>
      <Switch
        checked={checked}
        onChange={onChange}
        className={cn(
          checked ? 'bg-blue-600' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            checked ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          )}
        />
      </Switch>
      {(label || description) && (
        <Switch.Label as="div" className="ml-3">
          {label && <span className="text-sm font-medium text-gray-900">{label}</span>}
          {description && (
            <span className="text-sm text-gray-500 block">{description}</span>
          )}
        </Switch.Label>
      )}
    </Switch.Group>
  );
};

export default HeadlessSwitch;
