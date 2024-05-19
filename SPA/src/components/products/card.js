import { routes } from "../../helpers/routeConfig";
import styles from "./card.module.scss";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div key={props.data._id} className={styles["card"]}>
      <div className={styles["box__image"]}>
        <img src={props.data.imageUrl} alt="...comics" />
      </div>
      <div className={styles["card__body"]}>
        <h2 className={styles["card__title"]}>{props.data.title}</h2>
        <div>
          <Link to={`${routes.details}/${props.data._id}`}>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Card;
