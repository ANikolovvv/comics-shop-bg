import styles from "./MyCard.module.css";
import { Link } from "react-router-dom";

export const MyCard = (props) => {
    console.log(props.data,'my card')
    
  return (
    <div className={styles["wraper"]}>
      <div key={props.data._id} className={styles["card"]}>
        <img
          src="https://images-na.ssl-images-amazon.com/images/I/91UH4LoDTvL.jpg"
          alt="..."
          className={styles["card-img-top"]}
        />
        <div className={styles["card-body"]}>
          <h5 className={styles["card-title"]}>Title: {props.data.title}</h5>
          <p className={styles["card-title"]}>Price: {props.data.price} </p>

          <Link
            to={`/edit/${props.data._id}`}
          
            className={styles["btn"]}
          >
            Edit
          </Link>
          <button className={styles["btn-delete"]} onClick={props.onClick} >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
