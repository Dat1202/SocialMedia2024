import { Outlet } from 'react-router-dom';
import Header from './layout/Header';
import './App.css';

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Outlet />
    </div>
    );
};

export default App;
