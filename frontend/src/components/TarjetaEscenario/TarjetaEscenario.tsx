import type { FC } from 'react';

interface TarjetaEscenarioProps {
  title: string;
  image: string;
  difficulty: number;
  personalBest: string;
}

const TarjetaEscenario: FC<TarjetaEscenarioProps> = ({ title, image, difficulty, personalBest }) => {
  return (
    <div className="flex flex-col group cursor-pointer transition-transform hover:scale-[1.02]">
      {/* Imagen del escenario */}
      <div className="relative aspect-video overflow-hidden rounded-2xl shadow-md border border-gray-100">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Información */}
      <div className="mt-4">
        <h3 className="text-lg font-bold text-gray-900 leading-tight">{title}</h3>
        
        <div className="mt-1 flex items-center gap-1">
          <span className="text-sm font-medium text-gray-500">Difficulty:</span>
          <div className="flex text-gray-600">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`text-lg ${i < difficulty ? 'text-gray-700' : 'text-gray-300'}`}>
                ★
              </span>
            ))}
          </div>
        </div>

        <p className="mt-1 text-sm text-gray-500 font-medium">
          Personal Best: <span className="text-gray-700">{personalBest}</span>
        </p>
      </div>
    </div>
  );
};

export default TarjetaEscenario;
