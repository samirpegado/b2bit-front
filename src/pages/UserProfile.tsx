import { useState, useEffect } from 'react';
import { useUser } from '../context/UserAuth';
import type { UserProfile } from '../models/User';


import axios from 'axios';
import UserCard from '../components/UserCard';
import TopBar from '../components/TopBar';

const UserProfile = () => {
  const { logout, token } = useUser();
  const [userData, setUserData] = useState<UserProfile | null>(null);


  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;

      try {
        const response = await axios.get('https://api.homologation.cliqdrive.com.br/auth/profile/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json;version=v1_web',
            'Content-Type': 'application/json'
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      } 
    };

    fetchUserData();
  }, [token]);

   if (!userData) {   
    return <div>Nenhum usuário disponível</div>;
  }

  return (
    <>
    <div className='h-screen bg-[#f1f5f9] flex flex-col '>
      <TopBar logout={logout} />
      <UserCard userData={userData} />
    </div>
      
      
    </>
  );
};
export default UserProfile;
