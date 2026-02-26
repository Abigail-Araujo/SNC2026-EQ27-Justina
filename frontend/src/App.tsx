import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import DashboardView from './views/DashboardView';
import ResultsView from './views/ResultsView';
import SimulationView from './views/SimulationView';
import SettingsView from './views/SettingsView';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        
        {/* Rutas protegidas */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardView /></ProtectedRoute>} />
        <Route path="/results" element={<ProtectedRoute><ResultsView /></ProtectedRoute>} />
        <Route path="/simulation" element={<ProtectedRoute><SimulationView /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsView /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
