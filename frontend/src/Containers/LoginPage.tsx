// import { useAuth } from '../hooks/useAuth';
import '../assets/styles/LoginPage.scss'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthProvider';

const LoginPage = () => {

  const navigate = useNavigate();
  const { login, authStatus } = useAuth();
  let location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async () => {
    if (username === '' || password === '') {
      alert('Please fill in all fields');
      return;
    }
    try {
      await login({
        email: username, password
      }).then(() => {
        navigate('/'); // Replace with your desired redirect path
      });
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error, e.g., display error message
    }
  };


    console.log(authStatus)
    if(authStatus) {
        return <Navigate to="/" state={{ from: location}} replace />
    }

  return (
    <div className='login-page'>
      <div className='login-page-container'>

        <h1>Login</h1>

        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button id='login' onClick={handleLogin}>Login</button>
        <button id='signup' onClick={() => navigate('/signup')}>Sign up</button>
      </div>
    </div>
  )
}

export default LoginPage