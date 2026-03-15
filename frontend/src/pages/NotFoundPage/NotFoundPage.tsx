import Container from '@/components/common/Container';
import NotFoundImg from '@/assets/404.png';
import { Link } from 'react-router-dom';
import MainButton from '@/components/buttons/MainButton';
import { NotFoundButtonWrapper, NotFoundImage, NotFoundWrapper } from './NotFoundPage.styled';

const NotFoundPage = () => {
  return (
    <Container>
      <NotFoundWrapper>
        <NotFoundImage src={NotFoundImg} alt="404" />

        <NotFoundButtonWrapper>
          <Link to="/">
            <MainButton style={{ textTransform: 'uppercase' }}>back to home</MainButton>
          </Link>
        </NotFoundButtonWrapper>
      </NotFoundWrapper>
    </Container>
  );
};

export default NotFoundPage;
