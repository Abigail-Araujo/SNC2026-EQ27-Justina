import Navbar from '../components/Navbar/Navbar';
import Dashboard from '../components/Dashboard/Dashboard';

const DashboardView = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full">
        <Navbar />
      </header>
      <main className="flex-grow">
        <Dashboard />
      </main>
    </div>
  );
};

export default DashboardView;
