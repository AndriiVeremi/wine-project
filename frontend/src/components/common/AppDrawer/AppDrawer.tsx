import { useDrawerStore } from '@/store/useDrawerStore';
import { Overlay, DrawerContainer } from './AppDrawer.styled';

export const AppDrawer = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, close } = useDrawerStore();

  return (
    <>
      {isOpen && <Overlay onClick={close} />}

      <DrawerContainer $open={isOpen}>{children}</DrawerContainer>
    </>
  );
};
