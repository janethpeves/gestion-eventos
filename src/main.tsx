import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./global.css";

import { App } from "./App.tsx";

// import "primereact/resources/themes/lara-light-green/theme.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
// import "primereact/resources/themes/saga-blue/theme.css";
// import "primereact/resources/themes/vela-blue/theme.css";
// import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { ToastProvider } from "./contexts/ToastContext";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider>
          <App />
        </ToastProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
