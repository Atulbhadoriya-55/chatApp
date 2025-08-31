import { Route , Routes , Navigate } from 'react-router-dom';
import { useAuth } from './store/useAuth';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";

const App = () => {
  const { authUser, checkAuth, isCheckAuth , onlineUsers} = useAuth();

  console.log({ onlineUsers });

  
  useEffect(() => {
    checkAuth();
  }, [ checkAuth ]);
  console.log({ authUser });

  if (isCheckAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
  );
  
  return (
    <div>
      <Navbar/>

      <Routes>
      <Route path="/" element={ authUser ? <Home/> : <Navigate to="/"/>}/>
      <Route path="/settings" element={<Setting/>}/>
      <Route path="/login" element={!authUser ? <Login/> : <Navigate to="/" />}/>
      <Route path="/signup" element={ !authUser ? <SignUp/> : <Navigate to = "/" />}/>
      <Route path="/profile" element={authUser ? <Profile/> :<Navigate to ="/" /> }/>
      </Routes>

    <Toaster/>
    </div>
  )
};

export default App;