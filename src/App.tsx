import { ChallengeProvider } from './features/challenges/ChallengeContext';
import { ChallengesPage } from './features/challenges/ChallengesPage';
import './index.css'; // Keep global styles

function App() {
  return (
    <ChallengeProvider>
      <ChallengesPage />
    </ChallengeProvider>
  );
}

export default App;
