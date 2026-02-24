import { useState, type FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoBlack from '../../assets/logo-black.svg'
import Notification from '../Notification/Notification';

interface RegisterProps {}

const Register: FC<RegisterProps> = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const finalFullName = fullName.trim();
    const finalEmail = email.trim();
    const finalPassword = password.trim();
    const finalConfirmPassword = confirmPassword.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(finalEmail)) {
      setError('Please enter a valid email address');
      return;
    }
    
    if (finalPassword !== finalConfirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,8}$/;
    if (!passwordRegex.test(finalPassword)) {
      setError('Password must be 6-8 alphanumeric characters, including at least one uppercase letter and one number.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: finalFullName,
          email: finalEmail,
          password: finalPassword
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Error registering user');
      }

      // Mostrar notificación de éxito y redirigir tras un retraso
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000); // 2 segundos de retraso
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Notification 
        show={success} 
        message="Account created successfully! Redirecting..." 
        type="success" 
      />
      <div className="w-full sm:max-w-md bg-white p-8 sm:px-14 sm:py-16 rounded-[3rem] shadow-2xl border border-gray-50 text-left relative z-10">
        <div className="sm:mx-auto sm:w-full">
          <img src={logoBlack} alt="Justina" className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

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
                  value={fullName}
                  onChange={(e) => {
                    const val = e.target.value.trimStart().replace(/\s{2,}/g, ' ');
                    // Solo permite letras (incluyendo acentos/ñ) y espacios
                    if (/^[a-zA-ZÀ-ÿ\s]*$/.test(val)) {
                      setFullName(val);
                    }
                  }}
                  onBlur={() => setFullName(fullName.trimEnd())}
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
                  value={email}
                  onChange={(e) => {
                    const val = e.target.value.trimStart().replace(/\s{2,}/g, ' ');
                    setEmail(val);
                  }}
                  onBlur={() => setEmail(email.trimEnd())}
                  autoComplete="email" 
                  className="block w-full rounded-xl bg-white px-5 py-2.5 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm" 
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-2 relative">
                <input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  required 
                  value={password}
                  onChange={(e) => {
                    const val = e.target.value.trimStart().replace(/\s{2,}/g, ' ');
                    setPassword(val);
                  }}
                  onBlur={() => setPassword(password.trimEnd())}
                  autoComplete="new-password" 
                  className="block w-full rounded-xl bg-white px-5 py-2.5 pr-12 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm" 
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-cyan-600 focus:outline-none transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-2 relative">
                <input 
                  id="confirm-password" 
                  type={showConfirmPassword ? "text" : "password"} 
                  name="confirm-password" 
                  required 
                  value={confirmPassword}
                  onChange={(e) => {
                    const val = e.target.value.trimStart().replace(/\s{2,}/g, ' ');
                    setConfirmPassword(val);
                  }}
                  onBlur={() => setConfirmPassword(confirmPassword.trimEnd())}
                  autoComplete="new-password" 
                  className="block w-full rounded-xl bg-white px-5 py-2.5 pr-12 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm" 
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-cyan-600 focus:outline-none transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={loading || success}
                className="flex w-full justify-center rounded-xl bg-cyan-800 px-5 py-3 text-sm font-bold text-white shadow-lg hover:bg-cyan-700 transition-all active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-800 disabled:opacity-70"
              >
                {loading && !success ? 'Registering...' : success ? 'Success!' : 'Register'}
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
    </>
  );
};

export default Register;
