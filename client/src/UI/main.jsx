import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { SocketProvider } from "./socketIOClient.jsx";

const setDynamicCSP = () => {
  const isDevelopment = import.meta.env.MODE === "development";

  const csp = isDevelopment
    ? "default-src 'self'; connect-src 'self' http://localhost:8000 ws://localhost:9001; style-src 'self' 'unsafe-inline'; script-src 'self'; img-src 'self' data:; font-src 'self';"
    : "default-src 'self'; connect-src 'self' wss://deployed_domain.com; style-src 'self'; script-src 'self'; img-src 'self' data:; font-src 'self';";

  const metaCSP = document.createElement("meta");
  metaCSP.httpEquiv = "Content-Security-Policy";
  metaCSP.content = csp;
  document.head.appendChild(metaCSP);
};

// Call the function to set the CSP
setDynamicCSP();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <SocketProvider wsUrl="http://localhost:9001">
        <App />
      </SocketProvider>
    </Provider>
  </BrowserRouter>
);
