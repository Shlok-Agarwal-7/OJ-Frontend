import { createContext, useContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(() => sessionStorage.getItem("access_token"));

  useEffect(() => {
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      setUser({ username: decoded.username, role: decoded.role });
    } else {
      setUser(null);
    }
  }, [accessToken]);

  const setToken = (token) => {
    setAccessToken(token);
    sessionStorage.setItem("access_token", token);
    const decoded = jwt_decode(token);
    setUser({ username: decoded.username, role: decoded.role });
  };

  const clearToken = () => {
    setAccessToken(null);
    sessionStorage.removeItem("access_token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, accessToken, setToken, clearToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
