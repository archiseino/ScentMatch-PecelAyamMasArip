import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Onboarding from '../pages/OnBoading';
import RecommendationResults from '../pages/Recomendation';
import ChatbotCoCreation from '../pages/Chatbot';
import { useAppContext } from '../context/AppContext';

function ProtectedRoute({ element, requiredData }) {
  const appContext = useAppContext();
  const hasData = requiredData.every((key) => appContext[key]);
  return hasData ? element : <Navigate to='/' replace />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/onboarding' element={<Onboarding />} />

        <Route
          path='/results'
          element={
            <ProtectedRoute
              element={<RecommendationResults />}
              requiredData={['recommendation', 'userPreferences']}
            />
          }
        />

        <Route
          path='/cocreation'
          element={
            <ProtectedRoute
              element={<ChatbotCoCreation />}
              requiredData={['selectedPerfume']}
            />
          }
        />

        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
}
