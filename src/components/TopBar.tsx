interface TopBarProps {
  logout: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ logout }) => {
  return (
    <div className='w-full h-[70px] shadow-sm bg-white flex justify-center sm:justify-end items-center'>
      <button className='mx-8 w-[272px] h-[44px] bg-[#02274F] rounded-lg font-body text-lg font-bold text-[#FAFAFA] logout' onClick={logout}>Logout</button>
    </div>
  );
};

export default TopBar;
