import { useState } from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import logoWhite from '../../assets/logo-white.svg'

interface NavbarInicioProps {}

const NavbarInicio: FC<NavbarInicioProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-cyan-800 shadow-md p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/login">
            <img src={logoWhite} alt="Logo" className="h-6 w-auto cursor-pointer" />
          </Link>
        </div>
        
        {/* Hamburger Menu Button for small screens */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z" />
              ) : (
                <path fillRule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link 
            to="/login"
            className="text-white font-semibold hover:text-cyan-200 transition-colors px-4 py-2"
          >
            Log In
          </Link>
          <Link 
            to="/register"
            className="bg-white text-cyan-800 font-bold px-6 py-2 rounded-lg hover:bg-cyan-50 transition-all active:scale-95 shadow-sm inline-block"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-3 border-t border-cyan-700 pt-4 flex flex-col">
          <Link 
            to="/login"
            onClick={() => setIsOpen(false)}
            className="text-white font-semibold hover:bg-cyan-700 p-2 rounded transition-colors w-full text-center"
          >
            Log In
          </Link>
          <Link 
            to="/register"
            onClick={() => setIsOpen(false)}
            className="bg-white text-cyan-800 font-bold px-6 py-2 rounded-lg hover:bg-cyan-50 transition-all w-full text-center shadow-sm"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};


export default NavbarInicio;
