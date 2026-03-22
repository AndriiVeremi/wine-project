import styled from 'styled-components';
import Skeleton from './Skeleton';

const StyledSkeletonCard = styled.div`
  width: 100%;
  background-color: var(--white);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  border: 1px solid #f0f0f0;
  box-sizing: border-box;
`;

const WineCardSkeleton = () => {
  return (
    <StyledSkeletonCard>
      <Skeleton height="310px" $borderRadius="12px" />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Skeleton width="60%" height="24px" />
        <Skeleton width="20%" height="24px" />
      </div>
      <Skeleton width="40%" height="18px" />
      <div style={{ display: 'flex', gap: '8px' }}>
        <Skeleton width="50px" height="24px" $borderRadius="6px" />
        <Skeleton width="50px" height="24px" $borderRadius="6px" />
      </div>
      <Skeleton height="40px" />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 'auto',
          paddingTop: '12px',
          borderTop: '1px solid #f0f0f0',
        }}
      >
        <Skeleton width="30%" height="24px" />
        <Skeleton width="25%" height="24px" />
      </div>
    </StyledSkeletonCard>
  );
};

export default WineCardSkeleton;
