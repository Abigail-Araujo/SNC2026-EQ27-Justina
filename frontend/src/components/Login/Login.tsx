import type { FC } from 'react';
import { Link } from 'react-router-dom';
import logoBlack from '../../assets/logo-black.svg'

interface LoginProps {}

const Login: FC<LoginProps> = () => (
  <div className="w-full sm:max-w-md bg-white p-8 sm:px-14 sm:py-16 rounded-[3rem] shadow-2xl border border-gray-50 text-left">
    <div className="sm:mx-auto sm:w-full">
      <img src={logoBlack} alt="Justina" className="mx-auto h-12 w-auto" />
      <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div className="mt-8">
      <form action="#" method="POST" className="space-y-6">
        <div className="w-full">
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

        <div className="w-full">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-cyan-800 hover:text-cyan-600">
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <input 
              id="password" 
              type="password" 
              name="password" 
              required 
              autoComplete="current-password" 
              className="block w-full rounded-xl bg-white px-5 py-2.5 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm" 
            />
          </div>
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            className="flex w-full justify-center rounded-xl bg-cyan-800 px-5 py-3 text-sm font-bold text-white shadow-lg hover:bg-cyan-700 transition-all active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-800"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
    
    <p className="mt-8 text-center text-sm text-gray-500">
      Don't have an account?{' '}
      <Link to="/register" className="font-semibold text-cyan-800 hover:text-cyan-600">
        Sign up
      </Link>
    </p>
  </div>
);

export default Login;
