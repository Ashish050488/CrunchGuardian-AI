import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [currentView, setCurrentView] = useState('ai-reports');
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [selectedBlockchain, setSelectedBlockchain] = useState('ethereum');

    const clearError = useCallback(() => setError(""), []);

    const value = {
        isLoading,
        setIsLoading,
        error,
        setError,
        currentView,
        setCurrentView,
        selectedWallet,
        setSelectedWallet,
        selectedBlockchain,
        setSelectedBlockchain,
        clearError,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};