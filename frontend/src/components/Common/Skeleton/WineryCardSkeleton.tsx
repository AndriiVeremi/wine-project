import styled from 'styled-components';
import Skeleton from './Skeleton';

const StyledWinerySkeleton = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;
  height: 420px;
`;

const Content = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

const WineryCardSkeleton = () => {
  return (
    <StyledWinerySkeleton>
      <Skeleton height="200px" $borderRadius="0" />
      <Content>
        <Skeleton width="80%" height="24px" />
        <Skeleton width="40%" height="18px" />
        <Skeleton width="30%" height="18px" />
        <div style={{ marginTop: '5px' }}>
          <Skeleton height="60px" />
        </div>
        <Skeleton width="50%" height="18px" $margin="auto 0 0 0" />
      </Content>
    </StyledWinerySkeleton>
  );
};

export default WineryCardSkeleton;
