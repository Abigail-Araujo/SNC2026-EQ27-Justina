import {
  Move,
  ZoomIn,
  RotateCcw,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useSimulation } from "../../contexts/SimulationContext";

const instruments = [
  { 
    id: "gancho",
    img: "/instruments/gancho-cauterizador.png", 
    label: "Gancho",
    fullName: "Gancho Cauterizador Monopolar",
    shortcut: "1" 
  },
  { 
    id: "tijeras",
    img: "/instruments/pinza-fenestrada.png", 
    label: "Pinza", 
    fullName: "Pinza Fenestrada de Agarre", 
    shortcut: "2" 
  },
  { 
    id: "suctor",
    img: "/instruments/suctor.png", 
    label: "Suctor", 
    fullName: "Suctor / Irrigador", 
    shortcut: "3" 
  },
  { 
    id: "sutura",
    img: "/instruments/porta-agujas.png", 
    label: "Sutura", 
    fullName: "Porta-agujas con Aguja Curva", 
    shortcut: "4" 
  },
];

const viewTools = [
  { id: "move", icon: Move, label: "Mover" },
  { id: "zoom", icon: ZoomIn, label: "Zoom" },
  { id: "reset", icon: RotateCcw, label: "Resetear vista" },
];

export function InstrumentToolbar() {
  const { activeInstrument, setActiveInstrument, activeViewTool, setActiveViewTool, resetView } =
    useSimulation();

  const handleViewTool = (id: string) => {
    if (id === "reset") {
      resetView();
    } else {
      setActiveViewTool(id);
    }
  };

const handleInstrumentClick = (id: string) => {
    if (activeInstrument === id) {
      
      setActiveInstrument(""); 
    } else {
      
      setActiveViewTool(""); 
      setActiveInstrument(id);
    }
  };

  return (
    // Panel flotante con estilo HUD (fondo slate oscuro, blur, borde sutil)
    <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/70 shadow-2xl rounded-xl p-3 flex flex-col gap-3 animate-slide-up w-24 items-center select-none">
      
      {/* SECCIÓN: EQUIPO QUIRÚRGICO */}
      <div className="w-full flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">
          Equipo
        </span>

        {instruments.map((inst) => (
          <Tooltip key={inst.id}>
            <TooltipTrigger asChild>
              <button
                onClick={() => handleInstrumentClick(inst.id)}
                className={`w-16 h-16 flex flex-col items-center justify-center rounded-xl transition-all duration-200 border ${
                  activeInstrument === inst.id
                    // Estilo Activo: Glow cian, fondo azulado sutil
                    ? "bg-cyan-900/40 border-cyan-400/80 shadow-[0_0_15px_rgba(34,211,238,0.3)] text-cyan-300"
                    // Estilo Inactivo: Fondo oscuro, borde sutil, hover más brillante
                    : "bg-slate-800/60 border-slate-700 hover:bg-slate-700 hover:border-slate-500 text-slate-400 hover:text-slate-200"
                }`}
              >
                <img
                  src={inst.img}
                  alt={inst.fullName}
                  className={`w-8 h-8 object-contain transition-transform duration-300 ${
                    activeInstrument === inst.id 
                      ? "scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" // Imagen resalta cuando está activa
                      : "scale-100 drop-shadow-md opacity-80" 
                  }`}
                  draggable={false}
                />
                <span className={`text-[9px] font-bold tracking-wider mt-1.5 ${
                   activeInstrument === inst.id ? "text-cyan-300" : "text-slate-400"
                }`}>
                  {inst.label}
                </span>
              </button>
            </TooltipTrigger>
            {/* Tooltip con estilo consistente */}
            <TooltipContent side="right" className="bg-slate-900 border border-slate-700 text-slate-200 shadow-xl px-3 py-2">
              <span className="font-semibold text-xs tracking-wide">{inst.fullName}</span>
              <kbd className="ml-3 px-1.5 py-0.5 rounded-md bg-slate-800 border border-slate-600 text-cyan-400 font-mono text-[10px]">
                {inst.shortcut}
              </kbd>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Separador visual sutil */}
      <div className="w-4/5 h-px bg-slate-700/60 my-1" />

      {/* SECCIÓN: HERRAMIENTAS DE VISTA */}
      <div className="w-full flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">
          Vista
        </span>

        <div className="flex flex-col gap-2">
          {viewTools.map((tool) => (
            <Tooltip key={tool.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleViewTool(tool.id)}
                  className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200 border ${
                    tool.id !== "reset" && activeViewTool === tool.id
                      // Estilo Activo Vista: Glow sutil cian
                      ? "bg-cyan-900/30 border-cyan-500/60 shadow-[0_0_10px_rgba(34,211,238,0.2)] text-cyan-400"
                      // Estilo Inactivo Vista
                      : "bg-slate-800/60 border-slate-700 hover:bg-slate-700 hover:border-slate-500 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <tool.icon className="w-5 h-5" strokeWidth={activeViewTool === tool.id ? 2.5 : 2} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-slate-900 border border-slate-700 text-slate-200 shadow-xl px-3 py-1.5 text-xs font-semibold tracking-wide">
                {tool.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

    </div>
  );
}