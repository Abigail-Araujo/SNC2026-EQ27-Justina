import Navbar from '../components/Navbar/Navbar';

const ResultsView = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="w-full p-4 sm:p-6 max-w-7xl mx-auto">
        <Navbar />
      </header>
      <main className="p-8">
        <h1 className="text-3xl font-bold text-gray-900">Results</h1>
      </main>
    </div>
  );
};

export default ResultsView;
