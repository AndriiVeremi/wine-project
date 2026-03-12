import styled from 'styled-components';

export const LogoUploadWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

export const UploadTrigger = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 12px;
  background: #f8f8f8;
  border: 1px solid #eee;
  transition: all 0.2s ease;
  width: fit-content;

  &:hover {
    background: #f0f0f0;
    border-color: #ddd;
  }
`;

export const AvatarCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const CameraBadge = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background: var(--accent-color, #841013);
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid #fff;
`;

export const UploadText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #555;
`;

export const HiddenInput = styled.input`
  display: none;
`;
