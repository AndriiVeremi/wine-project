import MainButton from '@/components/buttons/MainButton';
import { useAuthStore } from '@/store/authStore';
import AIAssistant from '@/components/common/AIAssistant';

const HomePage = () => {
  const { user, openAuthModal } = useAuthStore();
  const aiAssistantEnabled = import.meta.env.VITE_AI_ASSISTANT_ENABLED === 'true';

  return (
    <div>
      {user && aiAssistantEnabled && <AIAssistant />}
      <h2>Home Page</h2>
      {!user && (
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <MainButton type="button" size="medium" onClick={() => openAuthModal('login')}>
            Login
          </MainButton>
          <MainButton type="button" size="medium" onClick={() => openAuthModal('register')}>
            Register
          </MainButton>
        </div>
      )}
    </div>
  );
};

export default HomePage;
