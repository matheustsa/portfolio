# Especificação Técnica: Internacionalização Multilíngue (i18n) para Portfólio

**Data:** 2026-10-14  
**Status:** Aprovado para Planejamento  
**Autor:** Antigravity & Matheus Abella  

---

## 1. Contexto e Objetivos

O portfólio de Matheus "Lekod" Abella atualmente possui todo o seu conteúdo e interface em Português do Brasil (pt-BR). Para ampliar o alcance internacional profissional perante recrutadores e clientes externos, este projeto introduz suporte nativo a 3 idiomas:
- **Português (`pt`)**
- **Inglês (`en`)**
- **Espanhol (`es`)**

### Objetivos Principais:
1. Oferecer um seletor visual de idioma na barra de navegação superior (`Navbar`), harmonizado com a estética existente do tema (Sunset / Sunrise).
2. Prover tradução completa de toda a interface do usuário e de todo o conteúdo dos projetos (`StockSpot`, `Divide Aí`, `Escudeiro`), além do perfil do autor e stack tecnológica.
3. Garantir persistência de preferência via `localStorage` com detecção inicial automática pelo navegador (`navigator.language`).
4. Manter o bundle leve, com zero dependências externas pesadas, aproveitando tipagem estrita no TypeScript.

---

## 2. Arquitetura do Sistema

```
src/
├── context/
│   └── LanguageContext.tsx       # Contexto React com linguagem ativa e função de troca
├── i18n/
│   ├── types.ts                  # Definições de tipos (Language, TranslationDictionary)
│   └── translations.ts           # Dicionários de strings de interface (PT, EN, ES)
├── data/
│   └── portfolioData.ts          # Dados dos projetos, perfil e stack traduzidos por idioma
├── components/
│   ├── LanguageSelector.tsx      # Dropdown interativo de seleção de idioma
│   ├── Navbar.tsx                # Integração do LanguageSelector (desktop + mobile)
│   ├── HeroSection.tsx           # Textos dinâmicos baseados no idioma ativo
│   ├── TechStackSection.tsx      # Títulos e categorias traduzidos
│   ├── ProjectsPreviewSection.tsx# Seção de projetos com textos traduzidos
│   ├── ProjectDetailDrawer.tsx   # Gaveta de detalhes com projeto no idioma ativo
│   ├── ContactSection.tsx        # Seção de contato e toasts traduzidos
│   ├── Footer.tsx                # Rodapé traduzido
│   └── ImageLightboxModal.tsx    # Contadores e acessibilidade traduzidos
```

### 2.1 Resolução e Persistência de Idioma
1. Chave no `localStorage`: `'portfolio-language'`.
2. Se houver valor salvo (`'pt' | 'en' | 'es'`), usá-lo.
3. Se não houver, inspecionar `navigator.language`:
   - Começa com `'es'` -> `'es'`
   - Começa com `'en'` -> `'en'`
   - Padrão geral -> `'pt'`
4. Ao trocar de idioma:
   - Atualizar o estado do React.
   - Salvar a nova escolha no `localStorage`.
   - Atualizar o atributo `lang` no elemento raiz HTML: `document.documentElement.lang = language`.

---

## 3. Especificação dos Componentes

### 3.1 `LanguageSelector` (`src/components/LanguageSelector.tsx`)
- **Gatilho**:
  - Botão de altura `h-10`, bordas `rounded-xl`, combinando com o botão do tema.
  - Exibe a bandeira e código do idioma ativo (ex: `🇧🇷 PT`, `🇺🇸 EN`, `🇪🇸 ES`) e um chevron.
  - Acessível com `aria-expanded`, `aria-haspopup="listbox"` e controle de foco por teclado.
- **Menu Dropdown**:
  - Lista com os 3 idiomas disponíveis com suas respectivas bandeiras e nomes completos:
    - Português (PT)
    - English (EN)
    - Español (ES)
  - Animação de entrada e saída com `motion/react`.
  - Fecha automaticamente ao selecionar, ao clicar fora (`click outside`) ou ao pressionar a tecla `Escape`.

### 3.2 `Navbar` (`src/components/Navbar.tsx`)
- Renderiza o `LanguageSelector` ao lado do botão de alternância do tema Sunset/Sunrise.
- No menu mobile, exibe o seletor também de forma acessível para facilitar o uso em dispositivos menores.
- Atualiza os itens do menu de navegação conforme o idioma ativo:
  - PT: Sobre, Stack, Projetos, Contato | Falar Comigo
  - EN: About, Stack, Projects, Contact | Let's Talk
  - ES: Sobre mí, Stack, Proyectos, Contacto | Contáctame

---

## 4. Estrutura de Dados e Traduções

### 4.1 Tipagem Estrita
```typescript
export type Language = 'pt' | 'en' | 'es';

export interface TranslationDictionary {
  nav: {
    about: string;
    stack: string;
    projects: string;
    contact: string;
    cta: string;
  };
  hero: {
    statusBadge: string;
    greeting: string;
    role: string;
    viewProjects: string;
    contactMe: string;
    locationTooltip: string;
  };
  techStack: {
    badge: string;
    title: string;
    description: string;
  };
  projects: {
    badge: string;
    title: string;
    subtitle: string;
    viewDetails: string;
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
  };
  contact: {
    badge: string;
    title: string;
    description: string;
    copyEmail: string;
    emailCopied: string;
  };
  footer: {
    builtWith: string;
    rights: string;
  };
  lightbox: {
    imageOf: (current: number, total: number) => string;
    close: string;
    previous: string;
    next: string;
  };
}
```

### 4.2 Conteúdo dos Projetos e Perfil
Cada projeto terá seus textos traduzidos mantendo rigor técnico:
- **StockSpot**: Termos como "Gestão de Estoque & Mapeamento 2D" / "Inventory Management & 2D Mapping" / "Gestión de Inventario y Mapeo 2D".
- **Divide Aí**: "Controle de Consumo & Rateio de Contas" / "Expense Tracking & Bill Splitting" / "Control de Consumo y División de Cuentas".
- **Escudeiro**: "Assistente Multiplataforma para RPG de Mesa" / "Cross-Platform Tabletop RPG Companion" / "Asistente Multiplataforma para RPG de Mesa".

---

## 5. Garantia de Qualidade e Critérios de Sucesso

1. **Validação de Tipos**: `npm run lint` (`tsc --noEmit`) deve passar sem nenhum erro de tipo.
2. **Build de Produção**: `npm run build` deve compilar perfeitamente sem avisos ou falhas.
3. **Reatividade e Persistência**:
   - Alterar o idioma deve atualizar instantaneamente toda a página sem recarregar o navegador.
   - O projeto atualmente aberto no Drawer deve ter seus textos atualizados de imediato quando a língua for trocada.
   - Recarregar a página mantém o idioma selecionado salvo.
   - Navegadores com preferência em inglês ou espanhol devem abrir por padrão no respectivo idioma na primeira visita.
