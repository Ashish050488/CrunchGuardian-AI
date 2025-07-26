// frontend-react/src/ReportDisplay.jsx

import React from 'react';
import ReactMarkdown from 'react-markdown'; // Assuming react-markdown is installed

// This component takes a 'report' prop (the markdown string)
function ReportDisplay({ report }) {
  if (!report) {
    return null; // Don't render anything if no report is provided
  }

  return (
    // 'prose prose-invert' classes from @tailwindcss/typography plugin
    // provide good default styling for markdown content
    <div className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl animate-fade-in prose prose-invert">
      <ReactMarkdown>{report}</ReactMarkdown>
    </div>
  );
}

export default ReportDisplay;