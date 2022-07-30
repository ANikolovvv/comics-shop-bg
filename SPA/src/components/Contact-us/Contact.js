import styles from "./Contact.module.css";

export const Contact = () => {
  return (
    <>
      <article className={styles["art"]}>
        <h1>Contact us</h1>
      </article>
      <div className={styles["signupSection"]}>
        <div className={styles["info-form"]}>
          <div className={styles["about"]}>
            If you have any question you can contact us.
          </div>
          <ul>
            <li className={styles["li"]}>Comics-shop number :</li>
            <li className={styles["li-info"]}>0887776667</li>
            <li className={styles["li"]}>Comics-shop email :</li>
            <li className={styles["li-info"]}> comicsshop@red.bg</li>
            <li className={styles["li"]}>Comics-shop address :</li>
            <li className={styles["li-info"]}>Burgas str. Dark House 5 </li>
          </ul>
        </div>
        <img
          className={styles["icon"]}
          src="https://starwarsblog.starwars.com/wp-content/uploads/2020/12/marvel-star-wars-12-cover.jpg"
          alt="..."
        ></img>
      </div>
    </>
  );
};
