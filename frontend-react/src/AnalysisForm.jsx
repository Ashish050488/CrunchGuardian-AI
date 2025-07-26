// frontend-react/src/AnalysisForm.jsx

import React, { useState } from 'react';

// This component takes props:
// - onAnalyze: A function from the parent (App.jsx) to call when form is submitted
// - isLoading: Boolean to disable button during analysis
// - setError: Function to set an error message (for client-side validation)
function AnalysisForm({ onAnalyze, isLoading, setError }) {
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    if (!address) {
      setError('Please enter a wallet address.');
      return;
    }
    setError(''); // Clear any previous errors on new submission attempt
    onAnalyze(address); // Call the analyze function passed from App.jsx with the address
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mb-8">
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter Wallet Address (e.g., 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045)"
        className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={isLoading} // Disable button when analysis is in progress
        className="w-full mt-4 p-4 bg-blue-600 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Analyzing...' : 'Analyze'}
      </button>
    </form>
  );
}

export default AnalysisForm;