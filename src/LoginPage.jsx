import React, { useState } from 'react';
import { loginUser, registerUser } from './services/apiService';

const LoginPage = ({ onLogin, setCurrentPage }) => {
  const [isLogin, setIsLogin] = useState(true);

  // Login fields
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register fields
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regFarmSize, setRegFarmSize] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('farmer');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    if (!loginUsername || !loginPassword) {
      setErrorMsg('Please enter both username and password.');
      setIsLoading(false);
      return;
    }

    try {
      const data = await loginUser(loginUsername.trim(), loginPassword);
      const user = data.user;
      const role = user.role || 'farmer';

      const currentUser = {
        username: user.username,
        role,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        farmSize: user.farmSize
      };

      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      localStorage.setItem('userRole', role);
      localStorage.setItem('authToken', data.token);

      setSuccessMsg('Login successful! Redirecting...');
      if (onLogin) onLogin(currentUser);

      setTimeout(() => {
        if (setCurrentPage) {
          setCurrentPage(role === 'buyer' ? 'buyer-dashboard' : 'farmer-dashboard');
        }
      }, 350);
    } catch (error) {
      setErrorMsg(error.message || 'Invalid username or password.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    if (!regFullName || !regEmail || !regPhone || !regUsername || !regPassword || !regRole) {
      setErrorMsg('Please fill in all required fields.');
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        username: regUsername.trim(),
        password: regPassword,
        fullName: regFullName.trim(),
        email: regEmail.trim(),
        phone: regPhone.trim(),
        farmSize: regFarmSize.trim(),
        role: regRole
      };

      const data = await registerUser(payload);
      const user = data.user;

      setSuccessMsg('Registered successfully! Redirecting to login...');
      setIsLogin(true);

      setRegFullName('');
      setRegEmail('');
      setRegPhone('');
      setRegFarmSize('');
      setRegUsername('');
      setRegPassword('');
      setRegRole('farmer');

      setTimeout(() => {
        setErrorMsg('');
        setSuccessMsg('');
      }, 2500);

      // Auto login after registration (optional)
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('authToken', data.token);
      if (onLogin) onLogin(user);
      if (setCurrentPage) setCurrentPage(user.role === 'buyer' ? 'buyer-dashboard' : 'farmer-dashboard');
    } catch (error) {
      setErrorMsg(error.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMsg('');
    setSuccessMsg('');
    setLoginPassword('');
    setRegPassword('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-green-600 text-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-center">
          <div className="flex items-center gap-3">
            <img src="/text-logo.png" alt="Team Solver Logo" className="h-8 w-auto" />
            <h1 className="text-xl sm:text-2xl font-bold">Team Solver</h1>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200">
            <div className="text-center mb-8">
              <img src="/text-logo.png" alt="Team Solver Logo" className="h-16 w-auto mx-auto mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold text-green-800">
                {isLogin ? 'Welcome Back' : 'Create Your Account'}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-2">
                {isLogin ? 'Sign in to connect with Nepal\'s farming marketplace' : 'Fill in the details below to register'}
              </p>
            </div>

            {errorMsg && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">{errorMsg}</div>}
            {successMsg && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm">{successMsg}</div>}

            {isLogin ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="loginUsername">Username</label>
                  <input id="loginUsername" value={loginUsername} onChange={e => setLoginUsername(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Happyfarmer" required />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="loginPassword">Password</label>
                  <div className="relative">
                    <input id="loginPassword" type={showPassword ? 'text' : 'password'} value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="teamsolver" required />
                    <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">{showPassword ? 'Hide' : 'Show'}</button>
                  </div>
                </div>

                <button type="submit" disabled={isLoading} className="w-full bg-green-600 text-white rounded-lg py-2.5 font-bold hover:bg-green-700 transition">{isLoading ? 'Signing In...' : 'Sign In'}</button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="regFullName">Full Name</label>
                  <input id="regFullName" value={regFullName} onChange={e => setRegFullName(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" required />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="regEmail">Email</label>
                  <input id="regEmail" type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" required />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="regPhone">Phone</label>
                  <input id="regPhone" type="tel" value={regPhone} onChange={e => setRegPhone(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" required />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Role</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2"><input type="radio" name="role" value="farmer" checked={regRole === 'farmer'} onChange={e => setRegRole(e.target.value)} />🌾 Farmer</label>
                    <label className="flex items-center gap-2"><input type="radio" name="role" value="buyer" checked={regRole === 'buyer'} onChange={e => setRegRole(e.target.value)} />🛒 Buyer</label>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="regFarmSize">Farm Size / Business Size</label>
                  <input id="regFarmSize" value={regFarmSize} onChange={e => setRegFarmSize(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="regUsername">Username</label>
                  <input id="regUsername" value={regUsername} onChange={e => setRegUsername(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" required />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="regPassword">Password</label>
                  <div className="relative">
                    <input id="regPassword" type={showRegPassword ? 'text' : 'password'} value={regPassword} onChange={e => setRegPassword(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500" required />
                    <button type="button" onClick={() => setShowRegPassword(p => !p)} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">{showRegPassword ? 'Hide' : 'Show'}</button>
                  </div>
                </div>
                <button type="submit" disabled={isLoading} className="w-full bg-green-600 text-white rounded-lg py-2.5 font-bold hover:bg-green-700 transition">{isLoading ? 'Creating Account...' : 'Create Account'}</button>
              </form>
            )}

            <div className="mt-6 text-center border-t border-gray-200 pt-4">
              <p className="text-gray-600 text-sm">
                {isLogin ? "Don’t have an account? " : "Already have an account? "}
                <button onClick={toggleForm} className="text-green-600 font-bold hover:text-green-800">{isLogin ? 'Register' : 'Sign In'}</button>
              </p>
            </div>

            {isLogin && (
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-800 text-center">
                Demo credentials: Username=Happyfarmer, Password=teamsolver
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-3 sm:py-4 text-center">
        <p className="text-xs sm:text-sm text-gray-400">&copy; 2025 Team Solver. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;
