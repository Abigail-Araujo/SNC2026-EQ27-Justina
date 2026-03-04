import type { FC } from 'react';
import TarjetaEscenario from '../TarjetaEscenario/TarjetaEscenario';

// Imágenes generadas
import kidneyImg from '../../assets/scenarios/kidney.png';
import liverImg from '../../assets/scenarios/liver.png';
import esophagus from '../../assets/scenarios/Esophagectomy.png';
import gastric from '../../assets/scenarios/gastric.png';

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  // Array de escenarios actualizado con las rutas (path) para la navegación
  const scenarios = [
    { 
      title: 'Kidney Suturing', 
      image: kidneyImg, 
      difficulty: 3, 
      personalBest: '15m 30s',
      path: '/simulation/kidney-uturing' 
    },
    { 
      title: 'Liver Resection', 
      image: liverImg, 
      difficulty: 2, 
      personalBest: '20m 15s',
      path: '/simulation/liver-resection' 
    },
    { 
      title: 'Gastric Bypass', 
      image: gastric, 
      difficulty: 2, 
      personalBest: '30m 00s',
      path: '/simulation/gastric-bypass' 
    },
    { 
      title: 'Esophagectomy', 
      image: esophagus, 
      difficulty: 4, 
      personalBest: '40m 10s',
      path: '/simulation/esophagectomy' 
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Latest Score */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between min-h-[160px]">
          <span className="text-gray-500 font-medium text-lg">Latest Score</span>
          <div>
            <span className="text-4xl font-black text-gray-900">95%</span>
            <p className="text-gray-400 mt-1 font-medium">Kidney Suturing</p>
          </div>
        </div>

        {/* Total Practice Hours */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between min-h-[160px]">
          <span className="text-gray-500 font-medium text-lg">Total Practice Hours</span>
          <div>
            <span className="text-4xl font-black text-gray-900">12h 30m</span>
            <p className="text-gray-400 mt-1 font-medium">1h 30m this week</p>
          </div>
        </div>

        {/* Error Trend */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between min-h-[160px]">
          <span className="text-gray-500 font-medium text-lg">Error Trend</span>
          <div>
            <div className="flex items-end justify-between">
              <span className="text-4xl font-black text-gray-900">12%</span>
              <button className="text-cyan-600 font-bold hover:text-cyan-700 flex items-center gap-1 transition-colors">
                More details <span className="text-xl">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scenarios Section */}
      <section>
        <h2 className="text-3xl font-black text-gray-900 mb-10 tracking-tight">Training Scenarios</h2>
        
        {/* Grid de Escenarios - Ahora pasando la prop 'path' */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {scenarios.map((scenario, index) => (
            <TarjetaEscenario 
              key={index}
              title={scenario.title}
              image={scenario.image}
              difficulty={scenario.difficulty}
              personalBest={scenario.personalBest}
              path={scenario.path} // ¡Prop clave para que funcione el Link!
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;