import React, { createContext, useContext, useState } from 'react';

const FlashMessageContext = createContext();

export const FlashMessageProvider = ({ children }) => {
    const [flashMessage, setFlashMessage] = useState('');

    return (
        <FlashMessageContext.Provider value={{ flashMessage, setFlashMessage }}>
            {children}
        </FlashMessageContext.Provider>
    );
};

export const useFlashMessage = () => {
    const context = useContext(FlashMessageContext);
    if (context === undefined) {
        throw new Error('useFlashMessage must be used within a FlashMessageProvider');
    }
    return context;
};
