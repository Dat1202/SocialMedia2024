import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './layout/Header';
import Home from './components/Home';
import Login from './components/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Header /> 
      <Routes>
        <Route path="/" element = {<Home /> } />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;
