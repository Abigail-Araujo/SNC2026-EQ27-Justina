import Navbar from '../components/Navbar/Navbar';
import Dashboard from '../components/Dashboard/Dashboard';

const DashboardView = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full p-4 sm:p-6 max-w-7xl mx-auto">
        <Navbar />
      </header>
      <main className="flex-grow">
        <Dashboard />
      </main>
    </div>
  );
};

export default DashboardView;
