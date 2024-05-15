import React, { createContext, useEffect, useState } from 'react';
import { UserProfile } from '../models/User';
import { useNavigate } from 'react-router-dom';
import { loginAPI} from '../services/AuthServices';
import { toast } from 'react-toastify';
import axios from 'axios';

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  loginUser: (email: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user && token) {
    
      setUser(JSON.parse(user));
      setToken(token);      
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
    setIsReady(true);
  }, []);

  const loginUser = async (email: string, password: string) => {
    await loginAPI(email, password)
      .then((res) => {
        if (res) {    
          const { access } = res.data.tokens;
          const token = access;      
          
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(email));
          setToken(token);
          setUser({ name: "Default Name", email });
          toast.success("Logado com sucesso!");
          navigate("/userprofile");
        }
      })
      .catch((error) => {        
        if (error.response && error.response.status === 401) {
          toast.error("Usuário ou senha inválidos");
        } else {
          toast.warning("Ocorreu um erro");
        }
      });
  };
  

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
    navigate('/');
  };

  return (
    <UserContext.Provider value={{ loginUser, user, token, logout, isLoggedIn }}>
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
