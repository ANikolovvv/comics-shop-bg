import styles from "./card.module.css";
import Button from "../../elements/button";

const Card = (props) => {
  return (
    <div key={props.data._id} className={styles["card"]}>
      <div className={styles["box-image"]}>
        <img src={props.data.imageUrl} alt="...comics" />
      </div>
      <div className={styles["card-body"]}>
        <h2 className={styles["card-title"]}>{props.data.title}</h2>
        <div>
          <Button to={`/details/${props.data._id}`}>Read More</Button>
        </div>
      </div>
    </div>
  );
};
export default Card;
