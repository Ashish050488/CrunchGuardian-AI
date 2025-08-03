// src/components/ui/AddressInputForm.jsx
import React, { useState } from 'react';

const AddressInputForm = ({ onAnalyze, loading, title, placeholder, buttonText, quickActions = [] }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onAnalyze(inputValue.trim());
  };

  return (
    <div className="minimal-card">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {title}
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={placeholder}
              className="minimal-input w-full"
              disabled={loading}
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading || !inputValue.trim()}
              className="minimal-btn w-full md:w-auto"
            >
              {loading ? 'Analyzing...' : buttonText}
            </button>
          </div>
        </div>
      </form>

      {quickActions.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-400">Quick Test:</span>
          {quickActions.map(({ name, address }) => (
            <button
              key={name}
              onClick={() => {
                setInputValue(address);
                onAnalyze(address);
              }}
              disabled={loading}
              className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 disabled:opacity-50"
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressInputForm;