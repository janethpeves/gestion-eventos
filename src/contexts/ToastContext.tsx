import React, { createContext, useContext, useRef, type ReactNode } from 'react';
import { Toast } from 'primereact/toast';

interface ToastContextType {
  toast: React.RefObject<Toast | null>;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const toast = useRef<Toast>(null);

  return (
    <ToastContext.Provider value={{ toast }}>
      <Toast ref={toast} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
