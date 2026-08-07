import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import TR_LOCALE from "./locales/tr.json";
import EN_LOCALE from "./locales/en.json";

i18n.use(initReactI18next).init({
  resources: {
    tr: {
      translation: TR_LOCALE,
    },
    en: {
      translation: EN_LOCALE,
    },
  },
  lng: "tr",
  fallbackLng: ["tr", "en"],
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});
createRoot(document.getElementById("root")).render(
  <>
    <App />
  </>,
);
