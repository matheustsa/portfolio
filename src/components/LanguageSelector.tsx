import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { languageOptions } from '../i18n/translations';
import { Language } from '../i18n/types';

export interface LanguageSelectorProps {
  className?: string;
  dropDirection?: 'down' | 'up';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className = '',
  dropDirection = 'down',
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const currentOption =
    languageOptions.find((opt) => opt.code === language) || languageOptions[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={`relative inline-block text-left shrink-0 ${className}`}>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`${t.languageSelector.selectLanguage}. ${t.languageSelector.currentLanguage} ${currentOption.name}`}
        title={`${t.languageSelector.currentLanguage} ${currentOption.name}`}
        className="h-10 w-10 sm:w-auto px-0 sm:px-3 rounded-xl border border-surface-border-light dark:border-surface-border-dark bg-surface-light/80 dark:bg-surface-dark/80 hover:border-sunset-amber/40 dark:hover:border-sunset-gold/40 text-text-light-primary dark:text-text-dark-primary transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunset-amber flex items-center justify-center sm:justify-start gap-1.5 cursor-pointer shadow-xs font-mono text-xs sm:text-sm font-semibold select-none shrink-0"
      >
        <span className="text-base leading-none" role="img" aria-label={currentOption.name}>
          {currentOption.flag}
        </span>
        <span className="hidden sm:inline tracking-wide font-bold">{currentOption.label}</span>
        <ChevronDown
          className={`hidden sm:block w-3.5 h-3.5 text-text-light-secondary dark:text-text-dark-secondary transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-sunset-amber' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: dropDirection === 'down' ? -6 : 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: dropDirection === 'down' ? -6 : 6, scale: 0.95 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            role="listbox"
            aria-label={t.languageSelector.selectLanguage}
            className={`absolute right-0 ${
              dropDirection === 'down' ? 'top-full mt-2' : 'bottom-full mb-2'
            } w-44 rounded-2xl border border-surface-border-light dark:border-surface-border-dark bg-bg-light/95 dark:bg-bg-dark/95 backdrop-blur-xl shadow-xl shadow-black/10 dark:shadow-black/40 py-1.5 z-50 overflow-hidden focus:outline-none`}
          >
            {languageOptions.map((opt) => {
              const isSelected = opt.code === language;
              return (
                <button
                  key={opt.code}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt.code)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs sm:text-sm text-left transition-colors cursor-pointer group ${
                    isSelected
                      ? 'bg-sunset-amber/10 dark:bg-sunset-amber/20 text-sunset-coral dark:text-sunset-gold font-semibold'
                      : 'text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light-primary dark:hover:text-text-dark-primary hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none" role="img" aria-label={opt.name}>
                      {opt.flag}
                    </span>
                    <span className="font-medium tracking-tight text-text-light-primary dark:text-text-dark-primary">
                      {opt.name}
                    </span>
                    <span className="text-xs font-mono text-text-light-secondary/70 dark:text-text-dark-secondary/70">
                      ({opt.label})
                    </span>
                  </div>
                  {isSelected && (
                    <Check
                      className="w-4 h-4 text-sunset-coral dark:text-sunset-gold shrink-0 ml-2"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
