import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || null);

  const updateUser = (user) => {
    setCurrentUser(user);
  };

  const logOut = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  return <AuthContext.Provider value={{ currentUser, updateUser, logOut }}>{children}</AuthContext.Provider>;
};
