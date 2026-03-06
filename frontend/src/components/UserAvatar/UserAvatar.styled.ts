import styled from 'styled-components';

export const AvatarWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
`;

export const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--primary-wine);
`;

export const AvatarPlaceholder = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: var(--secondary-gray-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: var(--primary-gray-light);
  border: 2px solid var(--secondary-gray);
`;

export const AvatarUploadButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--primary-wine);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  border: 2px solid var(--white);
  padding: 0;
  outline: none;

  &:hover {
    background-color: var(--secondary-orange);
  }

  input {
    display: none;
  }

  svg {
    font-size: 18px;
  }
`;
