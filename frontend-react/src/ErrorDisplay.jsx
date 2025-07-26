// frontend-react/src/ErrorDisplay.jsx

import React from 'react';

// This component takes a 'message' prop (the error string)
function ErrorDisplay({ message }) {
  if (!message) {
    return null; // Don't render anything if no error message is provided
  }

  return (
    <div className="bg-red-800 border border-red-600 p-4 rounded-lg w-full max-w-2xl text-center break-words mb-4">
      {message}
    </div>
  );
}

export default ErrorDisplay;