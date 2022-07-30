import { Link } from "react-router-dom";

import { AuthContexts } from "../../contexts/AuthContext";
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
            <Link className={styles["logo"]} to="/">
              <img src={logo} className={styles["logo-img"]} alt="LOGO"></img>
            </Link>
          </section>
          <section className={styles["btno"]}>
            <Link className={styles["btn"]} to="/">
              Home
            </Link>

            <Link className={styles["btn"]} to="/catalog">
              Catalog
            </Link>
            <Link className={styles["btn"]} to="/about">
              Contact Us
            </Link>
          </section>
          {!user.email ? (
            <section className={styles["btno"]}>
              <Link className={styles["btn"]} to="/login">
                Login
              </Link>
              <Link className={styles["btn"]} to="/register">
                Register
              </Link>
            </section>
          ) : (
            <section className={styles["btno"]}>
              <Link className={styles["btn"]} to="/create">
                Orders
              </Link>
              <Link className={styles["btn"]} to="/my-orders">
                My Orders
              </Link>
              <Link className={styles["btn"]} to="/logout">
                Logout
              </Link>
            </section>
          )}
        </nav>
      </header>
    </>
  );
};
export default Header;
