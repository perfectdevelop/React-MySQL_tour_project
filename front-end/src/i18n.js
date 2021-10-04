/**
 * @name: i18n.js
 * @description: Inicialización del multidioma
 * Backend: Carga la traducción usando XHR, los ficheros deben localizarse en: /public/locales/{lang}/translation.json
 * LanguageDetector: Detecta el idioma del usuario
 * initReactI18next: Instancia de i18n a react-i18next
*/

import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const fallbackLng = ['es'];
const availableLanguages = ['en', 'es'];

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng,
        debug: true,
        whitelist: availableLanguages,
        interpolation: {
            escapeValue: false
        }
    });
export default i18n;