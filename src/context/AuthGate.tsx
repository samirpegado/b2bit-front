import { Navigate } from 'react-router-dom';
import { useUser } from './UserAuth';
import UserProfile from '../pages/UserProfile';

const AuthGate = () => {
  const { isLoggedIn } = useUser();
  
  return isLoggedIn() ? <UserProfile /> : <Navigate to="/login" />;
};

export default AuthGate;
