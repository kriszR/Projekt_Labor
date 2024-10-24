'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUser(data)

    };

    fetchData();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
