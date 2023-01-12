import { Link } from "react-router-dom";
import { useState } from "react";

import { AuthContexts } from "../../contexts/authContext";
import { useContext } from "react";
import { AiOutlineMenu } from "react-icons/ai";

import logo from "../../logo.svg";
import styles from "./Header.module.css";
import Navigation from "./Navigation";

const Header = () => {
  const { user } = useContext(AuthContexts);
  const [toggle, setToggle] = useState(false);
  function navigationHandler(e) {
    setToggle(!toggle);
  }
  return (
    <>
      <header className={styles.header}>
        <nav className={styles["container"]}>
          <div className={styles["logo"]}>
            <img src={logo} className={styles["logo-img"]} alt="LOGO"></img>
          </div>
          <div className={styles["nav-small"]} onClick={navigationHandler}>
            {toggle ? (
              <div className={styles["small"]}>
                <Navigation user={user}></Navigation>
              </div>
            ) : (
              <div className={styles["small"]}>
                <AiOutlineMenu size={25} color="#fff" />
              </div>
            )}
          </div>
          <div className={styles["nav-box"]}>
            <ul className={styles["btno"]}>
              <li>
                <Link className={styles["btn"]} to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className={styles["btn"]} to="/catalog">
                  Catalog
                </Link>
              </li>
              <li>
                <Link className={styles["btn"]} to="/about">
                  Contact us
                </Link>
              </li>
            </ul>
            {!user.email ? (
              <ul className={styles["btno"]}>
                <li>
                  <Link className={styles["btn"]} to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className={styles["btn"]} to="/register">
                    Register
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className={styles["btno"]}>
                <li>
                  <Link className={styles["btn"]} to="/create">
                    Orders
                  </Link>
                </li>
                <li>
                  <Link className={styles["btn"]} to="/my-orders">
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link className={styles["btn"]} to="/logout">
                    Logout
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};
export default Header;
