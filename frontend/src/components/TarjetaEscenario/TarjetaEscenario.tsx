import type { FC } from 'react';
import { Link } from 'react-router-dom';

interface TarjetaEscenarioProps {
  title: string;
  image: string;
  difficulty: number;
  personalBest: string;
  path: string;
}

const TarjetaEscenario: FC<TarjetaEscenarioProps> = ({ 
  title, 
  image, 
  difficulty, 
  personalBest, 
  path 
}) => {
  return (
    /* Contenedor principal: ahora es un div con fondo para accesibilidad */
    <div className="flex flex-col bg-white rounded-3xl p-4 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md group">
      
      {/* Contenedor de Imagen (No es link, solo visual) */}
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-100">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Bloque de Información */}
      <div className="mt-5 flex-grow">
        <h3 className="text-lg font-extrabold text-gray-900 leading-tight">
          {title}
        </h3>
        
        {/* Dificultad */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Dificultad</span>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <span 
                key={i} 
                className={`text-base leading-none ${i < difficulty ? 'text-amber-400' : 'text-gray-200'}`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Récord Personal */}
        <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-tight">Mejor Puntaje</p>
          <p className="text-gray-800 font-black text-sm">{personalBest}</p>
        </div>
      </div>

      {/* EL BOTÓN: Aquí es donde reside el Link y el pointer únicamente */}
      <Link 
        to={path} 
        className="mt-6 w-full py-4 bg-cyan-600 text-white font-bold rounded-2xl text-center 
                   hover:bg-cyan-500 hover:shadow-[0_8px_20px_rgba(8,145,178,0.3)] 
                   active:scale-[0.98] transition-all duration-200 
                   flex items-center justify-center gap-2 cursor-pointer no-underline"
      >
        <span>Empezar simulación</span>
        <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </div>
  );
};

export default TarjetaEscenario;