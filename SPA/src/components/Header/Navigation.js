import styles from "./Navigation.module.css";
import { Link } from "react-router-dom";

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

      <div className={styles["box__ul"]}>
        <ul className={styles["box__links"]}>
          <li>
            <Link className={styles["link"]} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={styles["link"]} to="/catalog">
              Catalog
            </Link>
          </li>
          <li>
            <Link className={styles["link"]} to="/about">
              Contact us
            </Link>
          </li>
          {!user.email ? (
            <>
              <li>
                <Link className={styles["link"]} to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className={styles["link"]} to="/register">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className={styles["link"]} to="/create">
                  Orders
                </Link>
              </li>
              <li>
                <Link className={styles["link"]} to="/my-orders">
                  My Orders
                </Link>
              </li>
              <li>
                <Link className={styles["link"]} to="/logout">
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
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
