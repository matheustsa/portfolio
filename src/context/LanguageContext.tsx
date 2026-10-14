import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TranslationDictionary } from '../i18n/types';
import { translations } from '../i18n/translations';

const STORAGE_KEY = 'portfolio-language';

export function resolveInitialLanguage(saved: string | null, navLang?: string): Language {
  if (saved === 'pt' || saved === 'en' || saved === 'es') {
    return saved;
  }
  if (navLang) {
    const lower = navLang.toLowerCase();
    if (lower.startsWith('es')) return 'es';
    if (lower.startsWith('en')) return 'en';
  }
  return 'pt';
}

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      const navLang = typeof navigator !== 'undefined' ? navigator.language : undefined;
      return resolveInitialLanguage(saved, navLang);
    }
    return 'pt';
  });

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newLang);
      document.documentElement.lang = newLang;
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language] || translations.pt,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
