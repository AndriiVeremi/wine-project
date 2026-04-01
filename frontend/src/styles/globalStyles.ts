import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: var(--font-main), 'Montserrat-Fallback', sans-serif;
  }

  html {
    overflow-x: hidden;
    width: 100%;
    scrollbar-gutter: stable;
  }

  body {
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    color: var(--secondary-gray);
    background-color: var(--bg-main);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    width: 100%;
    position: relative;
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
    transition: var(--transition-fast);
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
    transition: var(--transition-fast);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-accent), sans-serif !important;
    color: var(--primary-wine);
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
    background-color: var(--white);
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--primary-wine);
    border-radius: 4px;
  }
`;
