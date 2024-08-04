import { useState } from 'react';
import '../assets/styles/LoginPage.scss'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Utilities/AxiosInterceptor';
const SignupPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleSignup = () => {
    if(email === '' || username === '' || password === '' || confirmPassword === '') {
      alert('Please fill in all fields');
      return;
    }
    if(password !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    axiosInstance.post('http://localhost:8080/api/register', {email, name:username, password, role:'dev'}).then((res) => {
      if(res.status === 200) {
        navigate('/login');
      }
    }).catch((_err) => {

    })
  }

  return (
    <div className='login-page'>
      <div className='login-page-container'>

        <h1>Sign up</h1>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>

        <button id='login' onClick={handleSignup}>Sign up</button>
        <button id='signup' onClick={() => navigate('/login')}>Go to login</button>
      </div>
    </div>
  )
}

export default SignupPage