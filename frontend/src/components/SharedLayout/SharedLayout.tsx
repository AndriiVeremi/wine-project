import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const SharedLayout = () => {
  return (
    <div className="app-layout">
      <Header />
      <main className="app-content">
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SharedLayout;
