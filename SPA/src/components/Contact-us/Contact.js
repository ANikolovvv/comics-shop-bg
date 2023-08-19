import styles from "./Contact.module.css";
import { Map } from "./Map/Map";

import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";

const Contact = () => {
  return (
    <div className={styles["container"]}>
      <div>
        <h1>Contact us</h1>
      </div>

      <div className={styles["contact"]}>
        <div className={styles["contactSection"]}>
          <div className={styles["info-form"]}>
            <ul className={styles["ul"]}>
              <li className={styles["li"]}>
                Comics-shop number:<span>088 777 6667</span>
              </li>
              <li className={styles["li"]}>
                Comics-shop email: <span>comicsshop@red.bg</span>
              </li>
              <li className={styles["li"]}>
                Comics-shop address: <span>Burgas str. Oborishte</span>
              </li>
            </ul>
            <div className={styles["react-icons"]}>
              <div className={styles["react-icon"]}>
                <FaFacebookF />
              </div>
              <div className={styles["react-icon"]}>
                <FaTwitter />
              </div>
              <div className={styles["react-icon"]}>
                <BsInstagram />
              </div>
            </div>
          </div>

          <Map />
        </div>
      </div>
    </div>
  );
};
export default Contact;
