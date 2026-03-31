import { css } from 'styled-components';

export const htmlContentStyles = css`
  line-height: 1.7;
  word-break: break-word;

  p {
    margin-bottom: 1.2em;
    min-height: 1.2em;

    &:empty::before {
      content: '';
      display: inline-block;
    }
  }

  h2 {
    font-size: 1.6rem;
    color: var(--primary-wine);
    margin-top: 1.6em;
    margin-bottom: 0.8em;
    font-weight: 700;
  }

  h3 {
    font-size: 1.3rem;
    color: var(--primary-wine);
    margin-top: 1.4em;
    margin-bottom: 0.6em;
    font-weight: 600;
  }

  ul,
  ol {
    padding-left: 1.5em;
    margin-bottom: 1.2em;
    list-style-position: outside;

    li {
      margin-bottom: 0.5em;
      padding-left: 0.3em;
    }
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  blockquote {
    border-left: 4px solid var(--primary-wine);
    padding: 0.8em 1.5em;
    margin: 1.5em 0;
    font-style: italic;
    background: #fdf2f2;
    color: var(--font-grey);
    border-radius: 0 8px 8px 0;

    p:last-child {
      margin-bottom: 0;
    }
  }

  strong,
  b {
    font-weight: 700;
    color: var(--black);
  }

  em,
  i {
    font-style: italic;
  }

  /* Support for alignment */
  [style*='text-align: right'] {
    text-align: right;
  }
  [style*='text-align: center'] {
    text-align: center;
  }
  [style*='text-align: justify'] {
    text-align: justify;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 1.5em 0;
  }
`;
