import { Link } from "react-router-dom";
import styles from "./404.module.css";

const NotFound = () => {
  return (
    <div
      className={styles["div"]}
      to="https://codepen.io/uiswarup/full/yLzypyY"
      target="_blank"
    >
      <header className={styles["top-header"]}></header>

      <div className={styles["box__lamp"]}>
        <div className={styles["starsec"]}></div>
        <div className={styles["starthird"]}></div>
        <div className={styles["starfourth"]}></div>
        <div className={styles["starfifth"]}></div>
      </div>

      <div className={styles["lamp__wrap"]}>
        <div className={styles["lamp"]}>
          <div className={styles["cable"]}></div>
          <div className={styles["cover"]}></div>
          <div className={styles["in-cover"]}>
            <div className={styles["bulb"]}></div>
          </div>
          <div className={styles["light"]}></div>
        </div>
      </div>

      <section className={styles["error"]}>
        <div className={styles["error__content"]}>
          <div className={styles["error__message message"]}>
            <h1 className={styles["message__title"]}>Page Not Found</h1>
            <p className={styles["message__text"]}>
              We're sorry, the page you were looking for isn't found here. The
              link you followed may either be broken or no longer exists.
            </p>
          </div>
          <div className={styles["error__nav e-nav"]}>
            <Link to="/" className={styles["link"]}>
              Click here!
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
export default NotFound;
