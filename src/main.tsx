import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './global.css'

import { App } from './App.tsx'

// import "primereact/resources/themes/lara-light-green/theme.css";
import "primereact/resources/themes/lara-light-blue/theme.css"; 
// import "primereact/resources/themes/saga-blue/theme.css";
// import "primereact/resources/themes/vela-blue/theme.css";
// import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css"; 

import { Provider } from "react-redux";
import { store } from "./store/store";
import { ToastProvider } from "./contexts/ToastContext";

function AppWithToast() {
  return (
    <StrictMode>
      <Provider store={store}>
        <ToastProvider>
          <App />
        </ToastProvider>
      </Provider>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<AppWithToast />)
