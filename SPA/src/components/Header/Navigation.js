import styles from "./Navigation.module.scss";
import { Link, NavLink } from "react-router-dom";

import { AiOutlineClose } from "react-icons/ai";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";

function Navigation(props) {
  const { user } = props;
  return (
    <div className={styles["links"]}>
      <div className={styles["react-icons"]} >
        <div className={styles["icon"]}>
          <AiOutlineClose />
        </div>
      </div>

        <ul className={styles["box__links"]}>
          <li className={styles["link"]}>
            <NavLink  to="/">
              Home
            </NavLink>
          </li>
          <li className={styles["link"]}>
            <NavLink  to="/catalog">
              Catalog
            </NavLink>
          </li>
          <li className={styles["link"]}>
            <NavLink  to="/about">
              Contact us
            </NavLink>
          </li>
          {!user.email ? (
            <>
              <li className={styles["link"]}>
                <NavLink to="/login">
                  Login
                </NavLink>
              </li>
              <li className={styles["link"]}>
                <NavLink  to="/register">
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className={styles["link"]} >
                <NavLink className={styles["link"]} to="/create">
                  Orders
                </NavLink>
              </li>
              <li className={styles["link"]}>
                <Link  to="/my-orders">
                  My Orders
                </Link>
              </li>
              <li className={styles["link"]}>
                <Link  to="/logout">
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      <div className={styles["react-icons"]}>
        <div className={styles["icon"]}>
          <FaFacebookF />
        </div>
        <div className={styles["icon"]}>
          <FaTwitter />
        </div>
        <div className={styles["icon"]}>
          <BsInstagram />
        </div>
      </div>
    </div>
  );
}
export default Navigation;
