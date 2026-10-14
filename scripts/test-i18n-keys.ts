import { translations } from '../src/i18n/translations';
import { Language } from '../src/i18n/types';

const languages: Language[] = ['pt', 'en', 'es'];

function getAllKeys(obj: Record<string, any>, prefix = ''): string[] {
  let keys: string[] = [];
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys = keys.concat(getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

const ptKeys = getAllKeys(translations.pt).sort();
console.log(`Found ${ptKeys.length} translation keys in PT.`);

let hasError = false;

for (const lang of languages) {
  if (!translations[lang]) {
    console.error(`Missing translations object for language: ${lang}`);
    hasError = true;
    continue;
  }

  const langKeys = getAllKeys(translations[lang]).sort();
  const missingKeys = ptKeys.filter((k) => !langKeys.includes(k));
  const extraKeys = langKeys.filter((k) => !ptKeys.includes(k));

  if (missingKeys.length > 0) {
    console.error(`Language [${lang}] is missing keys:`, missingKeys);
    hasError = true;
  }

  if (extraKeys.length > 0) {
    console.error(`Language [${lang}] has extra keys:`, extraKeys);
    hasError = true;
  }

  // Check for empty string values
  function checkEmptyValues(obj: any, path = '') {
    for (const [k, v] of Object.entries(obj)) {
      const curPath = path ? `${path}.${k}` : k;
      if (typeof v === 'string') {
        if (v.trim() === '') {
          console.error(`Language [${lang}] has empty string at: ${curPath}`);
          hasError = true;
        }
      } else if (typeof v === 'object' && v !== null) {
        checkEmptyValues(v, curPath);
      }
    }
  }
  checkEmptyValues(translations[lang]);
}

if (hasError) {
  console.error('Translation key validation failed!');
  process.exit(1);
} else {
  console.log('All translation keys match perfectly across pt, en, and es with no empty values.');
}
