import { useState, useEffect, useCallback } from 'react';
import { ResumeData } from '../types/resume';
import { produce } from 'immer';

// Default empty resume data structure
const DEFAULT_RESUME_DATA: ResumeData = {
  personalInfo: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: ''
  },
  summary: {
    text: ''
  },
  experience: [],
  education: [],
  skillGroups: [],
  projects: [],
  sectionOrder: [
    'personalInfo',
    'summary',
    'experience',
    'education',
    'skills',
    'projects'
  ]
};

// Local storage key for saving resume data
const STORAGE_KEY = 'resume_builder_data';

// Define options for data persistence
interface PersistenceOptions {
  autosaveInterval?: number; // Interval in ms for autosave (0 to disable)
  storageKey?: string; // Custom storage key
}

/**
 * Custom hook for centralized resume state management with automatic persistence
 * and synchronization across tabs
 */
export function useResumeStore(options: PersistenceOptions = {}) {
  const {
    autosaveInterval = 5000, // Save every 5 seconds by default
    storageKey = STORAGE_KEY
  } = options;

  // Main resume data state
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      // Attempt to load from local storage on initial mount
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch (error) {
      console.error('Error loading resume data from storage:', error);
    }
    return DEFAULT_RESUME_DATA;
  });

  // Track modification time to know when to save
  const [lastModified, setLastModified] = useState<number>(Date.now());
  
  // Flag to track if data is dirty (needs saving)
  const [isDirty, setIsDirty] = useState<boolean>(false);

  // Save data to local storage
  const saveToStorage = useCallback(() => {
    if (!isDirty) return;
    
    try {
      localStorage.setItem(storageKey, JSON.stringify(resumeData));
      setIsDirty(false);
      console.log('Resume data saved to storage');
    } catch (error) {
      console.error('Error saving resume data to storage:', error);
    }
  }, [resumeData, storageKey, isDirty]);

  // Handle updates to specific sections with Immer for immutable updates
  const updateSection = useCallback(<K extends keyof ResumeData>(
    section: K,
    data: ResumeData[K]
  ) => {
    setResumeData(produce(draft => {
      draft[section] = data;
    }));
    setLastModified(Date.now());
    setIsDirty(true);
  }, []);

  // Reset all data to defaults
  const resetData = useCallback(() => {
    if (window.confirm('Are you sure you want to reset all resume data? This cannot be undone.')) {
      setResumeData(DEFAULT_RESUME_DATA);
      setLastModified(Date.now());
      setIsDirty(true);
    }
  }, []);

  // Export data as JSON file
  const exportData = useCallback(() => {
    try {
      const dataStr = JSON.stringify(resumeData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      
      const exportFileName = `resume_data_${new Date().toISOString().slice(0, 10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileName);
      linkElement.click();
    } catch (error) {
      console.error('Error exporting resume data:', error);
    }
  }, [resumeData]);

  // Import data from JSON file
  const importData = useCallback((jsonData: string) => {
    try {
      const parsedData = JSON.parse(jsonData) as ResumeData;
      
      // Validate the imported data has the required structure
      if (!parsedData.personalInfo || !parsedData.sectionOrder) {
        throw new Error('Invalid resume data format');
      }
      
      setResumeData(parsedData);
      setLastModified(Date.now());
      setIsDirty(true);
      return true;
    } catch (error) {
      console.error('Error importing resume data:', error);
      return false;
    }
  }, []);

  // Listen for storage events to sync across tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === storageKey && event.newValue) {
        try {
          const newData = JSON.parse(event.newValue);
          setResumeData(newData);
        } catch (error) {
          console.error('Error parsing data from another tab:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [storageKey]);

  // Setup autosave timer
  useEffect(() => {
    if (autosaveInterval <= 0 || !isDirty) return;

    const timer = setTimeout(() => {
      saveToStorage();
    }, autosaveInterval);

    return () => {
      clearTimeout(timer);
    };
  }, [lastModified, autosaveInterval, saveToStorage, isDirty]);

  // Save on unmount and when window is closed
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isDirty) {
        saveToStorage();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // Final save on unmount
      if (isDirty) {
        saveToStorage();
      }
    };
  }, [saveToStorage, isDirty]);

  return {
    resumeData,
    updateSection,
    saveToStorage, // Manual save
    resetData,
    exportData,
    importData,
    isDirty,
    lastModified
  };
}

export default useResumeStore;
