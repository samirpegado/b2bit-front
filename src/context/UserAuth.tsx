import React, { createContext, useEffect, useState } from 'react';
import { UserProfile } from '../models/User';
import { useNavigate } from 'react-router-dom';
import { loginAPI} from '../services/AuthServices';
import { toast } from 'react-toastify';
import axios from 'axios';

// define o tipo para o contexto do usuário
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

  // executado quando o componente é montado
  // usuário e token no estado local
  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user && token) {
    
      setUser(JSON.parse(user));
      setToken(token);
      // add o token como cabeçalho padrão para as solicitações axios      
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
    setIsReady(true);
  }, []);

  // funcao de login do usuário
  const loginUser = async (email: string, password: string) => {
    await loginAPI(email, password)
      .then((res) => {
        if (res) {
          // pega o token da resposta    
          const { access } = res.data.tokens;
          const token = access;      
          
          // armazena o token e o email localmente
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
  
  // verifica se o usuário ta logado
  const isLoggedIn = () => {
    return !!user;
  };

  // faz o logout removendo o token e usuário do localStorage
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
