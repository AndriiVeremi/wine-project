import { RevolvingDot } from 'react-loader-spinner';
import { StyledLoaderContainer, LoaderWrapper } from './Loader.styled';

interface LoaderProps {
  height?: number | string;
  width?: number | string;
  color?: string;
  isFullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({
  height = 80,
  width = 80,
  color = '#841013',
  isFullScreen = true,
}) => {
  return (
    <StyledLoaderContainer $isFullScreen={isFullScreen}>
      <LoaderWrapper>
        <RevolvingDot
          visible={true}
          height={height}
          width={width}
          color={color}
          ariaLabel="revolving-dot-loading"
        />
      </LoaderWrapper>
    </StyledLoaderContainer>
  );
};
