import styles from "./myCard.module.css";
import { Link } from "react-router-dom";

 const MyCard = (props) => {
  return (
    <div key={props.data._id} className={styles["card"]}>
      <div className={styles["img"]}>
        <img
          src="https://images-na.ssl-images-amazon.com/images/I/91UH4LoDTvL.jpg"
          alt="..."
          className={styles["card-img-top"]}
        />
      </div>
      <div className={styles["card-body"]}>
        <h5 className={styles["card-title"]}>{props.data.title}</h5>
        <p >Price: {props.data.price}$ </p>
        <div className={styles["buttons"]}>
          <Link to={`/edit/${props.data._id}`} className={styles["btn"]}>
            Edit
          </Link>
          <button className={styles["btn"]} onClick={props.onClick}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default MyCard
