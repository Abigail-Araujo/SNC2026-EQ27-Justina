import { useState } from "react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, Clock, Activity, User, 
  Calendar, Trash2, Award, ClipboardList 
} from "lucide-react";

interface SimulationResult {
  id: string;
  label: string;
  image: string;
  fecha: string;
  duracion: number;
  puntaje: number;
  signosVitales: string;
  cirujano: string;
}

const STORAGE_KEY = "simulation_results";

// Funciones de ayuda para formatear datos
const formatTime = (totalSeconds: number) => {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}m ${s}s`;
};

const getScoreStyles = (score: number) => {
  if (score >= 90) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]";
  if (score >= 80) return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.2)]";
  return "text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.2)]";
};

const Results: FC = () => {
  // SOLUCIÓN AL ERROR: Lazy initialization. 
  // Lee el localStorage directamente al iniciar el estado, sin necesidad de useEffect.
  const [results, setResults] = useState<SimulationResult[]>(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return [];
    }
  });

  // Función para borrar el historial
  const handleClearHistory = () => {
    if (window.confirm("¿Estás seguro de que deseas borrar todo el historial médico?")) {
      localStorage.removeItem(STORAGE_KEY);
      setResults([]);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-12 text-slate-200 font-sans selection:bg-cyan-900 selection:text-cyan-50">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER: Navegación y Título */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <Link 
              to="/dashboard" 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 mb-6 transition-colors font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver al Panel Principal
            </Link>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-600 flex items-center gap-3">
              <ClipboardList className="w-8 h-8 text-cyan-500" />
              Historial Quirúrgico
            </h2>
            <p className="mt-2 text-slate-800 font-medium">
              Registro detallado de simulaciones médicas completadas.
            </p>
          </div>

          {/* Botón Limpiar Historial */}
          {results.length > 0 && (
            <button 
              onClick={handleClearHistory}
              className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 hover:border-rose-400 text-rose-400 rounded-lg transition-all text-sm font-bold"
            >
              <Trash2 className="w-4 h-4" />
              Limpiar Registros
            </button>
          )}
        </div>

        {/* ESTADO VACÍO */}
        {results.length === 0 && (
          <div className="bg-slate-900 border border-slate-800 border-dashed rounded-3xl p-12 text-center flex flex-col items-center justify-center shadow-xl">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <ClipboardList className="w-10 h-10 text-slate-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-300 mb-2">Base de datos vacía</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              Aún no has completado ninguna simulación. Ve al Dashboard y finaliza un procedimiento para ver los resultados aquí.
            </p>
            <Link 
              to="/dashboard"
              className="mt-6 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(8,145,178,0.4)]"
            >
              Ir a Simulaciones
            </Link>
          </div>
        )}

        {/* GRID DE RESULTADOS */}
        {results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {results.map((r, index) => (
              <div
                key={index}
                className="group relative bg-slate-900 rounded-2xl border border-slate-800 p-1 shadow-lg hover:shadow-2xl hover:border-slate-700 transition-all duration-300 overflow-hidden"
              >
                {/* Overlay de brillo sutil en hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="p-5">
                  {/* Cabecera de la Tarjeta: Imagen y Puntaje */}
                  <div className="flex justify-between items-start mb-5 gap-4">
                    <div className="flex items-center gap-4">
                      {/* Thumbnail Redondeado */}
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 shrink-0">
                        <img 
                          src={r.image || "/placeholder-surgery.jpg"} 
                          alt={r.label} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-white leading-tight">
                          {r.label}
                        </h3>
                        <p className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-widest">
                          ID: {r.id}
                        </p>
                      </div>
                    </div>

                    {/* Badge de Puntaje Dinámico */}
                    <div className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-lg border ${getScoreStyles(r.puntaje)}`}>
                      <Award className="w-4 h-4 mb-0.5" />
                      <span className="text-lg font-black leading-none">{r.puntaje}</span>
                    </div>
                  </div>

                  {/* Grid de Metadatos */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {/* Fecha */}
                    <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/50 flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Fecha</span>
                      </div>
                      <span className="text-sm font-medium text-slate-300">
                        {new Date(r.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute:'2-digit' })}
                      </span>
                    </div>

                    {/* Duración */}
                    <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/50 flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Duración</span>
                      </div>
                      <span className="text-sm font-medium text-cyan-400 font-mono">
                        {formatTime(r.duracion)}
                      </span>
                    </div>

                    {/* Signos Vitales */}
                    <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/50 flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Activity className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Vitales</span>
                      </div>
                      <span className="text-sm font-medium text-slate-300 truncate">
                        {r.signosVitales}
                      </span>
                    </div>

                    {/* Cirujano */}
                    <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/50 flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <User className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Usuario</span>
                      </div>
                      <span className="text-sm font-medium text-slate-300 truncate">
                        {r.cirujano}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}; 

export default Results;