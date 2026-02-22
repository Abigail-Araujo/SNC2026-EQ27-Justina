import type { FC } from 'react';
import { Link } from 'react-router-dom';
import logoBlack from '../../assets/logo-black.svg'

interface RegisterProps {}

const Register: FC<RegisterProps> = () => (
  <div className="w-full sm:max-w-md bg-white p-8 sm:px-14 sm:py-16 rounded-[3rem] shadow-2xl border border-gray-50 text-left">
    <div className="sm:mx-auto sm:w-full">
      <img src={logoBlack} alt="Justina" className="mx-auto h-12 w-auto" />
      <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
        Create your account
      </h2>
    </div>

    <div className="mt-8">
      <form action="#" method="POST" className="space-y-6">
        <div>
          <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="mt-2">
            <input 
              id="full-name" 
              type="text" 
              name="full-name" 
              required 
              className="block w-full rounded-xl bg-white px-5 py-2.5 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm" 
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-2">
            <input 
              id="email" 
              type="email" 
              name="email" 
              required 
              autoComplete="email" 
              className="block w-full rounded-xl bg-white px-5 py-2.5 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm" 
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-2">
            <input 
              id="password" 
              type="password" 
              name="password" 
              required 
              autoComplete="new-password" 
              className="block w-full rounded-xl bg-white px-5 py-2.5 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm" 
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="mt-2">
            <input 
              id="confirm-password" 
              type="password" 
              name="confirm-password" 
              required 
              autoComplete="new-password" 
              className="block w-full rounded-xl bg-white px-5 py-2.5 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm" 
            />
          </div>
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            className="flex w-full justify-center rounded-xl bg-cyan-800 px-5 py-3 text-sm font-bold text-white shadow-lg hover:bg-cyan-700 transition-all active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-800"
          >
            Register
          </button>
        </div>
      </form>
      
      <p className="mt-8 text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-cyan-800 hover:text-cyan-600">
          Sign in
        </Link>
      </p>
    </div>
  </div>
);

export default Register;
