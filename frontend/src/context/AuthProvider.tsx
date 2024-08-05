import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, useEffect, useContext } from "react";
import { BACKEND_URL } from "../Utilities/generate";

interface AuthContextType {
  authStatus: boolean;
  userInfo: any | null; // Replace any with appropriate user type
  login: (credentials: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authStatus, setAuthStatus] = useState(false);
  const [userInfo, setUserInfo] = useState<any | null>(null); // Replace any with appropriate user type

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken != undefined && storedUser != undefined) {
      // console.log(storedToken, storedUser, typeof storedToken, typeof storedUser);
      // Assuming you have a function to parse user data from token
      const parsedUser = parseUserFromToken(storedToken);
      console.log(parsedUser);
      setAuthStatus(true);
      setUserInfo(parsedUser);
    }
  }, []);

  const parseUserFromToken = (token: string) => {
    try {
      const decodedToken = jwtDecode(token) as any;
      console.log(decodedToken);
      return JSON.stringify(decodedToken.userData);
    } catch (error) {
      console.error("Error parsing token:", error);
      return null;
    }
  };

  const login = async (credentials: any) => {
    console.log(credentials);
    try {
      // Make backend call to login
      const response = await axios.post(`${BACKEND_URL}api/login`, credentials);

      if (response.status === 200) {
        const data = await response.data;
        const { accessToken } = data;
        console.log(data);
        localStorage.setItem("token", accessToken);
        let parsedUser = parseUserFromToken(accessToken);
        if (parsedUser) localStorage.setItem("user", parsedUser);

        setAuthStatus(true);
        setUserInfo(parsedUser);
        console.log(userInfo);
      } else {
        // Handle login error
      }
    } catch (error) {
      // Handle error
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthStatus(false);
    setUserInfo(null);
  };

  const value: AuthContextType = {
    authStatus,
    userInfo,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
