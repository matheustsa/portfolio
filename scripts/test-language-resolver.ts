import { resolveInitialLanguage } from '../src/context/LanguageContext';

const tests = [
  { saved: 'es', nav: 'pt-BR', expected: 'es', desc: 'Saved Spanish takes precedence' },
  { saved: 'en', nav: 'es-ES', expected: 'en', desc: 'Saved English takes precedence' },
  { saved: 'pt', nav: 'en-US', expected: 'pt', desc: 'Saved Portuguese takes precedence' },
  { saved: null, nav: 'en-US', expected: 'en', desc: 'Navigator en-US defaults to en' },
  { saved: null, nav: 'en-GB', expected: 'en', desc: 'Navigator en-GB defaults to en' },
  { saved: null, nav: 'es-ES', expected: 'es', desc: 'Navigator es-ES defaults to es' },
  { saved: null, nav: 'es-419', expected: 'es', desc: 'Navigator es-419 defaults to es' },
  { saved: null, nav: 'pt-BR', expected: 'pt', desc: 'Navigator pt-BR defaults to pt' },
  { saved: null, nav: 'fr-FR', expected: 'pt', desc: 'Unknown language defaults to pt' },
  { saved: 'invalid', nav: 'fr-FR', expected: 'pt', desc: 'Corrupt storage defaults to pt' },
];

let failed = 0;
for (const t of tests) {
  const result = resolveInitialLanguage(t.saved, t.nav);
  if (result !== t.expected) {
    console.error(`FAIL: ${t.desc} -> Expected ${t.expected}, got ${result}`);
    failed++;
  } else {
    console.log(`PASS: ${t.desc}`);
  }
}

if (failed > 0) {
  console.error(`${failed} tests failed!`);
  process.exit(1);
} else {
  console.log('All language resolution tests passed successfully.');
}
