import styled from 'styled-components';
import Skeleton from './Skeleton';

const StyledTourSkeleton = styled.div`
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

const TourCardSkeleton = () => {
  return (
    <StyledTourSkeleton>
      <Skeleton height="240px" $borderRadius="12px" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          flex: 1,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <Skeleton width="80%" height="24px" />
          <Skeleton height="36px" />
          <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
            <Skeleton width="60px" height="18px" />
            <Skeleton width="60px" height="18px" />
          </div>
        </div>

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
          <Skeleton width="40%" height="24px" />
          <Skeleton width="25%" height="24px" />
        </div>
      </div>
    </StyledTourSkeleton>
  );
};

export default TourCardSkeleton;
