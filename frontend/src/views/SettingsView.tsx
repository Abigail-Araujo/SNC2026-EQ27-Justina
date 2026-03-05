import Navbar from '../components/Navbar/Navbar';

const SettingsView = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="w-full">
        <Navbar />
      </header>
      <main className="p-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      </main>
    </div>
  );
};

export default SettingsView;
