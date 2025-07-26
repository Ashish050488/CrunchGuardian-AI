import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown'; // Import the new library
import './App.css';

function App() {
  const [address, setAddress] = useState('');
  const [report, setReport] = useState(''); // Default to an empty string for the markdown report
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!address) {
      setError('Please enter a wallet address.');
      return;
    }

    setIsLoading(true);
    setError('');
    setReport(''); // Clear previous report

    try {
      // Call your Node.js backend proxy
      const response = await axios.post('http://localhost:4000/analyze', {
        address: address,
      });
      // The markdown report is now inside the 'report' key of the response data
      setReport(response.data.report); 
    } catch (err) {
      // Improved error handling to display detailed message from backend
      const errorMessage = err.response?.data?.detail || 'Failed to fetch analysis. Ensure backend services are running and API keys are correct.';
      setError(errorMessage);
      console.error("Frontend Axios Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <h1 className="text-5xl font-bold mb-2">CrunchGuardian AI</h1>
      <p className="text-lg text-gray-400 mb-8">Your AI Due-Diligence Analyst for NFTs</p>

      <form onSubmit={handleAnalyze} className="w-full max-w-2xl mb-8">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Wallet Address (e.g., 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045)"
          className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 p-4 bg-blue-600 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>

      {error && <div className="bg-red-800 border border-red-600 p-4 rounded-lg w-full max-w-2xl text-center break-words">{error}</div>}

      {/* UPDATED: Render the report using ReactMarkdown */}
      {report && (
        <div className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl animate-fade-in prose prose-invert">
          <ReactMarkdown>{report}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default App;