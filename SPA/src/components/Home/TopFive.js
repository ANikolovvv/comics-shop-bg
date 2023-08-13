import styles from "./TopFive.module.css";
import { Link } from "react-router-dom";

export function Top(props) {
  const data = props.info;

  return (
    <div className={styles["home"]}>
      <h2 className={styles["title"]}>{data.title}</h2>
      <div className={styles["box__img"]}>
        <img src={data.imageUrl} id="image" alt=".." />
      </div>

      <div>
        <Link className={styles["btn"]} to={`/details/${data._id}`}>
          Read more
        </Link>
      </div>
      <ul className={styles["star"]}>
        <li>
          <i className="fa-solid fa-star"></i>
        </li>
        <li>
          <i className="fa-solid fa-star"></i>
        </li>
        <li>
          <i className="fa-solid fa-star"></i>
        </li>
        <li>
          <i className="fa-solid fa-star"></i>
        </li>
        <li>
          <i className="fa-solid fa-star"></i>
        </li>
      </ul>
    </div>
  );
}
