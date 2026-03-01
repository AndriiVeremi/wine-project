import { StyledContainer } from '@/components/Container/Container.styled';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: Props) => {
  return <StyledContainer className={className}>{children}</StyledContainer>;
};

export default Container;
