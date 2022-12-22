import styles from "./TopFive.module.css";
import { Link } from "react-router-dom";

export function Top(props) {
  const data = props.info;

  return (
    <div className={styles["home"]}>
      <p className={styles["date-title"]}>{data.title}</p>
      <div className={styles["div-img"]}>
        <img src={data.imageUrl} id="image" alt=".." />
      </div>

      <div>
        <Link className={styles["button-top"]} to={`/details/${data._id}`}>
          Read more
        </Link>
      </div>
      <p className={styles["date-title"]}>Raiting: {data.userLiked.length}</p>
      <ul className={styles["star"]}>
        <li><i className="fa-solid fa-star"></i></li>
        <li><i className="fa-solid fa-star"></i></li>
        <li><i className="fa-solid fa-star"></i></li>
        <li><i className="fa-solid fa-star"></i></li>
      </ul>
    </div>
  );
}
