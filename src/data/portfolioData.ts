import { AuthorProfile, Project, SocialLink, TechCategory } from '../types/portfolio';
import { Language } from '../i18n/types';

export const socialLinks: SocialLink[] = [
  {
    platform: 'github',
    url: 'https://github.com/matheustsa',
    label: 'GitHub',
    icon: 'Github',
  },
  {
    platform: 'linkedin',
    url: 'https://www.linkedin.com/in/matheus-abella/',
    label: 'LinkedIn',
    icon: 'Linkedin',
  },
  {
    platform: 'email',
    url: 'mailto:mtsa.dev@gmail.com',
    label: 'mtsa.dev@gmail.com',
    icon: 'Mail',
  },
];

const profilesByLanguage: Record<Language, AuthorProfile> = {
  pt: {
    name: 'Matheus Abella',
    nickname: 'Lekod',
    role: 'Me diz o que você precisa, que eu resolvo.',
    email: 'mtsa.dev@gmail.com',
    bio: 'Engenheiro de software focado na construção de sistemas distribuídos, arquiteturas escaláveis e aplicações móveis de alto padrão técnico.',
    statusBadge: 'Disponível para novos projetos',
    avatarUrl: 'assets/eu_square.jpeg',
    location: 'Brasil',
    socialLinks,
  },
  en: {
    name: 'Matheus Abella',
    nickname: 'Lekod',
    role: "Tell me what you need, and I'll solve it.",
    email: 'mtsa.dev@gmail.com',
    bio: 'Software engineer dedicated to building distributed systems, scalable architectures, and mobile applications with high engineering standards.',
    statusBadge: 'Available for new projects',
    avatarUrl: 'assets/eu_square.jpeg',
    location: 'Brazil',
    socialLinks,
  },
  es: {
    name: 'Matheus Abella',
    nickname: 'Lekod',
    role: 'Dime qué necesitas y yo lo resuelvo.',
    email: 'mtsa.dev@gmail.com',
    bio: 'Ingeniero de software enfocado en la construcción de sistemas distribuidos, arquitecturas escalables y aplicaciones móviles de alto estándar técnico.',
    statusBadge: 'Disponible para nuevos proyectos',
    avatarUrl: 'assets/eu_square.jpeg',
    location: 'Brasil',
    socialLinks,
  },
};

const techCategoriesByLanguage: Record<Language, TechCategory[]> = {
  pt: [
    {
      title: 'Frontend',
      icon: 'Layout',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'HTML5/CSS3'],
    },
    {
      title: 'Backend',
      icon: 'Server',
      skills: ['Node.js', 'Java (Spring Boot)', 'Ruby on Rails', 'REST APIs', 'Microservices'],
    },
    {
      title: 'Mobile',
      icon: 'Smartphone',
      skills: ['Flutter', 'React Native'],
    },
    {
      title: 'Infraestrutura & DevOps',
      icon: 'Cpu',
      skills: [
        'PostgreSQL',
        'MySQL',
        'Redis',
        'MongoDB',
        'Docker',
        'Git & GitHub Actions',
        'Cloud & CI/CD',
      ],
    },
  ],
  en: [
    {
      title: 'Frontend',
      icon: 'Layout',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'HTML5/CSS3'],
    },
    {
      title: 'Backend',
      icon: 'Server',
      skills: ['Node.js', 'Java (Spring Boot)', 'Ruby on Rails', 'REST APIs', 'Microservices'],
    },
    {
      title: 'Mobile',
      icon: 'Smartphone',
      skills: ['Flutter', 'React Native'],
    },
    {
      title: 'Infrastructure & DevOps',
      icon: 'Cpu',
      skills: [
        'PostgreSQL',
        'MySQL',
        'Redis',
        'MongoDB',
        'Docker',
        'Git & GitHub Actions',
        'Cloud & CI/CD',
      ],
    },
  ],
  es: [
    {
      title: 'Frontend',
      icon: 'Layout',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'HTML5/CSS3'],
    },
    {
      title: 'Backend',
      icon: 'Server',
      skills: ['Node.js', 'Java (Spring Boot)', 'Ruby on Rails', 'REST APIs', 'Microservicios'],
    },
    {
      title: 'Mobile',
      icon: 'Smartphone',
      skills: ['Flutter', 'React Native'],
    },
    {
      title: 'Infraestructura y DevOps',
      icon: 'Cpu',
      skills: [
        'PostgreSQL',
        'MySQL',
        'Redis',
        'MongoDB',
        'Docker',
        'Git y GitHub Actions',
        'Cloud y CI/CD',
      ],
    },
  ],
};

const projectsByLanguage: Record<Language, Project[]> = {
  pt: [
    {
      id: 'stockspot',
      title: 'StockSpot',
      subtitle: 'Gestão de Estoque & Mapeamento 2D',
      summary:
        'Sistema para gerenciamento de estoques, com função de escaner de código de produtos e visualização em mapa interativo 2D.',
      overview:
        'Plataforma completa para controle físico e digital de estoque em armazéns. Combina um leitor rápido de códigos de barras com uma planta baixa interativa em 2D para visualização imediata da localização de cada produto.',
      challenge:
        'Integrar o mapa de prateleiras em 2D com o leitor de código de barras em tempo real, garantindo leitura instantânea em smartphones e desktops sem gargalos de banco de dados.',
      solution:
        'Desenvolvimento de SPA com React e Tailwind CSS no cliente, comunicando com backend Express em TypeScript estruturado via Prisma ORM e SQLite, empacotado em contêineres Docker.',
      results:
        'Redução de 65% no tempo de busca de produtos no armazém físico e precisão de inventário superior a 99.8%.',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Prisma', 'Docker', 'SQLite'],
      githubUrl: 'https://github.com/matheustsa/stockspot',
      image: 'assets/stockspot_dashboard.png',
      images: [
        'assets/stockspot_dashboard.png',
        'assets/stockspot_map.png',
        'assets/stockspot_tests.png',
      ],
      metrics: [
        { label: 'Tempo de Busca', value: '-65%' },
        { label: 'Acurácia de Inventário', value: '99.8%' },
        { label: 'Leitura de Código', value: '< 200ms' },
      ],
    },
    {
      id: 'divide-ai',
      title: 'Divide Aí',
      subtitle: 'Controle de Consumo & Rateio de Contas',
      summary:
        'Aplicativo mobile de controle de consumo pessoal com divisão automática de valor da conta.',
      overview:
        'Aplicativo mobile projetado para simplificar a divisão de comandas entre amigos em bares e restaurantes. Permite registrar consumos individuais, compartilhar pratos entre subgrupos e calcular taxas de serviço com precisão centavo a centavo.',
      challenge:
        'Calcular rateios justos em mesas com pedidos mistos, onde alguns itens são compartilhados por subconjuntos de pessoas, mantendo a experiência simples e sem telas burocráticas.',
      solution:
        'Arquitetura em Flutter com gerenciamento de estado reativo via Riverpod, validação matemática com arredondamento controlado e suporte integral a uso offline sem necessidade de login.',
      results:
        'Divisão de comandas em menos de 30 segundos, eliminando erros manuais de cálculo e discussões na hora de pagar.',
      tags: ['Flutter', 'Dart', 'Riverpod', 'Mobile', 'Offline First'],
      githubUrl: 'https://github.com/matheustsa/divide-ai',
      image: 'assets/divideai1.jpeg',
      images: [
        'assets/divideai1.jpeg',
        'assets/divideai2.jpeg',
      ],
      metrics: [
        { label: 'Precisão de Cálculo', value: '100%' },
        { label: 'Tempo de Rateio', value: '< 30s' },
        { label: 'Funcionamento Offline', value: '100%' },
      ],
    },
    {
      id: 'escudeiro',
      title: 'Escudeiro',
      subtitle: 'Assistente Multiplataforma para RPG de Mesa',
      summary:
        'Aplicativo multiplataforma para apoio a RPG, com gerenciamento de fichas de personagens, compêndio de regras e automatizacão de cálculos diversos.',
      overview:
        'Aplicativo de suporte para mestres e jogadores de RPG de mesa. Centraliza fichas dinâmicas de personagens, grimório de magias, inventário e cálculo automático de rolagens com modificadores de sistema.',
      challenge:
        'Suportar múltiplos sistemas de regras sem engessar a ficha do jogador, garantindo consulta rápida durante turnos dinâmicos de combate.',
      solution:
        'Interface multiplataforma com persistência local rápida, modelo flexível de atributos e cálculo em tempo real de modificadores, dados de dano e condições de combate.',
      results:
        'Diminuição de 70% no tempo gasto folheando livros de regras durante sessões ao vivo, mantendo o ritmo narrativo da partida.',
      tags: ['TypeScript', 'React', 'Multiplataforma', 'Offline First'],
      githubUrl: 'https://github.com/matheustsa',
      image: 'assets/escudeiro1.png',
      images: [
        'assets/escudeiro1.png',
        'assets/escudeiro2.png',
        'assets/escudeiro3.png',
        'assets/escudeiro4.png',
      ],
      metrics: [
        { label: 'Consulta a Regras', value: '-70%' },
        { label: 'Sistemas Suportados', value: 'D20 e Homebrew' },
        { label: 'Disponibilidade', value: 'Offline' },
      ],
    },
  ],

  en: [
    {
      id: 'stockspot',
      title: 'StockSpot',
      subtitle: 'Inventory Management & 2D Mapping',
      summary:
        'Inventory management system featuring product barcode scanning and interactive 2D map visualization.',
      overview:
        'Complete platform for physical and digital inventory control in warehouses. Combines high-speed barcode scanning with an interactive 2D floor plan for instant product location visibility.',
      challenge:
        'Seamlessly integrate real-time shelf mapping with barcode scanning, delivering instant reads on mobile and desktop without database bottlenecks.',
      solution:
        'Developed a React and Tailwind CSS SPA communicating with an Express TypeScript backend structured via Prisma ORM and SQLite, containerized with Docker.',
      results:
        '65% reduction in physical warehouse item search time and over 99.8% inventory tracking accuracy.',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Prisma', 'Docker', 'SQLite'],
      githubUrl: 'https://github.com/matheustsa/stockspot',
      image: 'assets/stockspot_dashboard.png',
      images: [
        'assets/stockspot_dashboard.png',
        'assets/stockspot_map.png',
        'assets/stockspot_tests.png',
      ],
      metrics: [
        { label: 'Search Time', value: '-65%' },
        { label: 'Inventory Accuracy', value: '99.8%' },
        { label: 'Scan Latency', value: '< 200ms' },
      ],
    },
    {
      id: 'divide-ai',
      title: 'Divide Aí',
      subtitle: 'Expense Tracking & Bill Splitting',
      summary:
        'Mobile app for personal consumption tracking with automated shared bill calculation.',
      overview:
        'Mobile application designed to simplify bill splitting among friends at bars and restaurants. Enables recording individual items, sharing dishes across subgroups, and accurately computing service fees down to the cent.',
      challenge:
        'Fairly calculate shared totals for mixed tables where specific items are divided among sub-groups, keeping user experience fluid and friction-free.',
      solution:
        'Engineered in Flutter using reactive Riverpod state management, precise mathematical rounding algorithms, and full offline-first functionality without requiring sign-in.',
      results:
        'Bill splitting completed in under 30 seconds, eliminating manual math errors and payment friction.',
      tags: ['Flutter', 'Dart', 'Riverpod', 'Mobile', 'Offline First'],
      githubUrl: 'https://github.com/matheustsa/divide-ai',
      image: 'assets/divideai1.jpeg',
      images: [
        'assets/divideai1.jpeg',
        'assets/divideai2.jpeg',
      ],
      metrics: [
        { label: 'Calculation Accuracy', value: '100%' },
        { label: 'Splitting Time', value: '< 30s' },
        { label: 'Offline Availability', value: '100%' },
      ],
    },
    {
      id: 'escudeiro',
      title: 'Escudeiro',
      subtitle: 'Cross-Platform Tabletop RPG Companion',
      summary:
        'Cross-platform companion app for tabletop RPGs featuring character sheet management, rule compendiums, and automated dice calculations.',
      overview:
        'Companion application built for tabletop RPG Game Masters and players. Centralizes dynamic character sheets, spellbooks, inventory tracking, and automated roll calculations with system modifiers.',
      challenge:
        'Support multiple rule systems without constraining custom character progression, providing rapid rule lookup during dynamic combat rounds.',
      solution:
        'Cross-platform interface with fast local persistence, flexible attribute modeling, and real-time computation of modifiers, damage dice, and tactical combat conditions.',
      results:
        '70% reduction in rulebook lookup time during live sessions, preserving seamless narrative pacing.',
      tags: ['TypeScript', 'React', 'Cross-Platform', 'Offline First'],
      githubUrl: 'https://github.com/matheustsa',
      image: 'assets/escudeiro1.png',
      images: [
        'assets/escudeiro1.png',
        'assets/escudeiro2.png',
        'assets/escudeiro3.png',
        'assets/escudeiro4.png',
      ],
      metrics: [
        { label: 'Rule Lookup Time', value: '-70%' },
        { label: 'Supported Systems', value: 'D20 & Homebrew' },
        { label: 'Availability', value: 'Offline' },
      ],
    },
  ],

  es: [
    {
      id: 'stockspot',
      title: 'StockSpot',
      subtitle: 'Gestión de Inventario y Mapeo 2D',
      summary:
        'Sistema para gestión de inventarios con escáner de códigos de productos y visualización en mapa interactivo 2D.',
      overview:
        'Plataforma integral para control físico y digital de inventario en almacenes. Combina un lector rápido de códigos de barras con un plano interactivo en 2D para la localización inmediata de cada artículo.',
      challenge:
        'Integrar el mapa de estanterías en 2D con el escáner de códigos en tiempo real, garantizando lecturas instantáneas en dispositivos móviles y de escritorio sin cuellos de botella en la base de datos.',
      solution:
        'Desarrollo de una SPA con React y Tailwind CSS en el cliente, comunicada con un backend Express en TypeScript mediante Prisma ORM y SQLite, empaquetado en contenedores Docker.',
      results:
        'Reducción del 65% en el tiempo de búsqueda física de productos y una precisión de inventario superior al 99.8%.',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Prisma', 'Docker', 'SQLite'],
      githubUrl: 'https://github.com/matheustsa/stockspot',
      image: 'assets/stockspot_dashboard.png',
      images: [
        'assets/stockspot_dashboard.png',
        'assets/stockspot_map.png',
        'assets/stockspot_tests.png',
      ],
      metrics: [
        { label: 'Tiempo de Búsqueda', value: '-65%' },
        { label: 'Precisión de Inventario', value: '99.8%' },
        { label: 'Lectura de Código', value: '< 200ms' },
      ],
    },
    {
      id: 'divide-ai',
      title: 'Divide Aí',
      subtitle: 'Control de Consumo y División de Cuentas',
      summary:
        'Aplicación móvil de control de consumo personal con cálculo automático de división de cuenta.',
      overview:
        'Aplicación móvil diseñada para simplificar la división de cuentas entre amigos en bares y restaurantes. Permite registrar consumos individuales, compartir platos entre subgrupos y calcular cargos de servicio con precisión al centavo.',
      challenge:
        'Calcular repartos equitativos en mesas con pedidos combinados donde ciertos productos se comparten entre subconjuntos de personas, manteniendo una interfaz simple y sin fricción.',
      solution:
        'Arquitectura en Flutter con gestión de estado reactiva mediante Riverpod, validación matemática con redondeo controlado y soporte offline integral sin necesidad de registro.',
      results:
        'División de cuentas en menos de 30 segundos, eliminando errores de cálculo manual y disputas al momento de pagar.',
      tags: ['Flutter', 'Dart', 'Riverpod', 'Mobile', 'Offline First'],
      githubUrl: 'https://github.com/matheustsa/divide-ai',
      image: 'assets/divideai1.jpeg',
      images: [
        'assets/divideai1.jpeg',
        'assets/divideai2.jpeg',
      ],
      metrics: [
        { label: 'Precisión de Cálculo', value: '100%' },
        { label: 'Tiempo de Reparto', value: '< 30s' },
        { label: 'Funcionamiento Offline', value: '100%' },
      ],
    },
    {
      id: 'escudeiro',
      title: 'Escudeiro',
      subtitle: 'Asistente Multiplataforma para RPG de Mesa',
      summary:
        'Aplicación multiplataforma de apoyo para RPG de mesa con hojas de personajes, compendio de reglas y cálculo automatizado.',
      overview:
        'Aplicación de asistencia para directores de juego y jugadores de RPG de mesa. Centraliza fichas dinámicas de personajes, grimorio de hechizos, inventario y cálculo automatizado de tiradas con modificadores de sistema.',
      challenge:
        'Soportar múltiples sistemas de reglas sin restringir la ficha del jugador, permitiendo consultas ultrarrápidas durante combates dinámicos.',
      solution:
        'Interfaz multiplataforma con persistencia local rápida, modelo flexible de atributos y cálculo en tiempo real de modificadores, dados de daño y estados de combate.',
      results:
        'Disminución del 70% en el tiempo dedicado a consultar manuales de reglas durante partidas en vivo, preservando el ritmo narrativo.',
      tags: ['TypeScript', 'React', 'Multiplataforma', 'Offline First'],
      githubUrl: 'https://github.com/matheustsa',
      image: 'assets/escudeiro1.png',
      images: [
        'assets/escudeiro1.png',
        'assets/escudeiro2.png',
        'assets/escudeiro3.png',
        'assets/escudeiro4.png',
      ],
      metrics: [
        { label: 'Consulta de Reglas', value: '-70%' },
        { label: 'Sistemas Soportados', value: 'D20 y Homebrew' },
        { label: 'Disponibilidad', value: 'Offline' },
      ],
    },
  ],
};

// Accessor functions with language support
export const getAuthorProfile = (lang: Language = 'pt'): AuthorProfile => {
  return profilesByLanguage[lang] || profilesByLanguage.pt;
};

export const getTechCategories = (lang: Language = 'pt'): TechCategory[] => {
  return techCategoriesByLanguage[lang] || techCategoriesByLanguage.pt;
};

export const getProjects = (lang: Language = 'pt'): Project[] => {
  return projectsByLanguage[lang] || projectsByLanguage.pt;
};

export const getProjectById = (id: string, lang: Language = 'pt'): Project | undefined => {
  const list = getProjects(lang);
  return list.find((project) => project.id === id);
};

// Backward-compatible defaults (Portuguese)
export const authorProfile: AuthorProfile = profilesByLanguage.pt;
export const techCategories: TechCategory[] = techCategoriesByLanguage.pt;
export const projects: Project[] = projectsByLanguage.pt;
