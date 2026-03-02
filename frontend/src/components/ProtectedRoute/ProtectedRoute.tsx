import { useEffect, useState, type FC, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/auth/verify', {
          method: 'GET',
          // Asegura que las cookies seguras (HttpOnly) se manden en la petición al servidor
          credentials: 'include',
        });
        
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    verifyAuth();
  }, []);

  // Si aún no ha comprobado, mostramos algo vacío o de carga
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 rounded-full border-4 border-cyan-800 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  // Si verificó y no está logueado, expulsa al /login
  if (isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }

  // Si verificó y está correcto, dibuja el componente (dashboard, options, etc)
  return <>{children}</>;
};

export default ProtectedRoute;
