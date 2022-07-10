import { Link } from "react-router-dom";
import AuthContexts from "../../../contexts/authContext";
import { useContext } from "react";
import { resLogout } from "../../../services/server";

import styles from "./Header.module.css";

const Header = (props) => {
  console.log("props", props);

  let [user, setContext] = useContext(AuthContexts);
  console.log(localStorage.getItem("user"), "sdsaassasaaaaaaaaa");
  const token = JSON.parse(localStorage.getItem("user"));
  const logoutHandller = () => {
    
    console.log(token.accessToken,'logaout')
    resLogout(token.accessToken);
    localStorage.clear();
    user = undefined;
    setContext(user);
  };
  //const isUser = props.user !== undefined;

  console.log();
  return (
    <>
      <header>
        <nav className={styles["container"]}>
          <div className={styles["row"]}>
            <div className={styles["col-sm-3"]}>
              <div className={styles["btno"]}>
                <Link className={styles["btn"]} to="/">
                  Home
                </Link>
                <Link className={styles["btn"]} to="/catalog">
                  Catalog
                </Link>
              </div>
              {!token ? (
                <div className={styles["btno"]}>
                  <Link className={styles["btn"]} to="/login">
                    Login
                  </Link>
                  <Link className={styles["btn"]} to="/register">
                    Register
                  </Link>
                </div>
              ) : (
                <div className={styles["btno"]}>
                  <Link className={styles["btn"]} to="/create">
                    Orders
                  </Link>
                  <Link className={styles["btn"]} to="/my-orders">
                    My Orders
                  </Link>
                  <Link
                    className={styles["btn"]}
                    onClick={logoutHandller}
                    to="/login"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
export default Header;
