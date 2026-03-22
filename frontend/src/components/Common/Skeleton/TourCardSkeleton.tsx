import styled from 'styled-components';
import Skeleton from './Skeleton';

const StyledTourSkeleton = styled.div`
  width: 100%;
  background-color: var(--white);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #f0f0f0;
  box-sizing: border-box;
`;

const InfoPadding = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

const TourCardSkeleton = () => {
  return (
    <StyledTourSkeleton>
      <Skeleton height="240px" $borderRadius="0" />
      <InfoPadding>
        <Skeleton width="80%" height="24px" />
        <Skeleton height="60px" />

        <div style={{ display: 'flex', gap: '20px', margin: '5px 0' }}>
          <Skeleton width="60px" height="18px" />
          <Skeleton width="60px" height="18px" />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 'auto',
            paddingTop: '12px',
            borderTop: '1px solid #f0f0f0',
          }}
        >
          <Skeleton width="40%" height="24px" />
          <Skeleton width="25%" height="24px" />
        </div>
      </InfoPadding>
    </StyledTourSkeleton>
  );
};

export default TourCardSkeleton;
