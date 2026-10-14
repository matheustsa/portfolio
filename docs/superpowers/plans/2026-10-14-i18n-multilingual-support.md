# Internacionalização Multilíngue (i18n) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar suporte completo aos idiomas Português (`pt`), Inglês (`en`) e Espanhol (`es`) em todo o portfólio, com seletor visual na Navbar, persistência em localStorage e detecção automática via navegador.

**Architecture:** Sistema nativo em React Context (`LanguageContext`) e tipagem estrita no TypeScript com garantia de paridade de chaves em tempo de compilação. Dicionários de UI dedicados e dados de projetos/perfil mapeados por idioma.

**Tech Stack:** React 19, TypeScript 5.8, Tailwind CSS v4, Motion (motion/react), Lucide React, Vite.

**Spec:** `docs/superpowers/specs/2026-10-14-i18n-multilingual-support-design.md`

## Global Constraints

- Tipagem estrita: sem `any` desnecessário, 100% das chaves presentes nos 3 idiomas (`pt`, `en`, `es`).
- Zero dependências npm extras adicionadas (sem introduzir `i18next`).
- Persistência com chave `'portfolio-language'` no `localStorage`.
- Atualização dinâmica de `document.documentElement.lang`.
- Execução limpa de `npm run lint` (`tsc --noEmit`) e `npm run build`.

## Review Focus

1. Alternância de idioma com o Drawer de detalhes de projeto aberto: o projeto exibido deve atualizar seu conteúdo para o novo idioma imediatamente sem fechar ou quebrar.
2. Navegador em espanhol (`es-ES` ou `es-419`) ou inglês (`en-US` ou `en-GB`) acessando pela primeira vez: deve inicializar no respectivo idioma sem ação manual.
3. Clique fora ou tecla Escape com o menu de idioma aberto: o dropdown deve fechar adequadamente sem reter foco preso.
4. Paridade exata de todas as chaves nos dicionários: nenhuma chave `undefined` exibida em tela em qualquer idioma.
5. Responsividade no mobile: seletor de idioma visível e usável tanto na barra superior quanto no menu drawer lateral sem colisão com o toggle de tema.

---

### Task 1: Definição de Tipos e Dicionários de Tradução de UI

**Files:**
- Create: `src/i18n/types.ts`
- Create: `src/i18n/translations.ts`
- Create: `scripts/test-i18n-keys.ts`

**Interfaces:**
- Produces: `Language = 'pt' | 'en' | 'es'`
- Produces: `TranslationDictionary`
- Produces: `translations: Record<Language, TranslationDictionary>`

- [ ] **Step 1: Criar teste de paridade de chaves de tradução**
Criar `scripts/test-i18n-keys.ts` que carrega `translations` e valida recursivamente se `pt`, `en` e `es` têm exatamente as mesmas chaves e nenhum valor vazio.

- [ ] **Step 2: Executar teste e verificar que falha**
Run: `rtk npx tsx scripts/test-i18n-keys.ts`
Expected: FAIL (módulos ainda não criados).

- [ ] **Step 3: Criar `src/i18n/types.ts` e `src/i18n/translations.ts`**
Implementar as definições tipadas completas para `nav`, `hero`, `techStack`, `projects`, `projectDrawer`, `contact`, `footer`, `lightbox` em PT, EN e ES.

- [ ] **Step 4: Executar teste de validação de chaves e lint**
Run: `rtk npx tsx scripts/test-i18n-keys.ts && rtk npm run lint`
Expected: PASS (todas as chaves validadas e sem erros de TypeScript).

- [ ] **Step 5: Commit**
```bash
rtk git add src/i18n/ scripts/test-i18n-keys.ts
rtk git commit -m "feat(i18n): add type definitions and UI translations dictionary"
```

---

### Task 2: Provedor de Idioma (`LanguageContext`)

**Files:**
- Create: `src/context/LanguageContext.tsx`
- Modify: `src/App.tsx`
- Create: `scripts/test-language-resolver.ts`

**Interfaces:**
- Consumes: `Language`, `TranslationDictionary`, `translations`
- Produces: `LanguageProvider: React.FC<{ children: React.ReactNode }>`
- Produces: `useLanguage(): { language: Language, setLanguage: (l: Language) => void, t: TranslationDictionary }`

- [ ] **Step 1: Criar teste da lógica de resolução de idioma inicial**
Criar `scripts/test-language-resolver.ts` testando as regras:
- Salvo 'es' -> 'es'
- Sem salvo + navigator 'en-US' -> 'en'
- Sem salvo + navigator 'es-AR' -> 'es'
- Sem salvo + navigator 'pt-BR' ou outro -> 'pt'

- [ ] **Step 2: Executar teste e verificar que falha**
Run: `rtk npx tsx scripts/test-language-resolver.ts`
Expected: FAIL.

- [ ] **Step 3: Implementar `src/context/LanguageContext.tsx` e envolver `App.tsx`**
Implementar `resolveInitialLanguage()`, `LanguageProvider` com sincronização no `localStorage` e `document.documentElement.lang`, e o hook `useLanguage()`. Envolver o JSX em `App.tsx` com `<LanguageProvider>`.

- [ ] **Step 4: Executar teste de resolução e lint**
Run: `rtk npx tsx scripts/test-language-resolver.ts && rtk npm run lint`
Expected: PASS.

- [ ] **Step 5: Commit**
```bash
rtk git add src/context/LanguageContext.tsx src/App.tsx scripts/test-language-resolver.ts
rtk git commit -m "feat(i18n): create LanguageContext provider and resolution logic"
```

---

### Task 3: Tradução dos Dados do Perfil, Stack e Projetos

**Files:**
- Modify: `src/types/portfolio.ts`
- Modify: `src/data/portfolioData.ts`
- Create: `scripts/test-portfolio-data.ts`

**Interfaces:**
- Consumes: `Language`
- Produces: `getAuthorProfile(lang: Language): AuthorProfile`
- Produces: `getTechCategories(lang: Language): TechCategory[]`
- Produces: `getProjects(lang: Language): Project[]`
- Produces: `getProjectById(id: string, lang: Language): Project | undefined`

- [ ] **Step 1: Criar teste de validação de dados traduzidos**
Criar `scripts/test-portfolio-data.ts` que valida se para cada idioma (`pt`, `en`, `es`):
- `getAuthorProfile(lang)` possui bio, role e statusBadge traduzidos.
- `getProjects(lang)` retorna os 3 projetos com títulos, subtítulos, resumos, desafios, soluções, resultados e métricas traduzidas.

- [ ] **Step 2: Executar teste e verificar que falha**
Run: `rtk npx tsx scripts/test-portfolio-data.ts`
Expected: FAIL.

- [ ] **Step 3: Implementar conteúdo traduzido em `src/data/portfolioData.ts`**
Adicionar versões completas em PT, EN e ES para `StockSpot`, `Divide Aí`, `Escudeiro`, `authorProfile` e `techCategories`, mantendo compatibilidade retroativa para imports diretos com fallback padrão.

- [ ] **Step 4: Executar teste e lint**
Run: `rtk npx tsx scripts/test-portfolio-data.ts && rtk npm run lint`
Expected: PASS.

- [ ] **Step 5: Commit**
```bash
rtk git add src/data/portfolioData.ts scripts/test-portfolio-data.ts
rtk git commit -m "feat(i18n): add multilingual content for projects and profile"
```

---

### Task 4: Componente `LanguageSelector` e Integração na `Navbar`

**Files:**
- Create: `src/components/LanguageSelector.tsx`
- Modify: `src/components/Navbar.tsx`

**Interfaces:**
- Consumes: `useLanguage()`
- Produces: `<LanguageSelector />`

- [ ] **Step 1: Implementar o componente `LanguageSelector`**
Criar menu dropdown acessível com `motion/react`, suporte a clique fora, tecla `Escape`, exibindo `🇧🇷 PT`, `🇺🇸 EN` e `🇪🇸 ES`, com indicador de idioma selecionado e estilos compatíveis com o tema Sunset/Sunrise.

- [ ] **Step 2: Integrar o `LanguageSelector` na `Navbar`**
Adicionar o seletor ao lado do botão de tema na barra desktop e na barra móvel, e traduzir os links de navegação (`navItems`) e o botão CTA ("Falar Comigo" / "Let's Talk" / "Contáctame") via `useLanguage()`.

- [ ] **Step 3: Verificar build e tipagem**
Run: `rtk npm run lint && rtk npm run build`
Expected: PASS.

- [ ] **Step 4: Commit**
```bash
rtk git add src/components/LanguageSelector.tsx src/components/Navbar.tsx
rtk git commit -m "feat(i18n): implement LanguageSelector component and integrate in Navbar"
```

---

### Task 5: Tradução das Seções Principais (Hero, TechStack, ProjectsPreview, ProjectDetailDrawer)

**Files:**
- Modify: `src/components/HeroSection.tsx`
- Modify: `src/components/TechStackSection.tsx`
- Modify: `src/components/ProjectsPreviewSection.tsx`
- Modify: `src/components/ProjectDetailDrawer.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `useLanguage()`, `getAuthorProfile(lang)`, `getTechCategories(lang)`, `getProjects(lang)`, `getProjectById(id, lang)`

- [ ] **Step 1: Atualizar `HeroSection.tsx` e `TechStackSection.tsx`**
Consumir `useLanguage()`, obter perfil e categorias traduzidos do idioma ativo, traduzir botões, tooltips e chamadas de seção.

- [ ] **Step 2: Atualizar `ProjectsPreviewSection.tsx`**
Obter lista de projetos traduzidos via `getProjects(language)` e traduzir títulos e botões de ação do card.

- [ ] **Step 3: Atualizar `ProjectDetailDrawer.tsx` e sincronização no `App.tsx`**
Garantir que ao trocar o idioma com o drawer aberto, o projeto selecionado seja sincronizado via `getProjectById(selectedProject.id, language)`. Traduzir todos os títulos de abas e seções da gaveta.

- [ ] **Step 4: Verificar lint e build**
Run: `rtk npm run lint && rtk npm run build`
Expected: PASS.

- [ ] **Step 5: Commit**
```bash
rtk git add src/components/HeroSection.tsx src/components/TechStackSection.tsx src/components/ProjectsPreviewSection.tsx src/components/ProjectDetailDrawer.tsx src/App.tsx
rtk git commit -m "feat(i18n): update Hero, TechStack, ProjectsPreview and Drawer with translations"
```

---

### Task 6: Tradução de ContactSection, Footer, Lightbox e Validação E2E

**Files:**
- Modify: `src/components/ContactSection.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/components/ImageLightboxModal.tsx`

**Interfaces:**
- Consumes: `useLanguage()`

- [ ] **Step 1: Atualizar `ContactSection.tsx`**
Traduzir chamadas, textos de convite, botão de cópia de e-mail e toast de confirmação.

- [ ] **Step 2: Atualizar `Footer.tsx` e `ImageLightboxModal.tsx`**
Traduzir rodapé e mensagens de acessibilidade do visualizador de imagens ("Imagem X de Y", botões anterior/próximo).

- [ ] **Step 3: Limpeza de scripts auxiliares de teste**
Remover scripts temporários de validação se necessário ou mantê-los na pasta de testes / scripts do projeto.

- [ ] **Step 4: Verificação final de build e qualidade**
Run: `rtk npm run lint && rtk npm run build`
Expected: PASS (sem erros nem avisos).

- [ ] **Step 5: Commit**
```bash
rtk git add src/components/ContactSection.tsx src/components/Footer.tsx src/components/ImageLightboxModal.tsx
rtk git commit -m "feat(i18n): translate Contact, Footer, Lightbox and complete i18n support"
```
