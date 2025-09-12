import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const redirect = sessionStorage.redirect;
if (redirect) {
  delete sessionStorage.redirect;
  window.history.replaceState(null, "", redirect);
}

createRoot(document.getElementById("root")!).render(<App />);
