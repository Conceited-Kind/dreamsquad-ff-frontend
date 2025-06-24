import LoginForm from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { user } = useAuth();

  if (user) {
    window.location.href = '/';
    return null;
  }

  return <LoginForm />;
}

export default Login;