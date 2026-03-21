import Container from '@/components/Common/Container';
import NotFoundImg from '@/assets/404.webp';
import { Link } from 'react-router-dom';
import MainButton from '@/components/Buttons/MainButton';
import { NotFoundButtonWrapper, NotFoundImage, NotFoundWrapper } from './NotFoundPage.styled';

const NotFoundPage = () => {
  return (
    <Container>
      <NotFoundWrapper>
        <NotFoundImage src={NotFoundImg} alt="404" />

        <NotFoundButtonWrapper>
          <Link to="/">
            <MainButton>back to home</MainButton>
          </Link>
        </NotFoundButtonWrapper>
      </NotFoundWrapper>
    </Container>
  );
};

export default NotFoundPage;
