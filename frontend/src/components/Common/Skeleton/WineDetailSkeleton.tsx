import styled from 'styled-components';
import Skeleton from './Skeleton';

const StyledDetailSkeleton = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  margin-top: 40px;

  @media (min-width: 1024px) {
    grid-template-columns: 450px 1fr;
  }
`;

const WineDetailSkeleton = () => {
  return (
    <div style={{ padding: '20px 0' }}>
      <StyledDetailSkeleton>
        {/* Image side */}
        <Skeleton height="500px" $borderRadius="20px" />

        {/* Info side */}
        <div>
          <Skeleton width="60%" height="48px" $margin="0 0 20px 0" />
          <Skeleton width="40%" height="24px" $margin="0 0 15px 0" />
          <Skeleton width="30%" height="24px" $margin="0 0 30px 0" />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} height="60px" $borderRadius="12px" />
            ))}
          </div>
        </div>
      </StyledDetailSkeleton>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '20px', margin: '40px 0 20px 0' }}>
        <Skeleton width="120px" height="40px" $borderRadius="30px" />
        <Skeleton width="120px" height="40px" $borderRadius="30px" />
      </div>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <Skeleton width="100%" height="20px" />
        <Skeleton width="100%" height="20px" />
        <Skeleton width="80%" height="20px" />
        <Skeleton width="90%" height="20px" />
      </div>
    </div>
  );
};

export default WineDetailSkeleton;
