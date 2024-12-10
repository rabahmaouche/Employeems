import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const userContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const verifieuser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://localhost:3000/api/auth/verifie",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.success) {
            setUser(response.data.user);
          }
        } else {
          navigate("/login");
          setLoading(false);
        }
      } catch (error) {
        if (error.response && error.response.data.error === "jwt expired") {
          localStorage.removeItem("token");
          navigate("/login");
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    verifieuser();
  }, [navigate]);

  const login = (userdata) => {
    setUser(userdata);
    localStorage.setItem("token", userdata.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </userContext.Provider>
  );
};

export default AuthContext; // This is the default export
export const useAuth = () => useContext(userContext); // Named export for the hook
