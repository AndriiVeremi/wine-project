import styled from 'styled-components';
import Skeleton from './Skeleton';

const StyledSkeletonCard = styled.div`
  width: 100%;
  background-color: var(--white);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #f0f0f0;
  box-sizing: border-box;
`;

const SkeletonContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 20px;
`;

const WineCardSkeleton = () => {
  return (
    <StyledSkeletonCard>
      <SkeletonContent>
        <Skeleton height="310px" $borderRadius="12px" />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '8px',
          }}
        >
          <Skeleton width="60%" height="24px" />
          <Skeleton width="20%" height="24px" />
        </div>
        <Skeleton width="40%" height="18px" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          <Skeleton width="50px" height="24px" $borderRadius="6px" />
          <Skeleton width="50px" height="24px" $borderRadius="6px" />
        </div>
        <Skeleton height="40px" />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 'auto',
            paddingTop: '12px',
            borderTop: '1px solid var(--tertiary-gray)',
          }}
        >
          <Skeleton width="30%" height="24px" />
          <Skeleton width="25%" height="24px" />
        </div>
      </SkeletonContent>
    </StyledSkeletonCard>
  );
};

export default WineCardSkeleton;
