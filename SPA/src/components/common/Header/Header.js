import { Link ,useNavigate} from "react-router-dom";
import AuthContexts from "../../../contexts/authContext";
import { useContext } from "react";
import { resLogout } from "../../../services/server";
import logo from "../../../logo.svg";
import styles from "./Header.module.css";

const Header = (props) => {

  const navigation = useNavigate();
  let [user, setContext] = useContext(AuthContexts);
  console.log(localStorage.getItem("user"), "sdsaassasaaaaaaaaa");
  const token = JSON.parse(localStorage.getItem("user"));
  const logoutHandller = () => {
    console.log(token.accessToken, "logaout");
    resLogout(token.accessToken);
    localStorage.clear();
    user = undefined;
    setContext(user);
    navigation('/')
  };
  //const isUser = props.user !== undefined;

  console.log();
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
          </section>
          {!token ? (
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
              <Link
                className={styles["btn"]}
                onClick={logoutHandller}
                to="/login"
              >
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
