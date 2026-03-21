import Container from '@/components/Common/Container';
import ContactsInfo from '@/components/User/ContactsInfo/ContactsInfo';
import styled from 'styled-components';

const PageWrapper = styled.div`
  padding: 60px 0;
  min-height: 400px;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #333;
  margin-bottom: 24px;
  text-align: center;
`;

const ContactsPage = () => {
  return (
    <Container>
      <PageWrapper>
        <Title>Our Team & Contacts</Title>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <ContactsInfo />
        </div>
      </PageWrapper>
    </Container>
  );
};

export default ContactsPage;
