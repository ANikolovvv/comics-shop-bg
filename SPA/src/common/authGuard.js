import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContexts } from "../contexts/authContext";


 export const UserGuard = ({ children }) => {
  const { user } = useContext(AuthContexts);

  if (!user.email) {
    return <Navigate to="/login" replace />;
  }
  return children ? children : <Outlet />;
};

export const GuestGuard = ({ children }) => {
  const { user } = useContext(AuthContexts);

  if (user.email) {
    return <Navigate to="/" replace />;
  }
  return children ? children : <Outlet />;
};

