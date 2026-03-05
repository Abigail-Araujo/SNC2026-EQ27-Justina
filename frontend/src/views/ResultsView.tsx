import Navbar from '../components/Navbar/Navbar';
import Results from '../components/Results/Results';

const ResultsView = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="w-full">
        <Navbar />
      </header>
      <main>
        <Results/>
      </main>
    </div>
  );
};

export default ResultsView;
