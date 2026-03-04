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
          credentials: 'include',
        });
        
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        // CORRECCIÓN: Aquí habia un error de consola que no estaba siendo manejado correctamente, ahora se captura y se muestra un mensaje de error claro.
        console.error("Fallo en la verificación de sesión:", error);
        setIsAuthenticated(false);
      }
    };
    verifyAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="w-12 h-12 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;