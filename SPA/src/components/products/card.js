import { routes } from "../../helpers/routeConfig";
import styles from "./card.module.scss";
import { NavLink } from "react-router-dom";

const Card = (props) => {
  return (
    <div key={props.data._id} className={styles["card"]}>
      <div className={styles["box-image"]}>
        <img src={props.data.imageUrl} alt="...comics" />
      </div>
      <div className={styles["card-body"]}>
        <h2 className={styles["card-title"]}>{props.data.title}</h2>
        <div>
          <NavLink to={`${routes.details}/${props.data._id}`}>
            Read More
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default Card;
