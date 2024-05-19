
import styles from "./topFive.module.scss";
import { routes } from "../../helpers/routeConfig";
import { Link } from "react-router-dom";

function TopFive(props) {
  const data = props.info;
  const path=routes.details.replace("/:id", "/");
  console.log(data._id,"fff")
  console.log(path)

  return (
    <div className={styles["box__top"]}>
      <div className={styles["box__img"]}>
        <img src={data.imageUrl} id="image" alt=".." />
      </div>

      <div className={styles["box__info"]}>
      <h2 className={styles["title"]}>{data.title}</h2>
        <Link
          className={styles["link"]}
          to={`${path}/${data._id}`}
        >
          Read more
        </Link>
      </div>
    </div>
  );
}
export default TopFive;
