import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Slider } from "../ui/slider";
import { ZoomIn, ZoomOut, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Focus } from "lucide-react";
import { OrganViewer3D } from "./OrganViewer3D";
import { useSimulation } from "../../contexts/SimulationContext";

const TOOL_IMAGE_MAP: Record<string, string> = {
  gancho: "/instruments/gancho-cauterizador.png",
  tijeras: "/instruments/pinza-fenestrada.png",
  suctor: "/instruments/suctor.png",
  sutura: "/instruments/porta-agujas.png",
};

export function SurgicalViewport() {
  const { organ } = useParams<{ organ: string }>();
  const { activeViewTool, viewResetCounter, activeInstrument } = useSimulation();
  
  const [zoom, setZoom] = useState([50]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMouseInside, setIsMouseInside] = useState(false);
  
  const pan = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const currentOrgan = organ || "liver-resection";

  const movePan = useCallback((dx: number, dy: number) => {
    pan.current = { x: pan.current.x + dx, y: pan.current.y + dy };
  }, []);

  useEffect(() => {
    setZoom([50]);
    pan.current = { x: 0, y: 0 };
  }, [viewResetCounter]);

  // Manejo de eventos de puntero
  const handlePointerEnter = () => setIsMouseInside(true);
  const handlePointerLeave = () => {
    isDragging.current = false;
    setIsMouseInside(false);
  };

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    if (isDragging.current && activeViewTool === "move") {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      pan.current = { x: pan.current.x + dx, y: pan.current.y + dy };
      lastPos.current = { x: e.clientX, y: e.clientY };
    }
  }, [activeViewTool]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (activeViewTool === "move") {
      isDragging.current = true;
      lastPos.current = { x: e.clientX, y: e.clientY };
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    }
  }, [activeViewTool]);

  const handlePointerEnd = useCallback(() => { isDragging.current = false; }, []);

  // ZOOM POR SCROLL
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); 
      const sensitivity = 0.05;
      setZoom((prevZoom) => [
        Math.max(0, Math.min(100, prevZoom[0] - e.deltaY * sensitivity))
      ]);
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  // Teclado para mover la cámara (WASD / Flechas)
  // SE INVIRTIERON LOS VALORES X (Left: step, Right: -step) para coincidir visualmente
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const step = 40;
      switch (e.key) {
        case "ArrowUp": case "w": case "W": e.preventDefault(); movePan(0, step); break;
        case "ArrowDown": case "s": case "S": e.preventDefault(); movePan(0, -step); break;
        case "ArrowLeft": case "a": case "A": e.preventDefault(); movePan(step, 0); break;
        case "ArrowRight": case "d": case "D": e.preventDefault(); movePan(-step, 0); break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [movePan]);

  // CURSOR DINÁMICO
  let systemCursor = "default";
  if (isMouseInside) {
    if (activeInstrument) systemCursor = "none";
    else if (activeViewTool === "move") systemCursor = isDragging.current ? "grabbing" : "grab";
    else if (activeViewTool === "zoom") systemCursor = "zoom-in";
  }

  const currentToolImg = activeInstrument ? TOOL_IMAGE_MAP[activeInstrument] : null;

  // Ajuste de punta según el instrumento
  const toolTransform = activeInstrument === "sutura" 
    ? "translate(-10%, -90%)" 
    : "translate(-50%, -50%)";

  return (
    <div
      ref={containerRef}
      className="relative flex-1 rounded-xl overflow-hidden bg-slate-950 touch-none select-none border border-slate-800 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]"
      style={{ cursor: systemCursor }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* 1. VISOR 3D */}
      <div className="absolute inset-0">
        <OrganViewer3D organ={currentOrgan} zoom={zoom[0]} setZoom={setZoom} panRef={pan} />
      </div>

      {/* 2. INSTRUMENTO QUIRÚRGICO (CURSOR MOUSE) */}
      {currentToolImg && isMouseInside && (
        <div
          className="fixed pointer-events-none z-50 will-change-transform"
          style={{ left: mousePos.x, top: mousePos.y, transform: toolTransform }}
        >
          <img
            src={currentToolImg}
            alt="Instrumento"
            className="w-64 h-auto drop-shadow-[0_20px_25px_rgba(0,0,0,0.8)]"
          />
        </div>
      )}

      {/* 3. OVERLAYS VISUALES (MIRA Y VIÑETA) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-60">
        <div className="w-12 h-12 rounded-full border border-cyan-500/30 absolute flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,1)]" />
        </div>
        <div className="w-16 h-[1px] bg-cyan-500/50 absolute" />
        <div className="h-16 w-[1px] bg-cyan-500/50 absolute" />
      </div>
      
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ background: "radial-gradient(circle at center, transparent 40%, rgba(2,6,23,0.8) 100%)" }} 
      />

      {/* 4. CONTROLES DE CÁMARA (D-PAD) */}
      <div className="absolute bottom-6 left-6 flex flex-col gap-2 z-20">
        <div className="flex items-center gap-1.5 px-1">
          <Focus className="w-3.5 h-3.5 text-cyan-500" />
          <span className="text-[10px] font-bold tracking-widest text-cyan-500/80 uppercase">
            Cámara
          </span>
        </div>
        
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/70 shadow-2xl rounded-2xl p-2 grid grid-cols-3 grid-rows-3 gap-1 relative w-max">
          <button onClick={() => movePan(0, 50)} className="col-start-2 row-start-1 flex items-center justify-center p-2 rounded-t-xl rounded-b-sm bg-slate-800/80 hover:bg-cyan-900/50 border border-slate-700 hover:border-cyan-500/60 text-slate-400 hover:text-cyan-300 transition-all hover:shadow-[0_0_10px_rgba(34,211,238,0.3)] active:scale-95">
            <ChevronUp className="w-5 h-5" />
          </button>
          
          {/* SE INVIRTIÓ EL VALOR A 50 */}
          <button onClick={() => movePan(50, 0)} className="col-start-1 row-start-2 flex items-center justify-center p-2 rounded-l-xl rounded-r-sm bg-slate-800/80 hover:bg-cyan-900/50 border border-slate-700 hover:border-cyan-500/60 text-slate-400 hover:text-cyan-300 transition-all hover:shadow-[0_0_10px_rgba(34,211,238,0.3)] active:scale-95">
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="col-start-2 row-start-2 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] border border-slate-600/50" />
          </div>

          {/* SE INVIRTIÓ EL VALOR A -50 */}
          <button onClick={() => movePan(-50, 0)} className="col-start-3 row-start-2 flex items-center justify-center p-2 rounded-r-xl rounded-l-sm bg-slate-800/80 hover:bg-cyan-900/50 border border-slate-700 hover:border-cyan-500/60 text-slate-400 hover:text-cyan-300 transition-all hover:shadow-[0_0_10px_rgba(34,211,238,0.3)] active:scale-95">
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <button onClick={() => movePan(0, -50)} className="col-start-2 row-start-3 flex items-center justify-center p-2 rounded-b-xl rounded-t-sm bg-slate-800/80 hover:bg-cyan-900/50 border border-slate-700 hover:border-cyan-500/60 text-slate-400 hover:text-cyan-300 transition-all hover:shadow-[0_0_10px_rgba(34,211,238,0.3)] active:scale-95">
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 5. CONTROL DE ZOOM */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2 w-52 z-20">
        <div className="flex justify-between items-end px-1">
          <span className="text-[10px] font-bold tracking-widest text-cyan-500/80 uppercase">
            Escala Visual
          </span>
          <span className="text-sm font-mono font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
            {Math.round(zoom[0])}%
          </span>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-md border border-slate-700/70 p-3 rounded-xl shadow-2xl">
          <ZoomOut className="w-4 h-4 text-slate-500 shrink-0" />
          <Slider
            value={zoom}
            onValueChange={setZoom}
            max={100}
            min={0}
            step={1}
            className="relative flex items-center w-full h-5 touch-none
              [&>span:first-child]:bg-slate-700 
              [&>span:first-child]:h-1.5 
              [&_[data-orientation]]:bg-cyan-500 
              [&_[data-orientation]]:shadow-[0_0_10px_rgba(6,182,212,0.5)]
              [&_[data-orientation]]:h-full 
              [&_[role=slider]]:bg-white 
              [&_[role=slider]]:border-2 
              [&_[role=slider]]:border-cyan-500 
              [&_[role=slider]]:w-4 
              [&_[role=slider]]:h-4 
              [&_[role=slider]]:shadow-[0_0_10px_rgba(6,182,212,0.5)]
              [&_[role=slider]]:hover:scale-110 
              [&_[role=slider]]:transition-transform"
          />
          <ZoomIn className="w-4 h-4 text-slate-500 shrink-0" />
        </div>
      </div>
    </div>
  );
}