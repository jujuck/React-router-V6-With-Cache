import { useNavigate } from 'react-router-dom';
import { authProvider } from '../contexts/User';

const Login = () => {
  const navigate = useNavigate()

  const handleConnection = async () => {
    await authProvider.signin("Bob");
    navigate('/people')
  }

  return (
    <div>
      <button onClick={() => handleConnection()}>Se connecter</button>
    </div>
  )
}

export default Login;