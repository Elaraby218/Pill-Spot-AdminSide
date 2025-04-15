import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./App/Store.ts";
import Router from "./Router/index.tsx";
// import { ConfigProvider, theme } from 'antd'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Router/>
    </Provider>
  </StrictMode>
);
