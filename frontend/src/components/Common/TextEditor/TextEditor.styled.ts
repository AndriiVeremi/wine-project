import styled from 'styled-components';

export const StyledEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--tertiary-gray);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  background-color: var(--white);
  transition: var(--transition);
  margin-top: 8px;
  /* box-shadow removed */

  &:focus-within {
    border-color: var(--primary-wine);
    box-shadow: 0 0 0 3px rgba(132, 16, 19, 0.1);
  }
`;

export const StyledToolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  background-color: #fcfcfc;
  border-bottom: 1px solid var(--tertiary-gray);
  gap: 6px;
  align-items: center;

  .toolbar-group {
    display: flex;
    gap: 4px;
    padding: 0 6px;
    border-right: 1px solid var(--tertiary-gray);

    &:last-child {
      border-right: none;
    }
  }

  button {
    padding: 6px;
    border: 1px solid transparent;
    border-radius: var(--border-radius-sm);
    background-color: transparent;
    color: var(--secondary-gray);
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;

    &:hover {
      background-color: rgba(132, 16, 19, 0.05);
      color: var(--primary-wine);
    }

    &.is-active {
      background-color: var(--primary-wine);
      color: var(--white);
      border-color: var(--primary-wine);
    }

    &:disabled {
      opacity: 0.25;
      cursor: not-allowed;
    }

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export const StyledEditorContent = styled.div`
  padding: 18px;
  min-height: 220px;
  max-height: 550px;
  overflow-y: auto;
  color: var(--font-grey);

  .ProseMirror {
    outline: none;
    font-family: var(--font-main);
    font-size: 16px;
    line-height: 1.7;
    min-height: 180px;

    p {
      margin-bottom: 14px;
    }

    ul,
    ol {
      padding-left: 28px;
      margin-bottom: 14px;
    }

    li {
      margin-bottom: 6px;
    }

    h2 {
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--primary-wine);
      margin-top: 26px;
      margin-bottom: 14px;
    }

    h3 {
      font-size: 1.3rem;
      font-weight: 600;
      color: var(--primary-wine);
      margin-top: 22px;
      margin-bottom: 12px;
    }

    blockquote {
      border-left: 5px solid var(--primary-wine);
      padding: 14px 20px;
      margin: 20px 0;
      color: var(--font-grey);
      font-style: italic;
      background-color: rgba(132, 16, 19, 0.05);
      border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0;
    }
  }
`;

export const EditorLabel = styled.label`
  font-size: 15px;
  color: var(--primary-gray);
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
  letter-spacing: 0.01em;
  font-family: var(--font-main);
`;
