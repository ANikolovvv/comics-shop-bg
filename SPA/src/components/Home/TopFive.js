import Button from "../../elements/button";
import styles from "./topFive.module.scss";

function TopFive(props) {
  const data = props.info;

  return (
    <div className={styles["home"]}>
      <h2 className={styles["title"]}>{data.title}</h2>
      <div>
        <img src={data.imageUrl} id="image" alt=".." />
      </div>

      <div>
        <Button to={`/details/${data._id}`}>Read more</Button>
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
export default TopFive;
