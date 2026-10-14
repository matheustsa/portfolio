import { getAuthorProfile, getTechCategories, getProjects, getProjectById } from '../src/data/portfolioData';
import { Language } from '../src/i18n/types';

const languages: Language[] = ['pt', 'en', 'es'];
const projectIds = ['stockspot', 'divide-ai', 'escudeiro'];

let errors = 0;

for (const lang of languages) {
  // Author Profile
  const profile = getAuthorProfile(lang);
  if (!profile.role || !profile.bio || !profile.statusBadge) {
    console.error(`[${lang}] AuthorProfile missing required translated fields`);
    errors++;
  }

  // Tech categories
  const categories = getTechCategories(lang);
  if (categories.length === 0) {
    console.error(`[${lang}] Tech categories is empty`);
    errors++;
  }

  // Projects
  const projects = getProjects(lang);
  if (projects.length !== 3) {
    console.error(`[${lang}] Expected 3 projects, got ${projects.length}`);
    errors++;
  }

  for (const pid of projectIds) {
    const proj = getProjectById(pid, lang);
    if (!proj) {
      console.error(`[${lang}] Project ${pid} not found via getProjectById`);
      errors++;
      continue;
    }

    if (!proj.subtitle || !proj.summary || !proj.overview || !proj.challenge || !proj.solution || !proj.results) {
      console.error(`[${lang}] Project ${pid} is missing translation content`);
      errors++;
    }

    if (proj.metrics.length === 0) {
      console.error(`[${lang}] Project ${pid} has no metrics`);
      errors++;
    }
  }
}

// Check distinct translations between PT and EN
const profilePt = getAuthorProfile('pt');
const profileEn = getAuthorProfile('en');
const profileEs = getAuthorProfile('es');

if (profilePt.bio === profileEn.bio || profilePt.role === profileEn.role) {
  console.error('PT and EN profile text should not be identical');
  errors++;
}

if (profilePt.bio === profileEs.bio || profilePt.role === profileEs.role) {
  console.error('PT and ES profile text should not be identical');
  errors++;
}

if (errors > 0) {
  console.error(`Validation failed with ${errors} errors!`);
  process.exit(1);
} else {
  console.log('Portfolio data translation test passed for all languages (pt, en, es).');
}
