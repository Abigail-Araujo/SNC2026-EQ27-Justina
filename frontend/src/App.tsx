import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// --- NUEVOS IMPORTS: Providers y Notificaciones para la simulación 3D ---
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// --- IMPORTS ORIGINALES DEL EQUIPO (Intactos) ---
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import DashboardView from './views/DashboardView';
import ResultsView from './views/ResultsView';
import SimulationView from './views/SimulationView';
import SettingsView from './views/SettingsView';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

// Inicializamos el cliente de consultas (necesario para el QueryClientProvider)
const queryClient = new QueryClient();

function App() {
  return (

    // 1. Envolvemos todo con las "capas" necesarias para tu UI
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        
        {/* 2. Colocamos los Toasters a nivel global */}
        <Toaster />
        <Sonner />
        
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/register" element={<RegisterView />} />
            <Route path="/dashboard" element={<DashboardView />} />
            <Route path="/results" element={<ResultsView />} />
            
            {/* 3. MODIFICACIÓN: Agregamos /:organ? a la ruta que ya tenías */}
            <Route path="/simulation/:organ?" element={<SimulationView />} />
            
            <Route path="/settings" element={<SettingsView />} />
          </Routes>
        </Router>

      </TooltipProvider>
    </QueryClientProvider>

  );
}

export default App;