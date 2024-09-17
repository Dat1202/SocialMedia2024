import React, { useReducer, createContext } from 'react'
import App from './App';
import Home from './components/Home';
import Login from './components/Auth/Login';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import UserReducer from './reducers/UserReducer';
import cookie from "react-cookies";

export const UserContext = createContext()

const Router = () => {
  const [user, dispatch] = useReducer(UserReducer, cookie.load("user") || null)

  return (
    <>
      <UserContext.Provider value={[user, dispatch]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
          {/* <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={user ? <App /> : <Navigate to="/login" replace />}>
              <Route index element={<Home />} />
              <Route path="/home" element={<Home />} />
            </Route>
          </Routes> */}
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
        // limit={2}
        />
      </UserContext.Provider>
    </>
  )
}

export default Router;
