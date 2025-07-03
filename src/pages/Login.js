import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/globalContext';
import config from '../config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [showCreateUserPrompt, setShowCreateUserPrompt] = useState(false);
  const navigate = useNavigate();
  const context = useGlobalContext();
  const setLoggedInEmail = context?.setLoggedInEmail || (() => {});

  const handleLogin = async () => {
    try {
      console.log('🛂 Iniciando proceso de login para:', email);
      const response = await fetch(`${config.BACKEND_URL}/api/users`);
      const users = await response.json();

      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      console.log('🔍 Usuarios encontrados:', users);
      console.log('🔍 Usuario coincidente:', user);

      if (user) {
        if (rememberMe) {
          localStorage.setItem('loggedUserEmail', email);
          setLoggedInEmail(email);
        } else {
          sessionStorage.setItem('loggedUserEmail', email);
          setLoggedInEmail(email);
        }

        console.log('📥 Ingresó con éxito, verificando si ya tiene perfil...');
        // Verificar si el perfil ya fue creado
        const profileResponse = await fetch(`${config.BACKEND_URL}/api/user-profile/profile?email=${email}`);
        if (!profileResponse.ok) {
          throw new Error(`Servidor devolvió status ${profileResponse.status}`);
        }
        const profileData = await profileResponse.json();
        console.log('📊 Datos de perfil recibidos:', profileData);

        if (profileData?.onboardingCompleted === true) {
          console.log('✅ Onboarding completo, redirigiendo al Dashboard...');
          return navigate('/dashboard');
        } else {
          console.log('📝 Onboarding incompleto, redirigiendo al cuestionario...');
          return navigate('/questionnaire');
        }
      } else {
        setShowCreateUserPrompt(true);
      }
    } catch (err) {
      console.error('❌ Error en handleLogin:', err);
      setError('Hubo un problema al iniciar sesión');
    }
  };

  const handleCreateUser = async () => {
    try {
      await fetch(`${config.BACKEND_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, onboardingCompleted: false })
      });

      localStorage.setItem('loggedUserEmail', email);
      setLoggedInEmail(email);
      navigate('/questionnaire');
    } catch (err) {
      console.error('Error creando usuario:', err);
      setError('Hubo un problema al crear el usuario');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-white px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <label className="flex items-center mb-4 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mr-2"
          />
          Recordarme en este dispositivo
        </label>
        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          Ingresar
        </button>
        {showCreateUserPrompt && (
          <div className="mt-6 text-center">
            <p className="mb-4 text-gray-600">Este correo no aparece en nuestra base de datos. ¿Quieres crear un usuario nuevo?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowCreateUserPrompt(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Atrás
              </button>
              <button
                onClick={handleCreateUser}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Crear un usuario nuevo
              </button>
            </div>
          </div>
        )}
        {error && <p className="mt-4 text-red-500 text-sm text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Login;