import React from 'react';
import { FiPlus } from 'react-icons/fi';
import MainButton from '@/components/Buttons/MainButton';
import { EmptyStateWrapper, EmptyIconBox, EmptyTitle, EmptyText } from './TableManager.styled';

interface Props {
  icon?: React.ReactNode;
  title: string;
  text: string;
  onAction?: () => void;
}

const EmptyState = ({ icon, title, text, onAction }: Props) => {
  return (
    <EmptyStateWrapper>
      <EmptyIconBox>{icon}</EmptyIconBox>
      <EmptyTitle>{title}</EmptyTitle>
      <EmptyText>{text}</EmptyText>
      {onAction && (
        <div style={{ marginTop: '20px' }}>
          <MainButton type="button" onClick={onAction}>
            <FiPlus /> ADD NEW
          </MainButton>
        </div>
      )}
    </EmptyStateWrapper>
  );
};

export default EmptyState;
