import styled from 'styled-components';
import Skeleton from './Skeleton';

const StyledGrapeSkeleton = styled.div`
  position: relative;
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

const GrapeCardSkeleton = () => {
  return (
    <StyledGrapeSkeleton>
      <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
        <Skeleton width="40px" height="16px" $borderRadius="4px" />
      </div>
      <Skeleton height="310px" $borderRadius="12px" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          marginTop: '8px',
        }}
      >
        <Skeleton width="70%" height="24px" />
        <Skeleton width="50%" height="16px" />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '16px 0',
          padding: '8px 0',
          borderTop: '1px solid var(--tertiary-gray)',
          borderBottom: '1px solid var(--tertiary-gray)',
        }}
      >
        <Skeleton width="40px" height="30px" />
        <Skeleton width="40px" height="30px" />
        <Skeleton width="40px" height="30px" />
      </div>

      <Skeleton height="84px" />
    </StyledGrapeSkeleton>
  );
};

export default GrapeCardSkeleton;
