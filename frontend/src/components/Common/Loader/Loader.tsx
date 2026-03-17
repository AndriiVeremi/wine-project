import { RevolvingDot } from 'react-loader-spinner';

interface LoaderProps {
  height?: number | string;
  width?: number | string;
  color?: string;
}

export const Loader: React.FC<LoaderProps> = ({ height = 80, width = 80, color = '#841013' }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
      }}
    >
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
