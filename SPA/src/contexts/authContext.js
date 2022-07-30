import { createContext } from "react";
import { useLocaleStorage } from "../hooks/useLocaleStorage";
export const AuthContexts = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocaleStorage("auth", {});

  const userLogin = (authData) => {
    setAuth(authData);
  };

  const userLogout = () => {
    setAuth({});
  };
  return (
    <AuthContexts.Provider
      value={{
        user: auth,
        userLogin,
        userLogout,
      }}
    >
      {children}
    </AuthContexts.Provider>
  );
};
