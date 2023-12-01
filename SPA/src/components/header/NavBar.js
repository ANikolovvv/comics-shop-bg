import { NavLink, useNavigate } from "react-router-dom";
import styles from "./navBar.module.scss";
import { routes } from "../../helpers/routeConfig";

import { AuthContexts } from "../../contexts/authContext";
import { resLogout } from "../../services/server";
import { useContext } from "react";

const NavBar = ({ className, classNameLinkBox }) => {
  const { user, userLogout } = useContext(AuthContexts);
  const navigate = useNavigate();

  const logoutHandler = () => {
    resLogout(user.accessToken)
      .then(() => {
        userLogout();
        navigate(routes.login);
      })
      .catch(() => {
        navigate(routes.home);
      });
  };

  return (
    <ul className={styles[className]}>
      <li className={styles[classNameLinkBox]}>
        <NavLink to={routes.home}>Home</NavLink>
    
      </li>
      <li className={styles[classNameLinkBox]}>
        <NavLink to={routes.catalog}>Catalog</NavLink>
      </li>
      <li className={styles[classNameLinkBox]}>
        <NavLink to={routes.about}>Contact us</NavLink>
      </li>
      {!user.email ? (
        <>
          <li className={styles[classNameLinkBox]}>
            <NavLink to={routes.login}>Login</NavLink>
          </li>
          <li className={styles[classNameLinkBox]}>
            <NavLink to={routes.register}>Register</NavLink>
          </li>
        </>
      ) : (
        <>
          <li className={styles[classNameLinkBox]}>
            <NavLink to={routes.create}>Orders</NavLink>
          </li>
          <li className={styles[classNameLinkBox]}>
            <NavLink to={routes.myOrder}>My Orders</NavLink>
          </li>
          <li className={styles[classNameLinkBox]}>
            <button className={styles["btn"]} onClick={logoutHandler}>Logout</button>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavBar;
