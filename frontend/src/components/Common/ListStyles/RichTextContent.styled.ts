import styled, { css } from 'styled-components';

export const richTextStyles = css`
  font-family: var(--font-main);
  line-height: 1.6;
  color: var(--primary-gray);
  overflow-wrap: break-word;
  word-break: break-word;

  p {
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  blockquote {
    border-left: 4px solid var(--primary-wine, #841013);
    background: #f8fafc;
    padding: 16px 24px;
    margin: 24px 0;
    font-style: italic;
    border-radius: 0 8px 8px 0;
    color: #475569;

    p {
      margin-bottom: 0;
    }
  }

  ul {
    margin: 16px 0;
    padding-left: 24px;
    list-style-type: disc;
  }

  ol {
    margin: 16px 0;
    padding-left: 24px;
    list-style-type: decimal;
  }

  li {
    margin-bottom: 8px;
  }

  strong {
    font-weight: 700;
    color: var(--black, #1e293b);
  }

  h2, h3 {
    margin: 24px 0 16px 0;
    color: var(--black, #1e293b);
    line-height: 1.2;
  }
`;

export const RichTextContent = styled.div`
  ${richTextStyles}
`;
