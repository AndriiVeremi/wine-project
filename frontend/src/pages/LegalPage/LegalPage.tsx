import Container from '@/components/Common/Container';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const Wrapper = styled.div`
  padding: 60px 0;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  color: #333;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #841013;
  margin-bottom: 24px;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

const ContentText = styled.p`
  font-size: 18px;
  color: #444;
`;

const LegalPage = () => {
  const { pathname } = useLocation();

  const getContent = () => {
    if (pathname.includes('privacy')) {
      return {
        title: 'Privacy Policy',
        content:
          'At Wine Discovery, we take your privacy seriously. This is an educational project. Any personal data collected (such as your email address during registration) is used exclusively for authentication purposes via Firebase. We do not sell, trade, or otherwise transfer your information to third parties.',
      };
    }
    if (pathname.includes('terms')) {
      return {
        title: 'Terms of Use',
        content:
          'By accessing this website, you acknowledge that Wine Discovery is a student project created for learning purposes. The information provided about wineries, wines, and tours is illustrative. You agree to use this platform responsibly and for personal exploration of Georgian wine culture only.',
      };
    }
    return {
      title: 'Cookies Policy',
      content:
        'We use essential cookies to ensure the website functions correctly, such as keeping you logged into your account and remembering your site preferences. We do not use any tracking or advertising cookies. By using our site, you agree to the use of these necessary technical cookies.',
    };
  };

  const { title, content } = getContent();

  return (
    <Container>
      <Wrapper>
        <Title>{title}</Title>
        <Section>
          <ContentText>{content}</ContentText>
          <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <p style={{ color: '#888', fontSize: '14px' }}>
              <strong>Project:</strong> Wine Discovery (Educational Student Project)
              <br />
              <strong>Last updated:</strong> March 21, 2026
              <br />
              <strong>Contact:</strong>{' '}
              <a href="mailto:dashuk10@gmail.com" style={{ color: '#841013' }}>
                dashuk10@gmail.com
              </a>
            </p>
          </div>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default LegalPage;
