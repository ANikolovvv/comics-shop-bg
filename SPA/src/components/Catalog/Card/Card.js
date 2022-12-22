import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={styles["wraper"]}>
      <div key={props.data._id} className={styles["card"]}>
        <div>
          <img
            src={props.data.imageUrl}
            alt="comics"
            className={styles["card-img-top"]}
          />
        </div>
        <div className={styles["card-body"]}>
          <h5 className={styles["card-title"]}>{props.data.title}</h5>
          <Link
            to={`/details/${props.data._id}`}
            info={props}
            className={styles["button-top"]}
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Card;
