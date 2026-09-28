import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/Layout/MainLayout';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout>
                <Routes>
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
              </MainLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
