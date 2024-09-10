import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './layout/Header';


const App = () => {
  return (
    <>
    <Header />
    <Outlet />
    </>
    );
};

export default App;
