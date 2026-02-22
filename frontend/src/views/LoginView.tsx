import NavbarInicio from '../components/Navbar/NavbarInicio';
import Login from '../components/Login/Login';

const LoginView = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="w-full p-4 sm:p-8 max-w-7xl mx-auto">
        <NavbarInicio />
      </header>
      <main className="flex-grow flex items-center justify-center p-6">
        <Login />
      </main>
    </div>
  );
};

export default LoginView;
