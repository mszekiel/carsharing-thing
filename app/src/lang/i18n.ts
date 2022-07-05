import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import langDE from "./de-DE.json";
import langEN from "./en-UK.json";

const resources = {
  en: {
    translation: langEN,
  },
  de: {
    translation: langDE,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
});

export default i18n;
