import type { FC } from 'react';
import TarjetaEscenario from '../TarjetaEscenario/TarjetaEscenario';

// Imágenes generadas (usando rutas relativas o aliases si estuvieran configurados, 
// aquí las pasaremos como props desde la vista o las definiremos aquí mismo)
import kidneyImg from '../../assets/scenarios/kidney.png';
import liverImg from '../../assets/scenarios/liver.png';
import prostateImg from '../../assets/scenarios/prostate.png';

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  const scenarios = [
    { title: 'Kidney Suturing', image: kidneyImg, difficulty: 3, personalBest: '15m 30s' },
    { title: 'Liver Resection', image: liverImg, difficulty: 2, personalBest: '20m 15s' },
    { title: 'Prostatectomy', image: prostateImg, difficulty: 4, personalBest: '25m 45s' },
    { title: 'Gastric Bypass', image: kidneyImg, difficulty: 2, personalBest: '30m 00s' },
    { title: 'Colon Anastomosis', image: liverImg, difficulty: 3, personalBest: '35m 20s' },
    { title: 'Esophagectomy', image: prostateImg, difficulty: 4, personalBest: '40m 10s' },
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-6 gap-y-12">
          {scenarios.map((scenario, index) => (
            <TarjetaEscenario 
              key={index}
              title={scenario.title}
              image={scenario.image}
              difficulty={scenario.difficulty}
              personalBest={scenario.personalBest}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
