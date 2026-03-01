import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* Reset */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-main);
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    color: var(--secondary-gray);
    background-color: var(--bg-main);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
    transition: var(--transition);
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background-color: transparent;
    transition: var(--transition);
  }

  input, textarea, select {
    font-family: inherit;
    outline: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-accent);
    color: var(--primary-wine);
    font-weight: 500;
  }

  /* Scrollbar */
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
