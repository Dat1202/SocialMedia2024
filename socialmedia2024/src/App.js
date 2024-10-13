import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './layout/Header';
import 'react-toastify/dist/ReactToastify.css'; 

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
    );
};

export default App;
