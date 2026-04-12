import { FaGithub, FaEnvelope } from 'react-icons/fa';
import {
  ListContainer,
  MemberRow,
  LeftSection,
  AvatarCircle,
  Info,
  MemberName,
  MemberRole,
  ActionSection,
  SocialLink,
} from './ContactsInfo.styles';

const teamMembers = [
  {
    name: 'Andrii Veremii',
    role: 'Team Lead, Scrum Master, Backend Developer, Frontend Developer',
    github: 'https://github.com/AndriiVeremi',
    email: 'dashuk10@gmail.com',
    initials: 'AV',
  },
  {
    name: 'Andrii Popov',
    role: 'Backend Developer, Frontend Developer, QA Engineer',
    github: 'https://github.com/Andrii0207',
    email: 'Popov.Andrey80@gmail.com',
    initials: 'AP',
  },
  {
    name: 'Vladyslav Mazurkevych',
    role: 'Backend Developer, Frontend Developer, QA Engineer',
    github: 'https://github.com/mazurkevych30',
    email: 'vladmazurkevych@gmail.com',
    initials: 'VM',
  },
  {
    name: 'Ihor Dykyi',
    role: 'UI/UX Designer, QA Engineer, Project Manager, Backend Developer, Frontend Developer',
    github: 'https://github.com/jure-s',
    email: 'registr@agro.li',
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
                aria-label="GitHub Profile"
              >
                <FaGithub />
              </SocialLink>
              <SocialLink href={`mailto:${member.email}`} aria-label="Send Email">
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
