import { createGlobalStyle } from 'styled-components';
import type { Theme } from './theme';

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  :root {
    /* Colors - Wine */
    --primary-wine: ${({ theme }) => theme.colors.wine.primary};
    --secondary-wine: ${({ theme }) => theme.colors.wine.secondary};
    --wine-gradient: ${({ theme }) => theme.colors.wine.gradient};

    /* Colors - Gray */
    --primary-gray: ${({ theme }) => theme.colors.gray.primary};
    --secondary-gray: ${({ theme }) => theme.colors.gray.secondary};
    --tertiary-gray: ${({ theme }) => theme.colors.gray.tertiary};
    --shadow-gray: ${({ theme }) => theme.colors.gray.shadow};
    --font-grey: ${({ theme }) => theme.colors.gray.font};
    --footer-cream: ${({ theme }) => theme.colors.common.footerCream};
    --input-gray-text: ${({ theme }) => theme.colors.gray.input};
    --icon-gray: ${({ theme }) => theme.colors.gray.icon};

    /* Colors - Filter */
    --filter-border-color: ${({ theme }) => theme.colors.filter.border};
    --filter-active-bg: ${({ theme }) => theme.colors.filter.activeBg};

    /* Colors - Accent/Orange */
    --star-main: ${({ theme }) => theme.colors.accent.star};
    --primary-orange: ${({ theme }) => theme.colors.accent.orange};
    --secondary-orange: ${({ theme }) => theme.colors.accent.secondaryOrange};

    /* Basic Colors */
    --white: ${({ theme }) => theme.colors.common.white};
    --black: ${({ theme }) => theme.colors.common.black};
    --error: ${({ theme }) => theme.colors.common.error};
    --overlay: ${({ theme }) => theme.colors.common.overlay};
    --bg-main: ${({ theme }) => theme.colors.common.bgMain};

    /* Icon Colors */
    --brown-icon: ${({ theme }) => theme.colors.accent.brownIcon};
    --black-icon: ${({ theme }) => theme.colors.accent.blackIcon};

    /* Typography */
    --font-main: ${({ theme }) => theme.typography.fonts.main};
    --font-accent: ${({ theme }) => theme.typography.fonts.accent};

    /* Layout */
    --container-width: ${({ theme }) => theme.layout.containerWidth};
    --header-height: ${({ theme }) => theme.layout.headerHeight};
    --footer-height: ${({ theme }) => theme.layout.footerHeight};

    /* Spacing */
    --space-xs: ${({ theme }) => theme.spacing.xs};
    --space-sm: ${({ theme }) => theme.spacing.sm};
    --space-md: ${({ theme }) => theme.spacing.md};
    --space-lg: ${({ theme }) => theme.spacing.lg};
    --space-xl: ${({ theme }) => theme.spacing.xl};

    /* Effects */
    --transition: ${({ theme }) => theme.effects.transition};
    --transition-fast: ${({ theme }) => theme.effects.transitionFast};
    --transition-smooth: ${({ theme }) => theme.effects.transitionSmooth};
    --main-shadow: ${({ theme }) => theme.effects.shadow.main};
    --modal-shadow: ${({ theme }) => theme.effects.shadow.modal};
    --border-radius-sm: ${({ theme }) => theme.effects.borderRadius.sm};
    --border-radius-md: ${({ theme }) => theme.effects.borderRadius.md};
    --border-radius-lg: ${({ theme }) => theme.effects.borderRadius.lg};
    --border-radius-in: ${({ theme }) => theme.effects.borderRadius.in};
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.typography.fonts.main}, 'Montserrat-Fallback', sans-serif;
  }

  html {
    scroll-behavior: smooth;
    overflow-x: hidden;
    width: 100%;
    scrollbar-gutter: stable;
  }

  html.no-scroll {
    overflow: hidden;
  }

  body {
    font-size: ${({ theme }) => theme.typography.sizes.base};
    font-weight: 400;
    font-style: normal;
    color: ${({ theme }) => theme.colors.gray.secondary};
    background-color: ${({ theme }) => theme.colors.common.bgMain};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    width: 100%;
    position: relative;
  }

  body.no-scroll {
    overflow: hidden;
    height: 100vh;
    touch-action: none;

    @media (min-width: 1440px) {
      padding-right: 5px;
    }
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  ul, ol {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: ${({ theme }) => theme.effects.transitionFast};
  }

  button, input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    background: none;
  }

  button {
    cursor: pointer;
    transition: ${({ theme }) => theme.effects.transitionFast};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.fonts.accent}, sans-serif !important;
    color: ${({ theme }) => theme.colors.wine.primary};
    font-weight: 600;
  }
  
  input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.common.white};
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.wine.primary};
    border-radius: 4px;
  }
`;
