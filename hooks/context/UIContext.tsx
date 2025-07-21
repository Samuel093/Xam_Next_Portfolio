'use client';

import { createContext, useContext,  } from 'react';
import { useState } from 'react';

interface UIContextProps {
  showContactPopup: boolean;
  openContactPopup: () => void;
  closeContactPopup: () => void;
}

const UIContext = createContext<UIContextProps | undefined>(undefined);

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [showContactPopup, setShowContactPopup] = useState(false);

  return (
    <UIContext.Provider
      value={{
        showContactPopup,
        openContactPopup: () => setShowContactPopup(true),
        closeContactPopup: () => setShowContactPopup(false),
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error('useUI must be used within UIProvider');
  return context;
};
