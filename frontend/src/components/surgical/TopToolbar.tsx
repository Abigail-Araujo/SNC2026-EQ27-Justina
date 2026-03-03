import { Settings, Save, Play, Pause, SkipForward, RotateCcw, LayoutDashboard } from "lucide-react";
import { useSimulation } from "../../contexts/SimulationContext";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useNavigate } from "react-router-dom"; // IMPORTANTE: Hook para navegar

function formatTime(totalSeconds: number) {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return hrs > 0
    ? `${pad(hrs)}:${pad(mins)}:${pad(secs)}`
    : `${pad(mins)}:${pad(secs)}`;
}

export function TopToolbar() {
  const { isPlaying, togglePlay, resetTimer, skipForward, elapsedSeconds } = useSimulation();
  const navigate = useNavigate(); // Inicializamos el router

  // Clases base para los botones circulares/cuadrados
  const btnStyle = "flex items-center justify-center w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-cyan-400 hover:border-cyan-500/50 transition-all";

  return (
    <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/70 shadow-2xl rounded-xl px-5 py-3 flex items-center justify-between select-none">
      
      {/* IZQUIERDA: Info de Simulación y Estado */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-md border border-slate-700/50">
          <div 
            className={`w-2 h-2 rounded-full transition-colors ${
              isPlaying 
                ? "bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" 
                : "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
            }`} 
          />
          <span className="font-mono text-[11px] uppercase tracking-widest text-slate-300 font-semibold">
            {isPlaying ? "En curso" : "Pausado"}
          </span>
        </div>
        
        <div className="h-5 w-px bg-slate-700" /> {/* Separador visual */}
        
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
            T. Qx
          </span>
          <span className="font-mono text-lg font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
            {formatTime(elapsedSeconds)}
          </span>
        </div>
      </div>

      {/* CENTRO: Controles de Reproducción / Tiempo */}
      <div className="flex items-center gap-2 bg-slate-800/40 p-1 rounded-xl border border-slate-700/30">
        <Tooltip>
          <TooltipTrigger asChild>
            <button onClick={resetTimer} className={btnStyle}>
              <RotateCcw className="w-4 h-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent className="glass-panel border-white/5">Reiniciar</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              onClick={togglePlay} 
              className={`flex items-center justify-center w-11 h-11 rounded-lg transition-all ${
                isPlaying 
                  ? "bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]" 
                  : "bg-slate-700 border border-slate-600 text-slate-200 hover:bg-slate-600"
              }`}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
            </button>
          </TooltipTrigger>
          <TooltipContent className="glass-panel border-white/5">
            {isPlaying ? "Pausar Simulación" : "Iniciar Simulación"}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button onClick={skipForward} className={btnStyle}>
              <SkipForward className="w-4 h-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent className="glass-panel border-white/5">+30 Segundos</TooltipContent>
        </Tooltip>
      </div>

      {/* DERECHA: Acciones y Navegación */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <button className={btnStyle}>
                <Save className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="glass-panel border-white/5">Guardar Progreso</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <button className={btnStyle}>
                <Settings className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="glass-panel border-white/5">Ajustes</TooltipContent>
          </Tooltip>
        </div>

        <div className="h-5 w-px bg-slate-700 mx-1" /> {/* Separador */}

        {/* BOTÓN DASHBOARD (El nuevo botón solicitado) */}
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 rounded-lg transition-all shadow-[0_0_10px_rgba(34,211,238,0.1)] hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span className="text-xs uppercase tracking-wider font-bold">Dashboard</span>
        </button>
      </div>

    </div>
  );
}