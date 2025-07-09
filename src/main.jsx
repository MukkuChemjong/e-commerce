import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";
import { Provider } from "react-redux";
import { Toaster } from "./components/ui/sonner";

const basename = import.meta.env.BASE_URL;

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename={basename}>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </BrowserRouter>
);
