import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 40px;
  justify-content: center;
  align-items: center;
`;

export const PaginationButton = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  color: var(--primary-gray);
  display: flex;
  align-items: center;
  gap: 6px;
  transition: var(--transition);

  &:disabled {
    opacity: 0.4;
  }
`;

export const PaginationPageButton = styled(PaginationButton)<{ $active: boolean }>`
  width: 32px;
  height: 32px;
  padding: 0;
  display: flex;
  text-align: center;
  justify-content: center;
  border-radius: 50%;

  background: ${({ $active }) => ($active ? 'var(--primary-wine)' : 'var(--white)')};

  color: ${({ $active }) => ($active ? 'var(--white)' : 'var(--primary-gray)')};

  &:hover {
    background: var(--primary-wine);
    color: var(--white);
  }
`;
