import styles from "./navigation.module.scss";

import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import NavBar from "./navBar";

function Navigation() {
  return (
    <div className={styles["links"]}>
      <NavBar className={"box__links"} classNameLinkBox={"box__link"} />
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
