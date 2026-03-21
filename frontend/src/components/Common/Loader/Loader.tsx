import { RevolvingDot } from 'react-loader-spinner';

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
  const containerStyle: React.CSSProperties = isFullScreen
    ? {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
      }
    : {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        width: '100%',
      };

  return (
    <div style={containerStyle}>
      <RevolvingDot
        visible={true}
        height={height}
        width={width}
        color={color}
        ariaLabel="revolving-dot-loading"
      />
    </div>
  );
};
