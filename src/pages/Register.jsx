import RegisterForm from '../components/RegisterForm';
import { useAuth } from '../context/AuthContext';

function Register() {
  const { user } = useAuth();

  if (user) {
    window.location.href = '/';
    return null;
  }

  return <RegisterForm />;
}

export default Register;