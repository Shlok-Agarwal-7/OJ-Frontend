import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../backend";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session,setSession] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await apiClient.get("/user/");
      setUser(res.data);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [session]);

  const setToken = (data) => {
    sessionStorage.setItem("access_token", data?.access);
    setSession(data?.access)
    setUser({ username: data.username, role: data.role });
  };

  const clearToken = () => {
    sessionStorage.removeItem("access_token");
    setUser(null);
  };

  const value = {
    setToken,
    clearToken,
    user,
    setUser,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};


