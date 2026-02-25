import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import DashboardView from './views/DashboardView';
import ResultsView from './views/ResultsView';
import SimulationView from './views/SimulationView';
import SettingsView from './views/SettingsView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path="/results" element={<ResultsView />} />
        <Route path="/simulation" element={<SimulationView />} />
        <Route path="/settings" element={<SettingsView />} />
      </Routes>
    </Router>
  );
}

export default App;
