import styled from 'styled-components';
import { FaGithub, FaEnvelope } from 'react-icons/fa';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
`;

const MemberRow = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 16px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;
  border: 1px solid transparent;

  &:hover {
    border-color: #841013;
    transform: translateX(5px);
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const AvatarCircle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #841013;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  flex-shrink: 0;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const MemberName = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

const MemberRole = styled.p`
  margin: 0;
  color: #666;
  font-size: 13px;
  line-height: 1.4;
`;

const ActionSection = styled.div`
  display: flex;
  gap: 16px;
`;

const SocialLink = styled.a`
  color: #333;
  font-size: 22px;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;

  &:hover {
    color: #841013;
  }
`;

const teamMembers = [
  {
    name: 'Andrii Veremii',
    role: 'Team Lead, Scrum Master, Backend Developer, Frontend Developer',
    github: 'https://github.com/AndriiVeremii',
    initials: 'AV',
  },
  {
    name: 'Andrii Popov',
    role: 'Backend Developer, Frontend Developer',
    github: 'https://github.com/Andrii0207',
    initials: 'AP',
  },
  {
    name: 'Vladyslav Mazurkevych',
    role: 'Backend Developer, Frontend Developer',
    github: 'https://github.com/mazurkevych30',
    initials: 'VM',
  },
  {
    name: 'Ihor Dykyi',
    role: 'UI/UX Designer, QA Engineer, Project Manager, Backend Developer, Frontend Developer',
    github: 'https://github.com/jure-s',
    initials: 'ID',
  },
];

const ContactsInfo = () => {
  return (
    <div>
      <p style={{ color: '#666', marginBottom: '24px' }}>
        Meet the professional team behind the Wine Project.
      </p>
      <ListContainer>
        {teamMembers.map((member) => (
          <MemberRow key={member.github}>
            <LeftSection>
              <AvatarCircle>{member.initials}</AvatarCircle>
              <Info>
                <MemberName>{member.name}</MemberName>
                <MemberRole>{member.role}</MemberRole>
              </Info>
            </LeftSection>
            <ActionSection>
              <SocialLink
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub Profile"
              >
                <FaGithub />
              </SocialLink>
              <SocialLink href={`mailto:dashuk10@gmail.com`} title="Send Email">
                <FaEnvelope />
              </SocialLink>
            </ActionSection>
          </MemberRow>
        ))}
      </ListContainer>
    </div>
  );
};

export default ContactsInfo;
