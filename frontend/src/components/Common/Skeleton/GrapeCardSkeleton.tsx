import styled from 'styled-components';
import Skeleton from './Skeleton';

const StyledGrapeSkeleton = styled.div`
  position: relative;
  width: 100%;
  background-color: var(--white);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  border: 1px solid #f0f0f0;
  box-sizing: border-box;
`;

const GrapeCardSkeleton = () => {
  return (
    <StyledGrapeSkeleton>
      <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
        <Skeleton width="40px" height="16px" $borderRadius="4px" />
      </div>
      <Skeleton height="200px" $borderRadius="8px" />
      <Skeleton width="70%" height="24px" $margin="8px 0 0 0" />
      <Skeleton width="50%" height="16px" />

      <div style={{ display: 'flex', gap: '15px', margin: '10px 0' }}>
        <Skeleton width="30px" height="30px" $borderRadius="50%" />
        <Skeleton width="30px" height="30px" $borderRadius="50%" />
        <Skeleton width="30px" height="30px" $borderRadius="50%" />
      </div>

      <Skeleton height="60px" />
    </StyledGrapeSkeleton>
  );
};

export default GrapeCardSkeleton;
