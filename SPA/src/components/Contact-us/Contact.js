import styles from "./Contact.module.css";
import { Map } from "./Map/Map";

export const Contact = () => {
  return (
    <>
      <div className={styles["container"]}>
        <article className={styles["art"]}>
          <h1>Contact us</h1>
        </article>
        <article className={styles["contact"]}>
          <div className={styles["contactSection"]}>
            <div className={styles["info-form"]}>
              <h2 className={styles["about"]}>
                If you have any question you can contact us.
              </h2>
              <ul className={styles["ul"]}>
                <li className={styles["li"]}>Comics-shop number:</li>
                <li className={styles["li-info"]}>088 777 6667</li>
                <li className={styles["li"]}>Comics-shop email:</li>
                <li className={styles["li-info"]}> comicsshop@red.bg</li>
                <li className={styles["li"]}>Comics-shop address:</li>
                <li className={styles["li-info"]}>Burgas str. Oborishte </li>
              </ul>
            </div>
            <div className={styles["div-icon"]}>
              <img
                className={styles["icon"]}
                src="https://starwarsblog.starwars.com/wp-content/uploads/2020/12/marvel-star-wars-12-cover.jpg"
                alt="..."
              ></img>
            </div>

            <Map></Map>
          </div>
        </article>
      </div>
    </>
  );
};
