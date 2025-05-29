import React, { useReducer, createContext, useContext } from 'react';
import App from '../App';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import UserReducer from '../reducers/UserReducer';
import cookie from "react-cookies";
import Login from '../pages/auth/Login';
import Home from '../pages/home/Home';
import Profile from '../pages/profile/Profile';
// import Chat from '../components/chat/Chat';
import Messenger from '../components/chat/Messenger';

export const UserContext = createContext();

const ProtectedRoute = ({ children }) => {
  const [user] = useContext(UserContext); 
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const Router = () => {
  const [user, dispatch] = useReducer(UserReducer, cookie.load("user") || null); 
  return (
    <>
      <UserContext.Provider value={[user, dispatch]}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><App /></ProtectedRoute>}>
              <Route index element={<Home />} />
              <Route path="chat" element={<Messenger />} />
              <Route path="profile/:userId" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </UserContext.Provider>
    </>
  );
};

export default Router;
