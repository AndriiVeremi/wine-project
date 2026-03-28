import styled from 'styled-components';
import Skeleton from './Skeleton';

const StyledWinerySkeleton = styled.div`
  background: white;
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid #f0f0f0;
  height: 100%;
  box-sizing: border-box;
`;

const WineryCardSkeleton = () => {
  return (
    <StyledWinerySkeleton>
      <Skeleton height="300px" $borderRadius="12px" />
      <div style={{ marginTop: '-4px' }}>
        <Skeleton width="100px" height="16px" />
      </div>
      <Skeleton width="80%" height="24px" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Skeleton width="60%" height="18px" />
        <Skeleton width="50%" height="18px" />
      </div>
      <Skeleton height="105px" />
    </StyledWinerySkeleton>
  );
};

export default WineryCardSkeleton;
