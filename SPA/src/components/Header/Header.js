import { Link } from "react-router-dom";

import { AuthContexts } from "../../contexts/authContext";
import { useContext } from "react";

import logo from "../../logo.svg";
import styles from "./Header.module.css";

const Header = () => {
  const { user } = useContext(AuthContexts);

  return (
    <>
      <header>
        <nav className={styles["container"]}>
          <section className={styles["logo"]}>
            <img src={logo} className={styles["logo-img"]} alt="LOGO"></img>
          </section>
          <section className={styles["nav-box"]}>
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
          </section>
        </nav>
      </header>
    </>
  );
};
export default Header;
