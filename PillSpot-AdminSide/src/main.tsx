import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { persistor, store } from "./App/Store.ts";
import Router from "./Router/index.tsx";
// import ReactFormm from "./tryReactHook/index.tsx";
// import { ConfigProvider, theme } from 'antd'
import "./i18n.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from 'sonner';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
        <Toaster richColors position="top-right" />
      </PersistGate>
      {/* <ReactFormm/> */}
    </Provider>
  </StrictMode>
);
