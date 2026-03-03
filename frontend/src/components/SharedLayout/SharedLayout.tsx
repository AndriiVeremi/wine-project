import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LayoutContainer, Content } from './SharedLayout.styled';

const SharedLayout = () => {
  return (
    <LayoutContainer>
      <Header />
      <Content className="app-content">
        <div className="content-wrapper">
          <Outlet />
        </div>
      </Content>
      <Footer />
    </LayoutContainer>
  );
};

export default SharedLayout;
