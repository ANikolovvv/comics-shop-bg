import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { resLogout } from "../../services/server";
import { AuthContexts } from "../../contexts/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { user, userLogout } = useContext(AuthContexts);
  resLogout(user.accessToken)
    .then(() => {
      userLogout();
      navigate("/login");
    })
    .catch(() => {
      navigate("/");
    });

  return null;
};

export default Logout;
