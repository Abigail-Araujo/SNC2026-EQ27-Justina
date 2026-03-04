import { Link, useLocation } from "react-router-dom";
import kidneyImg from "../../assets/surgical/organ-kidney.png";
import liverImg from "../../assets/surgical/organ-liver.png";
import gastricImg from "../../assets/surgical/organ-gastric.jpg";
import esophagectomyImg from "../../assets/surgical/organ-esophagus.jpg"; 

const simulations = [
  { id: "kidney", label: "Kidney Uturing", image: kidneyImg, path: "/simulation/kidney-uturing" },
  { id: "liver", label: "Liver Resection", image: liverImg, path: "/simulation/liver-resection" },
  { id: "gastric", label: "Gastric Bypass", image: gastricImg, path: "/simulation/gastric-bypass" },
  { id: "esophagectomy", label: "Esophagectomy", image: esophagectomyImg, path: "/simulation/esophagectomy" },
];

export function BodyRegionNav() {
  const location = useLocation();

  return (
    // Contenedor principal estilo HUD (Fondo oscuro, blur, borde sutil)
    <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/70 shadow-2xl rounded-xl px-4 py-3 flex items-center gap-4 animate-slide-up select-none w-full overflow-hidden">
      
      {/* Etiqueta lateral con separador */}
      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold shrink-0 border-r border-slate-700/50 pr-4">
        Simulaciones
      </span>

      {/* Lista de simulaciones scrolleable */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {simulations.map((sim) => {
          const isActive = location.pathname === sim.path;
          return (
            <Link
              key={sim.id}
              to={sim.path}
              // Transición suave para todos los elementos del botón
              className={`group flex items-center gap-3 px-3 py-2 rounded-xl text-xs whitespace-nowrap transition-all duration-300 border ${
                isActive
                  // ESTILO ACTIVO: Naranja vibrante de alto contraste con resplandor
                  ? "bg-orange-500/20 text-orange-400 border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.25)] scale-105"
                  // ESTILO INACTIVO: Fondo oscuro, se ilumina un poco al hacer hover
                  : "bg-slate-800/40 text-slate-400 border-slate-700/50 hover:bg-slate-800 hover:text-slate-200 hover:border-slate-500"
              }`}
            >
              {/* Contenedor de la miniatura de la imagen */}
              <div 
                className={`relative rounded-md overflow-hidden transition-all duration-300 ${
                  isActive 
                    // Borde naranja y brillo para la imagen seleccionada
                    ? "ring-2 ring-orange-500/80 ring-offset-2 ring-offset-slate-900 shadow-[0_0_10px_rgba(249,115,22,0.6)]" 
                    // Imagen ligeramente apagada si no está seleccionada
                    : "opacity-70 group-hover:opacity-100"
                }`}
              >
                <img
                  src={sim.image}
                  alt={sim.label}
                  className="w-8 h-8 object-cover"
                  draggable={false}
                />
              </div>
              
              {/* Texto de la simulación */}
              <span className={`font-bold tracking-wide ${
                isActive ? "drop-shadow-[0_0_5px_rgba(249,115,22,0.6)]" : ""
              }`}>
                {sim.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}