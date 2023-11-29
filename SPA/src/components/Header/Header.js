import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import { AuthContexts } from "../../contexts/authContext";
import { useContext } from "react";
import { AiOutlineMenu } from "react-icons/ai";

import logo from "../../logo.svg";
import styles from "./Header.module.scss";
import Navigation from "./Navigation";
import { resLogout } from "../../services/server";

const Header = () => {
  const { user, userLogout } = useContext(AuthContexts);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = () => {
    resLogout(user.accessToken)
      .then(() => {
        userLogout();
        navigate("/login");
      })
      .catch(() => {
        navigate("/");
      });
  };

  const navigationHandler = () => {
    setToggle(!toggle);
  };

  return (
    <header className={styles["header"]}>
      <nav className={styles["container"]}>
        <div className={styles["logo"]}>
          <img src={logo} className={styles["logo__img"]} alt="LOGO"></img>
        </div>

        <div className={styles["nav__small"]} onClick={navigationHandler}>
          {toggle ? (
            <div className={styles["small"]}>
              <Navigation user={user}/>
            </div>
          ) : (
            <div className={styles["small"]}>
              <AiOutlineMenu size={25} color="#fff" />
            </div>
          )}
        </div>
        <ul className={styles["box__ul"]}>
          <li className={styles["box__link"]}>
            <NavLink  to="/">
              Home
            </NavLink>
          </li>
          <li className={styles["box__link"]}>
            <NavLink  to="/catalog">
              Catalog
            </NavLink>
          </li>
          <li className={styles["box__link"]}>
            <NavLink  to="/about">
              Contact us
            </NavLink>
          </li>
        </ul>
        {!user.email ? (
          <ul className={styles["box__ul"]}>
            <li className={styles["box__link"]}>
              <NavLink  to="/login">
                Login
              </NavLink>
            </li>
            <li className={styles["box__link"]}>
              <NavLink to="/register">
                Register
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className={styles["box__ul"]}>
            <li >
              <NavLink  to="/create">
                Orders
              </NavLink>
            </li>
            <li className={styles["box__link"]} >
              <NavLink  to="/my-orders">
                My Orders
              </NavLink>
            </li>
            <li className={styles["box__link"]}>
              <button onClick={logoutHandler}>
                Logout
              </button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};
export default Header;
