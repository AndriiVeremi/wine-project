import { BadgeWrapper } from './VIPBadge.styled';

interface VIPBadgeProps {
  label?: string;
  size?: number;
  bgColor?: string;
  textColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

const VIPBadge = ({
  label = 'VIP',
  size = 40,
  bgColor = 'var(--primary-wine)',
  textColor = 'var(--white)',
  className,
  style,
}: VIPBadgeProps) => {
  return (
    <BadgeWrapper $size={size} $bg={bgColor} $color={textColor} className={className} style={style}>
      {label}
    </BadgeWrapper>
  );
};

export default VIPBadge;
