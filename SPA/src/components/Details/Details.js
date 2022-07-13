import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as requests from "../../services/server";
import styles from "./Details.module.css";

const Details = () => {
  const [comic, setComic] = useState({});
  let { id } = useParams();
  console.log(id, "id");
  let arr = comic.userLiked;
  let final = arr?.length;

  useEffect(() => {
    requests.getData(id).then((result) => {
      console.log(result, "result");
      setComic(result);
    });
  }, [id]);
  return (
    <>
    <article className={styles["art"]}>
        <h1>More details</h1>
      </article>
      <div className={styles["container"]}>
        <div className={styles["product-details"]}>
          <h1>{comic.title}</h1>

          <span className={styles["hint-star star"]}>
            <i className={styles["fa fa-star"]} aria-hidden="true"></i>
            <i className={styles["fa fa-star"]} aria-hidden="true"></i>
            <i className={styles["fa fa-star"]} aria-hidden="true"></i>
            <i className={styles["fa fa-star-half-o"]} aria-hidden="true"></i>
            <i className={styles["fa fa-star-o"]} aria-hidden="true"></i>
          </span>

          <p className={styles["information"]}>{comic.description}</p>
          <div className={styles["like"]}>
            <button className={styles["btn"]}>Like</button>
          </div>

          <div className={styles["control"]}>
            <button className={styles["btn"]}>Buy</button>
            <button className={styles["btn"]}>Edit</button>
            <button className={styles["btn"]}>Delete</button>
          </div>
        </div>

        <div className={styles["product-image"]}>
          <img src={comic.imageUrl} className={styles['container img']} alt={comic.title} />

          <div className={styles["info"]}>
            <h2>The Description</h2>
            <ul>
              <li key={comic._id}>
                <strong>Author: </strong>
                {comic.author}
              </li>
              <li key={comic._id}>
                <strong>Price: </strong>
                {comic.price}
              </li>
              <li key={comic._id}>
                <strong>Release data: </strong>
                {comic.year}
              </li>
              <li key={comic._id}>
                <strong>Rating: </strong>
                {final}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default Details;
//float: right;
