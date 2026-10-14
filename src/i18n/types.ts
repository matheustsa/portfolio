export type Language = 'pt' | 'en' | 'es';

export interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
  name: string;
}

export interface TranslationDictionary {
  nav: {
    about: string;
    stack: string;
    projects: string;
    contact: string;
    cta: string;
    menuOpen: string;
    menuClose: string;
    logoSubtext: string;
  };
  theme: {
    sunsetDark: string;
    sunriseLight: string;
    currentSunset: string;
    currentSunrise: string;
    sunsetLabel: string;
    sunriseLabel: string;
  };
  hero: {
    statusBadge: string;
    greeting: string;
    aboutSection: string;
    viewProjects: string;
    contactMe: string;
    locationTooltip: string;
    terminalTitle: string;
    specialtyLabel: string;
    socialsLabel: string;
  };
  techStack: {
    badge: string;
    title: string;
    description: string;
    coreStrengths: string;
    experienceSummary: string;
  };
  projects: {
    badge: string;
    title: string;
    subtitle: string;
    viewDetails: string;
    exploreCase: string;
    sourceCode: string;
    preview: string;
  };
  projectDrawer: {
    overview: string;
    challenge: string;
    solution: string;
    results: string;
    techUsed: string;
    metrics: string;
    sourceCode: string;
    liveDemo: string;
    gallery: string;
    close: string;
    viewImage: string;
    keyImpact: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    copyEmail: string;
    emailCopied: string;
    reachOutDirectly: string;
    connectSocial: string;
    emailTitle: string;
    emailDesc: string;
    sendEmail: string;
    copied: string;
    linkedinDesc: string;
    linkedinBtn: string;
    githubDesc: string;
    githubBtn: string;
  };
  footer: {
    builtWith: string;
    rights: string;
    backToTop: string;
    techCredits: string;
  };
  lightbox: {
    imageCounter: string;
    close: string;
    previous: string;
    next: string;
  };
  languageSelector: {
    selectLanguage: string;
    currentLanguage: string;
  };
}
