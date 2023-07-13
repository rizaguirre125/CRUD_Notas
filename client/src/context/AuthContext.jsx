import { createContext, useState, useContext, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
} from "../api/auth.js";
import Cookies from "js-cookie";
export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response);
      setErrors(error.response.data);
    }
  };
  const singin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };
  const logout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    setUser(null);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrors([]);
    }, 5000);
    return () => clearTimeout(timer);
  }, [errors]);

  useEffect(() => {
    async function checkLogin(){
      const cookies = Cookies.get();
      if(!cookies.token) {
        setLoading(false);
        setIsAuthenticated(false);
        setUser(null);
        return;
      }
      try{
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setLoading(false);
          setIsAuthenticated(false);
          setUser(null);
          return;
        }

        setLoading(false);
        setIsAuthenticated(true);
        setUser(res.data);
      }catch(error){
        console.log('un error: ', error);
        setLoading(false);
        setIsAuthenticated(false);
        setUser(null);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signup, singin, logout, loading, user, isAuthenticated, errors }}
    >
      {children}
    </AuthContext.Provider>
  );
};
