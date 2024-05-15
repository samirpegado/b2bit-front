import { useState, useEffect } from 'react';
import { useUser } from '../context/UserAuth';
import type { UserProfile } from '../models/User';


import axios from 'axios';

const UserProfile = () => {
  const { logout, token } = useUser();
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!userData) {
    return <div>Nenhum usuário disponível</div>;
  }

  return (
    <>
    <div className='h-screen bg-[#f1f5f9] flex flex-col '>
      <div className='w-full h-[70px] shadow-sm bg-white flex justify-center sm:justify-end items-center'>
        <button className='mx-8 w-[272px] h-[44px] bg-[#02274F] rounded-lg font-body text-lg font-bold  text-[#FAFAFA]' onClick={logout}>Logout</button>
      </div>
      <div className='flex h-full justify-center'>
        <div className='bg-white w-[356px] h-[315px] rounded-[18px] shadow-lg p-8 mt-32 mx-6 '>
          <div className='w-full flex justify-center'>
            <div className="font-body text-xs font-semibold    text-[#2F2F2F]">Profile picture</div>
          </div>
          <div className='w-full flex justify-center'>
            <img className='w-[58px] pt-2' srcSet="assets/profile_img.png" />
          </div>
          <div>
            <div className='w-full flex mt-6'>
              <p className='font-body font-normal text-sm'>Your <span className='font-body font-bold text-sm'>Name</span></p>            
            </div>
            <div className='w-full h-[44px] bg-[#f4f4f4] rounded-lg px-4 font-body font-normal text-xs text-[#262626] flex items-center'>{userData.name}</div>
          </div>
          <div>
            <div className='w-full flex mt-4'>
              <p className='font-body font-normal text-sm'>Your <span className='font-body font-bold text-sm'>E-mail</span></p>            
            </div>
            <div className='w-full h-[44px] bg-[#f4f4f4] rounded-lg px-4 font-body font-normal text-xs text-[#262626] flex items-center'>{userData.email}</div>
          </div>
        </div>
      </div>

    </div>
      
      
    </>
  );
};

export default UserProfile;
