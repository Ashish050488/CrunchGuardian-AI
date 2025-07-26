// frontend-react/src/App.jsx

import React, { useState } from 'react';
import axios from 'axios';
// Import the new modular components
import AnalysisForm from './AnalysisForm';
import ReportDisplay from './ReportDisplay';
import ErrorDisplay from './ErrorDisplay';

import './App.css'; // Your main CSS file (for global styles and animations like fade-in)

function App() {
  // State for the AI-generated report (markdown string)
  const [report, setReport] = useState('');
  // State for raw combined data (temporary, for debugging API calls)
  const [rawCombinedData, setRawCombinedData] = useState(null); 
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false);
  // Unified state for displaying errors
  const [error, setError] = useState(''); 

  // This function handles the API call and state updates
  // It will be passed as a prop to the AnalysisForm component
  const handleAnalyze = async (address) => { 
    setIsLoading(true);    // Set loading state
    setError('');          // Clear any previous errors
    setReport('');         // Clear any previous report
    setRawCombinedData(null); // Clear any previous raw data

    try {
      // Make the API call to your Node.js backend proxy
      const response = await axios.post('http://localhost:4000/analyze', {
        address: address, // Pass the address received from AnalysisForm
      });

      // Check if the response contains the 'report' key (expected from LLM output)
      if (response.data.report) {
        setReport(response.data.report); // Set the markdown report for ReportDisplay
      } else {
        // If 'report' key is not present, it's likely the raw combined data from the backend
        // (during our current debugging phase for bitsCrunch API calls)
        setRawCombinedData(response.data.raw_combined_data || response.data); 
      }

    } catch (err) {
      console.error("Frontend Axios Error:", err); // Log the full error to console for debugging
      // Extract a more specific error message from the backend response
      const errorMessage = err.response?.data?.detail // Backend custom error detail
                           || err.message              // Generic Axios error message (e.g., Network Error)
                           || 'Failed to fetch analysis. Ensure backend services are running and API keys are correct.';
      setError(errorMessage); // Set the error message for ErrorDisplay
    } finally {
      setIsLoading(false); // Always turn off loading state
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <h1 className="text-5xl font-bold mb-2">CrunchGuardian AI</h1>
      <p className="text-lg text-gray-400 mb-8">Your AI Due-Diligence Analyst for NFTs</p>

      {/* Render the Analysis Form component, passing necessary props */}
      <AnalysisForm
        onAnalyze={handleAnalyze} // Function to call on form submission
        isLoading={isLoading}     // Current loading state
        setError={setError}       // Function to set client-side validation errors
      />

      {/* Render the Error Display component if there's an error message */}
      <ErrorDisplay message={error} />

      {/* Show a loading message if analysis is in progress and no report/error yet */}
      {isLoading && !report && !error && (
        <div className="text-blue-400 text-lg">Loading analysis...</div>
      )}

      {/* Render the Report Display component if a report is available */}
      {report && <ReportDisplay report={report} />}

      {/* Render Raw Combined Data (for debugging backend API calls) if available and no final report */}
      {rawCombinedData && !report && (
        <div className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">Raw Combined Data (for debugging)</h2>
          <pre className="bg-gray-900 p-4 rounded text-left overflow-x-auto text-sm">
            {JSON.stringify(rawCombinedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;