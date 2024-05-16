import React from 'react';
import type { UserProfile } from '../models/User';

interface UserCardProps {
  userData: UserProfile | null;
}

const UserCard: React.FC<UserCardProps> = ({ userData }) => {

  return (
    <div className='flex h-full justify-center'>
      <div className='bg-white w-[356px] h-[315px] rounded-[18px] shadow-lg p-8 mt-32 mx-6'>
        <div className='w-full flex justify-center'>
          <div className="font-body text-xs font-semibold text-[#2F2F2F]">Profile picture</div>
        </div>
        <div className='w-full flex justify-center'>
          <img className='w-[58px] pt-2' srcSet="assets/profile_img.png" />
        </div>
        <div>
          <div className='w-full flex mt-6'>
            <p className='font-body font-normal text-sm'>Your <span className='font-body font-bold text-sm'>Name</span></p>            
          </div>
          <div className='w-full h-[44px] bg-[#f4f4f4] rounded-lg px-4 font-body font-normal text-xs text-[#262626] flex items-center'>{userData!.name}</div>
        </div>
        <div>
          <div className='w-full flex mt-4'>
            <p className='font-body font-normal text-sm'>Your <span className='font-body font-bold text-sm'>E-mail</span></p>            
          </div>
          <div className='w-full h-[44px] bg-[#f4f4f4] rounded-lg px-4 font-body font-normal text-xs text-[#262626] flex items-center'>{userData!.email}</div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
