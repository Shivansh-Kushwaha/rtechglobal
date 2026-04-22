import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import AppInitializer from "./AppInitializer";

createRoot(document.getElementById("root")!).render(
  <AppInitializer>
    <App />
  </AppInitializer>
);
