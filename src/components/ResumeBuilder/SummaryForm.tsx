import React, { useState, useEffect, useRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import TextArea from '../ui/TextArea';
import { Lightbulb, Check, X, PenTool, Wand2, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const SummaryForm: React.FC = () => {
  const { resumeData, updateSummary } = useResume();
  const { summary } = resumeData;
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedFont, setSelectedFont] = useState('Inter');
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
  // Font options
  const fonts = [
    { name: 'Inter', value: 'Inter, sans-serif' },
    { name: 'Roboto', value: 'Roboto, sans-serif' },
    { name: 'Playfair Display', value: 'Playfair Display, serif' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif' },
    { name: 'Open Sans', value: 'Open Sans, sans-serif' },
    { name: 'Lato', value: 'Lato, sans-serif' },
    { name: 'Poppins', value: 'Poppins, sans-serif' },
    { name: 'Merriweather', value: 'Merriweather, serif' },
    { name: 'Source Code Pro', value: 'Source Code Pro, monospace' },
  ];

  // Generate AI suggestions based on text content
  useEffect(() => {
    if (summary.text && summary.text.length > 10) {
      // Only generate suggestions for non-empty content
      const mockSuggestions = [
        `${summary.text} Additionally, I excel at problem-solving and collaboration in fast-paced environments.`,
        `As a results-driven professional, ${summary.text.toLowerCase()}`,
        `${summary.text} My track record demonstrates consistent achievement and growth.`
      ];
      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [summary.text]);
  
  // Grammarly is now enabled through the TextArea component

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateSummary(e.target.value);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Clear any existing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    
    // Set a new timeout
    const timeout = setTimeout(() => {
      setIsTyping(false);
      // This would trigger the AI suggestions in a real implementation
    }, 1000);
    
    setTypingTimeout(timeout);
  };
  
  const handleFontChange = (value: string) => {
    setSelectedFont(value);
    // In a real implementation, this would update the font in the resume context
  };
  
  const handleSuggestionApply = (suggestion: string) => {
    updateSummary(suggestion);
    setShowSuggestions(false);
  };

  return (
    <Card className="mb-6 animate-fadeIn shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">Professional Summary</CardTitle>
        <div className="flex items-center space-x-3">
          <Select value={selectedFont} onValueChange={handleFontChange}>
            <SelectTrigger className="w-[180px] h-9 text-sm shadow-sm">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              {fonts.map((font) => (
                <SelectItem key={font.name} value={font.name}>
                  <span style={{ fontFamily: font.value }}>{font.name}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            className="h-9 shadow-sm hover:bg-blue-50 dark:hover:bg-slate-700"
            onClick={() => setShowSuggestions(!showSuggestions)}
          >
            {showSuggestions ? (
              <>
                <Wand2 size={16} className="mr-2 text-blue-600 dark:text-blue-400" />
                <span>Hide Suggestions</span>
              </>
            ) : (
              <>
                <Sparkles size={16} className="mr-2 text-blue-600 dark:text-blue-400" />
                <span>AI Suggest</span>
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="relative">
          <div
            className={`transition-opacity duration-300 ${isTyping ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute top-0 right-0 bg-amber-100 text-amber-800 px-3 py-1 rounded-md text-xs font-medium shadow-sm">
              <PenTool size={12} className="inline mr-1" /> Grammar checking...
            </div>
          </div>
          <TextArea
            ref={textAreaRef}
            value={summary.text}
            onChange={handleChange}
            placeholder="Write a compelling summary of your skills, experience, and what you bring to the table. Keep it concise and targeted to the roles you're seeking."
            rows={5}
            enableGrammarly={true}
            className={`${selectedFont} focus:ring-2 focus:ring-blue-500 shadow-sm`}
            style={{ fontFamily: fonts.find(f => f.name === selectedFont)?.value }}
          />
        </div>
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="mt-6 border border-blue-200 rounded-md bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 p-4 shadow-sm">
            <div className="flex items-center mb-3 text-blue-800 dark:text-blue-300">
              <Lightbulb size={16} className="mr-2" />
              <h4 className="font-medium">AI-Powered Suggestions</h4>
            </div>
            <div className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="flex group hover:bg-blue-100 dark:hover:bg-blue-800/30 p-3 rounded-md transition-colors">
                  <p className="flex-1 text-sm text-slate-700 dark:text-slate-300">{suggestion}</p>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleSuggestionApply(suggestion)}
                      className="p-1.5 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-full text-green-600 dark:text-green-400 transition-colors"
                      title="Apply suggestion"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => {
                        const newSuggestions = [...suggestions];
                        newSuggestions.splice(index, 1);
                        setSuggestions(newSuggestions);
                      }}
                      className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full text-red-600 dark:text-red-400 transition-colors"
                      title="Dismiss suggestion"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-slate-500 dark:text-slate-400 italic border-t border-slate-100 dark:border-slate-800 mt-2 pt-3">
        <div className="flex items-center">
          <Sparkles size={14} className="mr-2 text-blue-500 dark:text-blue-400" />
          <p>AI-powered grammar checking and suggestions are enabled for this field.</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SummaryForm;