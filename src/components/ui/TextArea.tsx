import * as React from "react";
import { useRef, useEffect } from "react";
import { cn } from "../../lib/utils";
import { initializeGrammarly, isGrammarlyLoaded, getGrammarlyError } from "../../lib/grammarly";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  enableGrammarly?: boolean;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, helperText, id, enableGrammarly = false, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [grammarlyStatus, setGrammarlyStatus] = React.useState<'loading' | 'loaded' | 'error' | 'disabled'>(
      enableGrammarly ? 'loading' : 'disabled'
    );
    
    // Initialize Grammarly if enabled
    useEffect(() => {
      if (enableGrammarly && containerRef.current) {
        // If Grammarly is already loaded, update status
        if (isGrammarlyLoaded()) {
          setGrammarlyStatus('loaded');
        } else if (getGrammarlyError()) {
          setGrammarlyStatus('error');
        }
        
        // Use the centralized Grammarly utility
        const cleanup = initializeGrammarly(containerRef.current);
        
        // Update status after a short delay to check if loading succeeded
        const timer = setTimeout(() => {
          if (isGrammarlyLoaded()) {
            setGrammarlyStatus('loaded');
          } else if (getGrammarlyError()) {
            setGrammarlyStatus('error');
          }
        }, 2000);
        
        return () => {
          clearTimeout(timer);
          cleanup();
        };
      } else {
        setGrammarlyStatus('disabled');
      }
    }, [enableGrammarly]);
    
    return (
      <div className="mb-5" ref={containerRef}>
        {label && (
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor={id}
              className="block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              {label}
            </label>
            {enableGrammarly && (
              <div className="flex items-center">
                {grammarlyStatus === 'loaded' && (
                  <span className="text-xs text-green-600 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    Grammarly active
                  </span>
                )}
                {grammarlyStatus === 'error' && (
                  <span className="text-xs text-amber-600 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                    </svg>
                    Spell check only
                  </span>
                )}
                {grammarlyStatus === 'loading' && (
                  <span className="text-xs text-blue-600 flex items-center">
                    <svg className="w-3 h-3 mr-1 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Loading grammar check
                  </span>
                )}
              </div>
            )}
          </div>
        )}
        <div className="relative">
          <textarea
            className={cn(
              "flex min-h-[120px] w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              className
            )}
            ref={ref}
            id={id}
            data-gramm={enableGrammarly ? "true" : "false"}
            {...props}
          />
          {error && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
        {(error || helperText) && (
          <p
            className={cn(
              "mt-2 text-sm",
              error ? "text-red-500" : "text-slate-500 dark:text-slate-400"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);
TextArea.displayName = "TextArea";

export { TextArea };
export default TextArea;