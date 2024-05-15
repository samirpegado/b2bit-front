import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage';
import UserProfile from './pages/UserProfile'; 
import { Route, Routes } from 'react-router-dom';
import AuthGate from './context/AuthGate';

function App() {
  return (
    <>
      
        <Routes>
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<AuthGate />}>
            <Route path="userprofile" element={<UserProfile />} />
          </Route>
          
        </Routes>      
      
    </>
  );
}

export default App;
