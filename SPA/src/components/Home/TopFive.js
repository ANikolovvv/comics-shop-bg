import styles from "./TopFive.module.css";
import { Link } from "react-router-dom";

export function Top(props) {
  const data = props.info;

  return (
    <div className={styles["home"]}>
      <p className={styles["date-title"]}>{data.title}</p>
      <img src={data.imageUrl} id="image" alt=".." />

      <div>
        <Link className={styles["button-top"]} to={`/details/${data._id}`}>
          Read more
        </Link>
      </div>
      <p className={styles["date-title"]}>Raiting: {data.userLiked.length}</p>
      <span>☆</span>
      <span>☆</span>
      <span>☆</span>
      <span>☆</span>
      <span>☆</span>
    </div>
  );
}
