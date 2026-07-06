import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const existingUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (existingUser) {
    setUser(existingUser);
    localStorage.setItem("user", JSON.stringify(existingUser));
    return true;
  }

  return false;
};
const register = (name, email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const alreadyExists = users.find(
    (user) => user.email === email
  );

  if (alreadyExists) {
    return false;
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
  };

  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  return true;
};
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);