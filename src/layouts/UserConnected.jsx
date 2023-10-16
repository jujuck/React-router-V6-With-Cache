
import { Outlet, useNavigate, redirect } from 'react-router-dom';
import Home from "../pages/Home";
import PersonalPage from "../pages/PersonalPage";
import { authProvider } from '../contexts/User';


const UserConnected = () => {

  const navigate = useNavigate()
  const handleConnection = async () => {
    await authProvider.signout();
    navigate('/');
  }

  return (
    <>
      <button onClick={() => handleConnection()}>Se déconnecter</button>
      <Outlet />
    </>
  )
}

export default {
  path: '/',
  element: (
    <>
      <UserConnected />
    </>
  ),
  loader: () => {
    console.log("User Connected Loader")
    if (authProvider.isAuthenticated) {
      return { user: authProvider.username };
    }
    throw redirect("/");
  },
  children: [
    Home,
    PersonalPage
  ]
}