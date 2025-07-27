import React, { createContext, useContext, useState, useEffect } from 'react';

const ResumeBuilderContext = createContext();

export const useResumeBuilder = () => {
  const context = useContext(ResumeBuilderContext);
  if (!context) {
    throw new Error('useResumeBuilder must be used within a ResumeBuilderProvider');
  }
  return context;
};

export const ResumeBuilderProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  // Start new session when component mounts
  useEffect(() => {
    startNewSession();
  }, []);

  const startNewSession = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/resume-builder/start-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSessionId(data.sessionId);
        setFormData({}); // Clear form data for new session
        console.log('✅ New session started:', data.sessionId);
      } else {
        console.error('❌ Failed to start session:', data.message);
      }
    } catch (error) {
      console.error('❌ Error starting session:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveStepData = async (step, data) => {
    try {
      setLoading(true);
      
      const response = await fetch('http://localhost:5000/api/resume-builder/save-step', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ step, data }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setFormData(prev => ({ ...prev, [step]: data }));
        console.log(`✅ ${step} data saved successfully`);
        return true;
      } else {
        console.error(`❌ Failed to save ${step} data:`, result.message);
        return false;
      }
    } catch (error) {
      console.error(`❌ Error saving ${step} data:`, error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getCurrentData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/resume-builder/current-data');
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
    } catch (error) {
      console.error('❌ Error getting current data:', error);
    }
    return '';
  };

  const value = {
    sessionId,
    formData,
    loading,
    startNewSession,
    saveStepData,
    getCurrentData,
  };

  return (
    <ResumeBuilderContext.Provider value={value}>
      {children}
    </ResumeBuilderContext.Provider>
  );
};

