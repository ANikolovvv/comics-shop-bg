import styles from "./Navigation.module.css";
import { Link } from "react-router-dom";

function Navigation(props) {
  const { user } = props;
  return (
     <div className={styles["links"]}>
        <i className="fa-sharp fa-solid fa-x"></i>
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
  );
}
export default Navigation;
