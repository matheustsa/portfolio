import { translations } from '../src/i18n/translations';
import { TranslationDictionary } from '../src/i18n/types';

// Verify that all new dictionary keys exist in pt, en, and es
const expectedNewKeys = [
  'hero.specialtyLabel',
  'hero.socialsLabel',
  'contact.emailTitle',
  'contact.emailDesc',
  'contact.sendEmail',
  'contact.copied',
  'contact.linkedinDesc',
  'contact.linkedinBtn',
  'contact.githubDesc',
  'contact.githubBtn',
  'footer.techCredits',
];

function getValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => (acc ? acc[part] : undefined), obj);
}

let errors = 0;
const languages: (keyof typeof translations)[] = ['pt', 'en', 'es'];

for (const lang of languages) {
  for (const key of expectedNewKeys) {
    const val = getValue(translations[lang], key);
    if (!val || typeof val !== 'string' || val.trim() === '') {
      console.error(`[${lang}] Missing or empty key: ${key}`);
      errors++;
    }
  }
}

if (errors > 0) {
  console.error(`Fix pass test failed with ${errors} missing keys!`);
  process.exit(1);
} else {
  console.log('Fix pass test: all dictionary keys present and populated in pt, en, es.');
}
