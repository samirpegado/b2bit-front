import { Navigate } from 'react-router-dom';
import { useUser } from './UserAuth';
import UserProfile from '../pages/UserProfile';

const AuthGate = () => {
  const { isLoggedIn } = useUser();

  // checa se o usuário está logado e define a rota 
  // se o usuário estiver logado -> pagina de perfil, senao -> pagina de login
  return isLoggedIn() ? <UserProfile /> : <Navigate to="/login" />;
};

export default AuthGate;
